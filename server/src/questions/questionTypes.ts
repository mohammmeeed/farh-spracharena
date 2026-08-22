import { GameLevel, GameType, QuestionDifficulty, QuestionFormat } from '../types/game.types.js';

export type { GameLevel, GameType, QuestionDifficulty, QuestionFormat };

/**
 * BankQuestion - Canonical Data Model for the Farh SprachArena Question Bank
 * Phase 6 Question System
 */
export interface BankQuestion {
  id: string;
  level: GameLevel;
  gameType: GameType;
  category: string;
  difficulty: QuestionDifficulty;
  type: QuestionFormat;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  tags: string[];
  timeLimit: number;

  // Game-specific fields
  words?: string[];           // SATZ_RENNEN
  correctOrder?: string[];    // SATZ_RENNEN
  sourceWord?: string;        // WORTSCHATZ_DUELL
  focusWord?: string;         // WORTSCHATZ_DUELL
  targetLanguage?: string;    // WORTSCHATZ_DUELL
  translation?: string;       // WORTSCHATZ_DUELL
  clues?: string[];           // WAS_BIN_ICH
}

/**
 * Configurable Difficulty Distribution for Selection Balancing
 */
export interface DifficultyDistribution {
  EASY: number;   // e.g. 0.3 (30%)
  MEDIUM: number; // e.g. 0.5 (50%)
  HARD: number;   // e.g. 0.2 (20%)
}

/**
 * Question Selection Criteria Payload
 */
export interface QuestionSelectionCriteria {
  level: GameLevel;
  gameType: GameType;
  count: number;
  usedQuestionIds?: Set<string> | string[];
  difficultyDistribution?: DifficultyDistribution;
  allowedCategories?: string[];
}

/**
 * Validation Result Structure
 */
export interface QuestionValidationResult {
  valid: boolean;
  totalQuestions: number;
  byLevel: Record<GameLevel, number>;
  byGame: Record<GameType, number>;
  byDifficulty: Record<QuestionDifficulty, number>;
  errors: string[];
  warnings: string[];
  duplicateIds: string[];
  duplicateQuestions: string[];
}
