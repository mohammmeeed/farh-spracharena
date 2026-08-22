import { logger } from '../utils/logger.js';

interface ActiveTimer {
  timeoutId?: NodeJS.Timeout;
  intervalId?: NodeJS.Timeout;
  startedAt: number;
  durationMs: number;
  remainingMs: number;
  isPaused: boolean;
  onComplete: () => void;
  onTick?: (remainingMs: number) => void;
}

/**
 * TimerService - Server-authoritative timer manager
 * Manages question countdowns, question durations, and pause/resume logic.
 */
export class TimerService {
  private timers: Map<string, ActiveTimer> = new Map();

  /**
   * Start a countdown or question timer
   */
  public startTimer(
    id: string,
    durationMs: number,
    onComplete: () => void,
    onTick?: (remainingMs: number) => void
  ): void {
    this.cancelTimer(id);

    const startedAt = Date.now();
    const timer: ActiveTimer = {
      startedAt,
      durationMs,
      remainingMs: durationMs,
      isPaused: false,
      onComplete,
      onTick,
    };

    if (onTick) {
      timer.intervalId = setInterval(() => {
        if (!timer.isPaused) {
          const elapsed = Date.now() - timer.startedAt;
          const remaining = Math.max(0, timer.durationMs - elapsed);
          timer.remainingMs = remaining;
          onTick(remaining);
        }
      }, 1000);
    }

    timer.timeoutId = setTimeout(() => {
      this.cancelTimer(id);
      onComplete();
    }, durationMs);

    this.timers.set(id, timer);
  }

  /**
   * Cancel and cleanup an active timer
   */
  public cancelTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      if (timer.timeoutId) clearTimeout(timer.timeoutId);
      if (timer.intervalId) clearInterval(timer.intervalId);
      this.timers.delete(id);
    }
  }

  /**
   * Pause a timer (e.g. on teacher disconnect)
   */
  public pauseTimer(id: string): number {
    const timer = this.timers.get(id);
    if (!timer || timer.isPaused) return 0;

    const elapsed = Date.now() - timer.startedAt;
    const remaining = Math.max(0, timer.durationMs - elapsed);
    timer.remainingMs = remaining;
    timer.isPaused = true;

    if (timer.timeoutId) clearTimeout(timer.timeoutId);
    if (timer.intervalId) clearInterval(timer.intervalId);

    logger.info(`[TimerService] Timer ${id} paused. Remaining: ${remaining}ms`);
    return remaining;
  }

  /**
   * Resume a paused timer
   */
  public resumeTimer(id: string): boolean {
    const timer = this.timers.get(id);
    if (!timer || !timer.isPaused) return false;

    timer.isPaused = false;
    timer.startedAt = Date.now();
    timer.durationMs = timer.remainingMs;

    if (timer.onTick) {
      timer.intervalId = setInterval(() => {
        if (!timer.isPaused) {
          const elapsed = Date.now() - timer.startedAt;
          const remaining = Math.max(0, timer.durationMs - elapsed);
          timer.remainingMs = remaining;
          timer.onTick!(remaining);
        }
      }, 1000);
    }

    timer.timeoutId = setTimeout(() => {
      this.cancelTimer(id);
      timer.onComplete();
    }, timer.durationMs);

    logger.info(`[TimerService] Timer ${id} resumed with ${timer.durationMs}ms remaining.`);
    return true;
  }

  /**
   * Check if a timer is active
   */
  public hasTimer(id: string): boolean {
    return this.timers.has(id);
  }
}

export const timerService = new TimerService();
