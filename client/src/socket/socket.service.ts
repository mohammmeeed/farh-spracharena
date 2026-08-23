import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types/game.types';

const getCleanUrl = (val?: string): string | null => {
  if (!val || typeof val !== 'string') return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const SERVER_URL =
  getCleanUrl(import.meta.env.VITE_SOCKET_URL) ||
  getCleanUrl(import.meta.env.VITE_SERVER_URL) ||
  getCleanUrl(import.meta.env.VITE_API_URL) ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? window.location.origin
    : 'http://localhost:3001');

export type TypedClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

class SocketService {
  private socket: TypedClientSocket | null = null;
  private serverUrl: string = SERVER_URL;

  // Authoritative server clock offset in milliseconds (serverTime - clientTime)
  private serverOffset: number = 0;
  private timeSyncInterval: any = null;

  public getSocket(): TypedClientSocket {
    if (!this.socket) {
      this.socket = io(this.serverUrl, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 15,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        transports: ['websocket', 'polling'],
      });

      this.setupSocketLifecycle();
    }
    return this.socket;
  }

  private setupSocketLifecycle(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.syncTimeOffset();
      if (!this.timeSyncInterval) {
        this.timeSyncInterval = setInterval(() => this.syncTimeOffset(), 30000);
      }
    });

    this.socket.on('connection:ack', ({ serverTime }) => {
      const estimatedOffset = serverTime - Date.now();
      this.serverOffset = estimatedOffset;
    });

    this.socket.on('time:pong', ({ clientTimestamp, serverTimestamp }) => {
      const now = Date.now();
      const roundTrip = now - clientTimestamp;
      const estimatedServerTime = serverTimestamp + Math.round(roundTrip / 2);
      this.serverOffset = estimatedServerTime - now;
    });

    this.socket.on('disconnect', () => {
      if (this.timeSyncInterval) {
        clearInterval(this.timeSyncInterval);
        this.timeSyncInterval = null;
      }
    });
  }

  /**
   * Triggers bidirectional NTP-like clock synchronization
   */
  public syncTimeOffset(): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('time:ping', { clientTimestamp: Date.now() });
    }
  }

  /**
   * Returns current synchronized server timestamp
   */
  public getServerNow(): number {
    return Date.now() + this.serverOffset;
  }

  /**
   * Returns estimated server clock offset in ms
   */
  public getServerOffset(): number {
    return this.serverOffset;
  }

  public connect(): void {
    if (!this.socket) {
      this.getSocket();
    } else if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.timeSyncInterval) {
      clearInterval(this.timeSyncInterval);
      this.timeSyncInterval = null;
    }
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public requestStateSnapshot(roomId: string, playerId?: string): void {
    const s = this.getSocket();
    s.emit('game:requestStateSnapshot', { roomId, playerId });
  }

  public submitAnswer(roomId: string, questionId: string, answer: string | string[]): void {
    const s = this.getSocket();
    s.emit('student:submitAnswer', { roomId, questionId, answer });
  }

  public startGame(roomId: string): void {
    const s = this.getSocket();
    s.emit('teacher:startGame', { roomId });
  }

  public pauseGame(roomId: string, reason?: string): void {
    const s = this.getSocket();
    s.emit('teacher:pauseGame', { roomId, reason });
  }

  public resumeGame(roomId: string): void {
    const s = this.getSocket();
    s.emit('teacher:resumeGame', { roomId });
  }

  public kickStudent(roomId: string, playerId: string): void {
    const s = this.getSocket();
    s.emit('teacher:kickStudent', { roomId, playerId });
  }

  public assignPlayerTeam(
    roomId: string,
    playerId: string,
    targetTeamId: 'TEAM_BLAU' | 'TEAM_ROT'
  ): void {
    const s = this.getSocket();
    s.emit('teacher:assignPlayerTeam', { roomId, playerId, targetTeamId });
  }

  public autoBalanceTeams(roomId: string): void {
    const s = this.getSocket();
    s.emit('teacher:autoBalanceTeams', { roomId });
  }

  public getServerUrl(): string {
    return this.serverUrl;
  }
}

export const socketService = new SocketService();
