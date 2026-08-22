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

  public getSocket(): TypedClientSocket {
    if (!this.socket) {
      this.socket = io(this.serverUrl, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'],
      });
    }
    return this.socket;
  }

  public connect(): void {
    if (!this.socket) {
      this.getSocket();
    } else if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public submitAnswer(roomId: string, questionId: string, answer: string | string[]): void {
    const s = this.getSocket();
    s.emit('student:submitAnswer', { roomId, questionId, answer });
  }

  public startGame(roomId: string): void {
    const s = this.getSocket();
    s.emit('teacher:startGame', { roomId });
  }

  public endGame(roomId: string): void {
    const s = this.getSocket();
    s.emit('teacher:endGame', { roomId });
  }

  public getServerUrl(): string {
    return this.serverUrl;
  }
}

export const socketService = new SocketService();

