import React from 'react';
import { Swords } from 'lucide-react';
import { Team } from '../../types/game.types';

interface TeamBattleScoreBarProps {
  teams: Record<string, Team>;
  className?: string;
}

export const TeamBattleScoreBar: React.FC<TeamBattleScoreBarProps> = ({
  teams,
  className = '',
}) => {
  const teamBlau = teams['TEAM_BLAU'] || {
    teamId: 'TEAM_BLAU',
    name: 'Team Blau',
    teamName: 'Team Blau',
    color: '#3B82F6',
    score: 0,
    playerIds: [],
  };

  const teamRot = teams['TEAM_ROT'] || {
    teamId: 'TEAM_ROT',
    name: 'Team Rot',
    teamName: 'Team Rot',
    color: '#EF4444',
    score: 0,
    playerIds: [],
  };

  const totalScore = teamBlau.score + teamRot.score;
  const bluePercent = totalScore === 0 ? 50 : Math.round((teamBlau.score / totalScore) * 100);
  const redPercent = 100 - bluePercent;

  return (
    <div className={`glass-card rounded-2xl p-4 md:p-5 border border-white/10 space-y-3 ${className}`}>
      {/* Header Info */}
      <div className="flex items-center justify-between">
        {/* Team Blau */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
            🔵
          </div>
          <div>
            <span className="font-extrabold text-xs md:text-sm text-blue-300 block">
              {teamBlau.name || teamBlau.teamName}
            </span>
            <span className="font-mono font-black text-base md:text-xl text-white">
              {teamBlau.score.toLocaleString('de-DE')}
            </span>
          </div>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center">
          <div className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10 text-xs font-black text-amber-400 flex items-center gap-1">
            <Swords className="w-3 h-3" />
            <span>VS</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
            {teamBlau.score > teamRot.score
              ? `Blau +${teamBlau.score - teamRot.score}`
              : teamRot.score > teamBlau.score
              ? `Rot +${teamRot.score - teamBlau.score}`
              : 'Gleichstand'}
          </span>
        </div>

        {/* Team Rot */}
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="font-extrabold text-xs md:text-sm text-rose-300 block">
              {teamRot.name || teamRot.teamName}
            </span>
            <span className="font-mono font-black text-base md:text-xl text-white">
              {teamRot.score.toLocaleString('de-DE')}
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
            🔴
          </div>
        </div>
      </div>


      {/* Dynamic Tug-of-War Bar */}
      <div className="w-full h-3 rounded-full overflow-hidden bg-slate-800 flex border border-white/10 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
          style={{ width: `${bluePercent}%` }}
        />
        <div
          className="h-full bg-gradient-to-l from-rose-600 to-rose-400 transition-all duration-500"
          style={{ width: `${redPercent}%` }}
        />
      </div>
    </div>
  );
};
