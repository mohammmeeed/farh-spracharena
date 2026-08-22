import React, { useState, useEffect } from 'react';
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

  // Smooth number transition toward the server score
  useEffect(() => {
    if (score === displayedScore) return;

    const diff = score - displayedScore;
    const step = Math.max(1, Math.floor(Math.abs(diff) / 12));
    const timer = setTimeout(() => {
      setDisplayedScore((prev) => (prev < score ? Math.min(score, prev + step) : Math.max(score, prev - step)));
    }, 20);

    return () => clearTimeout(timer);
  }, [score, displayedScore]);

  // Show floating points indicator
  useEffect(() => {
    if (lastPointsEarned > 0) {
      setFloatingPoints(lastPointsEarned);
      const timer = setTimeout(() => setFloatingPoints(null), 1600);
      return () => clearTimeout(timer);
    }
  }, [lastPointsEarned, score]);

  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base md:text-lg font-bold',
    lg: 'text-xl md:text-2xl font-black',
    hero: 'text-3xl md:text-5xl font-black tracking-tight',
  }[size];

  return (
    <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
      <Award className="w-5 h-5 text-amber-400 shrink-0" />
      <span className={`font-mono text-amber-300 ${sizeStyles}`}>
        {displayedScore.toLocaleString('de-DE')}
      </span>
      <span className="text-xs text-amber-400/80 font-medium">Pkt</span>

      {/* Floating Points Animation */}
      {floatingPoints !== null && (
        <div className="absolute -top-4 right-0 pointer-events-none animate-float-points">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold text-xs shadow-lg border border-emerald-400">
            +{floatingPoints.toLocaleString('de-DE')}
          </span>
        </div>
      )}
    </div>
  );
};
