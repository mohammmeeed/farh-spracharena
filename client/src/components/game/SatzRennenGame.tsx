import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Send, Sparkles } from 'lucide-react';
import { QuestionCard } from '../common/QuestionCard';
import { useAudio } from '../../hooks/useAudio';

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
  const { playSound } = useAudio();
  const [availableWords, setAvailableWords] = useState<{ id: string; text: string }[]>([]);
  const [constructedSentence, setConstructedSentence] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const initialPool = words.map((w, index) => ({
      id: `${w}_${index}_${Math.random().toString(36).substr(2, 4)}`,
      text: w,
    }));
    setAvailableWords(initialPool);
    setConstructedSentence([]);
  }, [words]);

  const handleAddWord = useCallback(
    (wordObj: { id: string; text: string }) => {
      if (isAnswerSubmitted) return;

      setAvailableWords((prev) => {
        if (!prev.some((w) => w.id === wordObj.id)) return prev;
        return prev.filter((w) => w.id !== wordObj.id);
      });

      setConstructedSentence((prev) => {
        if (prev.some((w) => w.id === wordObj.id)) return prev;
        return [...prev, wordObj];
      });

      playSound('click');
    },
    [isAnswerSubmitted, playSound]
  );

  const handleRemoveWord = useCallback(
    (wordObj: { id: string; text: string }) => {
      if (isAnswerSubmitted) return;

      setConstructedSentence((prev) => {
        if (!prev.some((w) => w.id === wordObj.id)) return prev;
        return prev.filter((w) => w.id !== wordObj.id);
      });

      setAvailableWords((prev) => {
        if (prev.some((w) => w.id === wordObj.id)) return prev;
        return [...prev, wordObj];
      });

      playSound('click');
    },
    [isAnswerSubmitted, playSound]
  );

  const handleReset = useCallback(() => {
    if (isAnswerSubmitted) return;
    const initialPool = words.map((w, index) => ({
      id: `${w}_${index}_${Math.random().toString(36).substr(2, 4)}`,
      text: w,
    }));
    setAvailableWords(initialPool);
    setConstructedSentence([]);
    playSound('click');
  }, [words, isAnswerSubmitted, playSound]);

  const handleSubmit = useCallback(() => {
    if (isAnswerSubmitted || constructedSentence.length === 0) return;
    const orderedWords = constructedSentence.map((w) => w.text);
    onSubmitAnswer(orderedWords);
  }, [isAnswerSubmitted, constructedSentence, onSubmitAnswer]);

  return (
    <div className="space-y-4 md:space-y-6 select-none">
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
          <div className="glass-card rounded-3xl p-5 sm:p-6 border-2 border-dashed border-cyan-500/40 bg-slate-950/80 min-h-[120px] flex flex-col justify-center shadow-inner transition-colors">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>📝 Dein Satz:</span>
            </div>

            {constructedSentence.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-500 italic text-center py-4">
                Noch keine Wörter platziert. Tippe unten auf die Wortkarten, um deinen Satz zu bauen!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5 items-center">
                <AnimatePresence mode="popLayout">
                  {constructedSentence.map((word, idx) => (
                    <motion.button
                      layout
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0, pointerEvents: 'none', transition: { duration: 0.12 } }}
                      whileHover={!isAnswerSubmitted ? { scale: 1.04 } : {}}
                      whileTap={!isAnswerSubmitted ? { scale: 0.96 } : {}}
                      key={word.id}
                      type="button"
                      onClick={() => handleRemoveWord(word)}
                      disabled={isAnswerSubmitted}
                      style={{ touchAction: 'manipulation' }}
                      className="group px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border-2 border-cyan-400 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-cyan-500/20 cursor-pointer min-h-[50px] active:scale-95 transition-transform"
                      title="Tippen zum Entfernen"
                    >
                      <span className="w-5 h-5 rounded-lg bg-slate-950 text-cyan-300 text-[11px] font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{word.text}</span>
                      {!isAnswerSubmitted && (
                        <span className="text-xs text-rose-400 group-hover:scale-125 transition-transform ml-0.5">
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
              Verfügbare Wort-Karten (Antippen zum Hinzufügen):
            </div>

            {availableWords.length === 0 ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-emerald-400 font-bold py-2 flex items-center gap-1.5"
              >
                <span>✓ Alle Wörter platziert! Klicke jetzt unten auf "Antwort prüfen".</span>
              </motion.p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                <AnimatePresence mode="popLayout">
                  {availableWords.map((word) => (
                    <motion.button
                      layout
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0, pointerEvents: 'none', transition: { duration: 0.12 } }}
                      whileHover={!isAnswerSubmitted ? { scale: 1.04, y: -1 } : {}}
                      whileTap={!isAnswerSubmitted ? { scale: 0.95 } : {}}
                      key={word.id}
                      type="button"
                      onClick={() => handleAddWord(word)}
                      disabled={isAnswerSubmitted}
                      style={{ touchAction: 'manipulation' }}
                      className="px-4 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-100 font-black text-sm sm:text-base shadow-md transition-colors cursor-pointer min-h-[50px] flex items-center justify-center"
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
                style={{ touchAction: 'manipulation' }}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer min-h-[52px]"
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
                style={{ touchAction: 'manipulation' }}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 transition-all cursor-pointer min-h-[52px]"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>🚀 Antwort prüfen ({constructedSentence.length} {constructedSentence.length === 1 ? 'Wort' : 'Wörter'})</span>
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
