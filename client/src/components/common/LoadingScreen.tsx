import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Spiel wird vorbereitet...',
  subMessage = 'Farh SprachArena verbindet mit dem Klassenzimmer...',
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0B0F19] text-center">
      <div className="glass-card max-w-sm w-full rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-slate-100">{message}</h3>
          <p className="text-xs text-slate-400">{subMessage}</p>
        </div>
      </div>
    </div>
  );
};
