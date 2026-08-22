import React from 'react';
import { Trophy, Flame } from 'lucide-react';
import { LeaderboardEntry, Team } from '../../types/game.types';


interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentPlayerId?: string;
  teams?: Record<string, Team>;
  limit?: number;
  compact?: boolean;
  className?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboard,
  currentPlayerId,
  teams,
  limit,
  compact = false,
  className = '',
}) => {
  const displayList = limit ? leaderboard.slice(0, limit) : leaderboard;

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black text-xs">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="w-6 h-6 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/40 flex items-center justify-center font-black text-xs">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-400 border border-amber-700/40 flex items-center justify-center font-black text-xs">
            🥉
          </span>
        );
      default:
        return (
          <span className="w-6 h-6 rounded-full bg-white/5 text-slate-400 flex items-center justify-center font-mono font-bold text-xs">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className={`glass-card rounded-2xl p-4 md:p-5 space-y-3 ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">🏆 Rangliste</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {leaderboard.length} {leaderboard.length === 1 ? 'Spieler' : 'Spieler'}
        </span>
      </div>

      {/* Team Battle Score Showdown */}
      {teams && teams.TEAM_ROT && teams.TEAM_BLAU && (
        <div className="grid grid-cols-2 gap-2 pb-2">
          <div className="p-2.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-between shadow-md shadow-rose-950/40">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm">🔴</span>
              <span className="font-bold text-xs text-rose-300 truncate">Rotes Team</span>
            </div>
            <span className="font-mono font-black text-xs sm:text-sm text-white">
              {teams.TEAM_ROT.score.toLocaleString('de-DE')} Pkt
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-between shadow-md shadow-blue-950/40">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm">🔵</span>
              <span className="font-bold text-xs text-blue-300 truncate">Blaues Team</span>
            </div>
            <span className="font-mono font-black text-xs sm:text-sm text-white">
              {teams.TEAM_BLAU.score.toLocaleString('de-DE')} Pkt
            </span>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-1.5 overflow-y-auto max-h-[380px] pr-1">
        {displayList.map((entry, index) => {
          const rank = entry.rank || index + 1;
          const isCurrentPlayer = entry.playerId === currentPlayerId;
          const team = entry.teamId && teams ? teams[entry.teamId] : undefined;

          return (
            <div
              key={entry.playerId}
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                isCurrentPlayer
                  ? 'bg-indigo-600/30 border border-indigo-500/50 shadow-md shadow-indigo-500/10'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
            >
              {/* Rank & Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                {getRankBadge(rank)}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={`font-semibold text-xs md:text-sm truncate ${
                      isCurrentPlayer ? 'text-indigo-200 font-bold' : 'text-slate-200'
                    }`}
                  >
                    {entry.name}
                  </span>
                  {isCurrentPlayer && (
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 text-[10px] font-bold shrink-0">
                      Du
                    </span>
                  )}
                  {team && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        team.teamId === 'TEAM_BLAU'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {team.name || (team as any).teamName}
                    </span>
                  )}
                </div>
              </div>

              {/* Score & Streak */}
              <div className="flex items-center gap-2 shrink-0">
                {entry.streak > 1 && !compact && (
                  <span className="flex items-center gap-0.5 text-[10px] md:text-xs text-orange-400 font-bold">
                    <Flame className="w-3 h-3 fill-orange-400" />
                    {entry.streak}
                  </span>
                )}
                <span className="font-mono font-bold text-xs md:text-sm text-amber-300">
                  {entry.score.toLocaleString('de-DE')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
