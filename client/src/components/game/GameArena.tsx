import React, { useState, useEffect, useRef } from 'react';
import { Play, Lightbulb, CheckCircle2 } from 'lucide-react';
import {
  GameRoom,
  Player,
  LeaderboardEntry,
  GameType,
  Team,
  QuestionFormat,
} from '../../types/game.types';
import { socketService } from '../../socket/socket.service';
import { useAudio } from '../../hooks/useAudio';
import { useToast } from '../../context/ToastContext';

// Common Design System Components
import {
  GameHeader,
  Timer,
  CountdownOverlay,
  GameTransition,
  VictoryOverlay,
  LoadingScreen,
  QuestionResultOverlay,
} from '../common';


// 5 Game Components
import { SchnellantwortGame } from './SchnellantwortGame';
import { SatzRennenGame } from './SatzRennenGame';
import { WortschatzDuellGame } from './WortschatzDuellGame';
import { WasBinIchGame } from './WasBinIchGame';
import { TeamBattleGame } from './TeamBattleGame';

interface QuestionStartedPayload {
  questionId: string;
  text: string;
  format?: QuestionFormat;
  options?: string[];
  words?: string[];
  clues?: string[];
  focusWord?: string;
  translation?: string;
  explanation?: string;
  timeLimit: number;
  startedAt: number;
  endsAt: number;
  questionNumber: number;
  totalQuestions: number;
  gameType: GameType;
  gameNumber: number;
  totalGames: number;
  category?: string;
  difficulty?: string;
}

interface QuestionResultPayload {
  questionId: string;
  correctAnswer: string | string[];
  stats: {
    correctCount: number;
    incorrectCount: number;
    unansweredCount: number;
    totalPlayers: number;
  };
  leaderboard: LeaderboardEntry[];
  teams?: Record<string, Team>;
  playerResults?: Record<
    string,
    {
      isCorrect: boolean;
      pointsEarned: number;
      totalScore: number;
      currentStreak: number;
      teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
    }
  >;
}

interface NextGamePayload {
  previousGameType: GameType;
  nextGameType: GameType;
  gameNumber: number;
  totalGames: number;
  nextGameQuestionCount: number;
}

interface SessionFinishedPayload {
  finalLeaderboard: LeaderboardEntry[];
  totalGames: number;
  totalQuestions: number;
  teams?: Record<string, Team>;
  winner?: LeaderboardEntry | Team;
}

interface GameArenaProps {
  room: GameRoom;
  player?: Player | null;
  isTeacher: boolean;
  onExit: () => void;
}

