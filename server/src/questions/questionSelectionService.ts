import { Question, GameLevel, GameType } from '../types/game.types.js';
import {
  BankQuestion,
  DifficultyDistribution,
  QuestionSelectionCriteria,
} from './questionTypes.js';
import { questionRepository, QuestionRepository } from './questionRepository.js';
import { logger } from '../utils/logger.js';

const DEFAULT_DIFFICULTY_DISTRIBUTION: DifficultyDistribution = {
  EASY: 0.3,
  MEDIUM: 0.5,
  HARD: 0.2,
};

/**
 * QuestionSelectionService - Controlled Randomization, Anti-Repetition, & Balancing
 * Phase 6 Question Selection Engine
 */
export class QuestionSelectionService {
  private repository: QuestionRepository;

  constructor(repository: QuestionRepository = questionRepository) {
    this.repository = repository;
  }

  /**
   * Fisher-Yates shuffle algorithm
   */
  public static shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Shuffles multiple-choice answer options using Fisher-Yates without mutating the original question.
   * Preserves correct answer identity for server-side validation.
   */
  public static shuffleAnswers<T extends { options?: string[]; correctAnswer: string | string[]; gameType?: GameType }>(
    question: T
  ): T {
    if (
      !question.options ||
      !Array.isArray(question.options) ||
      question.options.length < 2 ||
      question.gameType === 'SATZ_RENNEN'
    ) {
      return { ...question };
    }

    const shuffledOptions = QuestionSelectionService.shuffle([...question.options]);

    return {
      ...question,
      options: shuffledOptions,
    };
  }

  /**
   * Retrieves all unused questions matching exact level and gameType
   */
  public getAvailableQuestions(
    level: GameLevel,
    gameType: GameType,
    usedQuestionIds?: Set<string> | string[],
    category?: string,
    difficulty?: string
  ): BankQuestion[] {
    let matching = this.repository.getByLevelAndGame(level, gameType);

    if (category && category !== 'ALL') {
      const catLower = category.toLowerCase();
      matching = matching.filter(
        (q) =>
          q.category === category ||
          q.category.toLowerCase().includes(catLower) ||
          (q.tags && q.tags.some((t) => t.toLowerCase().includes(catLower)))
      );
    }

    if (difficulty && difficulty !== 'ALL' && difficulty !== 'AUTO') {
      matching = matching.filter((q) => q.difficulty === difficulty);
    }

    if (!usedQuestionIds) {
      return matching;
    }

    const usedSet =
      usedQuestionIds instanceof Set
        ? new Set(Array.from(usedQuestionIds).map((id) => id.split('_#')[0]))
        : new Set(usedQuestionIds.map((id) => id.split('_#')[0]));

    return matching.filter((q) => !usedSet.has(q.id));
  }

