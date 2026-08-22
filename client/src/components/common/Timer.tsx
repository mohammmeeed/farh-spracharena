import React, { useEffect, useRef } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  className?: string;
  variant?: 'badge' | 'bar' | 'circle' | 'projector';
}

export const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  totalTime,
  className = '',
  variant = 'badge',
}) => {
  const { playSound } = useAudio();
  const lastPlayedSecond = useRef<number | null>(null);

  // Trigger audio cues at 5s (warning), 3,2,1s (tick), 0s (timeout)
  useEffect(() => {
    const sec = Math.ceil(timeRemaining);
    if (sec !== lastPlayedSecond.current) {
      lastPlayedSecond.current = sec;

      if (sec === 5) {
        playSound('warning');
      } else if (sec === 3 || sec === 2 || sec === 1) {
        playSound('tick');
      } else if (sec === 0 && totalTime > 0) {
        playSound('timeout');
      }
    }
  }, [timeRemaining, totalTime, playSound]);

  const percentage = Math.max(0, Math.min(100, (timeRemaining / (totalTime || 1)) * 100));

  // Determine state
  const isWarning = timeRemaining <= 9 && timeRemaining > 4;
  const isCritical = timeRemaining <= 4 && timeRemaining > 0;
  const isExpired = timeRemaining <= 0;


  const colorStyles = isExpired
    ? 'text-rose-400 bg-rose-950/60 border-rose-500/50'
    : isCritical
    ? 'text-rose-400 bg-rose-950/40 border-rose-500/40 animate-critical-flash'
    : isWarning
    ? 'text-amber-400 bg-amber-950/40 border-amber-500/30'
    : 'text-indigo-300 bg-indigo-950/40 border-indigo-500/30';

  const barColor = isCritical || isExpired
    ? 'bg-gradient-to-r from-rose-500 to-red-600'
    : isWarning
    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
    : 'bg-gradient-to-r from-cyan-500 to-indigo-500';

  if (variant === 'bar') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold mb-1">
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Verbleibende Zeit
          </span>
          <span className={`font-mono text-sm font-bold ${isCritical ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
            {timeRemaining}s
          </span>
        </div>
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-white/5">
          <div
            className={`h-full transition-all duration-300 rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'projector') {
    return (
      <div
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-mono font-black text-3xl md:text-5xl transition-all duration-300 shadow-2xl ${colorStyles} ${className}`}
      >
        {isCritical || isExpired ? (
          <AlertTriangle className="w-8 h-8 md:w-12 md:h-12 text-rose-400 animate-bounce" />
        ) : (
          <Clock className="w-8 h-8 md:w-12 md:h-12 text-indigo-400" />
        )}
        <span>{timeRemaining}s</span>
      </div>
    );
  }

  // Default Badge Variant
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm md:text-base font-mono font-bold transition-all duration-300 ${colorStyles} ${className}`}
    >
      <Clock className={`w-4 h-4 shrink-0 ${isCritical ? 'animate-spin' : ''}`} />
      <span>{timeRemaining}s</span>
    </div>
  );
};