export const GameArena: React.FC<GameArenaProps> = ({
  room,
  player,
  isTeacher,
  onExit,
}) => {
  const { playSound, fadeIn, fadeOut, stopMusic, pauseMusic, resumeMusic } = useAudio();
  const { showToast } = useToast();

  const handleExit = () => {
    if (isTeacher) {
      stopMusic();
    }
    onExit();
  };

  // Projector mode state for teacher
  const [isProjectorMode, setIsProjectorMode] = useState(false);

  // Trigger continuous gameplay background music for teacher presentation mode
  useEffect(() => {
    if (isTeacher) {
      fadeIn(1200, 'GAME');
    }
    return () => {
      if (isTeacher) {
        stopMusic();
      }
    };
  }, [isTeacher, fadeIn, stopMusic]);

  // Game flow states
  const [currentCountdown, setCurrentCountdown] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionStartedPayload | null>(null);
  const [questionResult, setQuestionResult] = useState<QuestionResultPayload | null>(null);
  const [nextGameData, setNextGameData] = useState<NextGamePayload | null>(null);
  const [sessionFinishedData, setSessionFinishedData] = useState<SessionFinishedPayload | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pauseReason, setPauseReason] = useState<string>('');
  const [pauseExplanation, setPauseExplanation] = useState<string | null>(null);

  // Active answer submission state for student
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [myAnswerResult, setMyAnswerResult] = useState<{
    status: 'PENDING' | 'CORRECT' | 'INCORRECT' | 'TIMEOUT' | null;
    pointsEarned: number;
    currentStreak: number;
  }>({
    status: null,
    pointsEarned: 0,
    currentStreak: player?.currentStreak || 0,
  });

  // Client score tracking with animated updates
  const [myScore, setMyScore] = useState<number>(player?.score || 0);
  const [lastPointsEarned, setLastPointsEarned] = useState<number>(0);
  const [myStreak, setMyStreak] = useState<number>(player?.currentStreak || 0);

  // Synchronized Timer state
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const timerIntervalRef = useRef<any>(null);

  // Active teams and leaderboard
  const [teams, setTeams] = useState<Record<string, Team> | undefined>(room.teams);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Stable refs to prevent tearing down socket listeners on re-render
  const playerRef = useRef(player);
  playerRef.current = player;

  const isTeacherRef = useRef(isTeacher);
  isTeacherRef.current = isTeacher;

  const myStreakRef = useRef(myStreak);
  myStreakRef.current = myStreak;

  const playSoundRef = useRef(playSound);
  playSoundRef.current = playSound;

  const fadeInRef = useRef(fadeIn);
  fadeInRef.current = fadeIn;

  const fadeOutRef = useRef(fadeOut);
  fadeOutRef.current = fadeOut;

  const pauseMusicRef = useRef(pauseMusic);
  pauseMusicRef.current = pauseMusic;

  const resumeMusicRef = useRef(resumeMusic);
  resumeMusicRef.current = resumeMusic;

  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  // Socket.IO event registrations - Stable lifecycle
  useEffect(() => {
    const socket = socketService.getSocket();

    // 1. Countdown Event
    const handleCountdown = ({
      value,
    }: {
      value: number;
      gameType: GameType;
      questionNumber: number;
      totalQuestions: number;
    }) => {
      setCurrentCountdown(value);
      setQuestionResult(null);
      setNextGameData(null);
      setIsPaused(false);

      if (value === 0) {
        setTimeout(() => setCurrentCountdown(null), 700);
      }
    };

    // 2. Question Started Event
    const handleQuestionStarted = (data: QuestionStartedPayload) => {
      setCurrentCountdown(null);
      setCurrentQuestion(data);
      setQuestionResult(null);
      setNextGameData(null);
      setIsPaused(false);

      // Reset student answer state for new question
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setMyAnswerResult({ status: null, pointsEarned: 0, currentStreak: myStreakRef.current });

      // Start synchronized timer
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      const updateTimer = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((data.endsAt - now) / 1000));
        setTimeRemaining(remaining);
        if (remaining <= 0 && timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };

      updateTimer();
      timerIntervalRef.current = setInterval(updateTimer, 200);
    };

    // 3. Answer Accepted (Student acknowledged by server)
    const handleAnswerAccepted = ({ playerId }: { playerId: string }) => {
      const currentPlayer = playerRef.current;
      if (currentPlayer && playerId === currentPlayer.playerId) {
        setMyAnswerResult((prev) => ({ ...prev, status: 'PENDING' }));
        showToastRef.current('Antwort gespeichert ✓', 'success', 2000);
      }
    };

    // 4. Score Updated Event
    const handleScoreUpdated = ({
      playerId,
      pointsEarned,
      totalScore,
      currentStreak,
      isCorrect,
    }: {
      playerId: string;
      pointsEarned: number;
      totalScore: number;
      currentStreak: number;
      isCorrect: boolean;
      teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
    }) => {
      const currentPlayer = playerRef.current;
      if (currentPlayer && playerId === currentPlayer.playerId) {
        setMyScore(totalScore);
        setLastPointsEarned(pointsEarned);
        setMyStreak(currentStreak);

        setMyAnswerResult({
          status: isCorrect ? 'CORRECT' : 'INCORRECT',
          pointsEarned,
          currentStreak,
        });
      }
    };

    // 5. Question Result Event
    const handleQuestionResult = (data: QuestionResultPayload) => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimeRemaining(0);
      setQuestionResult(data);
      setLeaderboard(data.leaderboard || []);
      if (data.teams) setTeams(data.teams);

      const currentPlayer = playerRef.current;
      if (currentPlayer && data.playerResults?.[currentPlayer.playerId]) {
        const pRes = data.playerResults[currentPlayer.playerId];
        setMyScore(pRes.totalScore);
        setMyStreak(pRes.currentStreak);
        setLastPointsEarned(pRes.pointsEarned);
        setMyAnswerResult({
          status: pRes.isCorrect ? 'CORRECT' : 'INCORRECT',
          pointsEarned: pRes.pointsEarned,
          currentStreak: pRes.currentStreak,
        });
      } else if (!isTeacherRef.current) {
        setMyAnswerResult((prev) => {
          if (prev.status === 'CORRECT' || prev.status === 'INCORRECT') return prev;
          return {
            status: 'TIMEOUT',
            pointsEarned: 0,
            currentStreak: 0,
          };
        });
      }
    };

    // 6. Leaderboard Updated Event
    const handleLeaderboardUpdated = ({
      leaderboard: updatedLeaderboard,
      teams: updatedTeams,
    }: {
      leaderboard: LeaderboardEntry[];
      teams?: Record<string, Team>;
    }) => {
      setLeaderboard(updatedLeaderboard);
      if (updatedTeams) setTeams(updatedTeams);
    };

    // 7. Team Score Updated
    const handleTeamScoreUpdated = ({ teams: updatedTeams }: { teams: Record<string, Team> }) => {
      setTeams(updatedTeams);
      playSoundRef.current('teamScore');
    };

    // 8. Next Game Event
    const handleNextGame = (data: NextGamePayload) => {
      setNextGameData(data);
      setQuestionResult(null);
    };

    // 9. Session Finished Event
    const handleSessionFinished = (data: SessionFinishedPayload) => {
      setSessionFinishedData(data);
      setLeaderboard(data.finalLeaderboard || []);
      if (data.teams) setTeams(data.teams);
      if (isTeacherRef.current) {
        fadeOutRef.current(1500);
      }
      playSoundRef.current('victory');
    };

    // 10. Pause & Resume Events
    const handleGamePaused = ({
      reason,
      explanation,
    }: {
      reason: string;
      explanation?: string;
    }) => {
      setIsPaused(true);
      setPauseReason(reason);
      if (explanation) setPauseExplanation(explanation);
      if (isTeacherRef.current) pauseMusicRef.current();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const handleGameResumed = ({ remainingSeconds }: { remainingSeconds: number }) => {
      setIsPaused(false);
      setPauseReason('');
      setPauseExplanation(null);
      setTimeRemaining(remainingSeconds);
      if (isTeacherRef.current) resumeMusicRef.current();
    };

    // Attach listeners
    socket.on('game:countdown', handleCountdown);
    socket.on('game:questionStarted', handleQuestionStarted);
    socket.on('game:answerAccepted', handleAnswerAccepted);
    socket.on('game:scoreUpdated', handleScoreUpdated);
    socket.on('game:questionResult', handleQuestionResult);
    socket.on('game:leaderboardUpdated', handleLeaderboardUpdated);
    socket.on('game:teamScoreUpdated', handleTeamScoreUpdated);
    socket.on('game:nextGame', handleNextGame);
    socket.on('game:sessionFinished', handleSessionFinished);
    socket.on('game:gamePaused', handleGamePaused);
    socket.on('game:gameResumed', handleGameResumed);

    // Initial sync request if mounted mid-game
    if (socket.connected) {
      if (isTeacherRef.current) {
        socket.emit('teacher:joinRoom', { roomId: room.roomId });
      } else {
        socket.emit('student:syncLobby', {
          roomId: room.roomId,
          playerId: playerRef.current?.playerId,
        });
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      socket.off('game:countdown', handleCountdown);
      socket.off('game:questionStarted', handleQuestionStarted);
      socket.off('game:answerAccepted', handleAnswerAccepted);
      socket.off('game:scoreUpdated', handleScoreUpdated);
      socket.off('game:questionResult', handleQuestionResult);
      socket.off('game:leaderboardUpdated', handleLeaderboardUpdated);
      socket.off('game:teamScoreUpdated', handleTeamScoreUpdated);
      socket.off('game:nextGame', handleNextGame);
      socket.off('game:sessionFinished', handleSessionFinished);
      socket.off('game:gamePaused', handleGamePaused);
      socket.off('game:gameResumed', handleGameResumed);
    };
  }, [room.roomId]);

  // Handle student answer submission
  const handleStudentSubmit = (answer: string | string[]) => {
    if (isTeacher || isAnswerSubmitted || !currentQuestion) return;

    setSelectedAnswer(answer);
    setIsAnswerSubmitted(true);
    playSound('click');

    socketService.submitAnswer(room.roomId, currentQuestion.questionId, answer);
  };

  // Determine current game type
  const currentGameType: GameType =
    currentQuestion?.gameType ||
    room.games[room.currentGameIndex]?.gameType ||
    'SCHNELLANTWORT';

  // Render Game Specific Body
  const renderGameContent = () => {
    if (!currentQuestion) {
      return (
        <LoadingScreen
          message="Spiel wird vorbereitet..."
          subMessage="Die Fragen werden synchronisiert..."
        />
      );
    }

    switch (currentQuestion.gameType) {
      case 'SCHNELLANTWORT':
        return (
          <SchnellantwortGame
            text={currentQuestion.text}
            category={currentQuestion.category}
            difficulty={currentQuestion.difficulty}
            options={currentQuestion.options}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelectAnswer={handleStudentSubmit}
            isTeacher={isTeacher}
            isProjectorMode={isProjectorMode}
          />
        );

      case 'SATZ_RENNEN':
        return (
          <SatzRennenGame
            text={currentQuestion.text}
            words={currentQuestion.words}
            category={currentQuestion.category}
            difficulty={currentQuestion.difficulty}
            isAnswerSubmitted={isAnswerSubmitted}
            onSubmitAnswer={handleStudentSubmit}
            isTeacher={isTeacher}
            isProjectorMode={isProjectorMode}
          />
        );

      case 'WORTSCHATZ_DUELL':
        return (
          <WortschatzDuellGame
            text={currentQuestion.text}
            focusWord={currentQuestion.focusWord}
            format={currentQuestion.format}
            category={currentQuestion.category}
            difficulty={currentQuestion.difficulty}
            options={currentQuestion.options}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelectAnswer={handleStudentSubmit}
            isTeacher={isTeacher}
            isProjectorMode={isProjectorMode}
          />
        );

      case 'WAS_BIN_ICH':
        return (
          <WasBinIchGame
            text={currentQuestion.text}
            clues={currentQuestion.clues}
            options={currentQuestion.options}
            category={currentQuestion.category}
            difficulty={currentQuestion.difficulty}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelectAnswer={handleStudentSubmit}
            isTeacher={isTeacher}
            isProjectorMode={isProjectorMode}
          />
        );

      case 'TEAM_BATTLE':
        return (
          <TeamBattleGame
            text={currentQuestion.text}
            category={currentQuestion.category}
            difficulty={currentQuestion.difficulty}
            options={currentQuestion.options}
            selectedAnswer={typeof selectedAnswer === 'string' ? selectedAnswer : null}
            isAnswerSubmitted={isAnswerSubmitted}
            onSelectAnswer={handleStudentSubmit}
            teams={teams}
            player={player}
            isTeacher={isTeacher}
            isProjectorMode={isProjectorMode}
          />
        );

      default:
        return null;
    }
  };

  const handleTogglePause = () => {
    if (!isTeacher) return;
    if (isPaused) {
      socketService.resumeGame(room.roomId);
    } else {
      socketService.pauseGame(room.roomId, 'Lehrer Farh erklärt die Frage und Sprachregel');
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-indigo-500/30 ${isProjectorMode ? 'p-2 md:p-6' : ''
        }`}
    >
      {/* Game Header */}
      <GameHeader
        level={room.level}
        gameType={currentGameType}
        currentQuestion={currentQuestion?.questionNumber || 1}
        totalQuestions={currentQuestion?.totalQuestions || room.totalQuestions}
        score={myScore}
        lastPointsEarned={lastPointsEarned}
        streak={myStreak}
        isTeacher={isTeacher}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        isProjectorMode={isProjectorMode}
        onToggleProjectorMode={() => setIsProjectorMode((prev) => !prev)}
        onExit={handleExit}
      />

      {/* Main Arena Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col gap-4 md:gap-6 justify-between">
        {/* Rich Classroom Pause & Pedagogical Explanation Card */}
        {isPaused && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900/95 to-slate-950/95 border-2 border-amber-500/40 text-amber-200 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xl font-bold">
                  ⏸️
                </span>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>Erklärungs-Pause</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold font-mono">
                      {timeRemaining}s Restzeit angehalten
                    </span>
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-0.5">
                    {pauseReason || 'Lehrer Farh erklärt die Grammatik- und Sprachregeln für die Klasse.'}
                  </p>
                </div>
              </div>

              {isTeacher && (
                <button
                  onClick={handleTogglePause}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>▶️ Spiel fortsetzen ({timeRemaining}s)</span>
                </button>
              )}
            </div>

            {/* Question Breakdown & Pedagogical Grammar Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Aktuelle Frage #{currentQuestion.questionNumber}:
                  </span>
                  <p className="text-base font-extrabold text-white leading-snug">
                    {currentQuestion.text}
                  </p>
                </div>
              )}

              {(pauseExplanation || currentQuestion?.explanation) && (
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Didaktische Erklärung & Grammatikregel:</span>
                  </span>
                  <p className="text-sm font-medium text-indigo-200 leading-relaxed">
                    {pauseExplanation || currentQuestion?.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Timer Bar */}
        {currentQuestion && !questionResult && (
          <div className="flex items-center justify-between gap-4">
            <Timer
              timeRemaining={timeRemaining}
              totalTime={currentQuestion.timeLimit}
              variant={isProjectorMode ? 'projector' : 'bar'}
              className="flex-1"
            />
          </div>
        )}

        {/* Dynamic Game Content or Question Result Overlay */}
        <div className="flex-1 flex flex-col justify-center">
          {questionResult ? (
            <QuestionResultOverlay
              status={
                myAnswerResult.status === 'PENDING'
                  ? 'TIMEOUT'
                  : myAnswerResult.status
              }
              pointsEarned={myAnswerResult.pointsEarned}
              currentStreak={myAnswerResult.currentStreak}
              correctAnswer={questionResult.correctAnswer}
              explanation={currentQuestion?.explanation}
              leaderboard={leaderboard}
              currentPlayerId={player?.playerId}
              teams={teams}
              isTeacher={isTeacher}
              questionNumber={currentQuestion?.questionNumber || 1}
              totalQuestions={currentQuestion?.totalQuestions || room.totalQuestions}
            />
          ) : (
            renderGameContent()
          )}
        </div>

        {/* Student Answer Submitted Pending Status HUD */}
        {!isTeacher && isAnswerSubmitted && !questionResult && (
          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-bold animate-pulse shadow-lg backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Antwort gespeichert ✓ — Warte auf die Auswertung...</span>
          </div>
        )}
      </main>

      {/* Fullscreen Overlays */}
      {/* 1. Countdown Overlay (3, 2, 1, LOS!) */}
      {currentCountdown !== null && (
        <CountdownOverlay
          countdownValue={currentCountdown}
          gameName={currentGameType}
          questionNumber={currentQuestion?.questionNumber}
          totalQuestions={currentQuestion?.totalQuestions}
        />
      )}

      {/* 2. Intermediate Game Transition Overlay */}
      {nextGameData && (
        <GameTransition
          completedGameType={nextGameData.previousGameType}
          nextGameType={nextGameData.nextGameType}
          gameNumber={nextGameData.gameNumber}
          totalGames={nextGameData.totalGames}
        />
      )}


      {/* 3. Final Session Victory Overlay */}
      {sessionFinishedData && (
        <VictoryOverlay
          leaderboard={sessionFinishedData.finalLeaderboard}
          totalGames={sessionFinishedData.totalGames}
          totalQuestions={sessionFinishedData.totalQuestions}
          teams={sessionFinishedData.teams}
          winner={sessionFinishedData.winner}
          isTeacher={isTeacher}
          onRestart={handleExit}
          onExit={handleExit}
        />
      )}
    </div>
  );
};
