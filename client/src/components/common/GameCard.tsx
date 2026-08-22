import React from 'react';

interface GameCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow-blue' | 'glow-gold' | 'glow-red' | 'glow-emerald';
  interactive?: boolean;
  onClick?: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glow-blue':
        return 'border-blue-500/30 shadow-lg shadow-blue-500/10 hover:border-blue-500/50';
      case 'glow-gold':
        return 'border-amber-500/30 shadow-lg shadow-amber-500/10 hover:border-amber-500/50';
      case 'glow-red':
        return 'border-rose-500/30 shadow-lg shadow-rose-500/10 hover:border-rose-500/50';
      case 'glow-emerald':
        return 'border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:border-emerald-500/50';
      default:
        return 'border-white/10 shadow-xl shadow-black/20 hover:border-white/20';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-4 md:p-6 transition-all duration-300 ${getVariantStyles()} ${
        interactive ? 'glass-card-interactive cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
