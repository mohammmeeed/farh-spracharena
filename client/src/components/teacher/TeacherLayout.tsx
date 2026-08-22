import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectionStatusBadge } from '../ConnectionStatusBadge';
import { Sparkles, LayoutDashboard, PlusCircle, ArrowLeft } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';

interface TeacherLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackToHome = false,
}) => {
  const { isConnected, socketId, latency } = useSocket();
  const location = useLocation();

  const isDashboard = location.pathname === '/teacher';
  const isNewGame = location.pathname === '/teacher/new-game';

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Teacher Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Teacher Branding */}
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 p-0.5 shadow-glow-gold transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black gradient-text-gold">F</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                    Farh <span className="text-amber-400">SprachArena</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    Lehrer-Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Interaktive Deutsch-Lernplattform für den Unterricht
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <Link
                to="/teacher"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isDashboard
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/teacher/new-game"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isNewGame
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Neue Spielrunde</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-slate-200">👨‍🏫 Lehrer Farh</span>
              </div>
              <ConnectionStatusBadge
                isConnected={isConnected}
                socketId={socketId}
                latency={latency}
                compact
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {showBackToHome && (
          <div className="mb-6">
            <Link
              to="/teacher"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zum Lehrer-Dashboard</span>
            </Link>
          </div>
        )}

        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>{title}</span>
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/70 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Farh SprachArena</span>
            <span>•</span>
            <span>Lehrer-Portal für Farh</span>
          </div>
          <div>Phase 2: Teacher Game Setup Ready</div>
        </div>
      </footer>
    </div>
  );
};
