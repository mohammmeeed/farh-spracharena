import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Send } from 'lucide-react';
import { QuestionCard } from '../common/QuestionCard';

interface SatzRennenGameProps {
  text: string;
  words?: string[];
  category?: string;
  difficulty?: string;
  isAnswerSubmitted: boolean;
  onSubmitAnswer: (orderedWords: string[]) => void;
  isTeacher?: boolean;
  isProjectorMode?: boolean;
}

export const SatzRennenGame: React.FC<SatzRennenGameProps> = ({
  text,
  words = [],
  category,
  difficulty,
  isAnswerSubmitted,
  onSubmitAnswer,
  isTeacher,
  isProjectorMode = false,
}) => {
  const [availableWords, setAvailableWords] = useState<{ id: string; text: string }[]>([]);
  const [constructedSentence, setConstructedSentence] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const initialPool = words.map((w, index) => ({
      id: `${w}_${index}`,
      text: w,
    }));
    setAvailableWords(initialPool);
    setConstructedSentence([]);
  }, [words]);

  const handleAddWord = (wordObj: { id: string; text: string }) => {
    if (isAnswerSubmitted) return;
    setAvailableWords((prev) => prev.filter((w) => w.id !== wordObj.id));
    setConstructedSentence((prev) => [...prev, wordObj]);
  };

  const handleRemoveWord = (wordObj: { id: string; text: string }) => {
    if (isAnswerSubmitted) return;
    setConstructedSentence((prev) => prev.filter((w) => w.id !== wordObj.id));
    setAvailableWords((prev) => [...prev, wordObj]);
  };

  const handleReset = () => {
    if (isAnswerSubmitted) return;
    const initialPool = words.map((w, index) => ({
      id: `${w}_${index}`,
      text: w,
    }));
    setAvailableWords(initialPool);
    setConstructedSentence([]);
  };

  const handleSubmit = () => {
    if (isAnswerSubmitted || constructedSentence.length === 0) return;
    const orderedWords = constructedSentence.map((w) => w.text);
    onSubmitAnswer(orderedWords);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Question / Instruction Card */}
      <QuestionCard
        text={text}
        gameType="SATZ_RENNEN"
        category={category}
        difficulty={difficulty}
        isProjectorMode={isProjectorMode}
      />

      {/* Teacher View / Projector display of the words */}
      {isTeacher && (
        <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 text-center space-y-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
            Verfügbare Wort-Bausteine für die Schüler:
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {words.map((w, idx) => (
              <span
                key={idx}
                className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white font-black text-lg shadow-md"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Student Sentence Builder Area */}
      {!isTeacher && (
        <div className="space-y-4 md:space-y-5">
          {/* Constructed Sentence Dropzone */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border-2 border-dashed border-cyan-500/40 bg-slate-950/80 min-h-[120px] flex flex-col justify-center shadow-inner">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">
              📝 Dein Satz:
            </div>

            {constructedSentence.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-500 italic text-center py-3">
                Noch keine Wörter platziert. Tippe unten auf die Wortkarten!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5 items-center">
                <AnimatePresence>
                  {constructedSentence.map((word, idx) => (
                    <motion.button
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      whileHover={!isAnswerSubmitted ? { scale: 1.05 } : {}}
                      whileTap={!isAnswerSubmitted ? { scale: 0.95 } : {}}
                      key={word.id}
                      type="button"
                      onClick={() => handleRemoveWord(word)}
                      disabled={isAnswerSubmitted}
                      className="group px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border-2 border-cyan-400 text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer min-h-[48px]"
                      title="Klicken zum Entfernen"
                    >
                      <span className="w-5 h-5 rounded-lg bg-slate-950 text-cyan-300 text-[11px] font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{word.text}</span>
                      {!isAnswerSubmitted && (
                        <span className="text-xs text-rose-400 group-hover:scale-125 transition-transform">
                          ✕
                        </span>
                      )}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Available Words Pool */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-3 bg-slate-900/80">
            <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
              Verfügbare Wort-Karten:
            </div>

            {availableWords.length === 0 ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-emerald-400 font-bold py-1"
              >
                ✓ Alle Wörter platziert! Klicke auf "Antwort prüfen".
              </motion.p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                <AnimatePresence>
                  {availableWords.map((word) => (
                    <motion.button
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      whileHover={!isAnswerSubmitted ? { scale: 1.05, y: -2 } : {}}
                      whileTap={!isAnswerSubmitted ? { scale: 0.95 } : {}}
                      key={word.id}
                      type="button"
                      onClick={() => handleAddWord(word)}
                      disabled={isAnswerSubmitted}
                      className="px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-100 font-black text-sm sm:text-base shadow-md transition-colors cursor-pointer min-h-[48px]"
                    >
                      {word.text}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Action Buttons: Reset & Submit */}
          {!isAnswerSubmitted && (
            <div className="flex items-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleReset}
                disabled={constructedSentence.length === 0}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer min-h-[50px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Zurücksetzen</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={constructedSentence.length === 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 transition-all cursor-pointer min-h-[50px]"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>🚀 Antwort prüfen ({constructedSentence.length} Wörter)</span>
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
