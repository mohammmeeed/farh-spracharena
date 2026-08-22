import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  Trophy,
  Printer,
  ChevronDown,
  ChevronUp,
  User,
  HelpCircle,
  Lightbulb,
  Swords,
  X,
  Layers,
} from 'lucide-react';
import {
  QuestionHistoryItem,
  SessionStatistics,
  LeaderboardEntry,
  Team,
} from '../../types/game.types';

interface TeacherSessionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionHistory: QuestionHistoryItem[];
  sessionStats?: SessionStatistics;
  finalLeaderboard: LeaderboardEntry[];
  teams?: Record<string, Team>;
  level: string;
  totalGames: number;
}

type ReportTab = 'OVERVIEW' | 'QUESTIONS' | 'STUDENTS' | 'HARD_QUESTIONS';

export const TeacherSessionReportModal: React.FC<TeacherSessionReportModalProps> = ({
  isOpen,
  onClose,
  questionHistory = [],
  sessionStats,
  finalLeaderboard = [],
  teams,
  level,
  totalGames,
}) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('OVERVIEW');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
    finalLeaderboard[0]?.playerId || null
  );
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalQuestions = questionHistory.length;
  const averageAccuracy =
    sessionStats?.averageAccuracy ||
    (totalQuestions > 0
      ? Math.round(
          questionHistory.reduce((acc, q) => acc + q.stats.accuracyPercentage, 0) /
            totalQuestions
        )
      : 0);

  const selectedPlayer = finalLeaderboard.find((p) => p.playerId === selectedPlayerId);

  // Filter history for selected student
  const studentQuestionHistory = selectedPlayerId
    ? questionHistory.map((q) => {
        const studentResp = q.studentResponses.find((r) => r.playerId === selectedPlayerId);
        return {
          question: q,
          response: studentResp,
        };
      })
    : [];

  const studentCorrectCount = studentQuestionHistory.filter(
    (item) => item.response?.isCorrect
  ).length;
  const studentAccuracy =
    totalQuestions > 0 ? Math.round((studentCorrectCount / totalQuestions) * 100) : 0;

  // Hardest questions (lowest accuracy)
  const hardestQuestions = [...questionHistory]
    .sort((a, b) => a.stats.accuracyPercentage - b.stats.accuracyPercentage)
    .slice(0, 6);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-xl p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-5xl rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-b from-[#10172A] via-[#0D1526] to-[#0A0E1A] text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Navigation Tabs & Close */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>LEHRER-ANALYSE & ANTWORT-HISTORIE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Unterrichts-Statistiken</span>
              <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
                Niveau {level}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              title="Bericht drucken / als PDF speichern"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Drucken / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 pt-3 pb-2 border-b border-white/10 bg-slate-950/40 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'OVERVIEW'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 Übersicht</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('QUESTIONS')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'QUESTIONS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>📜 Fragen-Historie ({questionHistory.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('STUDENTS')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'STUDENTS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>👤 Schüler-Analyse ({finalLeaderboard.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('HARD_QUESTIONS')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'HARD_QUESTIONS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>💡 Schwerste Fragen & Grammatik</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW SUMMARY */}
          {/* ========================================================= */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              {/* Top Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-1">
                  <span className="text-xs text-indigo-300 font-bold block">
                    Klassen-Trefferquote
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-white font-mono">
                    {averageAccuracy}%
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Ø Richtige Antworten
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 space-y-1">
                  <span className="text-xs text-cyan-300 font-bold block">
                    Gespielte Fragen
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-cyan-400 font-mono">
                    {totalQuestions}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    in {totalGames} Spielen
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/30 space-y-1">
                  <span className="text-xs text-amber-300 font-bold block">
                    Aktive Schüler
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">
                    {finalLeaderboard.length}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Teilnehmer im Raum
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 space-y-1">
                  <span className="text-xs text-purple-300 font-bold block">
                    Längste Serie
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-purple-400 font-mono">
                    {sessionStats?.highestStreakPlayer?.streak || 0}x
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    {sessionStats?.highestStreakPlayer?.name || '–'}
                  </span>
                </div>
              </div>

              {/* Team Battle Final Showdown Card (if Team Battle was played) */}
              {teams && sessionStats?.teamStats && (
                <div className="glass-card rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 bg-gradient-to-b from-[#141B33] via-[#0E1528] to-[#0A0F1D] space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Swords className="w-5 h-5 text-amber-400" />
                      <span>Team Battle Endergebnis</span>
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      🔴 Rot gegen 🔵 Blau
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Red Team */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/60 border border-rose-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-base text-rose-300 flex items-center gap-2">
                          <span>🔴</span>
                          <span>{sessionStats.teamStats.rot.name}</span>
                        </span>
                        <span className="text-xs font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-lg border border-rose-500/30">
                          {sessionStats.teamStats.rot.membersCount} Spieler
                        </span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {sessionStats.teamStats.rot.score.toLocaleString('de-DE')} Pkt
                      </p>
                      <div className="flex items-center justify-between text-xs text-rose-200/80">
                        <span>Team-Trefferquote:</span>
                        <span className="font-mono font-bold text-white">
                          {sessionStats.teamStats.rot.accuracy}%
                        </span>
                      </div>
                    </div>

                    {/* Blue Team */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/60 border border-blue-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-base text-blue-300 flex items-center gap-2">
                          <span>🔵</span>
                          <span>{sessionStats.teamStats.blau.name}</span>
                        </span>
                        <span className="text-xs font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-lg border border-blue-500/30">
                          {sessionStats.teamStats.blau.membersCount} Spieler
                        </span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {sessionStats.teamStats.blau.score.toLocaleString('de-DE')} Pkt
                      </p>
                      <div className="flex items-center justify-between text-xs text-blue-200/80">
                        <span>Team-Trefferquote:</span>
                        <span className="font-mono font-bold text-white">
                          {sessionStats.teamStats.blau.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Podium & Top Students Ranking */}
              <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Klassen-Rangliste & Punkte</span>
                </h3>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {finalLeaderboard.map((entry, idx) => (
                    <div
                      key={entry.playerId}
                      className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-xl bg-slate-950 text-amber-300 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-white/10">
                          {idx === 0
                            ? '🥇'
                            : idx === 1
                            ? '🥈'
                            : idx === 2
                            ? '🥉'
                            : `#${idx + 1}`}
                        </span>
                        <span className="text-sm font-bold text-white truncate">
                          {entry.name}
                        </span>
                        {entry.teamId && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                              entry.teamId === 'TEAM_ROT'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {entry.teamId === 'TEAM_ROT' ? '🔴 Rot' : '🔵 Blau'}
                          </span>
                        )}
                      </div>

                      <span className="font-mono font-black text-sm text-amber-300 shrink-0">
                        {entry.score.toLocaleString('de-DE')} Pkt
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: QUESTIONS RESPONSE HISTORY (ALL QUESTIONS & ANSWERS) */}
          {/* ========================================================= */}
          {activeTab === 'QUESTIONS' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Klicke auf eine Frage, um die vollständigen Schüler-Antworten und Grammatik-Tipps anzuzeigen.
              </p>

              {questionHistory.map((q, idx) => {
                const isExpanded = expandedQuestionId === q.questionId;
                const correctAnsText = Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.join(' ')
                  : String(q.correctAnswer);

                return (
                  <div
                    key={q.questionId}
                    className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
                  >
                    {/* Collapsible Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedQuestionId(isExpanded ? null : q.questionId)
                      }
                      className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-black">
                            Frage #{idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                            {q.gameType}
                          </span>
                          {q.category && (
                            <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 text-[11px] font-medium">
                              {q.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-white line-clamp-2">
                          {q.questionText}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span
                            className={`text-sm font-black font-mono block ${
                              q.stats.accuracyPercentage >= 70
                                ? 'text-emerald-400'
                                : q.stats.accuracyPercentage >= 40
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {q.stats.accuracyPercentage}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {q.stats.correctCount}/{q.stats.totalPlayers} Richtig
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Detail Body */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/60 space-y-4"
                        >
                          {/* Correct Answer & German Grammar Tip */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                                ✓ Richtige Lösung:
                              </span>
                              <p className="text-sm font-black text-white">
                                {correctAnsText}
                              </p>
                            </div>

                            {q.explanation && (
                              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider flex items-center gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Grammatik- & Worterklärung:</span>
                                </span>
                                <p className="text-xs text-indigo-100/90 leading-relaxed">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Student Answers Table */}
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                              Schüler-Antworten im Detail:
                            </h5>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.studentResponses.map((resp) => {
                                const respAnswerText = Array.isArray(resp.answer)
                                  ? resp.answer.join(' ')
                                  : String(resp.answer);

                                return (
                                  <div
                                    key={resp.playerId}
                                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                                      resp.isCorrect
                                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                                        : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      {resp.isCorrect ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                      )}
                                      <div className="min-w-0">
                                        <span className="font-bold text-white block truncate">
                                          {resp.playerName}
                                        </span>
                                        <span className="text-[11px] text-slate-400 truncate block">
                                          Antwort: <span className="text-slate-200 font-semibold">{respAnswerText}</span>
                                        </span>
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0 font-mono">
                                      <span
                                        className={`font-bold block ${
                                          resp.isCorrect ? 'text-emerald-400' : 'text-slate-500'
                                        }`}
                                      >
                                        +{resp.pointsEarned} Pkt
                                      </span>
                                      {resp.responseTimeMs && (
                                        <span className="text-[10px] text-slate-400">
                                          {(resp.responseTimeMs / 1000).toFixed(1)}s
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: STUDENT-BY-STUDENT PERFORMANCE BREAKDOWN */}
          {/* ========================================================= */}
          {activeTab === 'STUDENTS' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Student Selector List (4 cols) */}
              <div className="md:col-span-4 glass-card rounded-2xl p-4 border border-white/10 space-y-2 max-h-[500px] overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-white/10">
                  Schüler auswählen:
                </h4>

                {finalLeaderboard.map((p) => {
                  const isSelected = p.playerId === selectedPlayerId;
                  return (
                    <button
                      key={p.playerId}
                      type="button"
                      onClick={() => setSelectedPlayerId(p.playerId)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-slate-950 text-xs font-bold text-amber-400 flex items-center justify-center shrink-0">
                          {p.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {p.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                        {p.score} Pkt
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Detailed Student History (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                {selectedPlayer ? (
                  <>
                    {/* Student Snapshot Card */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-black text-xl">
                          {selectedPlayer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">
                            {selectedPlayer.name}
                          </h3>
                          <span className="text-xs text-slate-400 font-mono">
                            Rang #{selectedPlayer.rank || 1} • {selectedPlayer.score} Gesamtpunkte
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">
                            Trefferquote
                          </span>
                          <span
                            className={`text-xl font-black font-mono ${
                              studentAccuracy >= 70
                                ? 'text-emerald-400'
                                : studentAccuracy >= 40
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {studentAccuracy}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">
                            Richtig / Gesamt
                          </span>
                          <span className="text-xl font-black font-mono text-white">
                            {studentCorrectCount} / {totalQuestions}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Question by question answers for this student */}
                    <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                      {studentQuestionHistory.map(({ question: q, response: resp }, idx) => {
                        const isCorrect = resp?.isCorrect || false;
                        const respAnswerText = Array.isArray(resp?.answer)
                          ? resp?.answer.join(' ')
                          : String(resp?.answer || 'Keine Antwort');

                        const correctAnsText = Array.isArray(q.correctAnswer)
                          ? q.correctAnswer.join(' ')
                          : String(q.correctAnswer);

                        return (
                          <div
                            key={q.questionId}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              isCorrect
                                ? 'bg-emerald-950/30 border-emerald-500/30'
                                : 'bg-rose-950/30 border-rose-500/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-slate-400">
                                    Frage #{idx + 1}
                                  </span>
                                  {isCorrect ? (
                                    <span className="px-2 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                      ✓ Richtig (+{resp?.pointsEarned || 0} Pkt)
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.2 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                      ✗ Falsch
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-white">
                                  {q.questionText}
                                </p>
                                <div className="text-[11px] space-y-0.5 pt-1">
                                  <p className="text-slate-300">
                                    Gegebene Antwort: <span className="font-semibold text-white">{respAnswerText}</span>
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-emerald-400 font-medium">
                                      Richtige Antwort: <span className="font-bold">{correctAnsText}</span>
                                    </p>
                                  )}
                                </div>
                              </div>

                              {resp?.responseTimeMs && (
                                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                  {(resp.responseTimeMs / 1000).toFixed(1)}s
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    Wähle links einen Schüler aus, um seine individuellen Antworten anzuzeigen.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: HARDEST QUESTIONS FOR CLASSROOM REVIEW */}
          {/* ========================================================= */}
          {activeTab === 'HARD_QUESTIONS' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-1">
                <span className="font-bold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Pädagogischer Review für Lehrer Farh</span>
                </span>
                <p className="text-xs text-amber-200/80">
                  Diese Fragen hatten die niedrigste Erfolgsquote in der Klasse. Nutze die didaktischen Erklärungen für eine kurze Wiederholung mit den Schülern.
                </p>
              </div>

              <div className="space-y-3">
                {hardestQuestions.map((q, idx) => {
                  const correctAnsText = Array.isArray(q.correctAnswer)
                    ? q.correctAnswer.join(' ')
                    : String(q.correctAnswer);

                  return (
                    <div
                      key={q.questionId}
                      className="glass-card rounded-2xl p-5 border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-slate-900 to-slate-950 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-mono text-xs font-black">
                              Schwierigkeit Rang #{idx + 1}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {q.gameType} • {q.category || ''}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {q.questionText}
                          </h4>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-black font-mono text-rose-400 block">
                            {q.stats.accuracyPercentage}% Treffer
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {q.stats.incorrectCount} falsche Antworten
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                            ✓ Richtige Lösung:
                          </span>
                          <span className="text-xs sm:text-sm font-black text-white">
                            {correctAnsText}
                          </span>
                        </div>

                        {q.explanation && (
                          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
                            <span className="text-[10px] uppercase font-bold text-indigo-300 flex items-center gap-1">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                              <span>Grammatikregel für die Klasse:</span>
                            </span>
                            <p className="text-xs text-indigo-100/90 leading-relaxed mt-0.5">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Done Button */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Farh SprachArena — Vollständiger Unterrichtsbericht
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