  /**
   * Selects a balanced, strictly anti-repetitive, randomized set of questions for a game.
   * NEVER repeats questions inside a session.
   * If insufficient questions exist, throws a clear warning error with the exact available count.
   */
  public selectQuestions(criteria: QuestionSelectionCriteria): Question[] {
    const {
      level,
      gameType,
      count,
      usedQuestionIds,
      difficultyDistribution = DEFAULT_DIFFICULTY_DISTRIBUTION,
      allowedCategories,
    } = criteria;

    if (count <= 0) return [];

    // 1. Fetch available unused matching questions for level and gameType
    const fullLevelPool = this.getAvailableQuestions(level, gameType, usedQuestionIds);

    if (fullLevelPool.length === 0) {
      logger.warn(
        `[QuestionSelectionService] No questions available for ${level} ${gameType}.`
      );
      throw new Error(
        `Für diese Auswahl stehen nur 0 einzigartige Fragen zur Verfügung.`
      );
    }

    // 2. Filter by allowed categories if specified, with graceful prioritization
    let pool: BankQuestion[];
    if (allowedCategories && allowedCategories.length > 0 && !allowedCategories.includes('ALL')) {
      const catTargets = allowedCategories.map((c) => c.toLowerCase());
      const matchingCategoryPool = fullLevelPool.filter((q) =>
        catTargets.some(
          (cat) =>
            q.category.toLowerCase() === cat ||
            q.category.toLowerCase().includes(cat) ||
            (q.tags && q.tags.some((t) => t.toLowerCase().includes(cat)))
        )
      );

      if (matchingCategoryPool.length >= count) {
        pool = matchingCategoryPool;
      } else if (matchingCategoryPool.length > 0) {
        const remaining = fullLevelPool.filter(
          (q) => !matchingCategoryPool.some((mq) => mq.id === q.id)
        );
        pool = [...matchingCategoryPool, ...QuestionSelectionService.shuffle(remaining)];
      } else {
        pool = fullLevelPool;
      }
    } else {
      pool = fullLevelPool;
    }

    // 3. Strict Check: If unused pool has fewer questions than count, DO NOT REPEAT.
    if (pool.length < count) {
      logger.warn(
        `[QuestionSelectionService] Insufficient unique questions for ${level} ${gameType} (available: ${pool.length}, requested: ${count}).`
      );
      throw new Error(
        `Für diese Auswahl stehen nur ${pool.length} einzigartige Fragen zur Verfügung.`
      );
    }

    // 3. Balance by difficulty (EASY, MEDIUM, HARD)
    const easyPool = QuestionSelectionService.shuffle(pool.filter((q) => q.difficulty === 'EASY'));
    const medPool = QuestionSelectionService.shuffle(pool.filter((q) => q.difficulty === 'MEDIUM'));
    const hardPool = QuestionSelectionService.shuffle(pool.filter((q) => q.difficulty === 'HARD'));

    const targetEasy = Math.round(count * difficultyDistribution.EASY);
    const targetMed = Math.round(count * difficultyDistribution.MEDIUM);
    const targetHard = count - targetEasy - targetMed;

    const selected: BankQuestion[] = [];
    const selectedIds = new Set<string>();

    const pickFrom = (source: BankQuestion[], num: number) => {
      let picked = 0;
      for (const q of source) {
        if (picked >= num) break;
        if (!selectedIds.has(q.id)) {
          selected.push(q);
          selectedIds.add(q.id);
          picked++;
        }
      }
    };

    pickFrom(easyPool, targetEasy);
    pickFrom(medPool, targetMed);
    pickFrom(hardPool, targetHard);

    // If targets were not fully satisfied due to category/difficulty distribution, fill from remaining pool
    if (selected.length < count) {
      const remaining = QuestionSelectionService.shuffle(
        pool.filter((q) => !selectedIds.has(q.id))
      );
      for (const q of remaining) {
        if (selected.length >= count) break;
        selected.push(q);
        selectedIds.add(q.id);
      }
    }

    // 4. Category Balancing (Avoid consecutive same categories)
    let finalBankList = this.balanceCategories(selected);

    // 5. Convert to runtime Question format and randomize answer option positions
    return finalBankList.slice(0, count).map((bq, idx) => {
      const runtimeQ = this.toRuntimeQuestion(bq, idx + 1);
      return QuestionSelectionService.shuffleAnswers(runtimeQ);
    });
  }

  /**
   * Interleaves questions to avoid same categories appearing directly in a row
   */
  private balanceCategories(questions: BankQuestion[]): BankQuestion[] {
    if (questions.length <= 2) return questions;

    const categorized = new Map<string, BankQuestion[]>();
    for (const q of questions) {
      const list = categorized.get(q.category) || [];
      list.push(q);
      categorized.set(q.category, list);
    }

    // If only 1 category, no balancing possible
    if (categorized.size <= 1) return QuestionSelectionService.shuffle(questions);

    const result: BankQuestion[] = [];
    const categoryEntries = Array.from(categorized.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );

    let itemsLeft = questions.length;
    while (itemsLeft > 0) {
      for (const [, list] of categoryEntries) {
        if (list.length > 0) {
          result.push(list.shift()!);
          itemsLeft--;
        }
      }
    }

    return result;
  }

  /**
   * Transforms canonical BankQuestion to runtime Question model
   */
  public toRuntimeQuestion(bq: BankQuestion, indexNumber?: number): Question {
    return {
      id: bq.id,
      level: bq.level,
      gameType: bq.gameType,
      format: bq.type,
      category: bq.category,
      difficulty: bq.difficulty,
      text: bq.question,
      prompt: bq.question,
      options: bq.options ? [...bq.options] : undefined,
      correctAnswer: bq.correctAnswer,
      timeLimit: bq.timeLimit,
      timeLimitSeconds: bq.timeLimit,
      explanation: bq.explanation,
      words: bq.words || (Array.isArray(bq.correctAnswer) ? bq.correctAnswer : undefined),
      clues: bq.clues ? [...bq.clues] : undefined,
      focusWord: bq.focusWord || bq.sourceWord,
      translation: bq.translation || bq.targetLanguage,
    };
  }

  /**
   * Session anti-repetition helpers
   */
  public markQuestionAsUsed(usedSet: Set<string>, questionId: string): void {
    const baseId = questionId.split('_#')[0];
    usedSet.add(baseId);
  }

  public isQuestionUsed(usedSet: Set<string>, questionId: string): boolean {
    const baseId = questionId.split('_#')[0];
    return usedSet.has(baseId);
  }

  public resetSessionQuestions(usedSet: Set<string>): void {
    usedSet.clear();
  }
}

export const questionSelectionService = new QuestionSelectionService();
