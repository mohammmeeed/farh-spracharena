import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Player, Team } from '../../types/game.types';

interface TeamRosterDrawerProps {
  myTeamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  teams?: Record<string, Team>;
  players: Player[];
  currentPlayerId?: string;
  className?: string;
}

export const TeamRosterDrawer: React.FC<TeamRosterDrawerProps> = ({
  myTeamId,
  teams,
  players = [],
  currentPlayerId,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!myTeamId || !teams) return null;

  const currentTeam = teams[myTeamId];
  if (!currentTeam) return null;

  const isRed = myTeamId === 'TEAM_ROT';

  const teammates = players.filter(
    (p) => p.teamId === myTeamId || currentTeam.playerIds.includes(p.playerId)
  );

  return (
    <div className={`relative ${className}`}>
      {/* Permanent Compact Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-3 py-1.5 rounded-2xl border flex items-center gap-2 text-xs font-black transition-all shadow-md cursor-pointer ${
          isRed
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30 shadow-rose-950/40 ring-1 ring-rose-500/30'
            : 'bg-blue-500/20 border-blue-500/40 text-blue-300 hover:bg-blue-500/30 shadow-blue-950/40 ring-1 ring-blue-500/30'
        }`}
        title="Teammitglieder anzeigen"
      >
        <span className="text-sm">{isRed ? '🔴' : '🔵'}</span>
        <span className="truncate">
          {isRed ? 'ROTES TEAM' : 'BLAUES TEAM'} ({teammates.length})
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Expandable Teammate Roster Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 left-0 sm:left-auto sm:right-0 z-40 w-64 rounded-3xl p-4 border-2 shadow-2xl backdrop-blur-2xl ${
              isRed
                ? 'bg-slate-950/95 border-rose-500/50 shadow-rose-950/80'
                : 'bg-slate-950/95 border-blue-500/50 shadow-blue-950/80'
            }`}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Shield
                  className={`w-4 h-4 ${isRed ? 'text-rose-400' : 'text-blue-400'}`}
                />
                <span className="font-bold text-xs text-white">
                  {isRed ? 'Rotes Team — Mitspieler' : 'Blaues Team — Mitspieler'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {teammates.length} Spieler
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {teammates.map((p) => {
                const isMe = p.playerId === currentPlayerId;
                return (
                  <div
                    key={p.playerId}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                      isMe
                        ? isRed
                          ? 'bg-rose-500/25 border border-rose-500/40 text-white font-black'
                          : 'bg-blue-500/25 border border-blue-500/40 text-white font-black'
                        : 'bg-white/5 text-slate-200 font-semibold'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span className="text-slate-400">👤</span>
                      <span>{p.name} {isMe ? '(Du)' : ''}</span>
                    </span>
                    <span className="font-mono text-amber-300 font-bold shrink-0">
                      {p.score.toLocaleString('de-DE')} Pkt
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
