import {
  GameRoom,
  GameLevel,
  GameType,
  CreateRoomPayload,
  GameSessionConfig,
  Player,
} from '../types/game.types.js';
import { questionSelectionService } from '../questions/questionSelectionService.js';
import { logger } from '../utils/logger.js';

const VALID_LEVELS: GameLevel[] = ['A1', 'A2', 'B1', 'B2'];
const VALID_GAME_TYPES: GameType[] = [
  'SCHNELLANTWORT',
  'SATZ_RENNEN',
  'WORTSCHATZ_DUELL',
  'WAS_BIN_ICH',
  'TEAM_BATTLE',
];

export interface ValidationResult {
  valid: boolean;
  error?: string;
  room?: GameRoom;
}

/**
 * Sanitize student input name to prevent XSS / malicious tags
 */
export function sanitizeStudentName(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'/]/g, '')
    .trim();
}

/**
 * In-Memory Room Manager for Farh SprachArena
 * Manages active classroom game rooms and temporary student sessions without a database.
 */
export class RoomManager {
  private rooms: Map<string, GameRoom> = new Map(); // Keyed by roomId
  private pinToRoomId: Map<string, string> = new Map(); // Keyed by PIN
  private socketIdToPlayer: Map<string, { roomId: string; playerId: string }> = new Map();
  private teacherDisconnectTimers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Validates room creation payload (Teacher)
   */
  public validateCreateRoomPayload(payload: CreateRoomPayload): ValidationResult {
    if (!payload) {
      return { valid: false, error: 'Ungültige Anfrage.' };
    }

    if (!payload.level || !VALID_LEVELS.includes(payload.level)) {
      return { valid: false, error: 'Bitte wähle ein gültiges Niveau aus (A1, A2, B1, B2).' };
    }

    if (!payload.games || !Array.isArray(payload.games) || payload.games.length === 0) {
      return { valid: false, error: 'Bitte wähle mindestens ein Spiel aus.' };
    }

    const seenGames = new Set<GameType>();
    for (const game of payload.games) {
      if (!game.gameType || !VALID_GAME_TYPES.includes(game.gameType)) {
        return { valid: false, error: `Ungültiger Spieltyp: ${game.gameType}` };
      }

      if (seenGames.has(game.gameType)) {
        return { valid: false, error: `Doppelter Spieltyp ausgewählt: ${game.gameType}` };
      }
      seenGames.add(game.gameType);

      const count = Number(game.questionCount);
      if (!Number.isInteger(count) || count < 1 || count > 50) {
        return {
          valid: false,
          error: 'Die Anzahl der Fragen muss für jedes Spiel mindestens 1 sein.',
        };
      }

      const available = questionSelectionService.getAvailableQuestions(
        payload.level,
        game.gameType,
        undefined,
        payload.category,
        payload.difficulty
      );

      if (available.length < count) {
        return {
          valid: false,
          error: `Für diese Auswahl stehen nur ${available.length} einzigartige Fragen zur Verfügung.`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Validates student join request (PIN & Name)
   */
  public validateStudentJoin(rawPin: string, rawName: string): ValidationResult {
    const pin = (rawPin || '').trim();
    const cleanName = sanitizeStudentName(rawName);

    // 1. PIN Validation
    if (!pin) {
      return { valid: false, error: 'Bitte gib den 6-stelligen Spiel-PIN ein.' };
    }

    if (!/^\d{6}$/.test(pin)) {
      return { valid: false, error: 'Der Spiel-PIN muss aus 6 Ziffern bestehen.' };
    }

    const room = this.getRoomByPin(pin);
    if (!room) {
      return { valid: false, error: 'Dieser Spielraum wurde nicht gefunden.' };
    }

    if (room.status !== 'WAITING') {
      return { valid: false, error: 'Dieser Spielraum ist nicht mehr verfügbar.' };
    }

    // 2. Name Validation
    if (!cleanName) {
      return { valid: false, error: 'Bitte gib deinen Namen ein.' };
    }

    if (cleanName.length < 2) {
      return { valid: false, error: 'Der Name muss mindestens 2 Zeichen lang sein.' };
    }

    if (cleanName.length > 30) {
      return { valid: false, error: 'Der Name darf maximal 30 Zeichen enthalten.' };
    }


    // 3. Duplicate Name in same room check (Case-Insensitive)
    const existingPlayers = Object.values(room.players || {});
    const duplicate = existingPlayers.some(
      (p) => p.name.trim().toLowerCase() === cleanName.toLowerCase()
    );

    if (duplicate) {
      return { valid: false, error: 'Dieser Name wird bereits verwendet.' };
    }

    return { valid: true, room };
  }

  /**
   * Generate a unique 6-digit random numeric room PIN (100000 - 999999)
   */
  public generateUniquePin(): string {
    let pin: string;
    let attempts = 0;
    const maxAttempts = 1000;

    do {
      pin = Math.floor(100000 + Math.random() * 900000).toString();
      attempts++;
      if (attempts > maxAttempts) {
        throw new Error('PIN generation collision limit reached.');
      }
    } while (this.pinToRoomId.has(pin));

    return pin;
  }

  /**
   * Generate a unique Room ID
   */
  public generateRoomId(): string {
    const timestamp = Date.now().toString(36);
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `room_${timestamp}_${randomSuffix}`;
  }

  /**
   * Create a new teacher game session room
   */
  public createRoom(teacherSocketId: string, payload: CreateRoomPayload): GameRoom {
    const validation = this.validateCreateRoomPayload(payload);
    if (!validation.valid) {
      throw new Error(validation.error || 'Ungültige Raumkonfiguration.');
    }

    const roomId = this.generateRoomId();
    const pin = this.generateUniquePin();

    const games: GameSessionConfig[] = payload.games.map((g, index) => ({
      gameType: g.gameType,
      questionCount: Number(g.questionCount),
      order: index + 1,
    }));

    const totalQuestions = games.reduce((acc, curr) => acc + curr.questionCount, 0);

    const room: GameRoom = {
      roomId,
      pin,
      level: payload.level,
      games,
      teacherSocketId,
      teacherConnected: true,
      status: 'WAITING',
      totalQuestions,
      createdAt: Date.now(),
      players: {},
      currentGameIndex: 0,
      currentQuestionIndex: 0,
      difficulty: payload.difficulty || 'AUTO',
      category: payload.category,
    };


    this.rooms.set(roomId, room);
    this.pinToRoomId.set(pin, roomId);

    logger.info(
      `[RoomManager] Room created: ID ${roomId} | PIN ${pin} | Level ${room.level} | Games: ${games.length} | Questions: ${totalQuestions} | Teacher: ${teacherSocketId}`
    );

    return room;
  }

  /**
   * Get room by Room ID
   */
  public getRoomById(roomId: string): GameRoom | undefined {
    return this.rooms.get(roomId);
  }

  /**
   * Get room by 6-digit PIN
   */
  public getRoomByPin(pin: string): GameRoom | undefined {
    const roomId = this.pinToRoomId.get(pin);
    if (!roomId) return undefined;
    return this.rooms.get(roomId);
  }

  /**
   * Add a student player to an active room
   */
  public addPlayer(roomId: string, socketId: string, rawName: string): { room: GameRoom; player: Player } {
    const room = this.getRoomById(roomId);
    if (!room) {
      throw new Error('Dieser Spielraum wurde nicht gefunden.');
    }

    const name = sanitizeStudentName(rawName);
    const playerId = `player_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    const player: Player = {
      id: playerId,
      playerId,
      socketId,
      name,
      score: 0,
      currentStreak: 0,
      highestStreak: 0,
      streak: 0,
      answeredCurrentQuestion: false,
      connected: true,
      isConnected: true,
      joinedAt: Date.now(),
    };


    room.players[playerId] = player;
    this.socketIdToPlayer.set(socketId, { roomId, playerId });

    logger.info(`[RoomManager] Player "${name}" (${playerId}) joined Room ${roomId}`);

    return { room, player };
  }

  /**
   * Remove a player associated with a socket (e.g. on disconnect or explicit leave)
   */
  public removePlayer(socketId: string): { room: GameRoom; removedPlayer: Player; remainingPlayers: Player[] } | null {
    const mapping = this.socketIdToPlayer.get(socketId);
    if (!mapping) return null;

    const { roomId, playerId } = mapping;
    const room = this.rooms.get(roomId);
    this.socketIdToPlayer.delete(socketId);

    if (!room || !room.players[playerId]) return null;

    const removedPlayer = room.players[playerId];
    delete room.players[playerId];

    const remainingPlayers = Object.values(room.players);
    logger.info(`[RoomManager] Player "${removedPlayer.name}" left Room ${roomId}. Remaining: ${remainingPlayers.length}`);

    return { room, removedPlayer, remainingPlayers };
  }

  /**
   * Remove a player by player ID
   */
  public removePlayerById(roomId: string, playerId: string): { room: GameRoom; removedPlayer: Player; remainingPlayers: Player[] } | null {
    const room = this.rooms.get(roomId);
    if (!room || !room.players[playerId]) return null;

    const removedPlayer = room.players[playerId];
    this.socketIdToPlayer.delete(removedPlayer.socketId);
    delete room.players[playerId];

    const remainingPlayers = Object.values(room.players);
    logger.info(`[RoomManager] Player "${removedPlayer.name}" removed from Room ${roomId}. Remaining: ${remainingPlayers.length}`);

    return { room, removedPlayer, remainingPlayers };
  }

  /**
   * Get all players as an array in a room
   */
  public getPlayersInRoom(roomId: string): Player[] {
    const room = this.getRoomById(roomId);
    if (!room || !room.players) return [];
    return Object.values(room.players);
  }

  /**
   * Close and delete a room completely
   */
  public closeRoom(roomId: string, teacherSocketId?: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    if (teacherSocketId && room.teacherSocketId !== teacherSocketId) {
      logger.warn(
        `[RoomManager] Unauthorized room close attempt for ${roomId} by socket ${teacherSocketId}`
      );
      return false;
    }

    // Clear any disconnect timer
    const timer = this.teacherDisconnectTimers.get(roomId);
    if (timer) {
      clearTimeout(timer);
      this.teacherDisconnectTimers.delete(roomId);
    }

    // Cleanup players mapped to this room
    if (room.players) {
      for (const player of Object.values(room.players)) {
        this.socketIdToPlayer.delete(player.socketId);
      }
    }

    this.pinToRoomId.delete(room.pin);
    const deleted = this.rooms.delete(roomId);

    if (deleted) {
      logger.info(`[RoomManager] Room closed: ID ${roomId} | PIN ${room.pin}`);
    }

    return deleted;
  }

  /**
   * Teacher disconnect with 30s grace period
   */
  public handleTeacherDisconnect(
    teacherSocketId: string,
    onExpired: (roomId: string) => void
  ): GameRoom[] {
    const affectedRooms: GameRoom[] = [];

    for (const [roomId, room] of this.rooms.entries()) {
      if (room.teacherSocketId === teacherSocketId) {
        room.teacherConnected = false;
        affectedRooms.push(room);

        // Cancel previous timer if exists
        const existingTimer = this.teacherDisconnectTimers.get(roomId);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        // Schedule 30 second grace period
        const timer = setTimeout(() => {
          logger.info(`[RoomManager] Teacher grace period expired for Room ${roomId}. Destroying room.`);
          this.closeRoom(roomId);
          onExpired(roomId);
        }, 30000);

        this.teacherDisconnectTimers.set(roomId, timer);
        logger.info(`[RoomManager] Teacher ${teacherSocketId} disconnected. Started 30s grace period for Room ${roomId}.`);
      }
    }

    return affectedRooms;
  }

  /**
   * Teacher reconnects within grace period
   */
  public handleTeacherReconnect(roomId: string, newSocketId: string): GameRoom | null {
    const room = this.getRoomById(roomId);
    if (!room) return null;

    const timer = this.teacherDisconnectTimers.get(roomId);
    if (timer) {
      clearTimeout(timer);
      this.teacherDisconnectTimers.delete(roomId);
      logger.info(`[RoomManager] Cancelled grace period timer for Room ${roomId}. Teacher reconnected on ${newSocketId}`);
    }

    room.teacherSocketId = newSocketId;
    room.teacherConnected = true;
    return room;
  }

  /**
   * Get total count of active rooms
   */
  public getActiveRoomCount(): number {
    return this.rooms.size;
  }

  /**
   * Get all active rooms (for debugging / monitoring)
   */
  public getAllRooms(): GameRoom[] {
    return Array.from(this.rooms.values());
  }
}

export const roomManager = new RoomManager();

