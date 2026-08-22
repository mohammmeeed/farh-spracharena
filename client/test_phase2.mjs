import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

async function runTests() {
  console.log('--- Starting Phase 2 Backend & Socket Tests ---');

  // 1. Health Check
  const healthRes = await fetch(`${SERVER_URL}/api/health`);
  const healthData = await healthRes.json();
  console.log('1. Health Check:', healthData);
  if (healthData.status !== 'ok' || healthData.application !== 'Farh SprachArena') {
    throw new Error('Health check failed');
  }

  // 2. Connect Socket.IO Client
  const socket = io(SERVER_URL);

  await new Promise((resolve, reject) => {
    socket.on('connect', () => {
      console.log('2. Socket connected with ID:', socket.id);
      resolve();
    });
    socket.on('connect_error', reject);
  });

  // 3. Test Room Creation with Valid Payload (A2, 3 games: 10, 8, 8 = 26 questions)
  console.log('\n3. Testing valid room creation (A2, 3 games: Schnellantwort, Satz-Rennen, Was bin ich)...');
  const validPayload = {
    level: 'A2',
    games: [
      { gameType: 'SCHNELLANTWORT', questionCount: 10 },
      { gameType: 'SATZ_RENNEN', questionCount: 8 },
      { gameType: 'WAS_BIN_ICH', questionCount: 8 },
    ],
  };

  const createdRoom = await new Promise((resolve, reject) => {
    socket.once('server:roomCreated', ({ room }) => resolve(room));
    socket.once('server:roomError', ({ message }) => reject(new Error(message)));
    socket.emit('teacher:createRoom', validPayload);
  });

  console.log('Room created successfully:', {
    roomId: createdRoom.roomId,
    pin: createdRoom.pin,
    level: createdRoom.level,
    gamesCount: createdRoom.games.length,
    totalQuestions: createdRoom.totalQuestions,
    status: createdRoom.status,
  });

  // Validations on created room
  if (!createdRoom.roomId || !createdRoom.roomId.startsWith('room_')) {
    throw new Error(`Invalid roomId format: ${createdRoom.roomId}`);
  }
  if (!/^\d{6}$/.test(createdRoom.pin)) {
    throw new Error(`Invalid 6-digit PIN format: ${createdRoom.pin}`);
  }
  if (createdRoom.level !== 'A2') {
    throw new Error(`Expected level A2, got: ${createdRoom.level}`);
  }
  if (createdRoom.totalQuestions !== 26) {
    throw new Error(`Expected 26 total questions, got: ${createdRoom.totalQuestions}`);
  }
  if (createdRoom.status !== 'WAITING') {
    throw new Error(`Expected status WAITING, got: ${createdRoom.status}`);
  }

  // 4. Verify REST endpoint /api/rooms/:roomId
  console.log('\n4. Verifying REST endpoint GET /api/rooms/:roomId...');
  const roomRes = await fetch(`${SERVER_URL}/api/rooms/${createdRoom.roomId}`);
  const roomRestData = await roomRes.json();
  console.log('REST Room Data:', roomRestData);
  if (roomRestData.pin !== createdRoom.pin || roomRestData.totalQuestions !== 26) {
    throw new Error('REST Room verification failed');
  }

  // 5. Test Teacher Join / Sync Room
  console.log('\n5. Testing teacher:joinRoom...');
  const syncedRoom = await new Promise((resolve, reject) => {
    socket.once('server:roomJoined', ({ room }) => resolve(room));
    socket.once('server:roomError', ({ message }) => reject(new Error(message)));
    socket.emit('teacher:joinRoom', { roomId: createdRoom.roomId });
  });
  console.log('Synced room PIN:', syncedRoom.pin);

  // 6. Test Invalid Configurations
  console.log('\n6. Testing validation error cases...');

  // 6a. Empty games
  const errorEmptyGames = await new Promise((resolve) => {
    socket.once('server:roomError', ({ message }) => resolve(message));
    socket.emit('teacher:createRoom', { level: 'B1', games: [] });
  });
  console.log('6a. Empty games error message:', errorEmptyGames);
  if (!errorEmptyGames.includes('mindestens ein Spiel')) {
    throw new Error('Expected validation error for empty games');
  }

  // 6b. Invalid question count (< 5)
  const errorLowCount = await new Promise((resolve) => {
    socket.once('server:roomError', ({ message }) => resolve(message));
    socket.emit('teacher:createRoom', {
      level: 'B1',
      games: [{ gameType: 'SCHNELLANTWORT', questionCount: 2 }],
    });
  });
  console.log('6b. Low question count error message:', errorLowCount);
  if (!errorLowCount.includes('zwischen 5 und 30')) {
    throw new Error('Expected validation error for question count < 5');
  }

  // 6c. Duplicate game types
  const errorDuplicate = await new Promise((resolve) => {
    socket.once('server:roomError', ({ message }) => resolve(message));
    socket.emit('teacher:createRoom', {
      level: 'B1',
      games: [
        { gameType: 'SCHNELLANTWORT', questionCount: 10 },
        { gameType: 'SCHNELLANTWORT', questionCount: 10 },
      ],
    });
  });
  console.log('6c. Duplicate game type error message:', errorDuplicate);
  if (!errorDuplicate.includes('Doppelter Spieltyp')) {
    throw new Error('Expected validation error for duplicate game type');
  }

  // 7. Test Close Room
  console.log('\n7. Testing teacher:closeRoom...');
  socket.emit('teacher:closeRoom', { roomId: createdRoom.roomId });
  await new Promise((r) => setTimeout(r, 500));

  const roomAfterClose = await fetch(`${SERVER_URL}/api/rooms/${createdRoom.roomId}`);
  console.log('Status code after room close:', roomAfterClose.status);
  if (roomAfterClose.status !== 404) {
    throw new Error('Expected 404 for closed room');
  }

  socket.disconnect();
  console.log('\n✅ ALL PHASE 2 BACKEND & SOCKET TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
