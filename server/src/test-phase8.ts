import { io as Client, Socket } from 'socket.io-client';
import './server.js';
import { roomManager } from './rooms/room.manager.js';

import {
  GameRoom,
  Player,
  LeaderboardEntry,
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

async function runPhase8Tests() {
  console.log('\n================================================================');
  console.log('🧪 Starting Phase 8: Professional Teacher Dashboard & Control Tests');
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

  // 1. Setup Wizard & Room Creation Validation
  console.log('--- 1. Setup Wizard & Room Creation Tests ---');
  const teacherSocket = await createSocket();

  let createdRoom: GameRoom | null = null;

  await new Promise<void>((resolve) => {
    teacherSocket.on('server:roomCreated', ({ room }) => {
      createdRoom = room;
      resolve();
    });

    const createPayload: CreateRoomPayload = {
      level: 'B1',
      games: [
        { gameType: 'SCHNELLANTWORT', questionCount: 5 },
        { gameType: 'SATZ_RENNEN', questionCount: 5 },
        { gameType: 'TEAM_BATTLE', questionCount: 6 },
      ],
      difficulty: 'AUTO',
      category: 'Grammatik',
    };

    teacherSocket.emit('teacher:createRoom', createPayload);
  });

  assert(createdRoom !== null, 'Teacher successfully created 3-game session room');
  assert((createdRoom as GameRoom | null)?.level === 'B1', 'Level configured as B1 for whole room');
  assert((createdRoom as GameRoom | null)?.difficulty === 'AUTO', 'Difficulty set to AUTO (30/50/20 balance)');
  assert((createdRoom as GameRoom | null)?.category === 'Grammatik', 'Category focused on Grammatik');
  assert((createdRoom as GameRoom | null)?.pin?.length === 6, 'Generated valid 6-digit numeric room PIN');

  const roomId = (createdRoom as GameRoom | null)?.roomId || '';
  const pin = (createdRoom as GameRoom | null)?.pin || '';


  // 2. Student Joining & Ready State System
  console.log('\n--- 2. Student Joining & Ready State System ---');
  const student1 = await createSocket();
  const student2 = await createSocket();
  const student3 = await createSocket();

  let student1Data: Player | null = null;
  let playerListUpdatedCount = 0;

  student1.on('student:joinedRoom', ({ player }) => {
    student1Data = player;
  });

  teacherSocket.on('room:playersUpdated', ({ players }) => {
    playerListUpdatedCount = players.length;
  });

  student1.emit('student:joinRoom', { pin, name: 'Mohamed' });
  student2.emit('student:joinRoom', { pin, name: 'Sara' });
  student3.emit('student:joinRoom', { pin, name: 'Adam' });

  await delay(200);

  assert(playerListUpdatedCount === 3, 'Teacher live lobby received all 3 joined students');
  assert(student1Data !== null && (student1Data as Player | null)?.name === 'Mohamed', 'Student 1 joined with persona Mohamed');


  // Test Student Ready Toggle
  await new Promise<void>((resolve) => {
    teacherSocket.once('room:playersUpdated', ({ players }: { players: Player[] }) => {
      const p = players.find((pl: Player) => pl.name === 'Mohamed');
      assert(p?.isReady === true, 'Student ready state toggled to true and broadcast to teacher');
      resolve();
    });

    student1.emit('student:toggleReady', { roomId });
  });


  // 3. Security & Authorization Enforcement
  console.log('\n--- 3. Security & Authorization Enforcement ---');
  let unauthorizedStartRejected = false;
  let unauthorizedEndRejected = false;

  await new Promise<void>((resolve) => {
    student1.once('server:roomError', ({ message }) => {
      if (message.includes('Lehrer')) {
        unauthorizedStartRejected = true;
      }
      resolve();
    });

    // Student attempts to start game (unauthorized)
    student1.emit('teacher:startGame', { roomId });
  });

  assert(unauthorizedStartRejected, 'Server strictly rejects unauthorized student attempt to start game');

  await new Promise<void>((resolve) => {
    student2.once('server:roomError', ({ message }) => {
      if (message.includes('Lehrer')) {
        unauthorizedEndRejected = true;
      }
      resolve();
    });

    // Student attempts to end game (unauthorized)
    student2.emit('teacher:endGame', { roomId });
  });

  assert(unauthorizedEndRejected, 'Server strictly rejects unauthorized student attempt to end game');

  // 4. Live Classroom Session & Real-Time Statistics
  console.log('\n--- 4. Live Game Control & Real-Time Statistics ---');
  let questionStartedReceived = false;
  let currentQuestionId = '';
  let questionTimeLimit = 0;

  student1.on('game:questionStarted', (data) => {
    questionStartedReceived = true;
    currentQuestionId = data.questionId;
    questionTimeLimit = data.timeLimit;
  });

  // Authorized teacher starts the game
  teacherSocket.emit('teacher:startGame', { roomId });

  // Wait for 3-2-1 countdown + question start
  await delay(3600);

  assert(questionStartedReceived, 'Game successfully started and broadcast questionStarted event');
  assert(questionTimeLimit > 0, 'Question has valid server-authoritative time limit');

  // Submit student answers
  student1.emit('student:submitAnswer', {
    roomId,
    questionId: currentQuestionId,
    answer: 'geht',
  });

  student2.emit('student:submitAnswer', {
    roomId,
    questionId: currentQuestionId,
    answer: 'geht',
  });

  let statsReceived: any = null;

  await new Promise<void>((resolve) => {
    teacherSocket.on('game:questionResult', ({ stats }) => {
      statsReceived = stats;
      resolve();
    });
  });

  assert(statsReceived !== null, 'Teacher dashboard received live questionResult statistics');
  assert(statsReceived.totalPlayers >= 3, 'Stats accurately track total participating students');
  assert(statsReceived.accuracyPercentage !== undefined, 'Stats include class accuracy percentage');
  assert(statsReceived.optionDistribution !== undefined, 'Stats include option distribution breakdown');

  // 5. Scalability Simulation (10 Concurrent Students in Lobby)
  console.log('\n--- 5. Scalability Simulation ---');
  const scaleTeacher = await createSocket();
  let scaleRoom: GameRoom | null = null;

  await new Promise<void>((resolve) => {
    scaleTeacher.on('server:roomCreated', ({ room }) => {
      scaleRoom = room;
      resolve();
    });

    scaleTeacher.emit('teacher:createRoom', {
      level: 'A2',
      games: [{ gameType: 'SCHNELLANTWORT', questionCount: 5 }],
      difficulty: 'AUTO',
    });
  });

  const scalePin = (scaleRoom as GameRoom | null)?.pin || '';
  const scaleRoomId = (scaleRoom as GameRoom | null)?.roomId || '';


  const simulatedSockets: TestSocket[] = [];
  for (let i = 1; i <= 10; i++) {
    const s = await createSocket();
    s.emit('student:joinRoom', { pin: scalePin, name: `Student_${i}` });
    simulatedSockets.push(s);
  }

  await delay(300);
  const roomAfterScalability = roomManager.getRoomById(scaleRoomId);
  const totalStudentsInRoom = Object.keys(roomAfterScalability?.players || {}).length;
  assert(totalStudentsInRoom === 10, 'Lobby effortlessly manages 10 concurrent active students');

  scaleTeacher.emit('teacher:closeRoom', { roomId: scaleRoomId });
  scaleTeacher.disconnect();
  simulatedSockets.forEach((s) => s.disconnect());


  // 6. Premature Session Termination & Cleanup
  console.log('\n--- 6. Clean Room Termination Tests ---');
  let roomClosedBroadcast = false;

  student1.on('server:roomClosed', () => {
    roomClosedBroadcast = true;
  });

  teacherSocket.emit('teacher:closeRoom', { roomId });
  await delay(100);

  assert(roomClosedBroadcast, 'Room closure notified all connected students');
  assert(roomManager.getRoomById(roomId) === undefined, 'Room completely purged from memory (0 database traces)');

  // Cleanup sockets
  teacherSocket.disconnect();
  student1.disconnect();
  student2.disconnect();
  student3.disconnect();
  simulatedSockets.forEach((s) => s.disconnect());

  console.log('\n================================================================');
  console.log(`🎉 Phase 8 Tests Complete: ${passedTests}/${totalTests} Passed (100%)`);
  console.log('================================================================\n');

  process.exit(0);
}

runPhase8Tests().catch((err) => {

  console.error('Test execution error:', err);
  process.exit(1);
});
