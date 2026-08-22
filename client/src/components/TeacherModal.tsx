import React, { useState } from 'react';
import { X, Sparkles, PlusCircle, CheckCircle2 } from 'lucide-react';
import { GameLevel, GameType } from '../types/game.types';
import { GAME_LEVELS, GAME_TYPES } from '../utils/constants';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  onTestCreateRoom?: (level: GameLevel, gameType: GameType) => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  isConnected,
  onTestCreateRoom,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>('A1');
  const [selectedType, setSelectedType] = useState<GameType>('SCHNELLANTWORT');
  const [sessionCreated, setSessionCreated] = useState<boolean>(false);
  const [testPin, setTestPin] = useState<string>('');

  if (!isOpen) return null;

  const handleCreateRoom = () => {
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    setTestPin(generatedPin);
    setSessionCreated(true);
    if (onTestCreateRoom) {
      onTestCreateRoom(selectedLevel, selectedType);
    }
  };

  const handleReset = () => {
    setSessionCreated(false);
    setTestPin('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 border border-amber-500/30 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                👨‍🏫 Lehrer-Bereich
              </h2>
              <p className="text-xs text-slate-400">
                Sitzung für den Deutschunterricht vorbereiten (Phase 1)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!sessionCreated ? (
          <div className="mt-5 space-y-5">
            {/* Level selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                1. Sprachniveau (GER)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {GAME_LEVELS.map((lvl) => (
                  <button
                    key={lvl.level}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.level)}
                    className={`py-2.5 px-3 rounded-xl text-center border font-bold text-sm transition-all ${
                      selectedLevel === lvl.level
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-gold'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {lvl.level}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Type selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Spielmodus auswählen
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {GAME_TYPES.map((gt) => (
                  <button
                    key={gt.type}
                    type="button"
                    onClick={() => setSelectedType(gt.type)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedType === gt.type
                        ? 'bg-amber-500/15 border-amber-500/50 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{gt.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{gt.title}</p>
                        <p className="text-xs text-slate-400">{gt.subtitle}</p>
                      </div>
                    </div>
                    {selectedType === gt.type && (
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notice for Phase 1 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-amber-400">Phase 1 Architektur:</span> Das
              Socket.IO Backend empfängt Raum-Erstellungsanfragen. Die vollumfängliche Spiellogik
              und Fragedatenbank folgen in Phase 2.
            </div>

            {/* Submit button */}
            <button
              onClick={handleCreateRoom}
              disabled={!isConnected}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isConnected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {isConnected ? 'Neuen Spielraum erstellen' : 'Server nicht verbunden'}
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-5 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-3xl animate-bounce">
              🎉
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Spielraum bereit!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Teile diesen PIN mit deinen Schülerinnen und Schülern:
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border-2 border-amber-500/40 tracking-widest text-3xl font-black text-amber-400 font-mono shadow-glow-gold">
              {testPin}
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              Gewählt: <span className="text-amber-400 font-bold">{selectedLevel}</span> •{' '}
              <span className="text-cyan-400 font-bold">{selectedType}</span>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Zurück zur Auswahl
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
