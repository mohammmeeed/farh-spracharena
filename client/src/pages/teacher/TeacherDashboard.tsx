import React from 'react';
import { Link } from 'react-router-dom';
import { TeacherLayout } from '../../components/teacher/TeacherLayout';
import {
  PlusCircle,
  Sparkles,
  Gamepad2,
  ArrowRight,
  Layers,
  Flame,
  Award,
} from 'lucide-react';
import { GAME_LEVELS, GAME_TYPES } from '../../utils/constants';

export const TeacherDashboard: React.FC = () => {
  return (
    <TeacherLayout>
      <div className="space-y-10">
        {/* Welcome Hero Card */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-10 border border-amber-500/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Klassenzimmer-Steuerung</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Willkommen, Farh! 👋
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium">
                Bereit für eine neue Deutsch-Spielrunde?
              </p>
            </div>

            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Erstelle in wenigen Schritten ein individuelles Live-Spiel: Wähle das Sprachniveau
              (A1–B2), kombiniere mehrere Spielmodi, passe die Fragenanzahl an und starte den Raum
              mit einem 6-stelligen PIN.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/teacher/new-game"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base flex items-center gap-2.5 shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                <span>+ Neue Spielrunde</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Config Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">1. Sprachniveau wählen</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wähle exakt ein GER-Niveau (A1, A2, B1 oder B2) passend zu deiner aktuellen
              Unterrichtsstufe.
            </p>
            <div className="flex gap-1.5 pt-2">
              {GAME_LEVELS.map((lvl) => (
                <span
                  key={lvl.level}
                  className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {lvl.level}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">2. Spiele & Reihenfolge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kombiniere mehrere Spiele in einer Sitzung. Ändere die Reihenfolge nach Belieben
              für maximale Abwechslung.
            </p>
            <div className="text-xs text-cyan-300 font-medium pt-2 flex items-center gap-1">
              <span>5 modulare Spieltypen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">3. Fragen & PIN-Lobby</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Definiere 5–30 Fragen pro Spiel. Das System generiert automatisch einen 6-stelligen
              PIN für deine Schüler.
            </p>
            <div className="text-xs text-emerald-400 font-medium pt-2">
              Keine Registrierung erforderlich
            </div>
          </div>
        </div>

        {/* Available Game Modes Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Verfügbare Spielformate</span>
              </h2>
              <p className="text-xs text-slate-400">
                Diese Spiele können in deiner Spielrunde kombiniert werden:
              </p>
            </div>
            <Link
              to="/teacher/new-game"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>Jetzt konfigurieren</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {GAME_TYPES.map((g) => (
              <div
                key={g.type}
                className="glass-card rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="text-2xl">{g.icon}</div>
                <h4 className="font-bold text-sm text-white">{g.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{g.description}</p>
                <div className="text-[11px] text-amber-400/90 font-medium pt-1">
                  Standard: {g.defaultQuestionCount} Fragen
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};
