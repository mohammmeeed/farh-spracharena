import { Server } from 'socket.io';
import {
  GameRoom,
  GameState,
  GameType,
  QuestionFormat,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  GameStateSnapshot,
  QuestionResponseRecord,
  QuestionHistoryItem,
  SessionStatistics,
} from '../types/game.types.js';
import { roomManager } from '../rooms/room.manager.js';
import { ScoreService } from './ScoreService.js';
import { LeaderboardService } from './LeaderboardService.js';
import { questionSelectionService } from '../questions/questionSelectionService.js';
import { questionHistoryService } from '../questions/questionHistoryService.js';
import { TeamManager } from './TeamManager.js';
import { AnswerValidator } from './validators/AnswerValidator.js';
import { timerService } from './TimerService.js';
import { logger } from '../utils/logger.js';

export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

/**
 * GameEngine - Server-Authoritative Real-Time Game Loop
 * Hardened for Mobile Latency Compensation and State Snapshot Synchronization
 */
export class GameEngine {
  private static instance: GameEngine;

  public static getInstance(): GameEngine {
    if (!this.instance) {
      this.instance = new GameEngine();
    }
    return this.instance;
  }

  /**
   * Generates a complete authoritative snapshot of the current room state
   */
  public generateStateSnapshot(room: GameRoom): GameStateSnapshot {
    const gameState = room.gameState;
    const currentGame = room.games[room.currentGameIndex];
    const now = Date.now();

    let currentQuestionPayload = undefined;
    if (gameState && gameState.currentQuestion) {
      const q = gameState.currentQuestion;
      currentQuestionPayload = {
        questionId: q.id,
        text: q.text,
        format: q.format,
        options: q.options,
        words: q.words,
        clues: q.clues,
        focusWord: q.focusWord,
        translation: q.translation,
        explanation: q.explanation,
        timeLimit: q.timeLimit,
        startedAt: (gameState as any).currentQuestionStartedAt || now,
        endsAt: (gameState as any).currentQuestionEndsAt || now + q.timeLimit * 1000,
        questionNumber: room.currentQuestionIndex + 1,
        totalQuestions: gameState.questionsForCurrentGame.length,
        gameType: currentGame?.gameType || 'SCHNELLANTWORT',
        gameNumber: room.currentGameIndex + 1,
        totalGames: room.games.length,
        category: q.category,
        difficulty: q.difficulty,
      };
    }

    return {
      roomId: room.roomId,
      roomPin: room.pin,
      level: room.level,
      status: room.status,
      stateVersion: (room as any).stateVersion || 100,
      phaseSequence: (room as any).phaseSequence || 1,
      currentGameIndex: room.currentGameIndex,
      totalGames: room.games.length,
      currentGameType: currentGame?.gameType || 'SCHNELLANTWORT',
      currentQuestionIndex: room.currentQuestionIndex,
      totalQuestionsInGame: gameState?.questionsForCurrentGame?.length || 0,
      currentQuestionId: currentQuestionPayload?.questionId,
      currentQuestion: currentQuestionPayload,
      questionEndsAt: (gameState as any)?.currentQuestionEndsAt,
      countdownValue: gameState?.countdownValue,
      countdownEndsAt: (gameState as any)?.countdownEndsAt,
      countdownStartedAt: (gameState as any)?.countdownStartedAt,
      countdownDurationMs: 3000,
      resultEndsAt: (gameState as any)?.resultEndsAt,
      nextGameEndsAt: (gameState as any)?.nextGameEndsAt,
      lastQuestionResult: (gameState as any)?.lastQuestionResult,
      nextGameData: (gameState as any)?.nextGameData,
      isPaused: !!(gameState as any)?.isPaused,
      pauseReason: (gameState as any)?.isPaused ? 'Lehrer Farh erklärt die Frage und Sprachregel' : undefined,
      pauseExplanation: gameState?.currentQuestion?.explanation,
      teams: room.teams,
      players: Object.values(room.players),
      serverTime: now,
    };
  }

  /**
   * Start a complete multi-game session
   */
  public startGame(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room) {
      throw new Error('Spielraum nicht gefunden.');
    }

    if (room.games.length === 0) {
      throw new Error('Keine Spiele für diese Runde konfiguriert.');
    }

    (room as any).stateVersion = 100;
    (room as any).phaseSequence = 1;
    room.currentGameIndex = 0;
    room.currentQuestionIndex = 0;
    room.usedQuestionIds = new Set<string>();

