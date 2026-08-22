import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { QuestionFormat } from '../../types/game.types';
import { QuestionCard } from '../common/QuestionCard';

interface WortschatzDuellGameProps {
  text: string;
  focusWord?: string;
  format?: QuestionFormat;
  category?: string;
  difficulty?: string;
  options?: string[];
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (answer: string) => void;
  isTeacher?: boolean;
  isProjectorMode?: boolean;
}

export const WortschatzDuellGame: React.FC<WortschatzDuellGameProps> = ({
  text,
  focusWord,
  category,
  difficulty,
  options = [],
  selectedAnswer,
  isAnswerSubmitted,
  onSelectAnswer,
  isTeacher,
  isProjectorMode = false,
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (isTeacher || isAnswerSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      let index = -1;

      if (['1', '2', '3', '4'].includes(key)) {
        index = parseInt(key, 10) - 1;
      } else if (['A', 'B', 'C', 'D'].includes(key)) {
        index = optionLetters.indexOf(key);
      }

      if (index >= 0 && index < options.length) {
        onSelectAnswer(options[index]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTeacher, isAnswerSubmitted, options, onSelectAnswer]);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Question Card with Focus Word */}
      <QuestionCard
        text={text}
        gameType="WORTSCHATZ_DUELL"
        category={category}
        difficulty={difficulty}
        focusWord={focusWord}
        isProjectorMode={isProjectorMode}
      />

      {/* Vocabulary Choice Options */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${
          isProjectorMode ? 'md:gap-6' : ''
        }`}
      >
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;

          return (
            <motion.button
              key={idx}
              type="button"
              whileHover={!isTeacher && !isAnswerSubmitted ? { scale: 1.015, y: -2 } : {}}
              whileTap={!isTeacher && !isAnswerSubmitted ? { scale: 0.985 } : {}}
              onClick={() => !isTeacher && onSelectAnswer(option)}
              disabled={isTeacher || isAnswerSubmitted}
              className={`rounded-2xl border text-left transition-all flex items-center justify-between gap-3 font-bold select-none min-h-[60px] md:min-h-[68px] ${
                isProjectorMode ? 'p-5 md:p-8 text-xl md:text-2xl' : 'p-4 sm:p-5 text-base sm:text-lg'
              } ${
                isSelected
                  ? 'bg-purple-500/25 border-purple-400 text-white shadow-xl shadow-purple-500/25 ring-2 ring-purple-400/50'
                  : isAnswerSubmitted
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                  : isTeacher
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 cursor-default'
                  : 'bg-slate-900/90 border-slate-800 hover:border-purple-400/60 hover:bg-slate-800/90 text-slate-100 cursor-pointer shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl font-mono text-sm md:text-base font-black flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-purple-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border border-slate-700 text-purple-400'
                  }`}
                >
                  {optionLetters[idx] || idx + 1}
                </span>
                <span className="truncate">{option}</span>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
