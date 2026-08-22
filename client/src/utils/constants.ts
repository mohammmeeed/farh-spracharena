import { GameLevel, GameType } from '../types/game.types';

export interface LevelInfo {
  level: GameLevel;
  title: string;
  subtitle: string;
  badgeColor: string;
  borderColor: string;
  description: string;
}

export const GAME_LEVELS: LevelInfo[] = [
  {
    level: 'A1',
    title: 'A1 - Anfänger',
    subtitle: 'Grundwortschatz & Basissätze',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    borderColor: 'hover:border-emerald-500/50',
    description: 'Einfache Begrüßungen, Zahlen, Familie, Farben und grundlegende Verben.',
  },
  {
    level: 'A2',
    title: 'A2 - Grundlagen',
    subtitle: 'Alltagssituationen & Dialoge',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    borderColor: 'hover:border-cyan-500/50',
    description: 'Einkaufen, Wegbeschreibungen, Berufe, Perfekt und trennbare Verben.',
  },
  {
    level: 'B1',
    title: 'B1 - Mittelstufe',
    subtitle: 'Satzbau, Nebensätze & Grammatik',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    borderColor: 'hover:border-amber-500/50',
    description: 'Nebensätze mit weil/dass/obwohl, Konjunktiv II und erweiterter Wortschatz.',
  },
  {
    level: 'B2',
    title: 'B2 - Fortgeschritten',
    subtitle: 'Idiome, Debatten & Fachbegriffe',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    borderColor: 'hover:border-indigo-500/50',
    description: 'Komplexe Redewendungen, Passivkonstruktionen, Nomen-Verb-Verbindungen.',
  },
];

export interface GameTypeInfo {
  type: GameType;
  title: string;
  subtitle: string;
  icon: string;
  defaultQuestionCount: number;
  description: string;
  accentColor: string;
}

export const GAME_TYPES: GameTypeInfo[] = [
  {
    type: 'SCHNELLANTWORT',
    title: 'Schnellantwort',
    subtitle: 'Speed-Quiz gegen die Uhr',
    icon: '⚡',
    defaultQuestionCount: 10,
    description: 'Beantworte die Frage so schnell wie möglich.',
    accentColor: 'border-amber-500/30 text-amber-400',
  },
  {
    type: 'SATZ_RENNEN',
    title: 'Satz-Rennen',
    subtitle: 'Grammatik & Wortstellung',
    icon: '🧩',
    defaultQuestionCount: 8,
    description: 'Bringe die Wörter in die richtige Reihenfolge.',
    accentColor: 'border-cyan-500/30 text-cyan-400',
  },
  {
    type: 'WORTSCHATZ_DUELL',
    title: 'Wortschatz-Duell',
    subtitle: 'Artikel & Wortpaare',
    icon: '🧠',
    defaultQuestionCount: 12,
    description: 'Teste deinen deutschen Wortschatz.',
    accentColor: 'border-rose-500/30 text-rose-400',
  },
  {
    type: 'WAS_BIN_ICH',
    title: 'Was bin ich?',
    subtitle: 'Hinweis-Rätsel & Deduktion',
    icon: '🕵️',
    defaultQuestionCount: 8,
    description: 'Errate die gesuchte Person, Sache oder Tätigkeit.',
    accentColor: 'border-purple-500/30 text-purple-400',
  },
  {
    type: 'TEAM_BATTLE',
    title: 'Team Battle',
    subtitle: 'Klassen-Kooperation',
    icon: '⚔️',
    defaultQuestionCount: 15,
    description: 'Spielt gemeinsam in Teams und sammelt Punkte.',
    accentColor: 'border-emerald-500/30 text-emerald-400',
  },
];

export const QUESTION_COUNT_PRESETS = [5, 10, 15, 20];
export const MIN_QUESTION_COUNT = 5;
export const MAX_QUESTION_COUNT = 30;
