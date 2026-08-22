import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Award,
  Lightbulb,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { LeaderboardEntry, Team } from '../../types/game.types';
import { useAudio } from '../../hooks/useAudio';

interface QuestionResultOverlayProps {
  status: 'CORRECT' | 'INCORRECT' | 'TIMEOUT' | null;
  pointsEarned: number;
  currentStreak: number;
  correctAnswer: string | string[];
  explanation?: string;
  leaderboard: LeaderboardEntry[];
  currentPlayerId?: string;
  teams?: Record<string, Team>;
  isTeacher?: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionResultOverlay: React.FC<QuestionResultOverlayProps> = ({
  status,
  pointsEarned,
  currentStreak,
  correctAnswer,
  explanation,
  leaderboard = [],
  currentPlayerId,
  teams,
  isTeacher = false,
  questionNumber,
  totalQuestions,
}) => {
  const { playSound } = useAudio();

  // Trigger celebration sounds & confetti on correct answer
  useEffect(() => {
    if (status === 'CORRECT') {
      playSound('correct');
      if (currentStreak >= 5) {
        playSound('streakMajor');
      } else if (currentStreak >= 2) {
        playSound('streak');
      }

      // Fire confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not available
      }
    } else if (status === 'INCORRECT') {
      playSound('incorrect');
    }
  }, [status, currentStreak, playSound]);

  if (!status && isTeacher) {
    // For teacher when no personal answer status is available, show neutral evaluation state
    status = 'CORRECT';
  }

  const formattedCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.join(' ')
    : correctAnswer;

  // Filter leaderboard: Top 3 + Current Student (if not in top 3)
  const top3 = leaderboard.slice(0, 3);
  const currentPlayerEntry = currentPlayerId
    ? leaderboard.find((e) => e.playerId === currentPlayerId)
    : undefined;
  const isCurrentInTop3 = top3.some((e) => e.playerId === currentPlayerId);

  const displayList: { entry: LeaderboardEntry; rank: number; isCurrent: boolean }[] = [];

  top3.forEach((e, idx) => {
    displayList.push({
      entry: e,
      rank: e.rank || idx + 1,
      isCurrent: e.playerId === currentPlayerId,
    });
  });

  if (currentPlayerEntry && !isCurrentInTop3) {
    const currentRank =
      currentPlayerEntry.rank ||
      leaderboard.findIndex((e) => e.playerId === currentPlayerId) + 1;
    displayList.push({
      entry: currentPlayerEntry,
      rank: currentRank,
      isCurrent: true,
    });
  }

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto space-y-4 my-auto"
    >
      {/* 1. Answer Status Hero Banner */}
      {!isTeacher && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`rounded-3xl p-5 sm:p-7 border-2 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl ${
            status === 'CORRECT'
              ? 'bg-gradient-to-b from-emerald-950/90 via-slate-900/95 to-slate-950/95 border-emerald-500/50 shadow-emerald-950/50'
              : status === 'TIMEOUT'
              ? 'bg-gradient-to-b from-amber-950/90 via-slate-900/95 to-slate-950/95 border-amber-500/50 shadow-amber-950/50'
              : 'bg-gradient-to-b from-rose-950/90 via-slate-900/95 to-slate-950/95 border-rose-500/50 shadow-rose-950/50'
          }`}
        >
          {/* Main Title & Icon */}
          <div className="flex items-center justify-center gap-3">
            {status === 'CORRECT' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 text-2xl"
              >
                <CheckCircle2 className="w-7 h-7" />
              </motion.div>
            )}

            {status === 'INCORRECT' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0 text-2xl"
              >
                <XCircle className="w-7 h-7" />
              </motion.div>
            )}

            {status === 'TIMEOUT' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 text-2xl"
              >
                <Clock className="w-7 h-7" />
              </motion.div>
            )}

            <div className="text-left">
              <h3
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  status === 'CORRECT'
                    ? 'text-emerald-300'
                    : status === 'TIMEOUT'
                    ? 'text-amber-300'
                    : 'text-rose-300'
                }`}
              >
                {status === 'CORRECT'
                  ? 'Richtig! 🎉'
                  : status === 'TIMEOUT'
                  ? 'Zeit abgelaufen! ⏰'
                  : 'Leider falsch! ✕'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                {status === 'CORRECT'
                  ? 'Klasse gemacht! Punkte wurden gutgeschrieben.'
                  : 'Keine Sorge, schau dir die Erklärung unten an!'}
              </p>
            </div>
          </div>

          {/* Points & Streak Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
            {status === 'CORRECT' && pointsEarned > 0 && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 text-sm sm:text-base font-black shadow-lg shadow-emerald-500/20 font-mono"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>+{pointsEarned.toLocaleString('de-DE')} Punkte</span>
              </motion.span>
            )}

            {currentStreak > 1 && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.08, 1], opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-amber-300 border border-orange-500/40 text-sm sm:text-base font-black shadow-lg shadow-orange-500/20"
              >
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
                <span>{currentStreak}er-Serie! 🔥</span>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}

      {/* 2. Grid: Correct Answer / Educational Explanation & Mini Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left: Correct Answer & Didactic Grammar Tip (7 cols) */}
        <div className="md:col-span-7 glass-card rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4 flex flex-col justify-between bg-[#0E1526]/90">
          <div className="space-y-3">
            {/* Correct Answer Reveal Card */}
            {formattedCorrect && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Richtige Antwort:
                </span>
                <p className="text-base sm:text-lg font-black text-white">
                  "{formattedCorrect}"
                </p>
              </div>
            )}

            {/* Didactic German Grammar Rule / Why Explanation */}
            {explanation && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>💡 Warum ist das so? (Grammatikregel)</span>
                </span>
                <p className="text-xs sm:text-sm font-medium text-indigo-200 leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}
          </div>

          {/* Next Question Transition Indicator */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="font-medium flex items-center gap-1.5">
              <span>Frage {questionNumber} von {totalQuestions}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-bold animate-pulse">
              <span>Weiter geht's gleich...</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right: Compact Live Mini Leaderboard (5 cols) */}
        <div className="md:col-span-5 glass-card rounded-3xl p-5 sm:p-6 border border-white/10 space-y-3 flex flex-col justify-between bg-[#0E1526]/90">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>🏆 Rangliste</span>
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              {leaderboard.length} Spieler
            </span>
          </div>

          {/* Compact animated player rows with FLIP transition */}
          <div className="space-y-2 flex-1">
            <AnimatePresence>
              {displayList.map(({ entry, rank, isCurrent }) => {
                const team = entry.teamId && teams ? teams[entry.teamId] : undefined;

                return (
                  <motion.div
                    key={entry.playerId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-2 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/80 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0">
                        {getRankMedal(rank)}
                      </span>
                      <span
                        className={`text-xs sm:text-sm truncate ${
                          isCurrent ? 'font-black text-amber-300' : 'font-semibold'
                        }`}
                      >
                        {isCurrent ? `👤 ${entry.name} (Du)` : entry.name}
                      </span>
                      {team && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                            team.teamId === 'TEAM_BLAU'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {team.teamName}
                        </span>
                      )}
                    </div>

                    <span className="font-mono font-bold text-xs sm:text-sm text-amber-300 shrink-0">
                      {entry.score.toLocaleString('de-DE')} Pkt
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
