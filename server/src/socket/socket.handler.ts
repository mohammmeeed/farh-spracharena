import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '../types/game.types.js';
import { roomManager } from '../rooms/room.manager.js';
import { gameEngine } from '../games/GameEngine.js';
import { socketRateLimiter } from '../utils/rateLimiter.js';
import { logger } from '../utils/logger.js';

export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
export type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

function syncActiveStateToSocket(socket: TypedSocket, room: any): void {
  if (!room.gameState) return;
  const gameState = room.gameState;
  const currentGame = room.games[room.currentGameIndex];
  if (!currentGame) return;

  if (room.status === 'QUESTION' && gameState.currentQuestion) {
    const question = gameState.currentQuestion;
    const now = Date.now();
    const startedAt = gameState.currentQuestionStartedAt || now;
    const endsAt = gameState.currentQuestionEndsAt || now + question.timeLimit * 1000;

    socket.emit('game:questionStarted', {
      questionId: question.id,
      text: question.text,
      format: question.format,
      options: question.options,
      words: question.words,
      clues: question.clues,
      focusWord: question.focusWord,
      translation: question.translation,
      timeLimit: question.timeLimit,
      startedAt,
      endsAt,
      questionNumber: room.currentQuestionIndex + 1,
      totalQuestions: gameState.questionsForCurrentGame.length,
      gameType: currentGame.gameType,
      gameNumber: room.currentGameIndex + 1,
      totalGames: room.games.length,
      category: question.category,
      difficulty: question.difficulty,
    });
  } else if (room.status === 'COUNTDOWN') {
    socket.emit('game:countdown', {
      value: 3,
      gameType: currentGame.gameType,
      questionNumber: room.currentQuestionIndex + 1,
      totalQuestions: gameState.questionsForCurrentGame.length,
    });
  }

  if (room.teams) {
    socket.emit('game:teamScoreUpdated', { teams: room.teams });
  }
}

/**
 * Register all Socket.IO event handlers with rate-limiting, security validation,
 * and race-condition guards.
 */
