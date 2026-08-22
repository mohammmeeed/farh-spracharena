import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Scale, ArrowRight, ArrowLeft, Users } from 'lucide-react';
import { Player, Team } from '../../types/game.types';
import { socketService } from '../../socket/socket.service';

interface TeacherTeamAssignmentProps {
  roomId: string;
  players: Player[];
  teams?: Record<string, Team>;
  isLocked?: boolean;
}

export const TeacherTeamAssignment: React.FC<TeacherTeamAssignmentProps> = ({
  roomId,
  players,
  teams,
  isLocked = false,
}) => {
  const [draggedPlayerId, setDraggedPlayerId] = useState<string | null>(null);
  const [dragOverTeam, setDragOverTeam] = useState<'TEAM_BLAU' | 'TEAM_ROT' | null>(null);

  const teamRot = teams?.TEAM_ROT || {
    teamId: 'TEAM_ROT',
    name: 'Rotes Team',
    color: '#EF4444',
    score: 0,
    playerIds: [],
  };

  const teamBlau = teams?.TEAM_BLAU || {
    teamId: 'TEAM_BLAU',
    name: 'Blaues Team',
    color: '#3B82F6',
    score: 0,
    playerIds: [],
  };

  // Resolve player lists for each team
  const redPlayers = players.filter(
    (p) => p.teamId === 'TEAM_ROT' || teamRot.playerIds.includes(p.playerId)
  );
  const bluePlayers = players.filter(
    (p) => p.teamId === 'TEAM_BLAU' || teamBlau.playerIds.includes(p.playerId)
  );

  // Unassigned players if any
  const unassignedPlayers = players.filter(
    (p) =>
      !redPlayers.some((rp) => rp.playerId === p.playerId) &&
      !bluePlayers.some((bp) => bp.playerId === p.playerId)
  );

  const handleMovePlayer = (playerId: string, targetTeamId: 'TEAM_BLAU' | 'TEAM_ROT') => {
    if (isLocked) return;
    socketService.assignPlayerTeam(roomId, playerId, targetTeamId);
  };

  const handleAutoBalance = () => {
    if (isLocked) return;
    socketService.autoBalanceTeams(roomId);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, playerId: string) => {
    if (isLocked) return;
    setDraggedPlayerId(playerId);
    e.dataTransfer.setData('text/plain', playerId);
  };

  const handleDragOver = (e: React.DragEvent, teamId: 'TEAM_BLAU' | 'TEAM_ROT') => {
    e.preventDefault();
    if (isLocked) return;
    setDragOverTeam(teamId);
  };

  const handleDragLeave = () => {
    setDragOverTeam(null);
  };

  const handleDrop = (e: React.DragEvent, targetTeamId: 'TEAM_BLAU' | 'TEAM_ROT') => {
    e.preventDefault();
    setDragOverTeam(null);
    if (isLocked) return;

    const playerId = e.dataTransfer.getData('text/plain') || draggedPlayerId;
    if (playerId) {
      handleMovePlayer(playerId, targetTeamId);
    }
    setDraggedPlayerId(null);
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-7 border-2 border-indigo-500/30 space-y-6 shadow-2xl bg-gradient-to-b from-[#141A2E] via-[#0E1526] to-[#0A0E1A]">
      {/* Header with Title & Auto-Balance Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-1.5">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>⚔️ ROT GEGEN BLAU — TEAM-ZUORDNUNG</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Team-Einteilung der Schüler
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ziehe Schüler zwischen den Teams oder klicke auf die Pfeil-Buttons (Mobil-optimiert).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAutoBalance}
            disabled={isLocked || players.length === 0}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/40 text-indigo-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Teams gleichmäßig aufteilen"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>⚖️ Automatisch ausgleichen</span>
          </button>
        </div>
      </div>

      {/* Unassigned Pool Warning if any */}
      {unassignedPlayers.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs space-y-2">
          <span className="font-bold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Noch nicht zugewiesene Schüler ({unassignedPlayers.length}):</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {unassignedPlayers.map((p) => (
              <div
                key={p.playerId}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-white font-bold text-xs flex items-center gap-2"
              >
                <span>{p.name}</span>
                <button
                  type="button"
                  onClick={() => handleMovePlayer(p.playerId, 'TEAM_ROT')}
                  className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] hover:bg-rose-500/40"
                >
                  🔴 Rot
                </button>
                <button
                  type="button"
                  onClick={() => handleMovePlayer(p.playerId, 'TEAM_BLAU')}
                  className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] hover:bg-blue-500/40"
                >
                  🔵 Blau
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Teams Grid: Red Team vs Blue Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* 🔴 RED TEAM CARD */}
        <div
          onDragOver={(e) => handleDragOver(e, 'TEAM_ROT')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'TEAM_ROT')}
          className={`rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 flex flex-col justify-between min-h-[320px] ${
            dragOverTeam === 'TEAM_ROT'
              ? 'bg-rose-950/80 border-rose-400 ring-4 ring-rose-500/30 scale-[1.01]'
              : 'bg-gradient-to-b from-rose-950/40 via-slate-900/90 to-slate-950/95 border-rose-500/40 shadow-xl shadow-rose-950/30'
          }`}
        >
          <div className="space-y-4">
            {/* Team Header */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center justify-center font-black text-xl shadow-lg shadow-rose-500/20">
                  🔴
                </div>
                <div>
                  <h4 className="text-lg font-black text-rose-300 uppercase tracking-wide">
                    Rotes Team
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {redPlayers.length} {redPlayers.length === 1 ? 'Spieler' : 'Spieler'}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs font-black">
                {redPlayers.length} Spieler
              </span>
            </div>

            {/* Players List */}
            {redPlayers.length === 0 ? (
              <div className="py-10 text-center text-xs text-rose-300/60 italic border-2 border-dashed border-rose-500/20 rounded-2xl">
                Keine Spieler im Roten Team.
                <br />
                Schüler hierher ziehen oder auf "Zu Rot" tippen.
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <AnimatePresence>
                  {redPlayers.map((p) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={p.playerId}
                      draggable={!isLocked}
                      onDragStart={(e: any) => handleDragStart(e, p.playerId)}
                      className="p-3 rounded-2xl bg-slate-900/90 border border-rose-500/30 hover:border-rose-400/60 flex items-center justify-between gap-3 shadow-md cursor-grab active:cursor-grabbing group transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-white truncate">
                          {p.name}
                        </span>
                      </div>

                      {/* Move to Blue Button (Mobile + Desktop quick click) */}
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => handleMovePlayer(p.playerId, 'TEAM_BLAU')}
                          className="px-2.5 py-1 rounded-xl bg-blue-500/15 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                          title="Ins Blaue Team verschieben"
                        >
                          <span className="hidden sm:inline">→ Blau</span>
                          <span className="sm:hidden">→</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="pt-3 text-[11px] text-rose-300/70 text-center font-medium">
            💡 Schüler können per Drag & Drop oder mit den Pfeilen bewegt werden
          </div>
        </div>

        {/* 🔵 BLUE TEAM CARD */}
        <div
          onDragOver={(e) => handleDragOver(e, 'TEAM_BLAU')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'TEAM_BLAU')}
          className={`rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 flex flex-col justify-between min-h-[320px] ${
            dragOverTeam === 'TEAM_BLAU'
              ? 'bg-blue-950/80 border-blue-400 ring-4 ring-blue-500/30 scale-[1.01]'
              : 'bg-gradient-to-b from-blue-950/40 via-slate-900/90 to-slate-950/95 border-blue-500/40 shadow-xl shadow-blue-950/30'
          }`}
        >
          <div className="space-y-4">
            {/* Team Header */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/50 text-blue-400 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
                  🔵
                </div>
                <div>
                  <h4 className="text-lg font-black text-blue-300 uppercase tracking-wide">
                    Blaues Team
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {bluePlayers.length} {bluePlayers.length === 1 ? 'Spieler' : 'Spieler'}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-xs font-black">
                {bluePlayers.length} Spieler
              </span>
            </div>

            {/* Players List */}
            {bluePlayers.length === 0 ? (
              <div className="py-10 text-center text-xs text-blue-300/60 italic border-2 border-dashed border-blue-500/20 rounded-2xl">
                Keine Spieler im Blauen Team.
                <br />
                Schüler hierher ziehen oder auf "Zu Rot" tippen.
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <AnimatePresence>
                  {bluePlayers.map((p) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={p.playerId}
                      draggable={!isLocked}
                      onDragStart={(e: any) => handleDragStart(e, p.playerId)}
                      className="p-3 rounded-2xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-400/60 flex items-center justify-between gap-3 shadow-md cursor-grab active:cursor-grabbing group transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-white truncate">
                          {p.name}
                        </span>
                      </div>

                      {/* Move to Red Button (Mobile + Desktop quick click) */}
                      {!isLocked && (
                        <button
                          type="button"
                          onClick={() => handleMovePlayer(p.playerId, 'TEAM_ROT')}
                          className="px-2.5 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                          title="Ins Rote Team verschieben"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Rot ←</span>
                          <span className="sm:hidden">←</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="pt-3 text-[11px] text-blue-300/70 text-center font-medium">
            💡 Schüler können per Drag & Drop oder mit den Pfeilen bewegt werden
          </div>
        </div>
      </div>
    </div>
  );
};
