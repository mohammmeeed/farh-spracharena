import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, HelpCircle } from 'lucide-react';
import { socketService } from '../../socket/socket.service';

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
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Deduction Card */}
      <div
        className={`glass-card rounded-3xl border border-purple-500/30 text-center space-y-3 shadow-2xl bg-gradient-to-b from-[#1C142E] via-[#0E1526] to-[#0B0F19] transition-all ${
          isProjectorMode ? 'p-8 md:p-12' : 'p-5 sm:p-7'
        }`}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
            <Search className="w-3.5 h-3.5" />
            <span>🕵️ WAS BIN ICH?</span>
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
        </div>

        <h2
          className={`font-extrabold text-white max-w-2xl mx-auto ${
            isProjectorMode ? 'text-2xl md:text-4xl' : 'text-lg sm:text-2xl'
          }`}
        >
          {text}
        </h2>
      </div>

      {/* Progressive Clue Cards */}
      <div className="space-y-2.5">
        {clues.map((clue, idx) => {
          const isRevealed = idx < revealedClueCount;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-500 ${
                isProjectorMode ? 'p-5 md:p-6' : 'p-4 sm:p-5'
              } ${
                isRevealed
                  ? 'bg-slate-900/90 border-purple-500/40 text-white shadow-md animate-in fade-in'
                  : 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0 ${
                    isRevealed
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  Hinweis {idx + 1}
                </span>

                <div className="flex-1">
                  {isRevealed ? (
                    <p
                      className={`font-semibold text-slate-100 ${
                        isProjectorMode ? 'text-lg md:text-2xl' : 'text-sm sm:text-base'
                      }`}
                    >
                      {clue}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 text-xs italic text-slate-500 py-1">
                      <HelpCircle className="w-4 h-4 text-slate-600" />
                      <span>Wird in wenigen Sekunden aufgedeckt...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deduction Options */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 ${
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
