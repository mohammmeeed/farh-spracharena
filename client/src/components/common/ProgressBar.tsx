import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  className = '',
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, (currentQuestion / Math.max(1, totalQuestions)) * 100)
  );

  return (
    <div className={`w-full space-y-1 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold px-0.5">
        <span className="text-slate-400">Fortschritt</span>
        <span className="text-amber-300 font-mono font-bold">
          Frage {currentQuestion} / {totalQuestions}
        </span>
      </div>

      <div className="w-full bg-slate-900/90 rounded-full h-2 overflow-hidden border border-white/5 p-0.5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
