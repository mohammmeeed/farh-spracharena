import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, TrendingUp, Sparkles, Award } from 'lucide-react';
import { LeaderboardEntry, Team } from '../../types/game.types';
import { useAudio } from '../../hooks/useAudio';

export interface AnimatedLeaderboardProps {
  leaderboard: LeaderboardEntry[];
  previousLeaderboard?: LeaderboardEntry[];
  currentPlayerId?: string;
  teams?: Record<string, Team>;
  isTeacher?: boolean;
  onComplete?: () => void;
  className?: string;
  durationMs?: number; // defaults to 4000ms
  title?: string;
}

interface ProcessedEntry {
  playerId: string;
  name: string;
  oldScore: number;
  newScore: number;
  pointsGained: number;
  oldRank: number;
  newRank: number;
  streak: number;
  teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  isCurrent: boolean;
}

export const AnimatedLeaderboard: React.FC<AnimatedLeaderboardProps> = ({
  leaderboard = [],
  previousLeaderboard = [],
  currentPlayerId,
  teams,
  isTeacher = false,
  onComplete,
  className = '',
  durationMs = 4000,
  title = '🏆 KLASSENRANGLISTE',
}) => {
  const { playSound } = useAudio();

  // Animation timeline stages:
  // 1: ENTERING (0 - 0.8s) -> Show cards at old positions & old scores
  // 2: POINTS_TICK (0.8s - 1.2s) -> Points count upward, +Points badge pops
  // 3: REORDERING (1.2s - 2.0s) -> Cards smoothly slide up/down to new ranks
  // 4: ACHIEVEMENT (2.0s - 3.5s) -> Celebratory message pops for rising students
  // 5: PREPARE_NEXT (3.5s - 4.0s) -> Subtle countdown bar to next phase
  const [animationStage, setAnimationStage] = useState<
    'ENTERING' | 'POINTS_TICK' | 'REORDERING' | 'ACHIEVEMENT' | 'PREPARE_NEXT' | 'COMPLETED'
  >('ENTERING');

  // Interpolated animated scores map for smooth number ticking
  const [displayedScores, setDisplayedScores] = useState<Record<string, number>>({});

  // Build unified processed player entries combining old and new states
  const processedPlayers = useMemo<ProcessedEntry[]>(() => {
    if (!leaderboard || leaderboard.length === 0) return [];

    // Map previous standings
    const prevMap = new Map<string, { rank: number; score: number }>();
    if (previousLeaderboard && previousLeaderboard.length > 0) {
      previousLeaderboard.forEach((p, idx) => {
        prevMap.set(p.playerId, { rank: p.rank || idx + 1, score: p.score });
      });
    }

    return leaderboard.map((curr, idx) => {
      const newRank = curr.rank || idx + 1;
      const prevData = prevMap.get(curr.playerId);
      const pointsGained = curr.lastPointsEarned ?? 0;

      // Old score is either explicitly from previous leaderboard or (current score - lastPointsEarned)
      const oldScore = prevData !== undefined ? prevData.score : Math.max(0, curr.score - pointsGained);
      const oldRank = prevData !== undefined ? prevData.rank : newRank;

      return {
        playerId: curr.playerId,
        name: curr.name,
        oldScore,
        newScore: curr.score,
        pointsGained,
        oldRank,
        newRank,
        streak: curr.streak || 0,
        teamId: curr.teamId,
        isCurrent: Boolean(currentPlayerId && curr.playerId === currentPlayerId),
      };
    });
  }, [leaderboard, previousLeaderboard, currentPlayerId]);

  // Current student entry helper
  const currentStudent = useMemo(() => {
    return processedPlayers.find((p) => p.isCurrent);
  }, [processedPlayers]);

  const rankDelta = currentStudent ? currentStudent.oldRank - currentStudent.newRank : 0;
  const didRankUp = rankDelta > 0;
  const isTop3 = currentStudent ? currentStudent.newRank <= 3 : false;

  // Initialize initial displayed scores
  useEffect(() => {
    const initialScores: Record<string, number> = {};
    processedPlayers.forEach((p) => {
      initialScores[p.playerId] = p.oldScore;
    });
    setDisplayedScores(initialScores);
  }, [processedPlayers]);

  // Precise 4.0-Second Visual Timeline Orchestrator
  useEffect(() => {
    const scaleFactor = durationMs / 4000;

    // Stage 1 -> 2: At 0.8s, start counting points upward and trigger points sound
    const timer1 = setTimeout(() => {
      setAnimationStage('POINTS_TICK');

      // Check if any student gained points
      const anyPoints = processedPlayers.some((p) => p.pointsGained > 0);
      if (anyPoints) {
        playSound('pointsGained');
      }

      // Animate scores smoothly from oldScore to newScore over 350ms
      const startTime = performance.now();
      const tickDuration = 350;

      const animateScores = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / tickDuration);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

        const updated: Record<string, number> = {};
        processedPlayers.forEach((p) => {
          const delta = p.newScore - p.oldScore;
          updated[p.playerId] = Math.round(p.oldScore + delta * easeProgress);
        });

        setDisplayedScores(updated);

        if (progress < 1) {
          requestAnimationFrame(animateScores);
        } else {
          // Final exact authoritative scores
          const finalMap: Record<string, number> = {};
          processedPlayers.forEach((p) => {
            finalMap[p.playerId] = p.newScore;
          });
          setDisplayedScores(finalMap);
        }
      };

      requestAnimationFrame(animateScores);
    }, Math.round(800 * scaleFactor));

    // Stage 2 -> 3: At 1.2s, trigger FLIP position-change reordering
    const timer2 = setTimeout(() => {
      setAnimationStage('REORDERING');
    }, Math.round(1200 * scaleFactor));

    // Stage 3 -> 4: At 2.0s, trigger celebratory achievement moment & sounds
    const timer3 = setTimeout(() => {
      setAnimationStage('ACHIEVEMENT');

      if (!isTeacher && currentStudent) {
        if (didRankUp) {
          playSound('rankUp');
        } else if (isTop3 && currentStudent.pointsGained > 0) {
          playSound('top3');
        }
      }
    }, Math.round(2000 * scaleFactor));

    // Stage 4 -> 5: At 3.5s, prepare for next phase
    const timer4 = setTimeout(() => {
      setAnimationStage('PREPARE_NEXT');
    }, Math.round(3500 * scaleFactor));

    // Stage 5 -> Complete: At 4.0s
    const timer5 = setTimeout(() => {
      setAnimationStage('COMPLETED');
      onComplete?.();
    }, durationMs);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [durationMs, onComplete, playSound, processedPlayers, isTeacher, currentStudent, didRankUp, isTop3]);

  // Determine current display list and sort order based on animation stage
  const sortedPlayers = useMemo(() => {
    const list = [...processedPlayers];
    if (animationStage === 'ENTERING' || animationStage === 'POINTS_TICK') {
      // Sort by previous rank initially
      return list.sort((a, b) => a.oldRank - b.oldRank);
    }
    // Sort by new authoritative rank
    return list.sort((a, b) => a.newRank - b.newRank);
  }, [processedPlayers, animationStage]);

  // Determine visible players: Top 5, plus pin current student if outside Top 5
  const visiblePlayers = useMemo(() => {
    const topCount = 5;
    const topList = sortedPlayers.slice(0, topCount);

    if (currentStudent && !topList.some((p) => p.playerId === currentStudent.playerId)) {
      return {
        top: topList.slice(0, 4),
        pinnedUser: currentStudent,
        hasSeparator: true,
      };
    }

    return {
      top: topList,
      pinnedUser: null,
      hasSeparator: false,
    };
  }, [sortedPlayers, currentStudent]);

  // Medal / rank badge generator
  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="w-8 h-8 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-base shadow-lg shadow-amber-500/30 shrink-0">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="w-8 h-8 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 text-slate-950 flex items-center justify-center font-black text-base shadow-lg shadow-slate-400/20 shrink-0">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="w-8 h-8 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 flex items-center justify-center font-black text-base shadow-lg shadow-amber-700/20 shrink-0">
            🥉
          </span>
        );
      default:
        return (
          <span className="w-8 h-8 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center justify-center font-mono font-bold text-sm shrink-0">
            {rank}
          </span>
        );
    }
  };

  // Get motivational celebratory phrase for student
  const getCelebratoryMessage = () => {
    if (!currentStudent) return null;
    if (rankDelta >= 2) {
      return {
        icon: '🚀',
        title: `+${rankDelta} Plätze aufgeholt!`,
        subtitle: 'Du steigst rasant auf!',
        color: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30 border-emerald-400/50 text-emerald-300',
      };
    }
    if (rankDelta === 1) {
      return {
        icon: '🔥',
        title: '+1 Platz aufgestiegen!',
        subtitle: 'Super gemacht, weiter so!',
        color: 'from-orange-500/30 via-amber-500/20 to-yellow-500/30 border-orange-400/50 text-amber-300',
      };
    }
    if (currentStudent.newRank <= 3 && currentStudent.pointsGained > 0) {
      return {
        icon: '🏆',
        title: `Top-Platzierung: Platz #${currentStudent.newRank}!`,
        subtitle: 'Du bist auf dem Siegerpodest!',
        color: 'from-amber-500/30 via-yellow-500/20 to-amber-600/30 border-amber-400/50 text-amber-300',
      };
    }
    if (currentStudent.pointsGained > 0) {
      return {
        icon: '✨',
        title: `+${currentStudent.pointsGained.toLocaleString('de-DE')} Punkte gesichert!`,
        subtitle: 'Klasse Leistung!',
        color: 'from-indigo-500/30 via-purple-500/20 to-pink-500/30 border-indigo-400/50 text-indigo-300',
      };
    }
    return null;
  };

  const celeb = getCelebratoryMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`w-full max-w-3xl mx-auto rounded-3xl p-4 sm:p-6 bg-[#0B0F19]/95 border-2 border-indigo-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(15,23,42,0.8)] flex flex-col gap-4 select-none relative overflow-hidden ${className}`}
    >
      {/* Ambient background glow accents */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/10">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider border border-indigo-500/30">
                Live
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {processedPlayers.length} {processedPlayers.length === 1 ? 'Teilnehmer' : 'Teilnehmer'} im Spiel
            </p>
          </div>
        </div>

        {/* 4-Second Progress Bar Indicator */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Ranglisten-Update</span>
          </span>
          <div className="w-24 sm:w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Team Battle Scores (if active) */}
      {teams && teams.TEAM_ROT && teams.TEAM_BLAU && (
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="p-3 rounded-2xl bg-rose-950/70 border border-rose-500/40 flex items-center justify-between shadow-lg shadow-rose-950/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔴</span>
              <span className="font-bold text-xs sm:text-sm text-rose-200">Rotes Team</span>
            </div>
            <span className="font-mono font-black text-sm sm:text-base text-white">
              {teams.TEAM_ROT.score.toLocaleString('de-DE')} Pkt
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-950/70 border border-blue-500/40 flex items-center justify-between shadow-lg shadow-blue-950/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔵</span>
              <span className="font-bold text-xs sm:text-sm text-blue-200">Blaues Team</span>
            </div>
            <span className="font-mono font-black text-sm sm:text-base text-white">
              {teams.TEAM_BLAU.score.toLocaleString('de-DE')} Pkt
            </span>
          </div>
        </div>
      )}

      {/* 2. Personal Achievement Toast Banner (Slides in at 2.0s) */}
      <AnimatePresence>
        {!isTeacher && celeb && (animationStage === 'ACHIEVEMENT' || animationStage === 'PREPARE_NEXT') && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`p-3 sm:p-3.5 rounded-2xl border-2 bg-gradient-to-r ${celeb.color} shadow-xl flex items-center justify-between gap-3 relative z-20`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl sm:text-3xl animate-bounce">{celeb.icon}</span>
              <div className="min-w-0">
                <span className="font-black text-sm sm:text-base text-white block truncate leading-tight">
                  {celeb.title}
                </span>
                <span className="text-xs font-semibold text-slate-200 block truncate">
                  {celeb.subtitle}
                </span>
              </div>
            </div>

            {didRankUp && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs font-black shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>▲ +{rankDelta}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Smooth FLIP Reordering Animated Ranking Cards List */}
      <div className="space-y-2 relative z-10 flex-1">
        <AnimatePresence>
          {visiblePlayers.top.map((player) => {
            const isCurrent = player.isCurrent;
            const currentRank =
              animationStage === 'ENTERING' || animationStage === 'POINTS_TICK'
                ? player.oldRank
                : player.newRank;
            const playerRankDelta = player.oldRank - player.newRank;
            const currentDisplayScore = displayedScores[player.playerId] ?? player.oldScore;
            const team = player.teamId && teams ? teams[player.teamId] : undefined;

            return (
              <motion.div
                key={player.playerId}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { type: 'spring', damping: 24, stiffness: 240 },
                  opacity: { duration: 0.25 },
                }}
                className={`flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900/90 border-2 border-indigo-400 text-white shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/85 border border-slate-800/90 hover:border-slate-700 text-slate-200'
                }`}
              >
                {/* Left: Rank Medal & Name & Badges */}
                <div className="flex items-center gap-3 min-w-0">
                  {getRankMedal(currentRank)}

                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-sm sm:text-base truncate ${
                        isCurrent ? 'font-black text-amber-300 drop-shadow-sm' : 'font-bold text-slate-100'
                      }`}
                    >
                      {player.name}
                    </span>

                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                        <span>DU</span>
                      </span>
                    )}

                    {team && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          team.teamId === 'TEAM_BLAU'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {team.name || (team as any).teamName}
                      </span>
                    )}

                    {player.streak > 1 && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 text-xs text-orange-400 font-bold shrink-0">
                        <Flame className="w-3 h-3 fill-orange-400" />
                        <span>{player.streak}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Rank Movement Delta + Score + Points Gained Ticker */}
                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Rank Delta Badge (Visible after reordering begins) */}
                  {animationStage !== 'ENTERING' && animationStage !== 'POINTS_TICK' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xs font-mono font-black"
                    >
                      {playerRankDelta > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ▲ +{playerRankDelta}
                        </span>
                      ) : playerRankDelta < 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          ▼ {playerRankDelta}
                        </span>
                      ) : (
                        <span className="px-1.5 text-slate-500">―</span>
                      )}
                    </motion.div>
                  )}

                  {/* Points Gained Indicator (+X Pkt) */}
                  {animationStage !== 'ENTERING' && player.pointsGained > 0 && (
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0, x: 10 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black font-mono shadow-sm"
                    >
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>+{player.pointsGained.toLocaleString('de-DE')}</span>
                    </motion.span>
                  )}

                  {/* Smooth Animated Points Total */}
                  <div className="text-right min-w-[75px] sm:min-w-[90px]">
                    <span
                      className={`font-mono font-black text-sm sm:text-base block tracking-tight ${
                        isCurrent ? 'text-amber-300' : 'text-slate-100'
                      }`}
                    >
                      {currentDisplayScore.toLocaleString('de-DE')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block -mt-0.5">
                      Punkte
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Separator and Pinned Current Student Card (if student is ranked 6+) */}
        {visiblePlayers.hasSeparator && visiblePlayers.pinnedUser && (
          <>
            <div className="flex items-center justify-center py-1 gap-2 text-slate-600 text-xs font-bold">
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </div>

            {(() => {
              const pinned = visiblePlayers.pinnedUser;
              const currentRank =
                animationStage === 'ENTERING' || animationStage === 'POINTS_TICK'
                  ? pinned.oldRank
                  : pinned.newRank;
              const currentDisplayScore = displayedScores[pinned.playerId] ?? pinned.oldScore;
              const playerRankDelta = pinned.oldRank - pinned.newRank;

              return (
                <motion.div
                  layout
                  className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/70 via-purple-900/60 to-slate-900/90 border-2 border-indigo-400 text-white shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/30"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {getRankMedal(currentRank)}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm sm:text-base font-black text-amber-300 truncate">
                        {pinned.name}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0">
                        <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
                        <span>DU</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {animationStage !== 'ENTERING' && animationStage !== 'POINTS_TICK' && (
                      <div className="text-xs font-mono font-black">
                        {playerRankDelta > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ▲ +{playerRankDelta}
                          </span>
                        ) : playerRankDelta < 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            ▼ {playerRankDelta}
                          </span>
                        ) : (
                          <span className="px-1.5 text-slate-500">―</span>
                        )}
                      </div>
                    )}

                    {animationStage !== 'ENTERING' && pinned.pointsGained > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black font-mono">
                        +{pinned.pointsGained.toLocaleString('de-DE')}
                      </span>
                    )}

                    <div className="text-right min-w-[75px] sm:min-w-[90px]">
                      <span className="font-mono font-black text-sm sm:text-base text-amber-300 block">
                        {currentDisplayScore.toLocaleString('de-DE')}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block -mt-0.5">
                        Punkte
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </>
        )}
      </div>
    </motion.div>
  );
};
