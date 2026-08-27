import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectionStatusBadge } from './ConnectionStatusBadge';

import { Sparkles } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  socketId: string | null;
  latency: number | null;
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  socketId,
  latency,
  onOpenJoinModal,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-500 via-yellow-400 to-rose-500 shadow-glow-gold transition-transform group-hover:scale-105 overflow-hidden shrink-0">
              <img
                src="/teacher-farh.png"
                alt="Farh SprachArena"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  Farh <span className="text-amber-400">SprachArena</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 border border-slate-700 text-amber-300">
                  DE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Interaktive Deutsch-Lernplattform für den Unterricht
              </p>
            </div>
          </Link>
        </div>

        {/* Action Buttons & Connection Indicator */}
        <div className="flex items-center gap-3">
          <ConnectionStatusBadge
            isConnected={isConnected}
            socketId={socketId}
            latency={latency}
            compact
          />

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              onClick={onOpenJoinModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>🎮</span> Spiel beitreten
            </button>
            <button
              onClick={() => navigate('/teacher')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>👨‍🏫 Lehrer</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
