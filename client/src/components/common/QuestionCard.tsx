import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Puzzle, Brain, Search, Swords, Sparkles, BookOpen } from 'lucide-react';
import { GameType, GameLevel } from '../../types/game.types';

interface QuestionCardProps {
  text: string;
  gameType: GameType;
  level?: GameLevel;
  category?: string;
  difficulty?: string;
  questionNumber?: number;
  totalQuestions?: number;
  isProjectorMode?: boolean;
  focusWord?: string;
  translation?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  text,
  gameType,
  level,
  category,
  difficulty,
  questionNumber,
  totalQuestions,
  isProjectorMode = false,
  focusWord,
  translation,
}) => {
  const getGameBadge = () => {
    switch (gameType) {
      case 'SCHNELLANTWORT':
        return {
          label: 'SCHNELLANTWORT',
          icon: <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />,
          color: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        };
      case 'SATZ_RENNEN':
        return {
          label: 'SATZ-RENNEN',
          icon: <Puzzle className="w-3.5 h-3.5 text-cyan-400" />,
          color: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
        };
      case 'WORTSCHATZ_DUELL':
        return {
          label: 'WORTSCHATZ-DUELL',
          icon: <Brain className="w-3.5 h-3.5 text-purple-400" />,
          color: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
        };
      case 'WAS_BIN_ICH':
        return {
          label: 'WAS BIN ICH?',
          icon: <Search className="w-3.5 h-3.5 text-emerald-400" />,
          color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        };
      case 'TEAM_BATTLE':
        return {
          label: 'TEAM BATTLE',
          icon: <Swords className="w-3.5 h-3.5 text-rose-400" />,
          color: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
        };
      default:
        return {
          label: gameType,
          icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />,
          color: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
        };
    }
  };

  const badge = getGameBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`glass-card rounded-3xl border border-white/10 text-center shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#151C2F] via-[#0E1526] to-[#0A0E1A] ${
        isProjectorMode ? 'p-8 md:p-12' : 'p-4 sm:p-7 md:p-8'
      }`}
    >
      {/* Subtle glowing ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-indigo-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Metadata Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4 relative z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${badge.color}`}
        >
          {badge.icon}
          <span>{badge.label}</span>
        </span>

        {level && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
            {level}
          </span>
        )}

        {category && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-800 text-slate-300">
            <BookOpen className="w-3 h-3 text-slate-400" />
            <span>{category}</span>
          </span>
        )}

        {difficulty && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
              difficulty === 'EASY'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : difficulty === 'HARD'
                ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            }`}
          >
            {difficulty}
          </span>
        )}

        {questionNumber && totalQuestions && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800/80 text-slate-400 border border-slate-700 font-mono">
            #{questionNumber} / {totalQuestions}
          </span>
        )}
      </div>

      {/* Focus Word for Wortschatz-Duell */}
      {focusWord && (
        <div className="mb-3">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
            Gesuchtes Wort:
          </span>
          <div className="text-2xl sm:text-4xl font-black text-amber-300 tracking-wide mt-1">
            "{focusWord}"
          </div>
          {translation && (
            <p className="text-xs sm:text-sm text-slate-400 italic mt-0.5">
              ({translation})
            </p>
          )}
        </div>
      )}

      {/* Primary Question Prompt */}
      <h2
        className={`font-extrabold text-white leading-relaxed max-w-3xl mx-auto tracking-tight relative z-10 ${
          isProjectorMode
            ? 'text-3xl md:text-5xl lg:text-6xl'
            : 'text-lg sm:text-2xl md:text-3xl'
        }`}
      >
        {text}
      </h2>
    </motion.div>
  );
};
