/**
 * ScoreService - Centralized scoring, speed bonus, and streak calculations
 * Phase 4 Core Real-Time Game Engine
 */

export class ScoreService {
  public static readonly BASE_SCORE = 500;
  public static readonly MAX_SPEED_BONUS = 500;

  /**
   * Base score for answering
   */
  public static calculateBaseScore(isCorrect: boolean): number {
    return isCorrect ? this.BASE_SCORE : 0;
  }

  /**
   * Speed bonus calculation
   * Linearly scales from MAX_SPEED_BONUS down to 0 based on the fraction of time remaining
   */
  public static calculateSpeedBonus(
    isCorrect: boolean,
    answerTime: number,
    questionStartedAt: number,
    questionEndsAt: number
  ): number {
    if (!isCorrect) return 0;
    const totalDuration = questionEndsAt - questionStartedAt;
    if (totalDuration <= 0) return 0;

    const remainingTime = Math.max(0, questionEndsAt - answerTime);
    const speedFraction = Math.min(1, Math.max(0, remainingTime / totalDuration));

    return Math.round(this.MAX_SPEED_BONUS * speedFraction);
  }

  /**
   * Streak bonus calculation
   * 3+ correct: +100
   * 5+ correct: +200
   * 7+ correct: +300
   * 10+ correct: +500
   */
  public static calculateStreakBonus(streak: number): number {
    if (streak >= 10) return 500;
    if (streak >= 7) return 300;
    if (streak >= 5) return 200;
    if (streak >= 3) return 100;
    return 0;
  }

  /**
   * Calculate all score components for a submitted answer
   */
  public static calculateAnswerScore(
    isCorrect: boolean,
    answerTime: number,
    questionStartedAt: number,
    questionEndsAt: number,
    newStreak: number
  ): {
    baseScore: number;
    speedBonus: number;
    streakBonus: number;
    totalPoints: number;
  } {
    if (!isCorrect) {
      return {
        baseScore: 0,
        speedBonus: 0,
        streakBonus: 0,
        totalPoints: 0,
      };
    }

    const baseScore = this.calculateBaseScore(true);
    const speedBonus = this.calculateSpeedBonus(
      true,
      answerTime,
      questionStartedAt,
      questionEndsAt
    );
    const streakBonus = this.calculateStreakBonus(newStreak);
    const totalPoints = baseScore + speedBonus + streakBonus;

    return {
      baseScore,
      speedBonus,
      streakBonus,
      totalPoints,
    };
  }
}
