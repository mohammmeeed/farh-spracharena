import { Player, LeaderboardEntry } from '../types/game.types.js';

/**
 * LeaderboardService - Sorts and formats player standings
 * Phase 4 Core Real-Time Game Engine
 */
export class LeaderboardService {
  /**
   * Generates a ranked leaderboard from room players map or array
   */
  public static generateLeaderboard(players: Record<string, Player> | Player[]): LeaderboardEntry[] {
    const playerList = Array.isArray(players) ? players : Object.values(players);

    // Sort players:
    // 1. Score descending
    // 2. Tie-breaker: Highest streak descending
    // 3. Tie-breaker: Earlier join time
    const sorted = [...playerList].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (b.highestStreak !== a.highestStreak) {
        return b.highestStreak - a.highestStreak;
      }
      return a.joinedAt - b.joinedAt;
    });

    return sorted.map((player, index) => ({
      rank: index + 1,
      playerId: player.playerId,
      name: player.name,
      score: player.score,
      streak: player.currentStreak,
      answeredCurrentQuestion: player.answeredCurrentQuestion,
      lastAnswerCorrect: player.lastAnswerCorrect,
      lastPointsEarned: player.lastPointsEarned,
      connected: player.connected,
    }));
  }

  /**
   * Get top ranked player
   */
  public static getTopPlayer(leaderboard: LeaderboardEntry[]): LeaderboardEntry | undefined {
    return leaderboard.length > 0 ? leaderboard[0] : undefined;
  }
}
