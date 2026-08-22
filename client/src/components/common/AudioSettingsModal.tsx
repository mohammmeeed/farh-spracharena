import React from 'react';
import { Volume2, Music, X, Sliders, Check } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';


interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    settings,
    toggleMusic,
    toggleSound,
    setMusicVolume,
    setSoundVolume,
    playSound,
  } = useAudio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl space-y-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">Audio-Einstellungen</h3>
              <p className="text-xs text-slate-400">Farh SprachArena Unterrichtssound</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="space-y-5">
          {/* Sound Effects Toggle & Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-sm text-slate-200">Soundeffekte</span>
              </div>
              <button
                onClick={() => {
                  toggleSound();
                  playSound('click');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  settings.soundEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {settings.soundEnabled ? 'AN' : 'AUS'}
              </button>
            </div>

            {settings.soundEnabled && (
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSoundVolume(val);
                  }}
                  onMouseUp={() => playSound('click')}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400 w-10 text-right">
                  {Math.round(settings.soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Background Music Toggle & Volume */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-semibold text-sm text-slate-200 block">Hintergrundmusik</span>
                  <span className="text-xs text-slate-400">Sanfter Unterrichtsbeat</span>
                </div>
              </div>
              <button
                onClick={() => toggleMusic()}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  settings.musicEnabled
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {settings.musicEnabled ? 'AN' : 'AUS'}
              </button>
            </div>

            {settings.musicEnabled && (
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400 w-10 text-right">
                  {Math.round(settings.musicVolume * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Fertig</span>
          </button>
        </div>
      </div>
    </div>
  );
};
