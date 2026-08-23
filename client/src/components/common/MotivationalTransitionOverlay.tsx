import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { GameType } from '../../types/game.types';

interface MotivationalTransitionOverlayProps {
  questionNumber?: number;
  totalQuestions?: number;
  gameType?: GameType;
  countdownValue?: number;
}

const MOTIVATIONAL_PHRASES = [
  { icon: '🚀', text: 'Bist du bereit für die nächste Frage?' },
  { icon: '🔥', text: 'Weiter geht\'s!' },
  { icon: '💪', text: 'Du machst das super!' },
  { icon: '⚡', text: 'Konzentrier dich!' },
  { icon: '🎯', text: 'Bereit für die nächste Herausforderung?' },
  { icon: '🌟', text: 'Jetzt kommt die nächste Frage!' },
  { icon: '🏆', text: 'Gib dein Bestes!' },
];

let lastPhraseIndex = -1;

function getNextRandomPhrase() {
  let nextIndex = Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length);
  if (nextIndex === lastPhraseIndex && MOTIVATIONAL_PHRASES.length > 1) {
    nextIndex = (nextIndex + 1) % MOTIVATIONAL_PHRASES.length;
  }
  lastPhraseIndex = nextIndex;
  return MOTIVATIONAL_PHRASES[nextIndex];
}

export const MotivationalTransitionOverlay: React.FC<MotivationalTransitionOverlayProps> = ({
  questionNumber,
  totalQuestions,
  gameType,
}) => {
  const { playSound } = useAudio();
  const [phrase] = useState(getNextRandomPhrase);
  const playedSoundRef = useRef(false);

  useEffect(() => {
    if (!playedSoundRef.current) {
      playedSoundRef.current = true;
      playSound('countdown');
    }
  }, [playSound]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-all duration-300 animate-in fade-in select-none p-4">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-300">
        {/* Question Counter Pill */}
        {questionNumber && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>
              {totalQuestions ? `Frage ${questionNumber} von ${totalQuestions}` : `Frage ${questionNumber}`}
            </span>
          </div>
        )}

        {/* Animated Motivational Icon */}
        <div className="text-6xl sm:text-7xl animate-bounce duration-700">
          {phrase.icon}
        </div>

        {/* Motivational Phrase */}
        <div className="space-y-2 px-2">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-snug drop-shadow-md">
            {phrase.text}
          </h2>
          {gameType && (
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
              {gameType.replace(/_/g, ' ')}
            </p>
          )}
        </div>

        {/* 3-Dot Pulse Loading Indicator */}
        <div className="flex items-center justify-center gap-2.5 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0ms]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:200ms]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:400ms]"></span>
        </div>
      </div>
    </div>
  );
};
