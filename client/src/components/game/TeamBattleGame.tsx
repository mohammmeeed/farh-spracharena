import React, { useEffect } from 'react';
import { Swords, CheckCircle2, Shield } from 'lucide-react';
import { Team, Player } from '../../types/game.types';

interface TeamBattleGameProps {
  text: string;
  category?: string;
  difficulty?: string;
  options?: string[];
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (answer: string) => void;
  teams?: Record<string, Team>;
  player?: Player | null;
  isTeacher?: boolean;
  isProjectorMode?: boolean;
}

export const TeamBattleGame: React.FC<TeamBattleGameProps> = ({
  text,
  category,
  difficulty,
  options = [],
  selectedAnswer,
  isAnswerSubmitted,
  onSelectAnswer,
  teams,
  player,
  isTeacher,
  isProjectorMode = false,
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  const teamBlau = teams?.TEAM_BLAU;
  const teamRot = teams?.TEAM_ROT;

  const totalScore = (teamBlau?.score || 0) + (teamRot?.score || 0);
  const blueFraction = totalScore > 0 ? (teamBlau?.score || 0) / totalScore : 0.5;

  const myTeam = player?.teamId ? teams?.[player.teamId] : null;

  // Keyboard shortcuts (Keys 1-4, A-D)
  useEffect(() => {
    if (isTeacher || isAnswerSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      let index = -1;

      if (['1', '2', '3', '4'].includes(key)) {
        index = parseInt(key, 10) - 1;
      } else if (['A', 'B', 'C', 'D'].includes(key)) {
        index = optionLetters.indexOf(key);
      }

      if (index >= 0 && index < options.length) {
        onSelectAnswer(options[index]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTeacher, isAnswerSubmitted, options, onSelectAnswer]);

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Team Battle Live Scoreboard HUD */}
      {teams && (
        <div className="glass-card rounded-2xl p-4 md:p-5 border border-slate-800 bg-slate-950/80 shadow-2xl space-y-3">
          <div className="flex items-center justify-between gap-3">
            {/* Team Blau */}
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black text-base md:text-lg">
                🔵
              </div>
              <div>
                <p className="text-[11px] md:text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                  Team Blau
                </p>
                <p className="text-lg md:text-2xl font-black font-mono text-white">
                  {teamBlau?.score.toLocaleString('de-DE') || 0}{' '}
                  <span className="text-xs text-slate-400 font-normal">Pkt</span>
                </p>
              </div>
            </div>

            {/* VS Badge */}
            <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-black text-amber-400 font-mono">
              ⚔️ VS
            </div>

            {/* Team Rot */}
            <div className="flex items-center gap-2.5 text-right flex-row-reverse">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-black text-base md:text-lg">
                🔴
              </div>
              <div>
                <p className="text-[11px] md:text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                  Team Rot
                </p>
                <p className="text-lg md:text-2xl font-black font-mono text-white">
                  {teamRot?.score.toLocaleString('de-DE') || 0}{' '}
                  <span className="text-xs text-slate-400 font-normal">Pkt</span>
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Tug-of-war Bar */}
          <div className="w-full h-2.5 md:h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
              style={{ width: `${blueFraction * 100}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-500"
              style={{ width: `${(1 - blueFraction) * 100}%` }}
            />
          </div>

          {/* Student Team Indicator */}
          {!isTeacher && myTeam && (
            <div className="text-center pt-0.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
                  myTeam.teamId === 'TEAM_BLAU'
                    ? 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
                    : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Du kämpfst für: {myTeam.teamName}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Question Prompt Card */}
      <div
        className={`glass-card rounded-3xl border border-rose-500/30 text-center space-y-3 shadow-2xl bg-gradient-to-b from-[#1E1222] via-[#0E1526] to-[#0B0F19] transition-all ${
          isProjectorMode ? 'p-8 md:p-14' : 'p-5 sm:p-7'
        }`}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300">
            <Swords className="w-3.5 h-3.5" />
            <span>⚔️ TEAM BATTLE</span>
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
          className={`font-extrabold text-white max-w-3xl mx-auto ${
            isProjectorMode ? 'text-2xl md:text-5xl' : 'text-xl sm:text-3xl'
          }`}
        >
          {text}
        </h2>
      </div>

      {/* Multiple Choice Options */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${
          isProjectorMode ? 'md:gap-6' : ''
        }`}
      >
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !isTeacher && onSelectAnswer(option)}
              disabled={isTeacher || isAnswerSubmitted}
              className={`rounded-2xl border text-left transition-all flex items-center justify-between gap-3 font-bold select-none min-h-[56px] md:min-h-[64px] ${
                isProjectorMode ? 'p-5 md:p-8 text-xl md:text-2xl' : 'p-4 sm:p-5 text-base sm:text-lg'
              } ${
                isSelected
                  ? myTeam?.teamId === 'TEAM_BLAU'
                    ? 'bg-blue-500/25 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-[1.01]'
                    : 'bg-rose-500/25 border-rose-400 text-white shadow-lg shadow-rose-500/20 scale-[1.01]'
                  : isAnswerSubmitted
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60'
                  : isTeacher
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 cursor-default'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 text-slate-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono text-sm md:text-base font-black flex items-center justify-center shrink-0">
                  {optionLetters[idx] || idx + 1}
                </span>
                <span className="truncate">{option}</span>
              </div>

              {isSelected && <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
