import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherLayout } from '../../components/teacher/TeacherLayout';
import {
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Play,
  Zap,
  Puzzle,
  Brain,
  Search,
  Swords,
  Sliders,
  Filter,
  Plus,
  Minus,
} from 'lucide-react';

import { GameLevel, GameType, GameRoom } from '../../types/game.types';
import {
  GAME_LEVELS,
  MIN_QUESTION_COUNT,
  MAX_QUESTION_COUNT,
  AVAILABLE_QUESTIONS_MAP,
} from '../../utils/constants';
import { socketService } from '../../socket/socket.service';
import { useSocket } from '../../hooks/useSocket';

interface SelectedGameItem {
  gameType: GameType;
  questionCount: number;
}

const GAME_DEFINITIONS: {
  type: GameType;
  title: string;
  icon: string;
  badgeIcon: React.ReactNode;
  description: string;
  defaultQuestionCount: number;
  color: string;
}[] = [
  {
    type: 'SCHNELLANTWORT',
    title: 'Schnellantwort',
    icon: '⚡',
    badgeIcon: <Zap className="w-4 h-4 text-amber-400" />,
    description: 'Rasantes Multiple-Choice Quiz mit Zeitbonus & Streak-Multiplikator.',
    defaultQuestionCount: 5,
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300',
  },
  {
    type: 'SATZ_RENNEN',
    title: 'Satz-Rennen',
    icon: '🧩',
    badgeIcon: <Puzzle className="w-4 h-4 text-cyan-400" />,
    description: 'Wortbausteine in die grammatikalisch korrekte Satzstellung bringen.',
    defaultQuestionCount: 4,
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300',
  },
  {
    type: 'WORTSCHATZ_DUELL',
    title: 'Wortschatz-Duell',
    icon: '🧠',
    badgeIcon: <Brain className="w-4 h-4 text-purple-400" />,
    description: 'Vokabeln, Synonyme, Gegenteile und Redewendungen zuordnen.',
    defaultQuestionCount: 4,
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300',
  },
  {
    type: 'WAS_BIN_ICH',
    title: 'Was bin ich?',
    icon: '🕵️',
    badgeIcon: <Search className="w-4 h-4 text-emerald-400" />,
    description: 'Begriffe anhand schrittweiser Hinweise erraten. Je schneller, desto mehr Punkte!',
    defaultQuestionCount: 4,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300',
  },
  {
    type: 'TEAM_BATTLE',
    title: 'Team Battle',
    icon: '⚔️',
    badgeIcon: <Swords className="w-4 h-4 text-rose-400" />,
    description: 'Klasse wird automatisch in Team Blau vs. Team Rot aufgeteilt.',
    defaultQuestionCount: 5,
    color: 'from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300',
  },
];

const CATEGORY_OPTIONS = [
  { id: 'ALL', label: 'Alle Kategorien (Ausgewogen)' },
  { id: 'Grammatik', label: 'Grammatik & Satzbau' },
  { id: 'Wortschatz', label: 'Wortschatz & Synonyme' },
  { id: 'Alltag', label: 'Alltag & Konversation' },
  { id: 'Reisen', label: 'Reisen & Mobilität' },
  { id: 'Arbeit', label: 'Arbeit & Beruf' },
  { id: 'Gesundheit', label: 'Gesundheit & Ernährung' },
];

