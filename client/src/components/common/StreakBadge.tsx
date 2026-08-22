import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  streak,
  className = '',
  size = 'md',
}) => {
  if (streak <= 0) return null;

  const isMajorStreak = streak >= 5;
  const isSuperStreak = streak >= 10;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2 font-bold',
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-full font-bold transition-all duration-300 ${sizeClasses} ${
        isSuperStreak
          ? 'bg-gradient-to-r from-amber-500/30 via-orange-500/40 to-rose-600/30 text-amber-200 border border-amber-400/50 shadow-lg shadow-orange-500/30 animate-pulse'
          : isMajorStreak
          ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/25 text-amber-300 border border-orange-500/40 shadow-md shadow-orange-500/20'
          : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
      } ${className}`}
    >
      <Flame
        className={`shrink-0 transition-transform duration-300 ${
          isSuperStreak
            ? 'w-5 h-5 text-amber-400 fill-amber-400 animate-bounce'
            : isMajorStreak
            ? 'w-4 h-4 text-orange-400 fill-orange-400'
            : 'w-3.5 h-3.5 text-orange-400'
        }`}
      />
      <span>
        {streak}er-Serie{isSuperStreak ? ' 🔥🔥' : isMajorStreak ? ' 🔥' : ''}
      </span>
    </div>
  );
};
