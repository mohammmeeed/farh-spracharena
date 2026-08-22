import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

  // Trigger sound cues at 5s (warning), 3,2,1s (tick), 0s (timeout)
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

  // 4 dynamic urgency stages:
  const isCritical = timeRemaining <= 3 && timeRemaining > 0;
  const isWarning = timeRemaining <= 6 && timeRemaining > 3;
  const isExpired = timeRemaining <= 0;

  const barColor = isExpired || isCritical
    ? 'from-rose-500 via-red-500 to-rose-600 shadow-rose-500/50'
    : isWarning
    ? 'from-amber-500 via-orange-500 to-amber-600 shadow-amber-500/50'
    : 'from-cyan-400 via-blue-500 to-indigo-500 shadow-cyan-500/30';

  const badgeBg = isExpired || isCritical
    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-950/50'
    : isWarning
    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-950/40'
    : 'bg-slate-900/90 border-slate-700/80 text-cyan-300 shadow-md';

  if (variant === 'bar') {
    return (
      <div className={`w-full space-y-1.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold px-0.5">
          <span className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-400 animate-spin' : 'text-slate-400'}`} />
            <span>Verbleibende Zeit</span>
          </span>

          <motion.span
            key={timeRemaining}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className={`font-mono text-sm sm:text-base font-black ${
              isCritical
                ? 'text-rose-400 animate-pulse'
                : isWarning
                ? 'text-amber-400'
                : 'text-slate-100'
            }`}
          >
            {timeRemaining}s
          </motion.span>
        </div>

        <div className="w-full bg-slate-900/90 rounded-full h-3 overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <div
            className={`h-full transition-all duration-300 rounded-full bg-gradient-to-r ${barColor} shadow-md`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'projector') {
    return (
      <motion.div
        animate={isCritical ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className={`flex items-center gap-3 px-6 py-3 rounded-3xl border-2 font-mono font-black text-3xl md:text-5xl transition-all shadow-2xl ${badgeBg} ${className}`}
      >
        {isCritical || isExpired ? (
          <AlertTriangle className="w-8 h-8 md:w-12 md:h-12 text-rose-400 animate-bounce" />
        ) : (
          <Clock className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />
        )}
        <span>{timeRemaining}s</span>
      </motion.div>
    );
  }

  // Default Badge Variant
  return (
    <motion.div
      animate={isCritical ? { scale: [1, 1.08, 1] } : {}}
      transition={{ repeat: Infinity, duration: 0.6 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm md:text-base font-mono font-black transition-all ${badgeBg} ${className}`}
    >
      <Clock className={`w-4 h-4 shrink-0 ${isCritical ? 'animate-spin text-rose-400' : 'text-cyan-400'}`} />
      <span>{timeRemaining}s</span>
    </motion.div>
  );
};
