import React, { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GameType, LeaderboardEntry, Team } from '../../types/game.types';
import { useAudio } from '../../hooks/useAudio';

interface GameTransitionProps {
  completedGameType: GameType;
  nextGameType?: GameType;
  gameNumber: number;
  totalGames: number;
  winner?: LeaderboardEntry | Team;
}

export const GameTransition: React.FC<GameTransitionProps> = ({
  completedGameType,
  nextGameType,
  gameNumber,
  totalGames,
  winner,
}) => {
  const { playSound } = useAudio();

  useEffect(() => {
    playSound('gameEnd');
  }, [playSound]);

  const getGameLabel = (type?: GameType) => {
    switch (type) {
      case 'SCHNELLANTWORT':
        return { label: '⚡ Schnellantwort', color: 'text-amber-400' };
      case 'SATZ_RENNEN':
        return { label: '🧩 Satz-Rennen', color: 'text-cyan-400' };
      case 'WORTSCHATZ_DUELL':
        return { label: '🧠 Wortschatz-Duell', color: 'text-purple-400' };
      case 'WAS_BIN_ICH':
        return { label: '🕵️ Was bin ich?', color: 'text-emerald-400' };
      case 'TEAM_BATTLE':
        return { label: '⚔️ Team Battle', color: 'text-rose-400' };
      default:
        return { label: type || '', color: 'text-indigo-400' };
    }
  };

  const completedInfo = getGameLabel(completedGameType);
  const nextInfo = getGameLabel(nextGameType);

  const isTeamWinner = winner && 'teamId' in winner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in zoom-in-95 duration-300">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Spiel {gameNumber} von {totalGames} abgeschlossen!</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {completedInfo.label}
          </h2>
          <p className="text-sm text-slate-400 mt-1">Runde erfolgreich beendet</p>
        </div>

        {/* Winner Highlight */}
        {winner && (
          <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-indigo-950/40 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-400/80 font-bold uppercase tracking-wider block">
              🏆 Spielgewinner
            </span>
            <div className="text-xl md:text-2xl font-black text-white">
              {isTeamWinner
                ? (winner as Team).name || (winner as Team).teamName
                : (winner as LeaderboardEntry).name}
            </div>
            <div className="text-sm font-mono font-bold text-amber-300">
              {winner.score.toLocaleString('de-DE')} Punkte
            </div>
          </div>
        )}


        {/* Next Game Preview */}
        {nextGameType && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Als Nächstes
            </span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
            <span className={`font-bold text-base md:text-lg ${nextInfo.color}`}>
              {nextInfo.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
