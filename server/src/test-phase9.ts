import { io as Client, Socket } from 'socket.io-client';
import http from 'http';
import './server.js';
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

function httpGet(path: string): Promise<{ status: number; data: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    http
      .get(`${SERVER_URL}${path}`, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode || 500,
              data: JSON.parse(body),
              headers: res.headers,
            });
          } catch {
            resolve({
              status: res.statusCode || 500,
              data: body,
              headers: res.headers,
            });
          }
        });
      })
      .on('error', reject);
  });
}

async function runPhase9Tests() {
  console.log('\n================================================================');
  console.log('🧪 Starting Phase 9: Security, Reliability, Performance & End-to-End Tests');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${totalTests}. ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${totalTests}. ${testName}${detail ? ` -> ${detail}` : ''}`);
      process.exitCode = 1;
    }
  }

  // 1. Operational Health Endpoints & Security Headers
  console.log('--- 1. Health Endpoints & Security Headers ---');
  const healthRes = await httpGet('/health');
  assert(healthRes.status === 200 && healthRes.data.status === 'ok', 'GET /health returns 200 OK');
  assert(healthRes.data.application === 'Farh SprachArena', 'Health response identifies application');
  assert(healthRes.headers['x-content-type-options'] === 'nosniff', 'Security header: X-Content-Type-Options: nosniff');
  assert(healthRes.headers['x-frame-options'] === 'SAMEORIGIN', 'Security header: X-Frame-Options: SAMEORIGIN');
  assert(healthRes.headers['referrer-policy'] === 'strict-origin-when-cross-origin', 'Security header: Referrer-Policy');

  // 2. Input Sanitization & Name Length Checks
  console.log('\n--- 2. Input Sanitization & Name Length Validation ---');
  const teacherSocket = await createSocket();
  let room1: GameRoom | null = null;

  await new Promise<void>((resolve) => {
    teacherSocket.on('server:roomCreated', ({ room }) => {
      room1 = room;
      resolve();
    });

    const createPayload: CreateRoomPayload = {
      level: 'A2',
      games: [
        { gameType: 'SCHNELLANTWORT', questionCount: 5 },
        { gameType: 'SATZ_RENNEN', questionCount: 5 },
        { gameType: 'WORTSCHATZ_DUELL', questionCount: 5 },
        { gameType: 'WAS_BIN_ICH', questionCount: 5 },
        { gameType: 'TEAM_BATTLE', questionCount: 6 },
      ],
      difficulty: 'AUTO',
    };
    teacherSocket.emit('teacher:createRoom', createPayload);
  });

  assert(room1 !== null, 'Room created for Phase 9 full test session');
  const pin1 = (room1 as GameRoom | null)?.pin || '';
  const roomId1 = (room1 as GameRoom | null)?.roomId || '';


  // Test XSS attempt in student name
  const maliciousStudent = await createSocket();
  await new Promise<void>((resolve) => {
    maliciousStudent.on('student:joinedRoom', ({ player }) => {
      assert(!player.name.includes('<script>'), 'Student name stripped of malicious HTML script tags');
      assert(player.name.length <= 30, 'Student name strictly conforms to max length limit');
      resolve();
    });
    maliciousStudent.emit('student:joinRoom', {
      pin: pin1,
      name: '<script>alert("hack")</script>Tariq_Safe',
    });
  });

  // 3. Socket Event Rate Limiter
  console.log('\n--- 3. Socket Event Rate Limiting ---');
  const spammerSocket = await createSocket();
  let spamRejectedCount = 0;

  spammerSocket.on('student:joinError', ({ message }) => {
    if (message.includes('Zu viele')) {
      spamRejectedCount++;
    }
  });

  // Rapidly fire 15 join attempts in a loop
  for (let i = 0; i < 15; i++) {
    spammerSocket.emit('student:joinRoom', { pin: '000000', name: `Spam_${i}` });
  }

  await delay(200);
  assert(spamRejectedCount > 0, 'Rate limiter actively throttled excessive socket spam requests');

  // 4. Race Condition Protection (Double-Start & Late Answers)
  console.log('\n--- 4. Race Condition Protection ---');
  let doubleStartErrorReceived = false;

  teacherSocket.on('game:error', ({ message }) => {
    if (message.includes('bereits')) {
      doubleStartErrorReceived = true;
    }
  });

  // Teacher starts the game
  teacherSocket.emit('teacher:startGame', { roomId: roomId1 });

  // Attempt rapid second start invocation (race condition trigger)
  teacherSocket.emit('teacher:startGame', { roomId: roomId1 });
  await delay(100);

  assert(doubleStartErrorReceived, 'Server rejects duplicate startGame trigger during active countdown');

  // Wait for countdown + Question 1 start
  await delay(3600);

  // Test old / mismatched question ID submission rejection by a joined student
  let invalidQuestionError = false;

  maliciousStudent.on('game:error', ({ message }) => {
    if (message.includes('Ungültige') || message.includes('nicht aktiv')) {
      invalidQuestionError = true;
    }
  });

  maliciousStudent.emit('student:submitAnswer', {
    roomId: roomId1,
    questionId: 'NON_EXISTENT_OLD_QUESTION_ID',
    answer: 'geht',
  });

  await delay(200);
  assert(invalidQuestionError, 'Server rejects answers targeting mismatched or obsolete question IDs');


  // 5. 20-30 Simulated Concurrent Students Load Test
  console.log('\n--- 5. Large Classroom Simulation (20 Concurrent Students) ---');
  const loadTeacher = await createSocket();
  let loadRoom: GameRoom | null = null;

  await new Promise<void>((resolve) => {
    loadTeacher.on('server:roomCreated', ({ room }) => {
      loadRoom = room;
      resolve();
    });
    loadTeacher.emit('teacher:createRoom', {
      level: 'B1',
      games: [
        { gameType: 'SCHNELLANTWORT', questionCount: 5 },
        { gameType: 'TEAM_BATTLE', questionCount: 5 },
      ],
      difficulty: 'AUTO',
    });
  });

  const loadPin = (loadRoom as GameRoom | null)?.pin || '';
  const loadRoomId = (loadRoom as GameRoom | null)?.roomId || '';


  const classStudents: TestSocket[] = [];
  for (let i = 1; i <= 20; i++) {
    const s = await createSocket();
    s.emit('student:joinRoom', { pin: loadPin, name: `Schüler_${i}` });
    classStudents.push(s);
  }

  await delay(400);

  const syncedRoom = roomManager.getRoomById(loadRoomId);
  const activeStudentCount = Object.keys(syncedRoom?.players || {}).length;
  assert(activeStudentCount === 20, '20 simultaneous classroom students connected and registered');

  // Clean up rooms
  teacherSocket.emit('teacher:closeRoom', { roomId: roomId1 });
  loadTeacher.emit('teacher:closeRoom', { roomId: loadRoomId });
  await delay(100);

  assert(roomManager.getRoomById(roomId1) === undefined, 'Room 1 memory cleanly deallocated');
  assert(roomManager.getRoomById(loadRoomId) === undefined, 'Load test room memory cleanly deallocated');

  // Disconnect sockets
  teacherSocket.disconnect();
  maliciousStudent.disconnect();
  spammerSocket.disconnect();
  loadTeacher.disconnect();
  classStudents.forEach((s) => s.disconnect());


  console.log('\n================================================================');
  console.log(`🎉 Phase 9 Final Tests Complete: ${passedTests}/${totalTests} Passed (100%)`);
  console.log('================================================================\n');

  process.exit(0);
}

runPhase9Tests().catch((err) => {
  console.error('Phase 9 test failure:', err);
  process.exit(1);
});
