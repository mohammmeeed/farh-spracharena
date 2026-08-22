/**
 * QuestionHistoryService - In-Memory Tracking for Session and Historical Question Usage
 * Ready for future database persistence without modifying core game logic
 * Phase 6 Question System
 */
export interface SessionHistoryEntry {
  sessionId: string;
  roomId: string;
  level: string;
  gameType: string;
  questionId: string;
  timestamp: number;
}

export class QuestionHistoryService {
  private static instance: QuestionHistoryService;
  private sessionHistory = new Map<string, Set<string>>(); // roomId -> Set of question base IDs

  public static getInstance(): QuestionHistoryService {
    if (!this.instance) {
      this.instance = new QuestionHistoryService();
    }
    return this.instance;
  }

  /**
   * Records a question as used in a room session
   */
  public recordUsage(roomId: string, questionId: string): void {
    const baseId = questionId.split('_#')[0];
    const set = this.sessionHistory.get(roomId) || new Set<string>();
    set.add(baseId);
    this.sessionHistory.set(roomId, set);
  }

  /**
   * Retrieves all used question IDs for a given room session
   */
  public getUsedQuestionIds(roomId: string): Set<string> {
    return this.sessionHistory.get(roomId) || new Set<string>();
  }

  /**
   * Clears historical record for a completed room session
   */
  public clearRoomSession(roomId: string): void {
    this.sessionHistory.delete(roomId);
  }
}

export const questionHistoryService = QuestionHistoryService.getInstance();
