import React, { useEffect } from 'react';
import { BookOpen, CheckCircle2, Languages } from 'lucide-react';
import { QuestionFormat } from '../../types/game.types';

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
  format,
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

  const getFormatLabel = () => {
    if (format === 'VOCABULARY_REVERSE') {
      return 'Übersetzung ➔ Deutsch';
    }
    return 'Deutsch ➔ Bedeutung';
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Vocabulary Focus Card */}
      <div
        className={`glass-card rounded-3xl border border-purple-500/30 text-center space-y-4 shadow-2xl bg-gradient-to-b from-[#1C122C] via-[#0E1526] to-[#0B0F19] transition-all ${
          isProjectorMode ? 'p-8 md:p-14' : 'p-5 sm:p-8'
        }`}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>🧠 WORTSCHATZ-DUELL</span>
          </span>
          {category && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400">
              {category}
            </span>
          )}
          {difficulty && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-slate-400">
              {difficulty}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400">
            <Languages className="w-3 h-3" />
            <span>{getFormatLabel()}</span>
          </span>
        </div>

        {/* Large Prominent Target Word */}
        {focusWord && (
          <div className="py-2">
            <span
              className={`inline-block rounded-2xl bg-purple-950/80 border-2 border-purple-400 text-purple-200 font-mono font-black shadow-lg shadow-purple-500/20 tracking-wide ${
                isProjectorMode
                  ? 'px-8 py-4 text-3xl md:text-5xl'
                  : 'px-6 py-3 text-2xl sm:text-3xl md:text-4xl'
              }`}
            >
              {focusWord}
            </span>
          </div>
        )}

        <h2
          className={`font-bold text-slate-100 max-w-xl mx-auto ${
            isProjectorMode ? 'text-xl md:text-3xl' : 'text-base sm:text-xl'
          }`}
        >
          {text}
        </h2>
      </div>

      {/* Vocabulary Choice Options */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${
          isProjectorMode ? 'md:gap-6' : ''
        }`}
      >
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !isTeacher && onSelectAnswer(option)}
              disabled={isTeacher || isAnswerSubmitted}
              className={`rounded-2xl border text-left transition-all flex items-center justify-between gap-3 font-bold select-none min-h-[56px] md:min-h-[64px] ${
                isProjectorMode ? 'p-5 md:p-8 text-xl md:text-2xl' : 'p-4 sm:p-5 text-base sm:text-lg'
              } ${
                isSelected
                  ? 'bg-purple-500/25 border-purple-400 text-white shadow-lg shadow-purple-500/20 scale-[1.01]'
                  : isAnswerSubmitted
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                  : isTeacher
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 cursor-default'
                  : 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 text-slate-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-950 border border-slate-700 text-purple-400 font-mono text-sm md:text-base font-black flex items-center justify-center shrink-0">
                  {optionLetters[idx] || idx + 1}
                </span>
                <span className="truncate">{option}</span>
              </div>

              {isSelected && <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
