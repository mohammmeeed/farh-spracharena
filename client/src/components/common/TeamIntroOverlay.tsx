import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import { Player, Team } from '../../types/game.types';
import { useAudio } from '../../hooks/useAudio';

interface TeamIntroOverlayProps {
  teams: Record<string, Team>;
  players: Player[];
  durationMs?: number;
  onComplete?: () => void;
}

export const TeamIntroOverlay: React.FC<TeamIntroOverlayProps> = ({
  teams,
  players,
  durationMs = 3800,
  onComplete,
}) => {
  const { playSound } = useAudio();
  const [phase, setPhase] = useState<'INTRO' | 'CLASH' | 'READY'>('INTRO');

  const teamRot = teams?.TEAM_ROT;
  const teamBlau = teams?.TEAM_BLAU;

  const redPlayers = players.filter(
    (p) => p.teamId === 'TEAM_ROT' || teamRot?.playerIds.includes(p.playerId)
  );
  const bluePlayers = players.filter(
    (p) => p.teamId === 'TEAM_BLAU' || teamBlau?.playerIds.includes(p.playerId)
  );

  useEffect(() => {
    playSound('victory');

    const clashTimer = setTimeout(() => {
      setPhase('CLASH');
    }, 1200);

    const readyTimer = setTimeout(() => {
      setPhase('READY');
      playSound('warning');
    }, 2400);

    const finishTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      clearTimeout(clashTimer);
      clearTimeout(readyTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onComplete, playSound]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="w-1/2 h-full bg-gradient-to-r from-rose-600/20 via-rose-500/10 to-transparent blur-3xl" />
        <div className="w-1/2 h-full bg-gradient-to-l from-blue-600/20 via-blue-500/10 to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6 text-center">
        {/* Top Battle Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-1"
        >
          <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs sm:text-sm font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-glow-gold">
            <Swords className="w-4 h-4 text-amber-400" />
            <span>TEAM BATTLE SHOWDOWN</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Rot <span className="text-amber-400">gegen</span> Blau
          </h2>
        </motion.div>

        {/* Esports Team Faceoff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 sm:gap-6 items-center">
          {/* Left: 🔴 RED TEAM (5 cols) */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-rose-950/90 via-slate-900/90 to-slate-950/90 border-2 border-rose-500/50 shadow-2xl shadow-rose-950/60 text-left space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-rose-500/30 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center justify-center text-2xl font-bold shadow-lg shadow-rose-500/30 shrink-0">
                🔴
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-rose-300 uppercase tracking-wide">
                  Rotes Team
                </h3>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  {redPlayers.length} Kämpfer
                </span>
              </div>
            </div>

            {/* Red Roster */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {redPlayers.map((p) => (
                <span
                  key={p.playerId}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Center: ⚔️ VS BADGE (1 col) */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <motion.div
              animate={
                phase === 'CLASH' || phase === 'READY'
                  ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-black text-xl sm:text-2xl shadow-2xl shadow-amber-500/40"
            >
              VS
            </motion.div>
          </div>

          {/* Right: 🔵 BLUE TEAM (5 cols) */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-blue-950/90 via-slate-900/90 to-slate-950/90 border-2 border-blue-500/50 shadow-2xl shadow-blue-950/60 text-right space-y-4"
          >
            <div className="flex items-center gap-3 justify-end border-b border-blue-500/30 pb-3 flex-row-reverse">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/50 text-blue-400 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30 shrink-0">
                🔵
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-blue-300 uppercase tracking-wide">
                  Blaues Team
                </h3>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  {bluePlayers.length} Kämpfer
                </span>
              </div>
            </div>

            {/* Blue Roster */}
            <div className="flex flex-wrap gap-2 justify-end max-h-48 overflow-y-auto pl-1">
              {bluePlayers.map((p) => (
                <span
                  key={p.playerId}
                  className="px-3.5 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Ready / Countdown Banner */}
        <motion.div
          animate={phase === 'READY' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="pt-4"
        >
          <div className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg sm:text-2xl shadow-glow-gold tracking-wide">
            <span>🔥 BEREIT MACHEN! DAS SPIEL STARTET JETZT...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
