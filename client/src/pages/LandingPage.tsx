import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  Globe2,
  Trophy,
  Music,
  QrCode,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';
import { GAME_LEVELS } from '../utils/constants';
import { GameLevel, GameType } from '../types/game.types';

interface LandingPageProps {
  isConnected?: boolean;
  socketId?: string | null;
  latency?: number | null;
  serverUrl?: string;
  onOpenJoinModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenJoinModal,
}) => {
  const navigate = useNavigate();
  const [selectedLevelPreview, setSelectedLevelPreview] = useState<GameLevel>('A2');
  const [selectedGamePreview, setSelectedGamePreview] = useState<GameType>('SCHNELLANTWORT');

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambience Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-96 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[800px] right-1/4 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-24">
        {/* ============================================================ */}
        {/* HERO SECTION: Teacher Farh Spotlight & Actions               */}
        {/* ============================================================ */}
        <section className="relative pt-2 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Badges, Value Proposition, Action CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Official Teacher Brand Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>Deutsch mit Farh</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-200 font-medium">Interaktive SprachArena</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  Deutsch lernen. <br />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                    Zukunft gestalten.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 pt-2">
                  Die smarte Echtzeit-Multiplayer-Plattform für einen begeisternden Deutschunterricht.
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Klassenzimmer-Duelle, Wortschatz-Battles und Satzbau-Rennen in Echtzeit. Schüler treten ohne Registrierung einfach per <strong className="text-amber-300 font-semibold">QR-Code oder 6-stelligem PIN</strong> bei.
              </p>

              {/* Main Primary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="btn-teacher-hero"
                  onClick={() => navigate('/teacher')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-glow-gold hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Lehrer-Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="btn-join-hero"
                  onClick={onOpenJoinModal}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 border border-slate-700 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-xl">🎮</span>
                  <span>Spiel beitreten (PIN)</span>
                </button>
              </div>

              {/* Highlights Checklist */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Keine Schüler-Accounts nötig</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Anti-Wiederholung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>In-Game Audio & Soundeffekte</span>
                </div>
              </div>
            </div>

            {/* Right Column: Teacher Farh Featured Visual Frame */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-84 md:w-96 flex flex-col items-center">
                {/* Rotating & Glowing Aura Behind Teacher */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-rose-500/20 to-cyan-500/30 rounded-full blur-2xl animate-pulse" />

                {/* Outer Decorative Gradient Ring */}
                <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-rose-500 shadow-2xl shadow-amber-500/30">
                  {/* Inner Frame */}
                  <div className="relative w-64 h-64 sm:w-76 sm:h-76 rounded-full overflow-hidden border-4 border-[#0B0F19] bg-[#0B0F19] shadow-inner">
                    <img
                      src="/teacher-farh.png"
                      alt="Lehrer Farh - Deutsch mit Farh"
                      className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Quote Badge Bottom */}
                <div className="relative -mt-6 z-20 px-5 py-2.5 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
                    ✨
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">Lehrer Farh</p>
                    <p className="text-[11px] text-amber-300/90 font-medium italic">
                      „Jeden Tag ein Schritt zum Erfolg!“
                    </p>
                  </div>
                </div>

                {/* Floating CEFR Badge Top-Right */}
                <div className="absolute -top-2 right-4 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>A1 • A2 • B1 • B2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Platform Metrics Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl p-4.5 text-center border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">112+</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Geprüfte Fragen</div>
              <div className="text-[11px] text-slate-500">A1, A2, B1, B2 nach GER</div>
            </div>

            <div className="glass-card rounded-2xl p-4.5 text-center border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">5 Modi</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Multiplayer-Games</div>
              <div className="text-[11px] text-slate-500">Schnellantwort bis Team Battle</div>
            </div>

            <div className="glass-card rounded-2xl p-4.5 text-center border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">0 Sek.</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Anmeldung nötig</div>
              <div className="text-[11px] text-slate-500">Sofort-Beitritt via QR / PIN</div>
            </div>

            <div className="glass-card rounded-2xl p-4.5 text-center border border-slate-800 hover:border-indigo-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">Echtzeit</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Socket.IO Synchron</div>
              <div className="text-[11px] text-slate-500">Live-Timer & Musiksystem</div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: 5 Interactive Multiplayer Games                   */}
        {/* ============================================================ */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Didaktische Spielformate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              5 abwechslungsreiche Multiplayer-Spiele
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Speziell konzipiert für interaktive Unterrichtsstunden, Gruppenarbeit und Motivation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Game 1: Schnellantwort */}
            <div
              onClick={() => setSelectedGamePreview('SCHNELLANTWORT')}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedGamePreview === 'SCHNELLANTWORT'
                  ? 'border-amber-400/80 bg-amber-500/10 shadow-glow-gold scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
                  MULTIPLE CHOICE
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">Schnellantwort</h3>
              <p className="text-xs font-medium text-amber-300 mt-0.5">Speed-Quiz gegen die Uhr</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                4 zufällig sortierte Antwortoptionen mit dynamischem Zeitbonus und Streak-Multiplikator für Serien-Erfolge.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Fokus: Grammatik & Wissen</span>
                <span className="text-amber-400 font-bold">15 Sek.</span>
              </div>
            </div>

            {/* Game 2: Satz-Rennen */}
            <div
              onClick={() => setSelectedGamePreview('SATZ_RENNEN')}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedGamePreview === 'SATZ_RENNEN'
                  ? 'border-cyan-400/80 bg-cyan-500/10 shadow-glow-cyan scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-2xl">
                  🧩
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                  SATZBAU
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">Satz-Rennen</h3>
              <p className="text-xs font-medium text-cyan-300 mt-0.5">Wortbausteine ordnen</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Verwirbelte Wörter anklicken und in die korrekte deutsche Satzstellung bringen (Subjekt, Verb, Objekt, Nebensätze).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Fokus: Syntax & Verbposition</span>
                <span className="text-cyan-400 font-bold">30 Sek.</span>
              </div>
            </div>

            {/* Game 3: Wortschatz-Duell */}
            <div
              onClick={() => setSelectedGamePreview('WORTSCHATZ_DUELL')}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedGamePreview === 'WORTSCHATZ_DUELL'
                  ? 'border-purple-400/80 bg-purple-500/10 shadow-purple-500/20 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-2xl">
                  🧠
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
                  VOKABELN
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">Wortschatz-Duell</h3>
              <p className="text-xs font-medium text-purple-300 mt-0.5">Artikel, Antonyme & Redemittel</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Der/Die/Das, treffende Synonyme und Gegenteile schnell zuordnen. Trainiert den aktiven Wortschatz nachhaltig.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Fokus: Wortschatzerweiterung</span>
                <span className="text-purple-400 font-bold">15 Sek.</span>
              </div>
            </div>

            {/* Game 4: Was bin ich? */}
            <div
              onClick={() => setSelectedGamePreview('WAS_BIN_ICH')}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedGamePreview === 'WAS_BIN_ICH'
                  ? 'border-emerald-400/80 bg-emerald-500/10 shadow-emerald-500/20 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl">
                  🕵️
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                  DEDUKTION
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">Was bin ich?</h3>
              <p className="text-xs font-medium text-emerald-300 mt-0.5">Hinweis-Rätsel & Kombinieren</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                3 schrittweise aufgedeckte Hinweise leiten zum gesuchten deutschen Begriff. Frühe Antworten bringen Maximalpunkte!
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Fokus: Leseverstehen & Logik</span>
                <span className="text-emerald-400 font-bold">25 Sek.</span>
              </div>
            </div>

            {/* Game 5: Team Battle */}
            <div
              onClick={() => setSelectedGamePreview('TEAM_BATTLE')}
              className={`glass-card rounded-3xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedGamePreview === 'TEAM_BATTLE'
                  ? 'border-rose-400/80 bg-rose-500/10 shadow-rose-500/20 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center text-2xl">
                  ⚔️
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold">
                  KOOPERATION
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-4">Team Battle</h3>
              <p className="text-xs font-medium text-rose-300 mt-0.5">Team Blau vs. Team Rot</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Die Klasse wird automatisch in zwei Teams eingeteilt. Jeder Schüler punktet für das gemeinsame Team-Konto.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Fokus: Teamgeist & Dynamik</span>
                <span className="text-rose-400 font-bold">15 Sek.</span>
              </div>
            </div>

            {/* Configurator Card CTA */}
            <div
              onClick={() => navigate('/teacher/new-game')}
              className="glass-card rounded-3xl p-6 border border-dashed border-amber-500/40 hover:border-amber-400 bg-gradient-to-b from-amber-500/10 to-transparent flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white mt-4">Modulare Spielrunden</h3>
                <p className="text-xs font-medium text-amber-300 mt-0.5">Frei kombinierbar</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Stelle für jede Stunde die perfekte Kombination zusammen: Wähle Sprachniveau, Spielreihenfolge und Fragenanzahl.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Jetzt konfigurieren</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: CEFR Levels (A1 - B2)                             */}
        {/* ============================================================ */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>Gemeinsamer Europäischer Referenzrahmen (GER)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                4 Niveaustufen für gezielten Lernfortschritt
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Kuratierte Fragen von Anfänger (A1) bis Fortgeschritten (B2).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAME_LEVELS.map((item) => {
              const isSelected = selectedLevelPreview === item.level;
              return (
                <div
                  key={item.level}
                  onClick={() => setSelectedLevelPreview(item.level)}
                  className={`glass-card rounded-3xl p-6 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-400/80 bg-amber-500/10 shadow-glow-gold scale-[1.02]'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-xl text-sm font-black border font-mono ${item.badgeColor}`}
                    >
                      {item.level}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  </div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-xs font-medium text-slate-300 mt-1">{item.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: Teacher & Student Experience Highlights           */}
        {/* ============================================================ */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-b from-[#111827]/80 to-[#0B0F19]/90 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">QR-Code & Sofort-Beitritt</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Der Lehrer projiziert den QR-Code an die Wand oder das Smartboard. Schüler scannen mit dem Smartphone und sind in 3 Sekunden in der Lobby.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">In-Game Hintergrundmusik</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Kontinuierliche, didaktisch motivierende Musik während des Spiels, die nicht bei jeder Frage neu startet. Mit voller Lautstärke-Kontrolle für die Lehrkraft.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Live-Leaderboard & Siegerehrung</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Server-autoritative Punktevergabe, Streak-Multiplikatoren und ein animiertes Siegerpodest mit Konfetti-Effekt am Ende jeder Spielsession.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 mt-20 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/40">
              <img src="/teacher-farh.png" alt="Lehrer Farh" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-slate-200">Farh SprachArena</span>
              <span className="mx-2">•</span>
              <span>Deutschunterricht mit Lehrer Farh</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>24/7 Cloud Ready</span>
            <span>•</span>
            <span>Real-Time WebSockets</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">Deutsch lernen. Zukunft gestalten.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
