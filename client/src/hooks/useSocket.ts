import { useEffect, useState, useCallback, useRef } from 'react';
import { socketService } from '../socket/socket.service';

export interface UseSocketReturn {
  isConnected: boolean;
  socketId: string | null;
  latency: number | null;
  error: string | null;
  serverUrl: string;
  reconnect: () => void;
}

export function useSocket(): UseSocketReturn {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pingIntervalRef = useRef<number | null>(null);

  const socket = socketService.getSocket();

  const handleConnect = useCallback(() => {
    setIsConnected(true);
    setSocketId(socket.id || null);
    setError(null);
  }, [socket]);

  const handleDisconnect = useCallback((reason: string) => {
    setIsConnected(false);
    setLatency(null);
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  }, [socket]);

  const handleConnectError = useCallback((err: Error) => {
    setIsConnected(false);
    setError(`Verbindungsfehler: ${err.message}`);
  }, []);

  const handleConnectionAck = useCallback((data: { socketId: string; serverTime: number }) => {
    setSocketId(data.socketId);
  }, []);

  const handlePong = useCallback((data: { timestamp: number }) => {
    const roundTrip = Date.now() - data.timestamp;
    setLatency(roundTrip);
  }, []);

  useEffect(() => {
    // Initial state check
    if (socket.connected) {
      setIsConnected(true);
      setSocketId(socket.id || null);
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('connection:ack', handleConnectionAck);
    socket.on('server:pong', handlePong);

    // Heartbeat ping every 4 seconds to measure real-time latency
    pingIntervalRef.current = window.setInterval(() => {
      if (socket.connected) {
        socket.emit('client:ping', { timestamp: Date.now() });
      }
    }, 4000);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('connection:ack', handleConnectionAck);
      socket.off('server:pong', handlePong);

      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [socket, handleConnect, handleDisconnect, handleConnectError, handleConnectionAck, handlePong]);

  const reconnect = useCallback(() => {
    socketService.connect();
  }, []);

  return {
    isConnected,
    socketId,
    latency,
    error,
    serverUrl: socketService.getServerUrl(),
    reconnect,
  };
}