    // Reset all player scores and streaks
    for (const player of Object.values(room.players)) {
      player.score = 0;
      player.currentStreak = 0;
      player.highestStreak = 0;
      player.streak = 0;
      player.answeredCurrentQuestion = false;
      player.lastPointsEarned = 0;
      delete player.lastAnswer;
      delete player.lastAnswerCorrect;
    }

    // Determine difficulty distribution from room settings
    const difficultyDistribution =
      room.difficulty === 'EASY'
        ? { EASY: 0.8, MEDIUM: 0.2, HARD: 0.0 }
        : room.difficulty === 'MEDIUM'
        ? { EASY: 0.1, MEDIUM: 0.8, HARD: 0.1 }
        : room.difficulty === 'HARD'
        ? { EASY: 0.0, MEDIUM: 0.2, HARD: 0.8 }
        : { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 };

    const allowedCategories =
      room.category && room.category !== 'ALL' ? [room.category] : undefined;

    // Select questions for Game 1 with Anti-Repetition
    const currentGameConfig = room.games[0];
    const questions = questionSelectionService.selectQuestions({
      level: room.level,
      gameType: currentGameConfig.gameType,
      count: currentGameConfig.questionCount,
      usedQuestionIds: room.usedQuestionIds,
      difficultyDistribution,
      allowedCategories,
    });

    // Mark questions as used in room and history
    questions.forEach((q) => {
      room.usedQuestionIds?.add(q.id);
      questionHistoryService.recordUsage(roomId, q.id);
    });


    const gameState: GameState = {
      status: 'COUNTDOWN',
      currentGameIndex: 0,
      currentQuestionIndex: 0,
      questionsForCurrentGame: questions,
      answeredCount: 0,
      totalPlayers: Object.keys(room.players).length,
    };

    room.teamsLocked = true;

    // If first game is Team Battle, ensure teams are ready
    if (currentGameConfig.gameType === 'TEAM_BATTLE') {
      if (!room.teams || Object.keys(room.teams).length === 0) {
        room.teams = TeamManager.createTeams(room.players);
      } else {
        // Ensure every active player is properly assigned
        for (const player of Object.values(room.players)) {
          TeamManager.ensurePlayerTeam(player, room.teams);
        }
      }
      gameState.teams = room.teams;
      this.broadcastTeamAssignment(room, io);

      room.status = 'COUNTDOWN';
      room.gameState = gameState;

      logger.info(
        `[GameEngine] Started Team Battle session for Room ${roomId} (Red: ${room.teams.TEAM_ROT.playerIds.length}, Blue: ${room.teams.TEAM_BLAU.playerIds.length})`
      );

      // Broadcast animated Team Intro before first countdown
      io.to(roomId).emit('game:teamIntro', {
        teams: room.teams,
        players: Object.values(room.players),
        durationMs: 3800,
      });

      const introTimerKey = `teamIntro_${roomId}`;
      timerService.startTimer(introTimerKey, 3800, () => {
        this.startCountdown(roomId, io);
      });
      return;
    }

    room.status = 'COUNTDOWN';
    room.gameState = gameState;

    logger.info(
      `[GameEngine] Started session for Room ${roomId} (Level: ${room.level}, Total Games: ${room.games.length}, First Game: ${currentGameConfig.gameType}, Questions: ${questions.length})`
    );

