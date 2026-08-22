import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Server,
  Layers,
  Flame,
  Globe2,
} from 'lucide-react';
import { GAME_LEVELS, GAME_TYPES } from '../utils/constants';
import { ConnectionStatusBadge } from '../components/ConnectionStatusBadge';
import { GameLevel, GameType } from '../types/game.types';

interface LandingPageProps {
  isConnected: boolean;
  socketId: string | null;
  latency: number | null;
  serverUrl: string;
  onOpenJoinModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  isConnected,
  socketId,
  latency,
  serverUrl,
  onOpenJoinModal,
}) => {
  const navigate = useNavigate();
  const [selectedLevelPreview, setSelectedLevelPreview] = useState<GameLevel>('A1');
  const [selectedGamePreview, setSelectedGamePreview] = useState<GameType>('SCHNELLANTWORT');

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-8 space-y-6">
          {/* Subtle Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Phase 2: Teacher Game Setup</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-normal">Deutschunterricht mit Lehrer Farh</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              Farh <span className="gradient-text-gold">SprachArena</span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
              Interaktive Deutsch-Lernplattform für den Unterricht
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Echtzeit-Klassenzimmer-Duelle, kooperative Team-Wettkämpfe und Vokabel-Spiele.
            Ohne Schüler-Registrierung — einfach PIN eingeben und mitspielen.
          </p>

          {/* Two Main Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              id="btn-teacher"
              onClick={() => navigate('/teacher')}
              className="w-full sm:w-auto min-w-[220px] px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-glow-gold hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="text-2xl">👨‍🏫</span>
              <span>Lehrer</span>
            </button>

            <button
              id="btn-join"
              onClick={onOpenJoinModal}
              className="w-full sm:w-auto min-w-[220px] px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 text-slate-950 font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-glow-cyan hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="text-2xl">🎮</span>
              <span>Spiel beitreten</span>
            </button>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400">4 Niveaus</div>
              <div className="text-[11px] text-slate-400 font-medium">A1, A2, B1, B2</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">5 Spielmodi</div>
              <div className="text-[11px] text-slate-400 font-medium">Multiplayer-Games</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">0 Accounts</div>
              <div className="text-[11px] text-slate-400 font-medium">Schnell per PIN</div>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">Socket.IO</div>
              <div className="text-[11px] text-slate-400 font-medium">Echtzeit-Synchron</div>
            </div>
          </div>
        </section>

        {/* Phase 2 Live Connection & Architecture Diagnostics Card */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">
                  System-Status & Architektur
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Echtzeit-Verbindung zwischen React Frontend und Node.js + Express Backend
              </p>
            </div>
            <ConnectionStatusBadge
              isConnected={isConnected}
              socketId={socketId}
              latency={latency}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Backend Server & Health</div>
              <div className="font-mono text-cyan-300 text-sm font-semibold">{serverUrl}</div>
              <div className="text-slate-400 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>GET /api/health bereit</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">Socket.IO Client Session</div>
              <div className="font-mono text-amber-300 text-sm font-semibold truncate">
                {socketId ? socketId : 'Verbindung wird aufgebaut...'}
              </div>
              <div className="text-slate-400 mt-1 flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                ></span>
                <span>{isConnected ? 'Handshake bestätigt' : 'Warte auf Verbindung'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 font-semibold mb-1">In-Memory Session Engine</div>
              <div className="text-emerald-300 text-sm font-semibold">Temporäre Räume (PIN)</div>
              <div className="text-slate-400 mt-1">6-stelliger PIN Generator aktiv</div>
            </div>
          </div>
        </section>

        {/* Game Levels (A1 - B2) Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>Gemeinsamer Europäischer Referenzrahmen (GER)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                4 Sprachniveaus für den Unterricht
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Passgenau auf den Lehrplan abgestimmt
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GAME_LEVELS.map((item) => {
              const isSelected = selectedLevelPreview === item.level;
              return (
                <div
                  key={item.level}
                  onClick={() => setSelectedLevelPreview(item.level)}
                  className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-400/60 bg-amber-500/10 shadow-glow-gold'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-black border ${item.badgeColor}`}
                    >
                      {item.level}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <h3 className="font-bold text-base text-white">{item.title}</h3>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">{item.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5 Multiplayer Games Showcase Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Interaktive Spielformate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                5 Multiplayer-Klassenraumspiele
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Vorbereitete Spielmodi für Phase 2 & 3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAME_TYPES.map((gt) => {
              const isSelected = selectedGamePreview === gt.type;
              return (
                <div
                  key={gt.type}
                  onClick={() => setSelectedGamePreview(gt.type)}
                  className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-cyan-500/50 bg-cyan-500/10 shadow-glow-cyan'
                      : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-3xl p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      {gt.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {gt.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white mt-3.5">{gt.title}</h3>
                  <p className="text-xs font-medium text-cyan-300 mt-0.5">{gt.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {gt.description}
                  </p>
                </div>
              );
            })}

            {/* Architecture Card */}
            <div className="glass-card rounded-2xl p-5 border border-dashed border-slate-700/80 bg-slate-950/40 flex flex-col justify-between">
              <div>
                <div className="p-2.5 w-fit rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mt-3.5">
                  Modulare Spiel-Reihenfolge
                </h3>
                <p className="text-xs font-medium text-indigo-300 mt-0.5">
                  Kombinierbare Game-Sessions
                </p>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Lehrer Farh kann beliebig viele Spiele pro Spielrunde kombinieren, anordnen und
                  die Fragenanzahl individuell festlegen.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <span>Phase 2 Teacher Setup</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/70 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Farh SprachArena</span>
            <span>•</span>
            <span>Entwickelt für den Deutschunterricht mit Lehrer Farh</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React + TypeScript + Vite</span>
            <span>•</span>
            <span>Express + Socket.IO</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