export const NewGameConfigurator: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useSocket();

  // Configuration States
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>('A2');
  const [selectedGames, setSelectedGames] = useState<SelectedGameItem[]>([
    { gameType: 'SCHNELLANTWORT', questionCount: 5 },
    { gameType: 'SATZ_RENNEN', questionCount: 4 },
    { gameType: 'WORTSCHATZ_DUELL', questionCount: 4 },
  ]);
  const [difficultyMode, setDifficultyMode] = useState<'AUTO' | 'EASY' | 'MEDIUM' | 'HARD'>('AUTO');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLevelSelect = (lvl: GameLevel) => {
    setSelectedLevel(lvl);
    setSelectedGames((prev) =>
      prev.map((g) => {
        const maxAvail = AVAILABLE_QUESTIONS_MAP[lvl]?.[g.gameType] || 5;
        return {
          ...g,
          questionCount: Math.min(g.questionCount, maxAvail),
        };
      })
    );
  };

  // Setup Socket listeners for room creation response
  useEffect(() => {
    const socket = socketService.getSocket();

    const handleRoomCreated = ({ room }: { room: GameRoom }) => {
      setIsSubmitting(false);
      navigate(`/teacher/lobby/${room.roomId}`, { state: { room } });
    };

    const handleRoomError = ({ message }: { message: string }) => {
      setIsSubmitting(false);
      setErrorMessage(message || 'Fehler beim Erstellen der Spielrunde.');
    };

    socket.on('server:roomCreated', handleRoomCreated);
    socket.on('server:roomError', handleRoomError);

    return () => {
      socket.off('server:roomCreated', handleRoomCreated);
      socket.off('server:roomError', handleRoomError);
    };
  }, [navigate]);

  // Toggle game selection
  const handleToggleGame = (gameType: GameType) => {
    setErrorMessage(null);
    const existingIndex = selectedGames.findIndex((g) => g.gameType === gameType);

    if (existingIndex >= 0) {
      if (selectedGames.length === 1) {
        setErrorMessage('Mindestens ein Spiel muss ausgewählt bleiben.');
        return;
      }
      setSelectedGames(selectedGames.filter((g) => g.gameType !== gameType));
    } else {
      const gameDef = GAME_DEFINITIONS.find((g) => g.type === gameType);
      const maxAvail = AVAILABLE_QUESTIONS_MAP[selectedLevel]?.[gameType] || 5;
      const defaultCount = gameDef ? Math.min(gameDef.defaultQuestionCount, maxAvail) : Math.min(5, maxAvail);
      setSelectedGames([...selectedGames, { gameType, questionCount: defaultCount }]);
    }
  };

  // Reorder game up
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...selectedGames];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSelectedGames(updated);
  };

  // Reorder game down
  const handleMoveDown = (index: number) => {
    if (index >= selectedGames.length - 1) return;
    const updated = [...selectedGames];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSelectedGames(updated);
  };

  // Update question count for a specific game
  const handleQuestionCountChange = (gameType: GameType, count: number) => {
    setErrorMessage(null);
    const maxAvail = AVAILABLE_QUESTIONS_MAP[selectedLevel]?.[gameType] || MAX_QUESTION_COUNT;
    const clampedCount = Math.max(MIN_QUESTION_COUNT, Math.min(maxAvail, count));
    setSelectedGames(
      selectedGames.map((g) =>
        g.gameType === gameType ? { ...g, questionCount: clampedCount } : g
      )
    );
  };

  // Calculate totals
  const totalQuestions = selectedGames.reduce((acc, curr) => acc + curr.questionCount, 0);

  // Submit Handler
  const handleCreateRoom = () => {
    setErrorMessage(null);

    if (!isConnected) {
      setErrorMessage('Keine Verbindung zum Server. Bitte überprüfe die Verbindung.');
      return;
    }

    if (!selectedLevel) {
      setErrorMessage('Bitte wähle ein Sprachniveau aus.');
      return;
    }

    if (selectedGames.length === 0) {
      setErrorMessage('Bitte wähle mindestens ein Spiel aus.');
      return;
    }

    for (const g of selectedGames) {
      if (g.questionCount < MIN_QUESTION_COUNT || g.questionCount > MAX_QUESTION_COUNT) {
        setErrorMessage(
          `Die Anzahl der Fragen für jedes Spiel muss zwischen ${MIN_QUESTION_COUNT} und ${MAX_QUESTION_COUNT} liegen.`
        );
        return;
      }
    }

    setIsSubmitting(true);
    const socket = socketService.getSocket();
    socket.emit('teacher:createRoom', {
      level: selectedLevel,
      games: selectedGames,
      difficulty: difficultyMode,
      category: selectedCategory !== 'ALL' ? selectedCategory : undefined,
    });
  };

  return (
    <TeacherLayout
      title="Neue Spielrunde konfigurieren"
      subtitle="Erstelle eine maßgeschneiderte Unterrichts-Spielrunde für deine Schüler"
      showBackToHome
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{errorMessage}</div>
          </div>
        )}

        {/* Step 1: Sprachniveau */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Deutsch-Niveau (GER)</h2>
              <p className="text-xs text-slate-400">
                Gilt einheitlich für die gesamte Klasse in dieser Spielrunde.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GAME_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => handleLevelSelect(lvl.level)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-glow-gold'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-2xl font-black font-mono ${
                        isSelected ? 'text-amber-400' : 'text-slate-300'
                      }`}
                    >
                      {lvl.level}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  </div>
                  <h4 className="font-bold text-sm text-white mt-1">{lvl.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {lvl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Spiele & Reihenfolge */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Spiele auswählen & anordnen</h2>
                <p className="text-xs text-slate-400">
                  Wähle ein oder mehrere Spiele. Die Reihenfolge bestimmt den Spielablauf.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              {selectedGames.length} von 5 Spielen aktiv
            </span>
          </div>

          {/* Game Selection Toggle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {GAME_DEFINITIONS.map((gameDef) => {
              const isSelected = selectedGames.some((g) => g.gameType === gameDef.type);
              const orderIndex = selectedGames.findIndex((g) => g.gameType === gameDef.type);

              return (
                <button
                  key={gameDef.type}
                  type="button"
                  onClick={() => handleToggleGame(gameDef.type)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? `bg-gradient-to-b ${gameDef.color} shadow-lg`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{gameDef.icon}</span>
                        <h4 className="font-extrabold text-sm text-white">{gameDef.title}</h4>
                      </div>
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white font-mono">
                          #{orderIndex + 1}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">+ Hinzufügen</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {gameDef.description}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/5">
                    Empfohlen: {gameDef.defaultQuestionCount} Fragen
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3: Fragenanzahl & Reihenfolge Feineinstellung */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
              3
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Reihenfolge & Fragenanzahl</h2>
              <p className="text-xs text-slate-400">
                Verschiebe Spiele mit den Pfeilen und lege 5–30 Fragen pro Spiel fest.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedGames.map((item, index) => {
              const gameDef = GAME_DEFINITIONS.find((g) => g.type === item.gameType);
              if (!gameDef) return null;

              return (
                <div
                  key={item.gameType}
                  className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Reorder & Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Nach oben"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === selectedGames.length - 1}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Nach unten"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xl">{gameDef.icon}</span>
                      <span className="font-bold text-white text-sm">{gameDef.title}</span>
                    </div>
                  </div>

                  {/* Right: Question Count Slider & Stepper Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {(() => {
                      const maxAvail = AVAILABLE_QUESTIONS_MAP[selectedLevel]?.[item.gameType] || 5;
                      const rawPresets = [3, 5, 10, 15];
                      const presets = Array.from(
                        new Set([...rawPresets.filter((c) => c <= maxAvail), maxAvail])
                      ).sort((a, b) => a - b);

                      return (
                        <>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs text-slate-400 font-medium mr-1">Fragen:</span>
                            {presets.map((countVal) => (
                              <button
                                key={countVal}
                                type="button"
                                onClick={() => handleQuestionCountChange(item.gameType, countVal)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all ${
                                  item.questionCount === countVal
                                    ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                                }`}
                              >
                                {countVal}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-800">
                            {/* Decrease Button (-) */}
                            <button
                              type="button"
                              onClick={() =>
                                handleQuestionCountChange(item.gameType, item.questionCount - 1)
                              }
                              disabled={item.questionCount <= MIN_QUESTION_COUNT}
                              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm"
                              title="Weniger Fragen (-1)"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            {/* Question Number Input */}
                            <input
                              type="number"
                              min={MIN_QUESTION_COUNT}
                              max={maxAvail}
                              value={item.questionCount}
                              onChange={(e) =>
                                handleQuestionCountChange(
                                  item.gameType,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-12 h-8 rounded-lg bg-slate-950 border border-slate-700 text-center font-mono font-bold text-sm text-white focus:outline-none focus:border-amber-400"
                            />

                            {/* Increase Button (+) */}
                            <button
                              type="button"
                              onClick={() =>
                                handleQuestionCountChange(item.gameType, item.questionCount + 1)
                              }
                              disabled={item.questionCount >= maxAvail}
                              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm"
                              title="Mehr Fragen (+1)"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>

                            <span className="text-xs text-amber-400 font-mono font-bold ml-1">
                              / {maxAvail} max
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 4: Schwierigkeit & Kategoriefilter */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
              4
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Schwierigkeit & Kategorien</h2>
              <p className="text-xs text-slate-400">
                Passe die didaktische Ausrichtung für deine Lerngruppe an.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Difficulty Mode */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Schwierigkeitsgrad</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'AUTO', label: '🎯 Automatisch (30/50/20)' },
                  { id: 'EASY', label: '🟢 Leicht' },
                  { id: 'MEDIUM', label: '🟡 Mittel' },
                  { id: 'HARD', label: '🔴 Anspruchsvoll' },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setDifficultyMode(diff.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      difficultyMode === diff.id
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span>Kategoriefokus</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {selectedCategory === 'ALL'
                  ? 'Verteilt die Fragen ausgewogen über Grammatik, Vokabeln, Alltag und Redemittel.'
                  : `Filtert bevorzugt Fragen aus dem Bereich "${selectedCategory}".`}
              </p>
            </div>
          </div>
        </section>

        {/* Step 5: Zusammenfassung & Raum-Erstellung */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-b from-[#141B2D] to-[#0E1322] shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-black text-white">Sitzungs-Zusammenfassung</h3>
              <p className="text-xs text-slate-400">Überprüfe deine Konfiguration vor dem Start</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-amber-400">
                {totalQuestions}
              </span>
              <span className="text-xs text-slate-400 block">Fragen gesamt</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">GER-Niveau</span>
              <span className="font-bold text-white text-base font-mono">{selectedLevel}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Spiele</span>
              <span className="font-bold text-white text-base font-mono">
                {selectedGames.length} Spiele
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Schwierigkeit</span>
              <span className="font-bold text-white text-sm">
                {difficultyMode === 'AUTO' ? '🎯 Automatisch' : difficultyMode}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block">Kategorie</span>
              <span className="font-bold text-white text-sm truncate block">
                {CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.label.split(' ')[0] ||
                  'Alle'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Geplante Spielsequenz:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedGames.map((g, idx) => {
                const gameDef = GAME_DEFINITIONS.find((def) => def.type === g.gameType);
                return (
                  <span
                    key={g.gameType}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200"
                  >
                    <span className="text-amber-400 font-mono font-bold">#{idx + 1}</span>
                    <span>{gameDef?.icon}</span>
                    <span>{gameDef?.title}</span>
                    <span className="text-slate-400 font-mono">({g.questionCount}F)</span>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={isSubmitting || !isConnected}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg flex items-center justify-center gap-3 shadow-glow-gold hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <span>Spielraum wird erstellt...</span>
            ) : (
              <>
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Spielraum erstellen & PIN generieren</span>
              </>
            )}
          </button>
        </section>
      </div>
    </TeacherLayout>
  );
};
