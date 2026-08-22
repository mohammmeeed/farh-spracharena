import { GameLevel, GameType, Question } from '../types/game.types.js';
import { questionSelectionService } from '../questions/questionSelectionService.js';

/**
 * QuestionSelectionService - Adapter for Question Selection System
 * Phase 6 Question System
 */
export class QuestionSelectionService {
  public static getQuestionsForGame(
    level: GameLevel,
    gameType: GameType,
    count: number
  ): Question[] {
    return questionSelectionService.selectQuestions({
      level,
      gameType,
      count,
    });
  }
}