    this.startCountdown(roomId, io);
  }


  /**
   * Broadcast team assignment to all players
   */
  private broadcastTeamAssignment(room: GameRoom, io: TypedServer): void {
    if (!room.teams) return;

    for (const player of Object.values(room.players)) {
      const playerSocket = io.sockets.sockets.get(player.socketId);
      if (playerSocket) {
        playerSocket.emit('game:teamAssignment', {
          teams: room.teams,
          myTeamId: player.teamId,
        });
      }
    }
  }

  /**
   * Run 3-2-1-GO Countdown before a question
   */
  public startCountdown(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) return;

    (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
    (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
    const phaseSequence = (room as any).phaseSequence;
    const stateVersion = (room as any).stateVersion;

    room.status = 'COUNTDOWN';
    room.gameState.status = 'COUNTDOWN';

    const currentGame = room.games[room.currentGameIndex];
    const questionNumber = room.currentQuestionIndex + 1;
    const totalQuestions = room.gameState.questionsForCurrentGame.length;

    const startedAt = Date.now();
    const durationMs = 3000;
    const countdownEndsAt = startedAt + durationMs;

    room.gameState.countdownValue = 3;
    (room.gameState as any).countdownStartedAt = startedAt;
    (room.gameState as any).countdownEndsAt = countdownEndsAt;

    let count = 3;
    const timerKey = `countdown_${roomId}`;

    // Emit initial countdown value 3 with authoritative timestamps, stateVersion & phaseSequence
    io.to(roomId).emit('game:countdown', {
      value: count,
      gameType: currentGame.gameType,
      questionNumber,
      totalQuestions,
      countdownEndsAt,
      startedAt,
      durationMs,
      phaseSequence,
      stateVersion,
    });

    timerService.startTimer(
      timerKey,
      durationMs,
      () => {
        // Countdown completed -> Start Question
        this.startQuestion(roomId, io);
      },
      (remainingMs) => {
        const nextVal = Math.max(1, Math.ceil(remainingMs / 1000));
        if (nextVal !== count && nextVal >= 1) {
          count = nextVal;
          if (room.gameState) room.gameState.countdownValue = count;
          io.to(roomId).emit('game:countdown', {
            value: count,
            gameType: currentGame.gameType,
            questionNumber,
            totalQuestions,
            countdownEndsAt,
            startedAt,
            durationMs,
            phaseSequence,
            stateVersion,
          });
        }
      }
    );
  }

  /**
   * Start a Question
   */
  public startQuestion(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) return;

    const gameState = room.gameState;
    const questionIndex = room.currentQuestionIndex;
    const question = gameState.questionsForCurrentGame[questionIndex];

    if (!question) {
      logger.error(`[GameEngine] Question at index ${questionIndex} missing for Room ${roomId}`);
      this.nextStep(roomId, io);
      return;
    }

    (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
    (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
    const phaseSequence = (room as any).phaseSequence;
    const stateVersion = (room as any).stateVersion;

    room.status = 'QUESTION';
    gameState.status = 'QUESTION';
    gameState.currentQuestion = question;
    gameState.answeredCount = 0;
    gameState.totalPlayers = Object.values(room.players).filter((p) => p.connected).length;
    gameState.revealedClueIndex = 0;
    delete (gameState as any).countdownEndsAt;
    delete (gameState as any).countdownStartedAt;

    const startedAt = Date.now();
    const durationMs = question.timeLimit * 1000;
    const endsAt = startedAt + durationMs;

    gameState.currentQuestionStartedAt = startedAt;
    gameState.currentQuestionEndsAt = endsAt;

    // Reset player state for this question
    for (const player of Object.values(room.players)) {
      player.answeredCurrentQuestion = false;
      delete player.lastAnswer;
      delete player.lastAnswerTime;
      delete player.lastAnswerCorrect;
      player.lastPointsEarned = 0;
    }

    const currentGame = room.games[room.currentGameIndex];

    // Broadcast safe question payload with stateVersion & phaseSequence
    io.to(roomId).emit('game:questionStarted', {
      questionId: question.id,
      text: question.text,
      format: question.format,
      options: question.options,
      words: question.words,
      clues: question.clues,
      focusWord: question.focusWord,
      translation: question.translation,
      timeLimit: question.timeLimit,
      startedAt,
      endsAt,
      questionNumber: questionIndex + 1,
      totalQuestions: gameState.questionsForCurrentGame.length,
      gameType: currentGame.gameType,
      gameNumber: room.currentGameIndex + 1,
      totalGames: room.games.length,
      category: question.category,
      difficulty: question.difficulty,
      phaseSequence,
      stateVersion,
    });

    // If Team Battle, ensure all players have team state
    if (currentGame.gameType === 'TEAM_BATTLE' && room.teams) {
      this.broadcastTeamAssignment(room, io);
    }

    // If Was bin ich?, schedule progressive clue reveals
    if (currentGame.gameType === 'WAS_BIN_ICH' && question.clues && question.clues.length > 1) {
      this.setupClueRevealTimers(roomId, question.clues, io);
    }

    logger.info(
      `[GameEngine] Room ${roomId} | [${currentGame.gameType}] Question ${questionIndex + 1}/${gameState.questionsForCurrentGame.length} started (${question.id}). TimeLimit: ${question.timeLimit}s`
    );

    // Start Question Timer
    const questionTimerKey = `question_${roomId}`;
    timerService.startTimer(questionTimerKey, durationMs, () => {
      this.endQuestion(roomId, io);
    });
  }

  /**
   * Progressive clue scheduling for Game 4 (Was bin ich?)
   */
  private setupClueRevealTimers(roomId: string, clues: string[], io: TypedServer): void {
    const clueIntervalMs = 5000; // reveal a new clue every 5 seconds
    for (let i = 1; i < clues.length; i++) {
      const clueIndex = i;
      const clueText = clues[i];
      const timerKey = `clue_${roomId}_${i}`;

      timerService.startTimer(timerKey, clueIntervalMs * i, () => {
        const room = roomManager.getRoomById(roomId);
        if (room && room.status === 'QUESTION') {
          io.to(roomId).emit('game:clueRevealed', {
            clueIndex,
            totalClues: clues.length,
            clueText,
            revealedAt: Date.now(),
          });
        }
      });
    }
  }

  /**
   * Handle Answer Submission from a Student (Supports All 5 Game Formats)
   */
  public submitAnswer(
    roomId: string,
    playerId: string,
    questionId: string,
    answer: string | string[],
    io: TypedServer
  ): { success: boolean; error?: string } {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) {
      return { success: false, error: 'Das Spiel hat noch nicht begonnen.' };
    }

    if (room.status !== 'QUESTION') {
      return { success: false, error: 'Diese Frage ist nicht mehr aktiv.' };
    }

    const gameState = room.gameState;
    const currentQuestion = gameState.currentQuestion;

    if (!currentQuestion || currentQuestion.id !== questionId) {
      return { success: false, error: 'Ungültige Frage-ID.' };
    }

    const player = room.players[playerId];
    if (!player) {
      return { success: false, error: 'Du bist nicht Teil dieses Spielraums.' };
    }

    if (player.answeredCurrentQuestion) {
      return { success: false, error: 'Du hast bereits geantwortet.' };
    }

    const now = Date.now();
    // Allow small 500ms network jitter beyond endsAt
    if (gameState.currentQuestionEndsAt && now > gameState.currentQuestionEndsAt + 500) {
      return { success: false, error: 'Die Zeit für diese Frage ist abgelaufen.' };
    }

    const currentGame = room.games[room.currentGameIndex];

    // Server-Authoritative game-specific answer validation
    const isCorrect = AnswerValidator.validate(currentGame.gameType, answer, currentQuestion);

    // Calculate score & speed & streak bonuses
    const newStreak = isCorrect ? player.currentStreak + 1 : 0;
    const scoreResult = ScoreService.calculateAnswerScore(
      isCorrect,
      now,
      gameState.currentQuestionStartedAt || now - 5000,
      gameState.currentQuestionEndsAt || now,
      newStreak
    );

    // Update player state
    player.answeredCurrentQuestion = true;
    player.lastAnswer = answer;
    player.lastAnswerTime = now;
    player.lastAnswerCorrect = isCorrect;
    player.lastPointsEarned = scoreResult.totalPoints;
    player.score += scoreResult.totalPoints;
    player.currentStreak = newStreak;
    player.highestStreak = Math.max(player.highestStreak, newStreak);
    player.streak = newStreak;

    // If Team Battle, also add points to player's team score
    if (currentGame.gameType === 'TEAM_BATTLE' && player.teamId && room.teams) {
      TeamManager.addPointsToTeam(room.teams, player.teamId, scoreResult.totalPoints);
      io.to(roomId).emit('game:teamScoreUpdated', { teams: room.teams });
    }

    gameState.answeredCount++;

    logger.info(
      `[GameEngine] Player "${player.name}" (${currentGame.gameType}) answered ${isCorrect ? 'CORRECT' : 'INCORRECT'} on ${questionId}. Points: +${scoreResult.totalPoints} (Total: ${player.score}, Streak: ${player.currentStreak})`
    );

    // 1. Confirm answer acceptance to student
    const studentSocket = io.sockets.sockets.get(player.socketId);
    if (studentSocket) {
      studentSocket.emit('game:answerAccepted', {
        playerId: player.playerId,
        questionId,
        answeredAt: now,
      });

      studentSocket.emit('game:scoreUpdated', {
        playerId: player.playerId,
        pointsEarned: scoreResult.totalPoints,
        totalScore: player.score,
        currentStreak: player.currentStreak,
        isCorrect,
        teamId: player.teamId,
      });
    }

    // 2. Broadcast updated leaderboard to Teacher screen
    const leaderboard = LeaderboardService.generateLeaderboard(room.players);
    const teacherSocket = io.sockets.sockets.get(room.teacherSocketId);
    if (teacherSocket) {
      teacherSocket.emit('game:leaderboardUpdated', {
        leaderboard,
        topPlayer: LeaderboardService.getTopPlayer(leaderboard),
        teams: room.teams,
      });
    }

    // 3. If ALL active players have answered, conclude the question immediately
    const connectedPlayersCount = Object.values(room.players).filter((p) => p.connected).length;
    if (gameState.answeredCount >= connectedPlayersCount && connectedPlayersCount > 0) {
      logger.info(`[GameEngine] All ${connectedPlayersCount} players answered. Ending question early.`);
      this.endQuestion(roomId, io);
    }

    return { success: true };
  }

  /**
   * End Current Question and Broadcast Results
   */
  public endQuestion(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState || room.status !== 'QUESTION') return;

    timerService.cancelTimer(`question_${roomId}`);

    room.status = 'QUESTION_RESULT';
    const gameState = room.gameState;
    gameState.status = 'QUESTION_RESULT';

    const currentQuestion = room.gameState.currentQuestion;
    if (!currentQuestion) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const optionDistribution: Record<string, number> = {};
    let totalResponseTimeMs = 0;
    let responseCount = 0;
    let fastestResponseTimeMs = Infinity;
    let fastestPlayerName: string | undefined = undefined;

    const startedAt = room.gameState.currentQuestionStartedAt || Date.now() - 5000;

    const playerResults: Record<
      string,
      {
        isCorrect: boolean;
        pointsEarned: number;
        totalScore: number;
        currentStreak: number;
        teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
      }
    > = {};

    for (const player of Object.values(room.players)) {
      if (!player.answeredCurrentQuestion) {
        player.currentStreak = 0;
        player.streak = 0;
        player.lastAnswerCorrect = false;
        player.lastPointsEarned = 0;
        unansweredCount++;
      } else {
        if (player.lastAnswerCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }

        // Track answer distribution
        if (player.lastAnswer) {
          const ansKey = Array.isArray(player.lastAnswer)
            ? player.lastAnswer.join(' ')
            : String(player.lastAnswer);
          optionDistribution[ansKey] = (optionDistribution[ansKey] || 0) + 1;
        }

        // Track response times
        if (player.lastAnswerTime && player.lastAnswerTime >= startedAt) {
          const respDuration = player.lastAnswerTime - startedAt;
          totalResponseTimeMs += respDuration;
          responseCount++;

          if (respDuration < fastestResponseTimeMs) {
            fastestResponseTimeMs = respDuration;
            fastestPlayerName = player.name;
          }
        }
      }

      playerResults[player.playerId] = {
        isCorrect: player.lastAnswerCorrect || false,
        pointsEarned: player.lastPointsEarned || 0,
        totalScore: player.score,
        currentStreak: player.currentStreak,
        teamId: player.teamId,
      };
    }

    const totalPlayers = Object.keys(room.players).length;
    const accuracyPercentage =
      totalPlayers > 0 ? Math.round((correctCount / totalPlayers) * 100) : 0;
    const averageResponseTimeMs =
      responseCount > 0 ? Math.round(totalResponseTimeMs / responseCount) : undefined;

    // Record response history for every student on this question
    const studentResponses: QuestionResponseRecord[] = Object.values(room.players).map((p) => ({
      playerId: p.playerId,
      playerName: p.name,
      teamId: p.teamId,
      answer: p.lastAnswer !== undefined ? p.lastAnswer : 'Keine Antwort',
      isCorrect: p.lastAnswerCorrect || false,
      pointsEarned: p.lastPointsEarned || 0,
      responseTimeMs:
        p.lastAnswerTime && p.lastAnswerTime >= startedAt
          ? p.lastAnswerTime - startedAt
          : undefined,
    }));

    const historyItem: QuestionHistoryItem = {
      questionNumber: (room.sessionQuestionHistory?.length || 0) + 1,
      totalQuestions: room.totalQuestions,
      gameType: currentQuestion.gameType,
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      stats: {
        correctCount,
        incorrectCount,
        unansweredCount,
        totalPlayers,
        accuracyPercentage,
        averageResponseTimeMs,
      },
      studentResponses,
    };

    if (!room.sessionQuestionHistory) {
      room.sessionQuestionHistory = [];
    }
    room.sessionQuestionHistory.push(historyItem);

    const leaderboard = LeaderboardService.generateLeaderboard(room.players);
    (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
    (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
    const phaseSequence = (room as any).phaseSequence;
    const stateVersion = (room as any).stateVersion;

    const questionResultData = {
      questionId: currentQuestion.id,
      correctAnswer: currentQuestion.correctAnswer,
      stats: {
        correctCount,
        incorrectCount,
        unansweredCount,
        totalPlayers,
        optionDistribution,
        averageResponseTimeMs,
        fastestResponseTimeMs: fastestResponseTimeMs === Infinity ? undefined : fastestResponseTimeMs,
        fastestPlayerName,
        accuracyPercentage,
      },
      leaderboard,
      teams: room.teams,
      playerResults,
      phaseSequence,
      stateVersion,
    };

    (gameState as any).lastQuestionResult = questionResultData;
    (gameState as any).resultEndsAt = Date.now() + 3000;

    // Broadcast question result with correct answer and rich class performance standings
    io.to(roomId).emit('game:questionResult', questionResultData);

    logger.info(
      `[GameEngine] Room ${roomId} | Question Result: Correct: ${correctCount}, Incorrect: ${incorrectCount}, Unanswered: ${unansweredCount}, Accuracy: ${accuracyPercentage}%`
    );

    // Wait 3 seconds before advancing to next question / next game
    const resultTimerKey = `result_${roomId}`;
    timerService.startTimer(resultTimerKey, 3000, () => {
      this.nextStep(roomId, io);
    });
  }

  /**
   * Advance to the next question or the next game
   */
  public nextStep(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) return;

    const gameState = room.gameState;

    // Check if there are more questions in the current game
    if (room.currentQuestionIndex + 1 < gameState.questionsForCurrentGame.length) {
      room.currentQuestionIndex++;
      gameState.currentQuestionIndex = room.currentQuestionIndex;
      logger.info(
        `[GameEngine] Room ${roomId} moving to Question ${room.currentQuestionIndex + 1}/${gameState.questionsForCurrentGame.length}`
      );
      this.startCountdown(roomId, io);
      return;
    }

    const currentGameIndex = room.currentGameIndex;
    const currentGameConfig = room.games[currentGameIndex];
    const leaderboard = LeaderboardService.generateLeaderboard(room.players);
    const winner =
      currentGameConfig.gameType === 'TEAM_BATTLE' && room.teams
        ? TeamManager.getWinningTeam(room.teams)
        : LeaderboardService.getTopPlayer(leaderboard);

    // Broadcast game result for this individual game
    io.to(roomId).emit('game:gameResult', {
      gameType: currentGameConfig.gameType,
      gameNumber: currentGameIndex + 1,
      totalGames: room.games.length,
      leaderboard,
      teams: room.teams,
      winner,
      phaseSequence: (room as any).phaseSequence,
      stateVersion: (room as any).stateVersion,
    });

    // Check if there is another game in the session
    if (currentGameIndex + 1 < room.games.length) {
      (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
      (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
      const phaseSequence = (room as any).phaseSequence;
      const stateVersion = (room as any).stateVersion;

      room.currentGameIndex++;
      room.currentQuestionIndex = 0;

      const difficultyDistribution =
        room.difficulty === 'EASY'
          ? { EASY: 0.8, MEDIUM: 0.2, HARD: 0.0 }
          : room.difficulty === 'MEDIUM'
          ? { EASY: 0.1, MEDIUM: 0.8, HARD: 0.1 }
          : room.difficulty === 'HARD'
          ? { EASY: 0.0, MEDIUM: 0.2, HARD: 0.8 }
          : { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 };

      const allowedCategories =
        room.category && room.category !== 'ALL' ? [room.category] : undefined;

      // Select questions for Next Game with Anti-Repetition
      const nextGameConfig = room.games[room.currentGameIndex];
      const nextQuestions = questionSelectionService.selectQuestions({
        level: room.level,
        gameType: nextGameConfig.gameType,
        count: nextGameConfig.questionCount,
        usedQuestionIds: room.usedQuestionIds,
        difficultyDistribution,
        allowedCategories,
      });

      // Mark questions as used
      nextQuestions.forEach((q) => {
        room.usedQuestionIds?.add(q.id);
        questionHistoryService.recordUsage(roomId, q.id);
      });

      room.status = 'NEXT_GAME';
      gameState.status = 'NEXT_GAME';
      gameState.currentGameIndex = room.currentGameIndex;
      gameState.currentQuestionIndex = 0;
      gameState.questionsForCurrentGame = nextQuestions;

      // If next game is Team Battle, initialize teams
      if (nextGameConfig.gameType === 'TEAM_BATTLE') {
        if (!room.teams) {
          room.teams = TeamManager.createTeams(room.players);
        } else {
          for (const player of Object.values(room.players)) {
            TeamManager.ensurePlayerTeam(player, room.teams);
          }
        }
        gameState.teams = room.teams;
        this.broadcastTeamAssignment(room, io);
      }

      const nextGamePayload = {
        previousGameType: currentGameConfig.gameType,
        nextGameType: nextGameConfig.gameType,
        gameNumber: room.currentGameIndex + 1,
        totalGames: room.games.length,
        nextGameQuestionCount: nextGameConfig.questionCount,
        phaseSequence,
        stateVersion,
      };

      (gameState as any).nextGameData = nextGamePayload;
      (gameState as any).nextGameEndsAt = Date.now() + 4000;

      // Broadcast transition to next game
      io.to(roomId).emit('game:nextGame', nextGamePayload);

      logger.info(
        `[GameEngine] Room ${roomId} moving to Game ${room.currentGameIndex + 1}/${room.games.length}: ${nextGameConfig.gameType}`
      );

      // Wait 4 seconds for transition display before starting next game's countdown
      const transitionTimerKey = `transition_${roomId}`;
      timerService.startTimer(transitionTimerKey, 4000, () => {
        this.startCountdown(roomId, io);
      });
    } else {
      (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
      (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
      const phaseSequence = (room as any).phaseSequence;
      const stateVersion = (room as any).stateVersion;

      // All games in the session are finished!
      room.status = 'FINISHED';
      gameState.status = 'FINISHED';

      const finalLeaderboard = LeaderboardService.generateLeaderboard(room.players);
      const sessionWinner =
        room.teams
          ? TeamManager.getWinningTeam(room.teams)
          : LeaderboardService.getTopPlayer(finalLeaderboard);

      const history = room.sessionQuestionHistory || [];
      const totalSessionQuestions = history.length;
      let totalAccSum = 0;
      history.forEach((h) => (totalAccSum += h.stats.accuracyPercentage));
      const averageAccuracy =
        totalSessionQuestions > 0 ? Math.round(totalAccSum / totalSessionQuestions) : 0;

      const hardestQuestions = [...history]
        .sort((a, b) => a.stats.accuracyPercentage - b.stats.accuracyPercentage)
        .slice(0, 5);

      const totalPointsAwarded = Object.values(room.players).reduce(
        (sum, p) => sum + p.score,
        0
      );

      let teamStats: SessionStatistics['teamStats'] = undefined;
      if (room.teams) {
        const rotPlayers = Object.values(room.players).filter((p) => p.teamId === 'TEAM_ROT');
        const blauPlayers = Object.values(room.players).filter((p) => p.teamId === 'TEAM_BLAU');

        let rotCorrect = 0;
        let rotTotal = 0;
        let blauCorrect = 0;
        let blauTotal = 0;

        history.forEach((h) => {
          h.studentResponses.forEach((r) => {
            if (r.teamId === 'TEAM_ROT') {
              rotTotal++;
              if (r.isCorrect) rotCorrect++;
            } else if (r.teamId === 'TEAM_BLAU') {
              blauTotal++;
              if (r.isCorrect) blauCorrect++;
            }
          });
        });

        teamStats = {
          rot: {
            name: room.teams.TEAM_ROT?.name || 'Rotes Team',
            score: room.teams.TEAM_ROT?.score || 0,
            accuracy: rotTotal > 0 ? Math.round((rotCorrect / rotTotal) * 100) : 0,
            membersCount: rotPlayers.length,
          },
          blau: {
            name: room.teams.TEAM_BLAU?.name || 'Blaues Team',
            score: room.teams.TEAM_BLAU?.score || 0,
            accuracy: blauTotal > 0 ? Math.round((blauCorrect / blauTotal) * 100) : 0,
            membersCount: blauPlayers.length,
          },
        };
      }

      // Find highest streak player
      let highestStreakPlayer: { name: string; streak: number } | undefined = undefined;
      let maxStreak = 0;
      Object.values(room.players).forEach((p) => {
        if (p.highestStreak > maxStreak) {
          maxStreak = p.highestStreak;
          highestStreakPlayer = { name: p.name, streak: p.highestStreak };
        }
      });

      const sessionStats: SessionStatistics = {
        totalQuestions: totalSessionQuestions,
        totalGames: room.games.length,
        totalPlayers: Object.keys(room.players).length,
        averageAccuracy,
        totalPointsAwarded,
        hardestQuestions,
        topPerformers: finalLeaderboard.slice(0, 5),
        highestStreakPlayer,
        teamStats,
      };

      io.to(roomId).emit('game:sessionFinished', {
        finalLeaderboard,
        totalGames: room.games.length,
        totalQuestions: room.totalQuestions,
        teams: room.teams,
        winner: sessionWinner,
        questionHistory: history,
        sessionStats,
        phaseSequence,
        stateVersion,
      });

      logger.info(
        `[GameEngine] Room ${roomId} completed all ${room.games.length} games. Session Finished with ${history.length} question records!`
      );
    }
  }

  /**
   * Pause game (e.g. Teacher explanation or manual pause)
   */
  public pauseGame(roomId: string, io: TypedServer, customReason?: string): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) return;

    if (room.status === 'QUESTION') {
      (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
      (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
      const phaseSequence = (room as any).phaseSequence;
      const stateVersion = (room as any).stateVersion;

      const remainingMs = timerService.pauseTimer(`question_${roomId}`);
      room.gameState.isPaused = true;
      room.gameState.pauseRemainingMs = remainingMs;

      const reason = customReason || 'Lehrer Farh erklärt die Frage';
      const question = room.gameState.currentQuestion;

      io.to(roomId).emit('game:gamePaused', {
        reason,
        explanation: question?.explanation,
        questionText: question?.text,
        phaseSequence,
        stateVersion,
      });
      logger.info(`[GameEngine] Game in Room ${roomId} paused for explanation. Remaining: ${remainingMs}ms`);
    }
  }

  /**
   * Resume game (e.g. Teacher finishes explanation)
   */
  public resumeGame(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState || !room.gameState.isPaused) return;

    (room as any).phaseSequence = ((room as any).phaseSequence || 0) + 1;
    (room as any).stateVersion = ((room as any).stateVersion || 100) + 1;
    const phaseSequence = (room as any).phaseSequence;
    const stateVersion = (room as any).stateVersion;

    room.gameState.isPaused = false;
    const resumed = timerService.resumeTimer(`question_${roomId}`);
    if (resumed) {
      const remainingMs = room.gameState.pauseRemainingMs || 10000;
      const remainingSec = Math.max(1, Math.ceil(remainingMs / 1000));
      room.gameState.currentQuestionEndsAt = Date.now() + remainingMs;

      io.to(roomId).emit('game:gameResumed', {
        remainingSeconds: remainingSec,
        phaseSequence,
        stateVersion,
      });
      logger.info(`[GameEngine] Game in Room ${roomId} resumed. Remaining: ${remainingSec}s`);
    }
  }

  /**
   * Explicitly end game
   */
  public endGame(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room) return;

    this.cleanupRoom(roomId);
    room.status = 'FINISHED';

    if (room.gameState) {
      room.gameState.status = 'FINISHED';
    }

    const finalLeaderboard = LeaderboardService.generateLeaderboard(room.players);
    io.to(roomId).emit('game:sessionFinished', {
      finalLeaderboard,
      totalGames: room.games.length,
      totalQuestions: room.totalQuestions,
      teams: room.teams,
      winner: LeaderboardService.getTopPlayer(finalLeaderboard),
    });
  }

  /**
   * Cleanup all timers for a room
   */
  public cleanupRoom(roomId: string): void {
    timerService.cancelTimer(`countdown_${roomId}`);
    timerService.cancelTimer(`question_${roomId}`);
    timerService.cancelTimer(`result_${roomId}`);
    timerService.cancelTimer(`transition_${roomId}`);
  }
}

export const gameEngine = GameEngine.getInstance();
