import React, { useEffect, useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface CountdownOverlayProps {
  countdownValue?: number; // 3, 2, 1, 0 (LOS!)
  countdownEndsAt?: number;
  gameName?: string;
  questionNumber?: number;
  totalQuestions?: number;
  onComplete?: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  countdownValue = 3,
  countdownEndsAt,
  gameName,
  questionNumber,
  totalQuestions,
  onComplete,
}) => {
  const { playSound } = useAudio();
  const [displayValue, setDisplayValue] = useState<number>(countdownValue);
  const lastSoundRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Local authoritative timer calculation if countdownEndsAt is provided
  useEffect(() => {
    if (!countdownEndsAt) {
      setDisplayValue(countdownValue);
      return;
    }

    const updateValue = () => {
      const now = Date.now();
      const remainingMs = Math.max(0, countdownEndsAt - now);
      const val = Math.ceil(remainingMs / 1000);
      setDisplayValue(val);

      if (remainingMs <= 0) {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    updateValue();
    const interval = setInterval(updateValue, 100);
    return () => clearInterval(interval);
  }, [countdownEndsAt, countdownValue]);

  // Audio cues triggered only once per second tick
  useEffect(() => {
    if (displayValue !== lastSoundRef.current) {
      lastSoundRef.current = displayValue;
      if (displayValue > 0) {
        playSound('countdown');
      } else if (displayValue === 0) {
        playSound('questionStart');
      }
    }
  }, [displayValue, playSound]);

  const isGo = displayValue === 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-in fade-in select-none">
      {/* Header Info */}
      {gameName && (
        <div className="mb-6 text-center">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold text-sm md:text-base inline-flex items-center gap-2 shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {gameName}
          </span>
          {questionNumber && totalQuestions && (
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Frage {questionNumber} von {totalQuestions}
            </p>
          )}
        </div>
      )}

      {/* Main Countdown Display */}
      <div className="relative flex items-center justify-center">
        <div
          key={displayValue}
          className={`animate-countdown-bounce font-black text-center font-mono ${
            isGo
              ? 'text-5xl md:text-8xl gradient-text-gold tracking-wider'
              : 'text-7xl md:text-9xl text-white drop-shadow-[0_0_35px_rgba(99,102,241,0.5)]'
          }`}
        >
          {isGo ? (
            <div className="flex flex-col items-center gap-3">
              <span>LOS! 🚀</span>
              <span className="text-sm md:text-base font-sans font-medium text-slate-300">
                Viel Erfolg!
              </span>
            </div>
          ) : (
            displayValue
          )}
        </div>
      </div>
    </div>
  );
};
