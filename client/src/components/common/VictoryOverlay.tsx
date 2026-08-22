import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, Home, BarChart3 } from 'lucide-react';
import { LeaderboardEntry, Team, QuestionHistoryItem, SessionStatistics } from '../../types/game.types';
import { Confetti } from './Confetti';
import { useAudio } from '../../hooks/useAudio';
import { TeacherSessionReportModal } from '../teacher/TeacherSessionReportModal';

interface VictoryOverlayProps {
  leaderboard: LeaderboardEntry[];
  totalGames: number;
  totalQuestions: number;
  teams?: Record<string, Team>;
  winner?: LeaderboardEntry | Team;
  isTeacher: boolean;
  questionHistory?: QuestionHistoryItem[];
  sessionStats?: SessionStatistics;
  level?: string;
  onRestart?: () => void;
  onExit: () => void;
}

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({
  leaderboard,
  totalGames,
  totalQuestions,
  teams,
  winner,
  isTeacher,
  questionHistory = [],
  sessionStats,
  level = 'A1-B2',
  onRestart,
  onExit,
}) => {
  const { playSound } = useAudio();
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    playSound('victory');
  }, [playSound]);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const isTeamWinner = winner && 'teamId' in winner;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl p-4 md:p-8 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <Confetti durationMs={6000} particleCount={160} />

      <div className="glass-card w-full max-w-3xl rounded-3xl p-6 md:p-10 border border-amber-500/30 shadow-2xl shadow-amber-500/10 text-center space-y-8 my-auto relative z-10">
        {/* Arena Branding */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Farh SprachArena</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black gradient-text-gold tracking-tight mt-2">
            Spielrunde beendet! 🎉
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Großartige Leistung in allen {totalGames} Spielen ({totalQuestions} Fragen)!
          </p>
        </div>

        {/* Team Battle Winner Highlight (if applicable) */}
        {isTeamWinner && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-rose-950/60 border border-amber-400/40 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              🏆 Team-Sieger
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {(winner as Team).name || (winner as Team).teamName}
            </h2>
            <p className="text-amber-300 font-mono font-bold text-lg">
              {winner.score.toLocaleString('de-DE')} Punkte
            </p>
          </div>
        )}


        {/* Top 3 Podium */}
        {leaderboard.length > 0 && (
          <div className="grid grid-cols-3 gap-2 md:gap-4 items-end pt-4 pb-2">
            {/* 2nd Place */}
            {top2 ? (
              <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-slate-800/60 border border-slate-400/30 space-y-1">
                <span className="text-2xl md:text-3xl">🥈</span>
                <span className="font-bold text-xs md:text-sm text-slate-200 truncate w-full">
                  {top2.name}
                </span>
                <span className="font-mono font-bold text-xs md:text-sm text-slate-300">
                  {top2.score.toLocaleString('de-DE')}
                </span>
                <span className="text-[10px] text-slate-400">2. Platz</span>
              </div>
            ) : (
              <div />
            )}

            {/* 1st Place (Winner) */}
            {top1 && (
              <div className="flex flex-col items-center p-4 md:p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-950/40 border-2 border-amber-400/60 shadow-xl shadow-amber-500/20 space-y-1 transform -translate-y-2">
                <span className="text-4xl md:text-5xl">🥇</span>
                <span className="font-black text-sm md:text-lg text-white truncate w-full">
                  {top1.name}
                </span>
                <span className="font-mono font-black text-base md:text-xl text-amber-300">
                  {top1.score.toLocaleString('de-DE')}
                </span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Champion 👑
                </span>
              </div>
            )}

            {/* 3rd Place */}
            {top3 ? (
              <div className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-slate-800/60 border border-amber-700/30 space-y-1">
                <span className="text-2xl md:text-3xl">🥉</span>
                <span className="font-bold text-xs md:text-sm text-slate-200 truncate w-full">
                  {top3.name}
                </span>
                <span className="font-mono font-bold text-xs md:text-sm text-amber-400">
                  {top3.score.toLocaleString('de-DE')}
                </span>
                <span className="text-[10px] text-slate-400">3. Platz</span>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-white/10">
          {questionHistory.length > 0 && (
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/40"
            >
              <BarChart3 className="w-4 h-4 text-amber-300" />
              <span>📊 Antwort-Historie & Statistiken</span>
            </button>
          )}

          {isTeacher && onRestart && (
            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Neue Runde starten</span>
            </button>
          )}

          <button
            onClick={onExit}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Zurück zur Startseite</span>
          </button>
        </div>
      </div>

      {/* Full Pedagogical Report Modal */}
      <TeacherSessionReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        questionHistory={questionHistory}
        sessionStats={sessionStats}
        finalLeaderboard={leaderboard}
        teams={teams}
        level={level}
        totalGames={totalGames}
      />
    </div>
  );
};
