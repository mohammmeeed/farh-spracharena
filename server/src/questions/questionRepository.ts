import { BankQuestion, GameLevel, GameType, QuestionDifficulty, QuestionValidationResult } from './questionTypes.js';
import { A1_QUESTIONS } from './a1/index.js';
import { A2_QUESTIONS } from './a2/index.js';
import { B1_QUESTIONS } from './b1/index.js';
import { B2_QUESTIONS } from './b2/index.js';
import { QuestionValidator } from './questionValidator.js';
import { logger } from '../utils/logger.js';

/**
 * QuestionRepository - In-Memory High-Performance Indexed Question Storage
 * Phase 6 Question Bank
 */
export class QuestionRepository {
  private static instance: QuestionRepository;

  private allQuestions: BankQuestion[] = [];
  private byId = new Map<string, BankQuestion>();
  private byLevel = new Map<GameLevel, BankQuestion[]>();
  private byGameType = new Map<GameType, BankQuestion[]>();
  private byLevelAndGame = new Map<string, BankQuestion[]>();
  private validationResult: QuestionValidationResult;

  private constructor() {
    // 1. Aggregate all static level files
    this.allQuestions = [
      ...A1_QUESTIONS,
      ...A2_QUESTIONS,
      ...B1_QUESTIONS,
      ...B2_QUESTIONS,
    ];

    // 2. Validate all questions on server initialization
    this.validationResult = QuestionValidator.validateAllQuestions(this.allQuestions);

    if (!this.validationResult.valid) {
      logger.error(
        `[QuestionRepository] ❌ Question validation errors found (${this.validationResult.errors.length}):\n` +
          this.validationResult.errors.slice(0, 10).join('\n')
      );
      throw new Error(`Question bank contains ${this.validationResult.errors.length} invalid questions.`);
    }

    // 3. Build fast in-memory indices
    this.buildIndices();

    logger.info(
      `[QuestionRepository] Initialized ${this.allQuestions.length} verified questions (A1: ${this.validationResult.byLevel.A1}, A2: ${this.validationResult.byLevel.A2}, B1: ${this.validationResult.byLevel.B1}, B2: ${this.validationResult.byLevel.B2})`
    );
  }

  public static getInstance(): QuestionRepository {
    if (!this.instance) {
      this.instance = new QuestionRepository();
    }
    return this.instance;
  }

  private buildIndices(): void {
    const levels: GameLevel[] = ['A1', 'A2', 'B1', 'B2'];
    const games: GameType[] = [
      'SCHNELLANTWORT',
      'SATZ_RENNEN',
      'WORTSCHATZ_DUELL',
      'WAS_BIN_ICH',
      'TEAM_BATTLE',
    ];

    levels.forEach((l) => this.byLevel.set(l, []));
    games.forEach((g) => this.byGameType.set(g, []));

    levels.forEach((l) => {
      games.forEach((g) => {
        this.byLevelAndGame.set(`${l}_${g}`, []);
      });
    });

    for (const q of this.allQuestions) {
      // By ID
      this.byId.set(q.id, q);

      // By Level
      const levelList = this.byLevel.get(q.level);
      if (levelList) levelList.push(q);

      // By Game
      const gameList = this.byGameType.get(q.gameType);
      if (gameList) gameList.push(q);

      // By Level + Game
      const levelGameKey = `${q.level}_${q.gameType}`;
      const levelGameList = this.byLevelAndGame.get(levelGameKey);
      if (levelGameList) levelGameList.push(q);
    }
  }

  public getAll(): BankQuestion[] {
    return [...this.allQuestions];
  }

  public getById(id: string): BankQuestion | undefined {
    return this.byId.get(id);
  }

  public getByLevel(level: GameLevel): BankQuestion[] {
    return this.byLevel.get(level) || [];
  }

  public getByGameType(gameType: GameType): BankQuestion[] {
    return this.byGameType.get(gameType) || [];
  }

  public getByLevelAndGame(level: GameLevel, gameType: GameType): BankQuestion[] {
    return this.byLevelAndGame.get(`${level}_${gameType}`) || [];
  }

  public getCategories(level?: GameLevel): string[] {
    const questions = level ? this.getByLevel(level) : this.allQuestions;
    const set = new Set<string>();
    questions.forEach((q) => set.add(q.category));
    return Array.from(set);
  }

  public getValidationResult(): QuestionValidationResult {
    return this.validationResult;
  }
}

export const questionRepository = QuestionRepository.getInstance();
