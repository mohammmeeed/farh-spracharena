import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, AlertCircle, Sparkles, User, KeyRound } from 'lucide-react';
import { socketService } from '../../socket/socket.service';

import { useSocket } from '../../hooks/useSocket';
import { GameRoom, Player } from '../../types/game.types';

export const StudentJoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isConnected, latency } = useSocket();

  // Form State
  const [pin, setPin] = useState<string>(searchParams.get('pin') || '');
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Setup Socket listeners for join response
  useEffect(() => {
    const socket = socketService.getSocket();

    const handleJoinedRoom = ({ room, player }: { room: GameRoom; player: Player }) => {
      setIsSubmitting(false);
      navigate(`/student/lobby/${room.roomId}`, {
        state: { room, player },
      });
    };

    const handleJoinError = ({ message }: { message: string }) => {
      setIsSubmitting(false);
      setErrorMessage(message || 'Fehler beim Beitreten.');
    };

    socket.on('student:joinedRoom', handleJoinedRoom);
    socket.on('student:joinError', handleJoinError);

    return () => {
      socket.off('student:joinedRoom', handleJoinedRoom);
      socket.off('student:joinError', handleJoinError);
    };
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPin = pin.trim();
    const cleanName = name.trim();

    // Client-side validation with clear German messages
    if (!cleanPin) {
      setErrorMessage('Bitte gib den 6-stelligen Spiel-PIN ein.');
      return;
    }

    if (!/^\d{6}$/.test(cleanPin)) {
      setErrorMessage('Der Spiel-PIN muss aus genau 6 Ziffern bestehen.');
      return;
    }

    if (!cleanName) {
      setErrorMessage('Bitte gib deinen Namen ein.');
      return;
    }

    if (cleanName.length < 2) {
      setErrorMessage('Der Name muss mindestens 2 Zeichen lang sein.');
      return;
    }

    if (cleanName.length > 20) {
      setErrorMessage('Der Name darf maximal 20 Zeichen enthalten.');
      return;
    }

    if (!isConnected) {
      setErrorMessage('Keine Verbindung zum Server. Bitte überprüfe deine Internetverbindung.');
      return;
    }

    setIsSubmitting(true);
    const socket = socketService.getSocket();
    socket.emit('student:joinRoom', {
      pin: cleanPin,
      name: cleanName,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Mobile-first Header */}
      <header className="w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-xl px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <span className="text-sm font-black text-cyan-400">F</span>
            </div>
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              Farh <span className="text-cyan-400">SprachArena</span>
            </span>
          </div>
        </div>

        {/* Small Connection Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
          {isConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-medium hidden sm:inline">Verbunden</span>
              {latency !== null && (
                <span className="text-slate-500 font-mono text-[10px]">{latency}ms</span>
              )}
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              <span className="text-rose-400 font-medium">Verbindung wird hergestellt...</span>
            </>
          )}
        </div>
      </header>

      {/* Main Join Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md relative">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl space-y-6">
            {/* Title Section */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Schüler-Beitritt</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
                🎮 Spiel beitreten
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Bereit für die Herausforderung?
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in shadow-lg">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Hinweis zum Beitritt</p>
                  <p className="mt-0.5 text-rose-200/90 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Join Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PIN Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="student-pin"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider"
                >
                  <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Spiel-PIN</span>
                </label>
                <input
                  id="student-pin"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setPin(e.target.value.replace(/\D/g, ''));
                  }}
                  placeholder="583921"
                  autoComplete="off"
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-950/80 border-2 border-slate-700/80 text-center text-3xl sm:text-4xl font-mono font-black tracking-widest text-cyan-400 placeholder:text-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>

              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="student-name"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dein Name</span>
                </label>
                <input
                  id="student-name"
                  type="text"
                  maxLength={20}
                  value={name}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setName(e.target.value);
                  }}
                  placeholder="z.B. Mohamed, Sara, Adam"
                  autoComplete="name"
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-950/80 border-2 border-slate-700/80 text-center text-lg sm:text-xl font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>

              {/* Info Note */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
                ✨ Kein Account nötig. Nach der Runde werden alle Sitzungsdaten automatisch gelöscht.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-student-join"
                disabled={isSubmitting || pin.trim().length !== 6 || name.trim().length < 2}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 transition-all shadow-glow-cyan ${pin.trim().length === 6 && name.trim().length >= 2 && !isSubmitting
                    ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Trete Spielraum bei...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Beitreten</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-[11px] text-slate-500">
        Farh SprachArena • Deutschunterricht Live
      </footer>
    </div>
  );
};
