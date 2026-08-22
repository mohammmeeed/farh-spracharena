/**
 * Lightweight In-Memory Rate Limiter for Socket.IO Events
 * Protects server against packet flooding, spamming, and denial-of-service attempts.
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private limits: Map<string, RateLimitRecord> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Periodically clean up expired records to prevent memory leak
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, record] of this.limits.entries()) {
        if (now > record.resetAt) {
          this.limits.delete(key);
        }
      }
    }, 30000);
  }

  /**
   * Check if an action by a socket is allowed under the rate limit
   * @param key Unique identifier (e.g. `${socketId}:${action}`)
   * @param maxRequests Maximum allowed requests in window
   * @param windowMs Window duration in milliseconds
   * @returns true if allowed, false if limit exceeded
   */
  public isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.limits.get(key);

    if (!record || now > record.resetAt) {
      this.limits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  public destroy(): void {
    clearInterval(this.cleanupInterval);
  }
}

export const socketRateLimiter = new RateLimiter();
