import React, { useState, useEffect } from 'react';
import { Puzzle, RotateCcw, Send } from 'lucide-react';


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
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Game Instruction Card */}
      <div
        className={`glass-card rounded-3xl border border-cyan-500/30 text-center space-y-3 shadow-2xl bg-gradient-to-b from-[#0F1E32] via-[#0E1526] to-[#0B0F19] transition-all ${
          isProjectorMode ? 'p-8 md:p-12' : 'p-5 sm:p-7'
        }`}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
            <Puzzle className="w-3.5 h-3.5" />
            <span>🧩 SATZ-RENNEN</span>
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
        <p className="text-xs md:text-sm text-slate-400">
          Klicke auf die Wörter, um den Satz in der richtigen Reihenfolge zu bauen:
        </p>
      </div>

      {/* Teacher View / Projector display of the words */}
      {isTeacher && (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 text-center space-y-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
            Verfügbare Wort-Bausteine:
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {words.map((w, idx) => (
              <span
                key={idx}
                className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-lg shadow-md"
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
          <div className="glass-card rounded-2xl p-4 sm:p-6 border-2 border-dashed border-cyan-500/40 bg-slate-950/70 min-h-[100px] flex flex-col justify-center">
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2.5">
              Dein Satz:
            </div>

            {constructedSentence.length === 0 ? (
              <p className="text-xs md:text-sm text-slate-500 italic text-center py-2">
                Noch keine Wörter ausgewählt. Tippe unten auf die Wortkarten!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 items-center">
                {constructedSentence.map((word, idx) => (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => handleRemoveWord(word)}
                    disabled={isAnswerSubmitted}
                    className="group px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                    title="Klicken zum Entfernen"
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-cyan-300 text-[10px] font-mono flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{word.text}</span>
                    {!isAnswerSubmitted && (
                      <span className="text-xs text-rose-400 group-hover:inline">×</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Available Words Pool */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-2.5">
            <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Verfügbare Wort-Karten:
            </div>

            {availableWords.length === 0 ? (
              <p className="text-xs text-emerald-400 font-semibold py-1">
                ✓ Alle Wörter platziert! Klicke auf "Antwort prüfen".
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word) => (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => handleAddWord(word)}
                    disabled={isAnswerSubmitted}
                    className="px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-100 font-bold text-sm sm:text-base shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    {word.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: Reset & Submit */}
          {!isAnswerSubmitted && (
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleReset}
                disabled={constructedSentence.length === 0}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Zurücksetzen</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={constructedSentence.length === 0}
                className="flex-1 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer min-h-[48px]"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>🚀 Antwort prüfen</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
