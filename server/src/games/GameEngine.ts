import { Server } from 'socket.io';
import {
  GameRoom,
  GameState,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
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
 * Phase 6 - Powered by the Scalable Question Bank & Selection System
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

    // If first game is Team Battle, initialize teams
    if (currentGameConfig.gameType === 'TEAM_BATTLE') {
      const teams = TeamManager.createTeams(room.players);
      room.teams = teams;
      gameState.teams = teams;
      this.broadcastTeamAssignment(room, io);
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

    room.status = 'COUNTDOWN';
    room.gameState.status = 'COUNTDOWN';

    const currentGame = room.games[room.currentGameIndex];
    const questionNumber = room.currentQuestionIndex + 1;
    const totalQuestions = room.gameState.questionsForCurrentGame.length;

    let count = 3;
    const timerKey = `countdown_${roomId}`;

    // Emit initial countdown value 3
    io.to(roomId).emit('game:countdown', {
      value: count,
      gameType: currentGame.gameType,
      questionNumber,
      totalQuestions,
    });

    timerService.startTimer(
      timerKey,
      3000,
      () => {
        // Countdown completed -> Start Question
        this.startQuestion(roomId, io);
      },
      (remainingMs) => {
        const nextVal = Math.ceil(remainingMs / 1000);
        if (nextVal !== count && nextVal >= 0) {
          count = nextVal;
          io.to(roomId).emit('game:countdown', {
            value: count,
            gameType: currentGame.gameType,
            questionNumber,
            totalQuestions,
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

    room.status = 'QUESTION';
    gameState.status = 'QUESTION';
    gameState.currentQuestion = question;
    gameState.answeredCount = 0;
    gameState.totalPlayers = Object.values(room.players).filter((p) => p.connected).length;
    gameState.revealedClueIndex = 0;

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

    // Broadcast safe question payload (WITHOUT correctAnswer)
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
    room.gameState.status = 'QUESTION_RESULT';

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

    const leaderboard = LeaderboardService.generateLeaderboard(room.players);

    // Broadcast question result with correct answer and rich class performance standings
    io.to(roomId).emit('game:questionResult', {
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
    });

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
      this.startCountdown(roomId, io);
      return;
    }

    // Current Game is completed!
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
    });

    // Check if there is another game in the session
    if (currentGameIndex + 1 < room.games.length) {
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
      if (nextGameConfig.gameType === 'TEAM_BATTLE' && !room.teams) {
        const teams = TeamManager.createTeams(room.players);
        room.teams = teams;
        gameState.teams = teams;
        this.broadcastTeamAssignment(room, io);
      }

      // Broadcast transition to next game
      io.to(roomId).emit('game:nextGame', {
        previousGameType: currentGameConfig.gameType,
        nextGameType: nextGameConfig.gameType,
        gameNumber: room.currentGameIndex + 1,
        totalGames: room.games.length,
        nextGameQuestionCount: nextGameConfig.questionCount,
      });

      logger.info(
        `[GameEngine] Room ${roomId} moving to Game ${room.currentGameIndex + 1}/${room.games.length}: ${nextGameConfig.gameType}`
      );

      // Wait 4 seconds for transition display before starting next game's countdown
      const transitionTimerKey = `transition_${roomId}`;
      timerService.startTimer(transitionTimerKey, 4000, () => {
        this.startCountdown(roomId, io);
      });
    } else {
      // All games in the session are finished!
      room.status = 'FINISHED';
      gameState.status = 'FINISHED';

      const finalLeaderboard = LeaderboardService.generateLeaderboard(room.players);
      const sessionWinner =
        room.teams
          ? TeamManager.getWinningTeam(room.teams)
          : LeaderboardService.getTopPlayer(finalLeaderboard);

      io.to(roomId).emit('game:sessionFinished', {
        finalLeaderboard,
        totalGames: room.games.length,
        totalQuestions: room.totalQuestions,
        teams: room.teams,
        winner: sessionWinner,
      });

      logger.info(
        `[GameEngine] Room ${roomId} completed all ${room.games.length} games. Session Finished!`
      );
    }
  }

  /**
   * Pause game (e.g. Teacher Disconnect during live question)
   */
  public pauseGame(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState) return;

    if (room.status === 'QUESTION') {
      const remainingMs = timerService.pauseTimer(`question_${roomId}`);
      room.gameState.isPaused = true;
      room.gameState.pauseRemainingMs = remainingMs;
      io.to(roomId).emit('game:gamePaused', {
        reason: 'Der Lehrer ist kurz getrennt. Das Spiel ist pausiert.',
      });
      logger.info(`[GameEngine] Game in Room ${roomId} paused with ${remainingMs}ms left.`);
    }
  }

  /**
   * Resume game (e.g. Teacher Reconnects)
   */
  public resumeGame(roomId: string, io: TypedServer): void {
    const room = roomManager.getRoomById(roomId);
    if (!room || !room.gameState || !room.gameState.isPaused) return;

    room.gameState.isPaused = false;
    const resumed = timerService.resumeTimer(`question_${roomId}`);
    if (resumed) {
      const remainingSec = Math.ceil((room.gameState.pauseRemainingMs || 10000) / 1000);
      io.to(roomId).emit('game:gameResumed', {
        remainingSeconds: remainingSec,
      });
      logger.info(`[GameEngine] Game in Room ${roomId} resumed.`);
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
