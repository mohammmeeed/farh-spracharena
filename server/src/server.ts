import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSocketHandlers } from './socket/socket.handler.js';
import { roomManager } from './rooms/room.manager.js';
import { gameEngine } from './games/GameEngine.js';
import { logger } from './utils/logger.js';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/game.types.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const rawOrigins =

  process.env.CLIENT_ORIGIN ||
  process.env.CLIENT_URL ||
  process.env.CORS_ORIGIN ||
  'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173';

const allowedOrigins = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const app = express();

// Security Headers Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

const isOriginAllowed = (origin?: string): boolean => {
  if (!origin) return true;
  if (process.env.NODE_ENV !== 'production') return true;
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return true;

  try {
    const originHost = new URL(origin).host;
    for (const allowed of allowedOrigins) {
      if (allowed.startsWith('http://') || allowed.startsWith('https://')) {
        const allowedHost = new URL(allowed).host;
        if (originHost === allowedHost) return true;
      } else if (originHost === allowed) {
        return true;
      }
    }
  } catch {
    // Fallback if URL parsing fails
  }
  return false;
};

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS Policy: Origin not allowed.'));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json());

// Operational Health Check Endpoints (/health and /api/health)
const healthHandler = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    application: 'Farh SprachArena',
    uptime: Math.floor(process.uptime()),
    activeRooms: roomManager.getActiveRoomCount(),
    timestamp: Date.now(),
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// Room Inspection Endpoint (Read-Only)
app.get('/api/rooms/:roomId', (req: Request, res: Response) => {
  const roomId = String(req.params.roomId);
  const room = roomManager.getRoomById(roomId);
  if (!room) {
    res.status(404).json({ error: 'Raum nicht gefunden' });
    return;
  }
  res.json({
    roomId: room.roomId,
    pin: room.pin,
    level: room.level,
    games: room.games,
    status: room.status,
    totalQuestions: room.totalQuestions,
    createdAt: room.createdAt,
  });
});

// Root information endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Farh SprachArena API',
    version: '1.0.0',
    description: 'Interaktive Deutsch-Lernplattform für den Unterricht',
    status: 'running',
    healthCheck: '/health',
    activeRooms: roomManager.getActiveRoomCount(),
  });
});

// Create HTTP Server & Socket.IO
const httpServer = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS Policy: Socket origin not allowed.'));
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 10000,
  pingInterval: 5000,
  maxHttpBufferSize: 1e6, // 1MB packet limit
});


// Attach Socket Handlers
setupSocketHandlers(io);

// Graceful Shutdown
function gracefulShutdown(signal: string) {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  // Close all active rooms
  for (const room of roomManager.getAllRooms()) {
    gameEngine.cleanupRoom(room.roomId);
    io.to(room.roomId).emit('server:roomClosed', {
      roomId: room.roomId,
      reason: 'Der Server wird gewartet/neugestartet.',
    });
  }

  io.close(() => {
    logger.info('Socket.IO connections closed.');
    httpServer.close(() => {
      logger.info('HTTP server closed. Exiting process.');
      process.exit(0);
    });
  });

  // Force close if graceful shutdown exceeds 5s
  setTimeout(() => {
    logger.error('Graceful shutdown timeout exceeded. Forcing exit.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start Server
httpServer.listen(PORT, () => {
  logger.info(`===============================================`);
  logger.info(`Farh SprachArena Backend Server running!`);
  logger.info(`Port: ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`CORS allowed origins: ${allowedOrigins.join(', ')}`);

  logger.info(`===============================================`);
});

export { app, httpServer, io };
