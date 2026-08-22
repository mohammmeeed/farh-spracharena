/**
 * Logger utility for Farh SprachArena server
 */

export const logger = {
  info: (...args: unknown[]) => {
    console.log(`[INFO] [${new Date().toISOString()}]`, ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(`[WARN] [${new Date().toISOString()}]`, ...args);
  },
  error: (...args: unknown[]) => {
    console.error(`[ERROR] [${new Date().toISOString()}]`, ...args);
  },
  socket: (...args: unknown[]) => {
    console.log(`[SOCKET] [${new Date().toISOString()}]`, ...args);
  },
};
