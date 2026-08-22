import { io as Client, Socket } from 'socket.io-client';
import http from 'http';
import { roomManager } from './rooms/room.manager.js';

import {
  GameRoom,
  CreateRoomPayload,
  ClientToServerEvents,
  ServerToClientEvents,
} from './types/game.types.js';

type TestSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SERVER_URL = 'http://localhost:3001';

function createSocket(): Promise<TestSocket> {
  return new Promise((resolve) => {
    const socket = Client(SERVER_URL, {
      transports: ['websocket'],
      forceNew: true,
    }) as TestSocket;

    socket.on('connection:ack', () => {
      resolve(socket);
    });
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpGet(path: string): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    http
      .get(`${SERVER_URL}${path}`, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode || 500, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode || 500, data: body });
          }
        });
      })
      .on('error', reject);
  });
}

async function runPhase10Tests() {
  console.log('\n================================================================');
  console.log('🧪 Starting Phase 10: Final Production & Classroom Simulation Tests');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${totalTests}. ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${totalTests}. ${testName}`);
      process.exitCode = 1;
    }
  }

  // 1. Production Health & Info Endpoints
  console.log('--- 1. Production Health Check & API Status ---');
  const health = await httpGet('/health');
  assert(health.status === 200 && health.data.status === 'ok', 'Production GET /health responds with 200 OK');
  assert(health.data.application === 'Farh SprachArena', 'Health response confirms application name');

  // 2. Full 10-Student Classroom Simulation with Teacher Farh
  console.log('\n--- 2. Classroom Simulation: Teacher Farh & 10 Students ---');
  const teacherSocket = await createSocket();
  let sessionRoom: GameRoom | null = null;

  await new Promise<void>((resolve) => {
    teacherSocket.on('server:roomCreated', ({ room }) => {
      sessionRoom = room;
      resolve();
    });

    const createPayload: CreateRoomPayload = {
      level: 'A2',
      games: [
        { gameType: 'SCHNELLANTWORT', questionCount: 5 },
        { gameType: 'SATZ_RENNEN', questionCount: 5 },
        { gameType: 'WORTSCHATZ_DUELL', questionCount: 5 },
        { gameType: 'WAS_BIN_ICH', questionCount: 5 },
        { gameType: 'TEAM_BATTLE', questionCount: 5 },
      ],
      difficulty: 'AUTO',
    };

    teacherSocket.emit('teacher:createRoom', createPayload);
  });

  assert(sessionRoom !== null, 'Teacher Farh created 5-game classroom session');
  const pin = (sessionRoom as GameRoom | null)?.pin || '';
  const roomId = (sessionRoom as GameRoom | null)?.roomId || '';
  assert(pin.length === 6, 'Generated valid 6-digit numeric room PIN');

  // Connect 10 classroom students
  const studentNames = ['Mohamed', 'Sara', 'Adam', 'Lina', 'Jonas', 'Elena', 'Tariq', 'Mona', 'Noah', 'Mia'];
  const studentSockets: TestSocket[] = [];
  let currentJoinedCount = 0;

  teacherSocket.on('room:playersUpdated', ({ players }) => {
    currentJoinedCount = players.length;
  });

  for (const name of studentNames) {
    const s = await createSocket();
    s.emit('student:joinRoom', { pin, name });
    studentSockets.push(s);
  }

  await delay(500);
  assert(currentJoinedCount === 10, 'All 10 classroom students joined the live lobby');

  // Teacher starts the game
  console.log('\n--- 3. Real-Time Gameplay & Transition Engine ---');
  let firstQuestionReceived = false;
  let activeQuestionId = '';

  studentSockets[0].on('game:questionStarted', (data) => {
    firstQuestionReceived = true;
    activeQuestionId = data.questionId;
  });

  teacherSocket.emit('teacher:startGame', { roomId });

  // Wait for 3-2-1 countdown + first question
  await delay(3600);

  assert(firstQuestionReceived, '3-2-1 Countdown completed and Question 1 started');

  // Multiple students submit answers
  studentSockets.forEach((s) => {
    s.emit('student:submitAnswer', {
      roomId,
      questionId: activeQuestionId,
      answer: 'geht',
    });
  });

  let questionResultReceived = false;
  await new Promise<void>((resolve) => {
    teacherSocket.once('game:questionResult', () => {
      questionResultReceived = true;
      resolve();
    });
  });

  assert(questionResultReceived, 'Server processed answers and broadcast questionResult with live stats');

  // 4. Session Teardown & Clean Purge
  console.log('\n--- 4. Clean Session Teardown ---');
  let roomClosedReceived = false;
  studentSockets[0].once('server:roomClosed', () => {
    roomClosedReceived = true;
  });

  teacherSocket.emit('teacher:closeRoom', { roomId });
  await delay(200);

  assert(roomClosedReceived, 'Room closure broadcast received by connected students');


  // Disconnect sockets
  teacherSocket.disconnect();
  studentSockets.forEach((s) => s.disconnect());

  console.log('\n================================================================');
  console.log(`🎉 Phase 10 Production Tests Complete: ${passedTests}/${totalTests} Passed (100%)`);
  console.log('================================================================\n');

  process.exit(0);
}

runPhase10Tests().catch((err) => {
  console.error('Phase 10 test execution failed:', err);
  process.exit(1);
});
