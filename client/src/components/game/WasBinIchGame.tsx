import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { socketService } from '../../socket/socket.service';
import { QuestionCard } from '../common/QuestionCard';

interface WasBinIchGameProps {
  text: string;
  clues?: string[];
  options?: string[];
  category?: string;
  difficulty?: string;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (answer: string) => void;
  isTeacher?: boolean;
  isProjectorMode?: boolean;
}

export const WasBinIchGame: React.FC<WasBinIchGameProps> = ({
  text,
  clues = [],
  options = [],
  category,
  difficulty,
  selectedAnswer,
  isAnswerSubmitted,
  onSelectAnswer,
  isTeacher,
  isProjectorMode = false,
}) => {
  const [revealedClueCount, setRevealedClueCount] = useState<number>(1);
  const optionLetters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    setRevealedClueCount(1);

    const socket = socketService.getSocket();
    const handleClueRevealed = ({ clueIndex }: { clueIndex: number }) => {
      setRevealedClueCount(clueIndex + 1);
    };

    socket.on('game:clueRevealed', handleClueRevealed);
    return () => {
      socket.off('game:clueRevealed', handleClueRevealed);
    };
  }, [text, clues]);

  // Keyboard shortcut listener (Keys 1-4, A-D)
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
      {/* Question Card */}
      <QuestionCard
        text={text}
        gameType="WAS_BIN_ICH"
        category={category}
        difficulty={difficulty}
        isProjectorMode={isProjectorMode}
      />

      {/* Progressive Clue Cards */}
      <div className="space-y-2.5">
        {clues.map((clue, idx) => {
          const isRevealed = idx < revealedClueCount;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isRevealed ? 1 : 0.4, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border transition-all ${
                isProjectorMode ? 'p-5 md:p-6' : 'p-3.5 sm:p-4'
              } ${
                isRevealed
                  ? 'bg-slate-900/95 border-emerald-500/40 text-white shadow-md'
                  : 'bg-slate-950/40 border-slate-800/40 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold shrink-0 ${
                    isRevealed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  Hinweis {idx + 1}
                </span>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.p
                        key="revealed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`font-semibold text-slate-100 ${
                          isProjectorMode ? 'text-lg md:text-2xl' : 'text-sm sm:text-base'
                        }`}
                      >
                        {clue}
                      </motion.p>
                    ) : (
                      <div
                        key="hidden"
                        className="flex items-center gap-2 text-xs italic text-slate-500 py-0.5"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-600" />
                        <span>Wird in wenigen Sekunden aufgedeckt...</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deduction Options Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 ${
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
                  ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-xl shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : isAnswerSubmitted
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                  : isTeacher
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 cursor-default'
                  : 'bg-slate-900/90 border-slate-800 hover:border-emerald-400/60 hover:bg-slate-800/90 text-slate-100 cursor-pointer shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl font-mono text-sm md:text-base font-black flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border border-slate-700 text-emerald-400'
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
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
