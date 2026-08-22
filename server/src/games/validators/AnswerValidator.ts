import { GameType, Question } from '../../types/game.types.js';

/**
 * AnswerValidator - Game-Specific Answer Validation Logic
 * Phase 5 Multiplayer Games
 */
export class AnswerValidator {
  /**
   * Normalizes a string for comparison (trimmed, whitespace collapsed, case-insensitive)
   */
  public static normalize(text: string): string {
    return (text || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,!?;:]/g, '');
  }

  /**
   * 1. Multiple Choice Validator (Schnellantwort, Wortschatz-Duell, Was bin ich?, Team Battle)
   */
  public static validateMultipleChoiceAnswer(
    submission: string | string[],
    correctAnswer: string | string[]
  ): boolean {
    const subStr = Array.isArray(submission) ? submission.join(' ') : String(submission);
    const correctStr = Array.isArray(correctAnswer) ? correctAnswer.join(' ') : String(correctAnswer);

    return this.normalize(subStr) === this.normalize(correctStr);
  }

  /**
   * 2. Sentence Order Validator (Satz-Rennen)
   * Validates ordered word chunks against the expected sequence
   */
  public static validateSentenceOrderAnswer(
    submission: string | string[],
    correctAnswer: string | string[]
  ): boolean {
    // If submitted as array of word chunks
    if (Array.isArray(submission) && Array.isArray(correctAnswer)) {
      if (submission.length !== correctAnswer.length) return false;
      return submission.every(
        (word, idx) => this.normalize(word) === this.normalize(correctAnswer[idx])
      );
    }

    // If submitted as joined string vs array/string
    const subStr = Array.isArray(submission) ? submission.join(' ') : String(submission);
    const correctStr = Array.isArray(correctAnswer) ? correctAnswer.join(' ') : String(correctAnswer);

    return this.normalize(subStr) === this.normalize(correctStr);
  }

  /**
   * 3. Vocabulary Validator (Wortschatz-Duell)
   */
  public static validateVocabularyAnswer(
    submission: string | string[],
    correctAnswer: string | string[]
  ): boolean {
    return this.validateMultipleChoiceAnswer(submission, correctAnswer);
  }

  /**
   * 4. Clue Deduction Validator (Was bin ich?)
   */
  public static validateClueAnswer(
    submission: string | string[],
    correctAnswer: string | string[]
  ): boolean {
    return this.validateMultipleChoiceAnswer(submission, correctAnswer);
  }

  /**
   * Central Dispatcher for any Game Type
   */
  public static validate(
    gameType: GameType,
    submission: string | string[],
    question: Question
  ): boolean {
    switch (gameType) {
      case 'SATZ_RENNEN':
        return this.validateSentenceOrderAnswer(submission, question.correctAnswer);
      case 'WORTSCHATZ_DUELL':
        return this.validateVocabularyAnswer(submission, question.correctAnswer);
      case 'WAS_BIN_ICH':
        return this.validateClueAnswer(submission, question.correctAnswer);
      case 'SCHNELLANTWORT':
      case 'TEAM_BATTLE':
      default:
        return this.validateMultipleChoiceAnswer(submission, question.correctAnswer);
    }
  }
}
