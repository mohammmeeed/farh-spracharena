import React, { useState } from 'react';
import {
  Maximize,
  Minimize,
  Tv,
  Settings,
  Sparkles,
  Zap,
  Puzzle,
  Brain,
  Search,
  Swords,
  LogOut,
  Music,
  VolumeX,
  Pause,
  Play,
} from 'lucide-react';
import { GameLevel, GameType } from '../../types/game.types';
import { ScoreDisplay } from './ScoreDisplay';
import { StreakBadge } from './StreakBadge';
import { AudioSettingsModal } from './AudioSettingsModal';
import { useAudio } from '../../hooks/useAudio';

interface GameHeaderProps {
  level: GameLevel;
  gameType: GameType;
  currentQuestion: number;
  totalQuestions: number;
  score?: number;
  lastPointsEarned?: number;
  streak?: number;
  isTeacher?: boolean;
  isPaused?: boolean;
  onTogglePause?: () => void;
  isProjectorMode?: boolean;
  onToggleProjectorMode?: () => void;
  onExit?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  level,
  gameType,
  currentQuestion,
  totalQuestions,
  score = 0,
  lastPointsEarned = 0,
  streak = 0,
  isTeacher = false,
  isPaused = false,
  onTogglePause,
  isProjectorMode = false,
  onToggleProjectorMode,
  onExit,
}) => {
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isMusicEnabled, toggleMusic, isAudioBlocked, unblockAudio } = useAudio();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const getGameBadge = () => {
    switch (gameType) {
      case 'SCHNELLANTWORT':
        return { label: 'Schnellantwort', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> };
      case 'SATZ_RENNEN':
        return { label: 'Satz-Rennen', icon: <Puzzle className="w-3.5 h-3.5 text-cyan-400" /> };
      case 'WORTSCHATZ_DUELL':
        return { label: 'Wortschatz-Duell', icon: <Brain className="w-3.5 h-3.5 text-purple-400" /> };
      case 'WAS_BIN_ICH':
        return { label: 'Was bin ich?', icon: <Search className="w-3.5 h-3.5 text-emerald-400" /> };
      case 'TEAM_BATTLE':
        return { label: 'Team Battle', icon: <Swords className="w-3.5 h-3.5 text-rose-400" /> };
      default:
        return { label: gameType, icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> };
    }
  };

  const gameInfo = getGameBadge();

  return (
    <>
      <header className="w-full glass-card border-x-0 border-t-0 border-b border-white/10 px-3 py-2.5 md:px-6 md:py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Branding & Level */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="flex flex-col">
              <span className="font-extrabold text-sm md:text-base gradient-text-gold tracking-tight whitespace-nowrap">
                Farh SprachArena
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] md:text-xs font-bold text-indigo-300">
                  {level}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.2 rounded bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-slate-300">
                  {gameInfo.icon}
                  <span>{gameInfo.label}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center: Question Progress & Streak */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs md:text-sm font-semibold shadow-inner">
              <span className="text-slate-400 hidden sm:inline font-medium">Frage</span>
              <span className="font-mono text-amber-300 font-bold">{currentQuestion}</span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-slate-400">{totalQuestions}</span>
            </div>

            {!isTeacher && streak > 0 && (
              <StreakBadge streak={streak} size="sm" className="inline-flex" />
            )}
          </div>

          {/* Right: Score (Student) & Teacher Presentation Controls */}
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            {!isTeacher && (
              <ScoreDisplay score={score} lastPointsEarned={lastPointsEarned} size="md" />
            )}

            {/* Teacher Pause/Resume for Classroom Explanation */}
            {isTeacher && onTogglePause && (
              <button
                onClick={onTogglePause}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isPaused
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 animate-pulse'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35'
                }`}
                title={isPaused ? 'Spiel fortsetzen' : 'Pause für Erklärung (Timer pausiert)'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>▶️ Fortsetzen</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pause (Erklärung)</span>
                    <span className="sm:hidden">Pause</span>
                  </>
                )}
              </button>
            )}

            {/* Unblock Audio Button if browser blocked autoplay */}
            {isTeacher && isAudioBlocked && (
              <button
                onClick={unblockAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 animate-pulse hover:bg-amber-400 transition-all cursor-pointer"
                title="Browser-Audio entsperren"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>🔇 Musik aktivieren</span>
              </button>
            )}

            {/* Quick Music Toggle */}
            {isTeacher && (
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                  isMusicEnabled
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }`}
                title={isMusicEnabled ? 'Musik stummschalten' : 'Musik einschalten'}
                aria-label="Musik umschalten"
              >
                <Music className="w-4 h-4" />
              </button>
            )}

            {/* Teacher Projector Mode Button */}
            {isTeacher && onToggleProjectorMode && (
              <button
                onClick={onToggleProjectorMode}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isProjectorMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
                title="Präsentationsmodus für Beamer/Smartboard"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Beamer</span>
              </button>
            )}

            {/* Fullscreen Mode Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
              aria-label="Vollbild"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Audio Settings Button */}
            <button
              onClick={() => setIsAudioModalOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Audio & Sound"
              aria-label="Audio Einstellungen"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Exit Button */}
            {onExit && (
              <button
                onClick={onExit}
                className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition-colors"
                title="Sitzung verlassen"
                aria-label="Beenden"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Question Progress Bar Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 transition-all duration-500 shadow-sm"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, (currentQuestion / Math.max(1, totalQuestions)) * 100)
              )}%`,
            }}
          />
        </div>
      </header>

      <AudioSettingsModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
    </>
  );
};
