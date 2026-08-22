import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Gamepad2, ArrowRight, AlertCircle } from 'lucide-react';
import { socketService } from '../socket/socket.service';
import { GameRoom, Player } from '../types/game.types';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  onTestJoinRoom?: (pin: string, name: string) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  isConnected,
}) => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const socket = socketService.getSocket();

    const handleJoinedRoom = ({ room, player }: { room: GameRoom; player: Player }) => {
      setIsSubmitting(false);
      onClose();
      navigate(`/student/lobby/${room.roomId}`, { state: { room, player } });
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
  }, [isOpen, navigate, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPin = pin.trim();
    const cleanName = name.trim();

    if (!cleanPin || cleanPin.length !== 6) {
      setErrorMessage('Der Spiel-PIN muss aus 6 Ziffern bestehen.');
      return;
    }

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Der Name muss mindestens 2 Zeichen lang sein.');
      return;
    }

    if (cleanName.length > 20) {
      setErrorMessage('Der Name darf maximal 20 Zeichen enthalten.');
      return;
    }

    setIsSubmitting(true);
    const socket = socketService.getSocket();
    socket.emit('student:joinRoom', { pin: cleanPin, name: cleanName });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                🎮 Spiel beitreten
              </h2>
              <p className="text-xs text-slate-400">Kein Schüler-Account erforderlich</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Hinweis</p>
              <p className="mt-0.5 text-rose-200/90">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Spiel-PIN (6 Ziffern)
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setErrorMessage(null);
                setPin(e.target.value.replace(/\D/g, ''));
              }}
              placeholder="z.B. 583921"
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-center text-3xl font-mono font-bold tracking-widest text-cyan-400 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Dein Name
            </label>
            <input
              type="text"
              maxLength={20}
              value={name}
              onChange={(e) => {
                setErrorMessage(null);
                setName(e.target.value);
              }}
              placeholder="z.B. Mohamed, Sara, Adam"
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold"
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            💡 Temporäre Spielsitzung. Es werden keine Daten dauerhaft gespeichert.
          </div>

          <button
            type="submit"
            disabled={!isConnected || isSubmitting || pin.length !== 6 || name.trim().length < 2}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-glow-cyan ${
              isConnected && !isSubmitting && pin.length === 6 && name.trim().length >= 2
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Trete bei...</span>
              </>
            ) : (
              <>
                <span>🚀 Beitreten</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