export function setupSocketHandlers(io: TypedServer): void {
  io.on('connection', (socket: TypedSocket) => {
    // Send connection acknowledgement to the client
    socket.emit('connection:ack', {
      socketId: socket.id,
      serverTime: Date.now(),
    });

    // Handle ping/pong for live latency calculation
    socket.on('client:ping', (data) => {
      socket.emit('server:pong', { timestamp: data.timestamp });
    });

    // ==========================================
    // Phase 2 & 8: Teacher Session Creation & Controls
    // ==========================================

    /**
     * Teacher creates a new game session
     */
    socket.on('teacher:createRoom', (payload) => {
      if (!socketRateLimiter.isAllowed(`${socket.id}:createRoom`, 5, 10000)) {
        socket.emit('server:roomError', { message: 'Zu viele Anfragen. Bitte kurz warten.' });
        return;
      }

      try {
        const validation = roomManager.validateCreateRoomPayload(payload);
        if (!validation.valid) {
          socket.emit('server:roomError', {
            message: validation.error || 'Ungültige Raumkonfiguration.',
          });
          return;
        }

        const room = roomManager.createRoom(socket.id, payload);

        // Join the Socket.IO rooms for targeted broadcasts
        socket.join(room.roomId);
        socket.join(room.pin);

        socket.data.isTeacher = true;
        socket.data.roomId = room.roomId;
        socket.data.roomPin = room.pin;

        // Emit roomCreated with full room structure
        socket.emit('server:roomCreated', { room });
        logger.info(`Teacher ${socket.id} created and joined room ${room.roomId} (PIN: ${room.pin})`);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Fehler beim Erstellen des Raumes.';
        logger.error(`Error in teacher:createRoom:`, errorMessage);
        socket.emit('server:roomError', { message: errorMessage });
      }
    });

    /**
     * Teacher joins / syncs an existing room (e.g. after direct navigation or refresh)
     */
    socket.on('teacher:joinRoom', ({ roomId }) => {
      const room = roomManager.handleTeacherReconnect(roomId, socket.id) || roomManager.getRoomById(roomId);
      if (!room) {
        socket.emit('server:roomError', {
          message: `Dieser Spielraum wurde nicht gefunden.`,
        });
        return;
      }

      // Associate socket with room
      socket.join(room.roomId);
      socket.join(room.pin);
      socket.data.isTeacher = true;
      socket.data.roomId = room.roomId;
      socket.data.roomPin = room.pin;

      socket.emit('server:roomJoined', { room });
      // Notify students in room that teacher is connected
      io.to(room.roomId).emit('teacher:statusChanged', { teacherConnected: true });
      // Broadcast current player list
      const players = roomManager.getPlayersInRoom(room.roomId);
      socket.emit('room:playersUpdated', { players, totalPlayers: players.length });

      // Synchronize active game question state to teacher if already running
      syncActiveStateToSocket(socket, room);

      // Resume game if it was paused
      if (room.gameState?.isPaused) {
        gameEngine.resumeGame(room.roomId, io);
      }

      logger.info(`Teacher socket ${socket.id} joined/synced room ${room.roomId}`);
    });

    /**
     * Teacher reconnects specifically
     */
    socket.on('teacher:reconnect', ({ roomId }) => {
      const room = roomManager.handleTeacherReconnect(roomId, socket.id);
      if (room) {
        socket.join(room.roomId);
        socket.join(room.pin);
        socket.data.isTeacher = true;
        socket.data.roomId = room.roomId;
        socket.data.roomPin = room.pin;

        socket.emit('server:roomJoined', { room });
        io.to(room.roomId).emit('teacher:statusChanged', { teacherConnected: true });

        // Synchronize active game question state to teacher
        syncActiveStateToSocket(socket, room);

        if (room.gameState?.isPaused) {
          gameEngine.resumeGame(room.roomId, io);
        }

        logger.info(`Teacher socket ${socket.id} reconnected to room ${room.roomId}`);
      }
    });

    /**
     * Teacher closes the room session
     */
    socket.on('teacher:closeRoom', ({ roomId }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) {
        socket.emit('server:roomError', { message: 'Raum nicht gefunden.' });
        return;
      }

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann den Raum schließen.' });
        return;
      }

      gameEngine.cleanupRoom(roomId);
      const closed = roomManager.closeRoom(roomId, socket.id);
      if (closed) {
        io.to(roomId).emit('server:roomClosed', {
          roomId,
          reason: 'Der Lehrer hat die Spielsitzung beendet.',
        });
        socket.leave(roomId);
        socket.leave(room.pin);
        logger.info(`Room ${roomId} closed by teacher ${socket.id}`);
      }
    });

    // ==========================================
    // Phase 4 & 5: Teacher & Student Game Actions
    // ==========================================

    /**
     * Teacher starts the active game session
     * (Guarded against double execution and unauthorized calls)
     */
    socket.on('teacher:startGame', ({ roomId }) => {
      if (!socketRateLimiter.isAllowed(`${socket.id}:startGame`, 2, 3000)) {
        return;
      }

      const room = roomManager.getRoomById(roomId);
      if (!room) {
        socket.emit('server:roomError', { message: 'Raum nicht gefunden.' });
        return;
      }

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann das Spiel starten.' });
        return;
      }

      // Prevent starting if game already started
      if (room.status !== 'WAITING') {
        socket.emit('game:error', { message: 'Das Spiel läuft bereits oder ist beendet.' });
        return;
      }

      try {
        gameEngine.startGame(roomId, io);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Fehler beim Spielstart.';
        socket.emit('game:error', { message: errorMsg });
      }
    });

    /**
     * Teacher ends the game session prematurely
     */
    socket.on('teacher:endGame', ({ roomId }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) return;

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann das Spiel beenden.' });
        return;
      }

      if (room.status === 'FINISHED') return;

      gameEngine.endGame(roomId, io);
    });

    /**
     * Teacher pauses the active game for classroom explanation
     */
    socket.on('teacher:pauseGame', ({ roomId, reason }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) return;

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann das Spiel pausieren.' });
        return;
      }

      gameEngine.pauseGame(roomId, io, reason);
    });

    /**
     * Teacher resumes the active game
     */
    socket.on('teacher:resumeGame', ({ roomId }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) return;

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann das Spiel fortsetzen.' });
        return;
      }

      gameEngine.resumeGame(roomId, io);
    });

    /**
     * Teacher kicks a student from the lobby or active game
     */
    socket.on('teacher:kickStudent', ({ roomId, playerId }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) {
        socket.emit('server:roomError', { message: 'Raum nicht gefunden.' });
        return;
      }

      if (room.teacherSocketId !== socket.id) {
        socket.emit('server:roomError', { message: 'Nur der Lehrer kann Teilnehmer entfernen.' });
        return;
      }

      const result = roomManager.kickPlayer(roomId, playerId);
      if (result.success && result.remainingPlayers) {
        // Send direct kick event to the student's socket
        if (result.kickedSocketId) {
          const kickedSocket = io.sockets.sockets.get(result.kickedSocketId);
          if (kickedSocket) {
            kickedSocket.emit('student:kicked', {
              reason: 'Du wurdest vom Lehrer aus dem Raum entfernt.',
            });
            kickedSocket.leave(roomId);
            kickedSocket.leave(room.pin);
          }
        }

        // Broadcast updated players list to everyone in room
        io.to(roomId).emit('room:playersUpdated', {
          players: result.remainingPlayers,
          totalPlayers: result.remainingPlayers.length,
        });
        io.to(roomId).emit('player:list_updated', {
          players: result.remainingPlayers,
        });
      } else {
        socket.emit('server:roomError', { message: result.error || 'Spieler konnte nicht entfernt werden.' });
      }
    });

    /**
     * Student toggles ready state in lobby
     */
    socket.on('student:toggleReady', ({ roomId }) => {
      const room = roomManager.getRoomById(roomId);
      const playerId = socket.data.playerId;
      if (!room || !playerId || !room.players[playerId]) return;

      const player = room.players[playerId];
      player.isReady = !player.isReady;

      const players = roomManager.getPlayersInRoom(room.roomId);
      io.to(room.roomId).emit('room:playersUpdated', {
        players,
        totalPlayers: players.length,
      });
    });

    /**
     * Student submits an answer for the current question
     * (Protected with rate limiting and atomic player state checks)
     */
    socket.on('student:submitAnswer', ({ roomId, questionId, answer }) => {
      if (!socketRateLimiter.isAllowed(`${socket.id}:submitAnswer`, 10, 5000)) {
        socket.emit('game:error', { message: 'Zu viele Anfragen.' });
        return;
      }

      const playerId = socket.data.playerId;
      if (!playerId) {
        socket.emit('game:error', { message: 'Du bist nicht im Spiel registriert.' });
        return;
      }

      const result = gameEngine.submitAnswer(roomId, playerId, questionId, answer, io);
      if (!result.success && result.error) {
        socket.emit('game:error', { message: result.error });
      }
    });

    // ==========================================
    // Phase 3: Student Join & Room Lobby Events
    // ==========================================

    /**
     * Student joins room by PIN and Name
     */
    socket.on('student:joinRoom', ({ pin, name }) => {
      if (!socketRateLimiter.isAllowed(`${socket.id}:joinRoom`, 10, 10000)) {
        socket.emit('student:joinError', { message: 'Zu viele Beitrittsversuche. Bitte kurz warten.' });
        return;
      }

      try {
        const validation = roomManager.validateStudentJoin(pin, name);
        if (!validation.valid || !validation.room) {
          socket.emit('student:joinError', {
            message: validation.error || 'Beitritt nicht möglich.',
          });
          return;
        }

        const room = validation.room;
        const { player } = roomManager.addPlayer(room.roomId, socket.id, name);

        // Join Socket.IO rooms for targeted and broadcast communication
        socket.join(room.roomId);
        socket.join(room.pin);

        socket.data.isTeacher = false;
        socket.data.roomId = room.roomId;
        socket.data.roomPin = room.pin;
        socket.data.playerId = player.playerId;
        socket.data.playerName = player.name;

        // 1. Send success response to the joining student
        socket.emit('student:joinedRoom', { room, player });

        // 2. Broadcast updated player list to everyone in room (Teacher + all Students)
        const players = roomManager.getPlayersInRoom(room.roomId);
        io.to(room.roomId).emit('room:playersUpdated', {
          players,
          totalPlayers: players.length,
        });

        // Backward compatibility event
        io.to(room.roomId).emit('player:list_updated', { players });

        logger.info(
          `Student "${player.name}" (${socket.id}) joined Room ${room.roomId} (PIN: ${room.pin}). Total students: ${players.length}`
        );
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Fehler beim Beitreten.';
        logger.error(`Error in student:joinRoom:`, errorMessage);
        socket.emit('student:joinError', { message: errorMessage });
      }
    });

    /**
     * Student syncs / requests current lobby or game state
     */
    socket.on('student:syncLobby', ({ roomId, playerId }) => {
      const room = roomManager.getRoomById(roomId);
      if (!room) {
        socket.emit('student:joinError', { message: 'Dieser Spielraum wurde nicht gefunden.' });
        return;
      }

      socket.join(room.roomId);
      socket.join(room.pin);

      const players = roomManager.getPlayersInRoom(room.roomId);
      const currentPlayer = playerId ? room.players[playerId] : undefined;

      if (currentPlayer) {
        currentPlayer.socketId = socket.id;
        currentPlayer.connected = true;
        currentPlayer.isConnected = true;
        socket.data.playerId = currentPlayer.playerId;
        socket.data.playerName = currentPlayer.name;
        socket.data.roomId = room.roomId;
        socket.data.roomPin = room.pin;
        socket.emit('student:joinedRoom', { room, player: currentPlayer });
      }

      socket.emit('room:playersUpdated', { players, totalPlayers: players.length });
      socket.emit('teacher:statusChanged', { teacherConnected: room.teacherConnected });

      // Synchronize active game question state if game is running
      syncActiveStateToSocket(socket, room);
    });

    /**
     * Student leaves room explicitly
     */
    socket.on('student:leaveRoom', ({ roomId }) => {
      const removed = roomManager.removePlayer(socket.id);
      if (removed) {
        socket.leave(roomId);
        io.to(roomId).emit('room:playersUpdated', {
          players: removed.remainingPlayers,
          totalPlayers: removed.remainingPlayers.length,
        });
        io.to(roomId).emit('player:list_updated', { players: removed.remainingPlayers });
      }
    });

    // ==========================================
    // Disconnect Handler
    // ==========================================
    socket.on('disconnect', () => {
      // Case 1: Teacher disconnected
      if (socket.data.isTeacher) {
        roomManager.handleTeacherDisconnect(socket.id, (expiredRoomId) => {
          gameEngine.cleanupRoom(expiredRoomId);
          io.to(expiredRoomId).emit('server:roomClosed', {
            roomId: expiredRoomId,
            reason: 'Der Lehrer hat die Verbindung getrennt (Zeitlimit abgelaufen).',
          });
        });

        if (socket.data.roomId) {
          io.to(socket.data.roomId).emit('teacher:statusChanged', {
            teacherConnected: false,
          });
        }
      }

      // Case 2: Student disconnected
      const removed = roomManager.removePlayer(socket.id);
      if (removed) {
        io.to(removed.room.roomId).emit('room:playersUpdated', {
          players: removed.remainingPlayers,
          totalPlayers: removed.remainingPlayers.length,
        });
        io.to(removed.room.roomId).emit('player:list_updated', {
          players: removed.remainingPlayers,
        });
      }

      if (socket.data.roomId) {
        socket.leave(socket.data.roomId);
      }
      if (socket.data.roomPin) {
        socket.leave(socket.data.roomPin);
      }
    });
  });
}
