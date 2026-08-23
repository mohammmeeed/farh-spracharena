import React, { useState, useEffect } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { LeaderboardEntry, Team } from '../../types/game.types';
import { useAudio } from '../../hooks/useAudio';
import { AnimatedLeaderboard } from './AnimatedLeaderboard';

interface QuestionResultOverlayProps {
  status: 'CORRECT' | 'INCORRECT' | 'TIMEOUT' | null;
  pointsEarned: number;
  currentStreak: number;
  correctAnswer: string | string[];
  explanation?: string;
  leaderboard: LeaderboardEntry[];
  previousLeaderboard?: LeaderboardEntry[];
  currentPlayerId?: string;
  teams?: Record<string, Team>;
  isTeacher?: boolean;
  questionNumber: number;
  totalQuestions: number;
  onLeaderboardComplete?: () => void;
}

export const QuestionResultOverlay: React.FC<QuestionResultOverlayProps> = ({
  status,
  pointsEarned,
  currentStreak,
  correctAnswer,
  explanation,
  leaderboard = [],
  previousLeaderboard = [],
  currentPlayerId,
  teams,
  isTeacher = false,
  questionNumber,
  totalQuestions,
  onLeaderboardComplete,
}) => {
  const { playSound } = useAudio();

  // Multi-phase post question state:
  // 'FEEDBACK' -> Shows question result, explanation & points (0 - 2.5s)
  // 'MOTIVATIONAL_TRANSITION' -> Brief bridge (2.5s - 3.2s)
  // 'LEADERBOARD' -> 4-second Animated Leaderboard experience (3.2s+)
  const [activeTab, setActiveTab] = useState<'FEEDBACK' | 'LEADERBOARD'>('FEEDBACK');
  const [showMotivationalBridge, setShowMotivationalBridge] = useState(false);

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

  // Automated Post-Question Flow:
  // 0s - 2.5s: Result / Feedback
  // 2.5s - 3.2s: Motivational bridge
  // 3.2s+: 4-Second Animated Leaderboard
  useEffect(() => {
    const bridgeTimer = setTimeout(() => {
      setShowMotivationalBridge(true);
    }, 2400);

    const leaderboardTimer = setTimeout(() => {
      setShowMotivationalBridge(false);
      setActiveTab('LEADERBOARD');
    }, 3200);

    return () => {
      clearTimeout(bridgeTimer);
      clearTimeout(leaderboardTimer);
    };
  }, []);

  if (!status && isTeacher) {
    // For teacher when no personal answer status is available, show neutral evaluation state
    status = 'CORRECT';
  }

  const formattedCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.join(' ')
    : correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto space-y-4 my-auto relative select-none"
    >
      {/* View Switcher Tabs (Allows immediate manual toggle anytime) */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('FEEDBACK')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'FEEDBACK'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Antwort & Erklärung</span>
        </button>

        <button
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'LEADERBOARD'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>🏆 Rangliste (4s)</span>
        </button>
      </div>

      {/* Motivational Transition Bridge Toast */}
      <AnimatePresence>
        {showMotivationalBridge && activeTab === 'FEEDBACK' && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border-2 border-cyan-400/40 text-cyan-200 shadow-xl backdrop-blur-xl text-center flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="font-black text-sm text-white">
              🚀 Wer führt die Klasse an? Klassenrangliste wird geladen...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 1: FEEDBACK VIEW */}
      {activeTab === 'FEEDBACK' && (
        <motion.div
          key="feedback-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {/* Answer Status Hero Banner */}
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

          {/* Correct Answer & Didactic Grammar Tip */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4 bg-[#0E1526]/90">
            <div className="space-y-3">
              {formattedCorrect && (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Richtige Antwort:
                  </span>
                  <p className="text-lg sm:text-xl font-black text-white">
                    "{formattedCorrect}"
                  </p>
                </div>
              )}

              {explanation && (
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>💡 Warum ist das so? (Didaktische Sprachregel)</span>
                  </span>
                  <p className="text-sm sm:text-base font-medium text-indigo-200 leading-relaxed">
                    {explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Next Step Footer Info */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="font-medium flex items-center gap-1.5">
                <span>Frage {questionNumber} von {totalQuestions}</span>
              </span>
              <button
                onClick={() => setActiveTab('LEADERBOARD')}
                className="inline-flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Zur Rangliste wechseln</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 2: 4-SECOND ANIMATED LEADERBOARD VIEW */}
      {activeTab === 'LEADERBOARD' && (
        <motion.div
          key="leaderboard-view"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedLeaderboard
            leaderboard={leaderboard}
            previousLeaderboard={previousLeaderboard}
            currentPlayerId={currentPlayerId}
            teams={teams}
            isTeacher={isTeacher}
            durationMs={4000}
            onComplete={onLeaderboardComplete}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
