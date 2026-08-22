import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Flame, Award } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface AnswerFeedbackProps {
  status: 'PENDING' | 'CORRECT' | 'INCORRECT' | 'TIMEOUT' | null;
  pointsEarned?: number;
  currentStreak?: number;
  correctAnswerText?: string | string[];
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  status,
  pointsEarned = 0,
  currentStreak = 0,
  correctAnswerText,
}) => {
  const { playSound } = useAudio();

  useEffect(() => {
    if (status === 'CORRECT') {
      playSound('correct');
      if (currentStreak >= 5) {
        playSound('streakMajor');
      } else if (currentStreak >= 2) {
        playSound('streak');
      }
    } else if (status === 'INCORRECT') {
      playSound('incorrect');
    }
  }, [status, currentStreak, playSound]);

  if (!status) return null;

  if (status === 'PENDING') {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-200 text-sm font-semibold animate-pulse shadow-lg">
        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
        <span>Antwort gespeichert ✓ — Warte auf Auswertung...</span>
      </div>
    );
  }

  if (status === 'CORRECT') {
    return (
      <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-b from-emerald-950/80 to-slate-900/90 border border-emerald-500/40 shadow-xl shadow-emerald-950/40 animate-in zoom-in-95 duration-200 text-center">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-lg md:text-xl">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <span>Richtig! 🎉</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          {pointsEarned > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-bold">
              <Award className="w-4 h-4 text-emerald-400" />
              +{pointsEarned.toLocaleString('de-DE')} Punkte
            </span>
          )}

          {currentStreak > 1 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-amber-300 border border-orange-500/30 text-sm font-bold">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              {currentStreak}er-Serie!
            </span>
          )}
        </div>
      </div>
    );
  }

  if (status === 'INCORRECT') {
    const formattedCorrect = Array.isArray(correctAnswerText)
      ? correctAnswerText.join(' ')
      : correctAnswerText;

    return (
      <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-b from-rose-950/80 to-slate-900/90 border border-rose-500/40 shadow-xl shadow-rose-950/40 animate-in zoom-in-95 duration-200 text-center">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-lg md:text-xl">
          <XCircle className="w-6 h-6 text-rose-400" />
          <span>Leider falsch!</span>
        </div>

        {formattedCorrect && (
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            Richtige Antwort: <span className="font-semibold text-emerald-300">"{formattedCorrect}"</span>
          </p>
        )}
      </div>
    );
  }

  if (status === 'TIMEOUT') {
    return (
      <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-amber-300 font-bold text-base md:text-lg shadow-xl animate-in zoom-in-95 duration-200">
        <Clock className="w-5 h-5 text-amber-400" />
        <span>⏰ Zeit abgelaufen!</span>
      </div>
    );
  }

  return null;
};
