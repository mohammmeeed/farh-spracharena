import { BankQuestion, QuestionValidationResult, GameLevel, GameType, QuestionDifficulty } from './questionTypes.js';

const VALID_LEVELS: GameLevel[] = ['A1', 'A2', 'B1', 'B2'];
const VALID_GAME_TYPES: GameType[] = [
  'SCHNELLANTWORT',
  'SATZ_RENNEN',
  'WORTSCHATZ_DUELL',
  'WAS_BIN_ICH',
  'TEAM_BATTLE',
];
const VALID_DIFFICULTIES: QuestionDifficulty[] = ['EASY', 'MEDIUM', 'HARD'];

/**
 * QuestionValidator - Validates question data integrity, format correctness, and duplicate detection
 * Phase 6 Question System
 */
export class QuestionValidator {
  /**
   * Normalizes a text string for duplicate text comparison
   */
  public static normalizeText(text: string): string {
    return (text || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,!?;:_\-]/g, '');
  }

  /**
   * Validates a single question against all architectural rules
   */
  public static validateQuestion(q: BankQuestion): string[] {
    const errors: string[] = [];

    // 1. ID check
    if (!q.id || typeof q.id !== 'string' || q.id.trim().length === 0) {
      errors.push(`Question has missing or empty id.`);
    }

    // 2. Level check
    if (!VALID_LEVELS.includes(q.level)) {
      errors.push(`Question [${q.id}]: Invalid level "${q.level}". Expected A1, A2, B1, or B2.`);
    }

    // 3. GameType check
    if (!VALID_GAME_TYPES.includes(q.gameType)) {
      errors.push(`Question [${q.id}]: Invalid gameType "${q.gameType}".`);
    }

    // 4. Category check
    if (!q.category || typeof q.category !== 'string' || q.category.trim().length === 0) {
      errors.push(`Question [${q.id}]: Missing or empty category.`);
    }

    // 5. Difficulty check
    if (!VALID_DIFFICULTIES.includes(q.difficulty)) {
      errors.push(`Question [${q.id}]: Invalid difficulty "${q.difficulty}". Expected EASY, MEDIUM, or HARD.`);
    }

    // 6. Question prompt text
    if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
      errors.push(`Question [${q.id}]: Missing question text.`);
    }

    // 7. Correct answer check
    if (!q.correctAnswer || (Array.isArray(q.correctAnswer) && q.correctAnswer.length === 0)) {
      errors.push(`Question [${q.id}]: Missing correctAnswer.`);
    }

    // 8. Time limit
    if (!q.timeLimit || typeof q.timeLimit !== 'number' || q.timeLimit < 5 || q.timeLimit > 60) {
      errors.push(`Question [${q.id}]: Invalid timeLimit "${q.timeLimit}". Must be between 5 and 60 seconds.`);
    }

    // 9. Game-Specific Format Validation
    switch (q.gameType) {
      case 'SCHNELLANTWORT':
      case 'TEAM_BATTLE': {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`Question [${q.id}]: Multiple-choice questions require at least 2 options.`);
        } else if (typeof q.correctAnswer === 'string') {
          const match = q.options.some(
            (opt) => this.normalizeText(opt) === this.normalizeText(q.correctAnswer as string)
          );
          if (!match) {
            errors.push(
              `Question [${q.id}]: correctAnswer "${q.correctAnswer}" does not exist in options: [${q.options.join(', ')}].`
            );
          }
        }
        break;
      }

      case 'SATZ_RENNEN': {
        const words = q.words || (Array.isArray(q.correctAnswer) ? q.correctAnswer : []);
        if (!words || words.length < 2) {
          errors.push(`Question [${q.id}]: Satz-Rennen questions must provide at least 2 word tokens in words.`);
        }
        break;
      }

      case 'WORTSCHATZ_DUELL': {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`Question [${q.id}]: Wortschatz-Duell requires at least 2 answer options.`);
        } else if (typeof q.correctAnswer === 'string') {
          const match = q.options.some(
            (opt) => this.normalizeText(opt) === this.normalizeText(q.correctAnswer as string)
          );
          if (!match) {
            errors.push(
              `Question [${q.id}]: Wortschatz correctAnswer "${q.correctAnswer}" is not in options.`
            );
          }
        }
        break;
      }

      case 'WAS_BIN_ICH': {
        if (!q.clues || !Array.isArray(q.clues) || q.clues.length < 2) {
          errors.push(`Question [${q.id}]: Was bin ich? questions must have at least 2 progressive clues.`);
        }
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`Question [${q.id}]: Was bin ich? questions require at least 2 multiple-choice options.`);
        } else if (typeof q.correctAnswer === 'string') {
          const match = q.options.some(
            (opt) => this.normalizeText(opt) === this.normalizeText(q.correctAnswer as string)
          );
          if (!match) {
            errors.push(
              `Question [${q.id}]: Clue deduction correctAnswer "${q.correctAnswer}" is not in options.`
            );
          }
        }
        break;
      }
    }

    return errors;
  }

  /**
   * Validates an entire list of questions, detecting duplicate IDs and identical texts
   */
  public static validateAllQuestions(questions: BankQuestion[]): QuestionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const duplicateIds: string[] = [];
    const duplicateQuestions: string[] = [];

    const seenIds = new Set<string>();
    const seenTexts = new Map<string, string>(); // normalizedKey -> originalId

    const byLevel: Record<GameLevel, number> = { A1: 0, A2: 0, B1: 0, B2: 0 };
    const byGame: Record<GameType, number> = {
      SCHNELLANTWORT: 0,
      SATZ_RENNEN: 0,
      WORTSCHATZ_DUELL: 0,
      WAS_BIN_ICH: 0,
      TEAM_BATTLE: 0,
    };
    const byDifficulty: Record<QuestionDifficulty, number> = { EASY: 0, MEDIUM: 0, HARD: 0 };

    for (const q of questions) {
      // 1. Check duplicate IDs
      if (seenIds.has(q.id)) {
        duplicateIds.push(q.id);
        errors.push(`Duplicate Question ID found: "${q.id}".`);
      } else {
        seenIds.add(q.id);
      }

      // 2. Check exact duplicate question text in same level & gameType
      const textKey = `${q.level}_${q.gameType}_${this.normalizeText(q.question)}`;
      if (q.gameType !== 'SATZ_RENNEN' && seenTexts.has(textKey)) {
        const previousId = seenTexts.get(textKey);
        duplicateQuestions.push(q.id);
        warnings.push(
          `Duplicate question text detected between [${q.id}] and [${previousId}]: "${q.question}".`
        );
      } else {
        seenTexts.set(textKey, q.id);
      }

      // 3. Run individual question validator
      const qErrors = this.validateQuestion(q);
      errors.push(...qErrors);

      // 4. Accumulate counts
      if (VALID_LEVELS.includes(q.level)) byLevel[q.level]++;
      if (VALID_GAME_TYPES.includes(q.gameType)) byGame[q.gameType]++;
      if (VALID_DIFFICULTIES.includes(q.difficulty)) byDifficulty[q.difficulty]++;
    }

    return {
      valid: errors.length === 0,
      totalQuestions: questions.length,
      byLevel,
      byGame,
      byDifficulty,
      errors,
      warnings,
      duplicateIds,
      duplicateQuestions,
    };
  }
}
