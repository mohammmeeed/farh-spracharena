import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  lastPointsEarned?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  lastPointsEarned = 0,
  className = '',
  size = 'md',
}) => {
  const [displayedScore, setDisplayedScore] = useState(score);
  const [floatingPoints, setFloatingPoints] = useState<number | null>(null);

  // Smooth number counting transition toward the server score
  useEffect(() => {
    if (score === displayedScore) return;

    const diff = score - displayedScore;
    const step = Math.max(1, Math.floor(Math.abs(diff) / 10));
    const timer = setTimeout(() => {
      setDisplayedScore((prev) =>
        prev < score ? Math.min(score, prev + step) : Math.max(score, prev - step)
      );
    }, 25);

    return () => clearTimeout(timer);
  }, [score, displayedScore]);

  // Show floating points indicator
  useEffect(() => {
    if (lastPointsEarned > 0) {
      setFloatingPoints(lastPointsEarned);
      const timer = setTimeout(() => setFloatingPoints(null), 1800);
      return () => clearTimeout(timer);
    }
  }, [lastPointsEarned, score]);

  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-xl sm:text-2xl font-black',
    hero: 'text-3xl sm:text-5xl font-black tracking-tight',
  }[size];

  return (
    <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
      <span className={`font-mono text-amber-300 ${sizeStyles}`}>
        {displayedScore.toLocaleString('de-DE')}
      </span>
      <span className="text-xs text-amber-400/80 font-medium">Pkt</span>

      {/* Floating Points Animation */}
      <AnimatePresence>
        {floatingPoints !== null && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1.1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute -top-3 right-0 pointer-events-none z-30"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-lg border border-emerald-300 font-mono flex items-center gap-0.5">
              +{floatingPoints.toLocaleString('de-DE')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
