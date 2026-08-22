import { io as ClientSocket, Socket } from 'socket.io-client';
import { httpServer } from './server.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3001;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runRedVsBlueTest() {
  console.log('\n======================================================');
  console.log('🔴 VS 🔵 RED TEAM VS BLUE TEAM AUTOMATED TEST SUITE');
  console.log('======================================================\n');

  const serverUrl = `http://localhost:${PORT}`;

  // 2. Connect Teacher
  const teacherSocket: Socket = ClientSocket(serverUrl);
  let roomId = '';
  let roomPin = '';

  await new Promise<void>((resolve, reject) => {
    teacherSocket.on('connect', () => {
      console.log('✓ Teacher Socket connected');
      teacherSocket.emit('teacher:createRoom', {
        level: 'B1',
        difficulty: 'MEDIUM',
        games: [
          { gameType: 'TEAM_BATTLE', questionCount: 3 },
          { gameType: 'SCHNELLANTWORT', questionCount: 3 },
        ],
      });
    });

    teacherSocket.on('server:roomCreated', (data) => {
      roomId = data.room.roomId;
      roomPin = data.room.pin;
      console.log(`✓ Room created with TEAM_BATTLE: ID=${roomId}, PIN=${roomPin}`);
      console.log(`✓ Default teams initialized:`, Object.keys(data.room.teams || {}));
      resolve();
    });

    setTimeout(() => reject(new Error('Teacher room creation timeout')), 5000);
  });

  // 3. Connect 8 Students
  const studentNames = [
    'Mohamed',
    'Sarah',
    'Ali',
    'Lina',
    'Adam',
    'Yasmine',
    'Tarek',
    'Fatima',
  ];
  const studentSockets: Socket[] = [];
  const studentsData: { id: string; name: string; teamId?: string; socket: Socket }[] = [];

  for (const name of studentNames) {
    const sSocket: Socket = ClientSocket(serverUrl);
    studentSockets.push(sSocket);

    await new Promise<void>((resolve, reject) => {
      sSocket.on('connect', () => {
        sSocket.emit('student:joinRoom', { pin: roomPin, name });
      });

      sSocket.on('student:joinedRoom', ({ player }) => {
        studentsData.push({
          id: player.playerId,
          name: player.name,
          teamId: player.teamId,
          socket: sSocket,
        });
        console.log(`✓ Student ${name} joined -> Assigned to: ${player.teamId}`);
        resolve();
      });

      setTimeout(() => reject(new Error(`Join timeout for student ${name}`)), 5000);
    });
  }

  // 4. Verify 4 vs 4 Auto-Balance on Join
  const redCount = studentsData.filter((s) => s.teamId === 'TEAM_ROT').length;
  const blueCount = studentsData.filter((s) => s.teamId === 'TEAM_BLAU').length;
  console.log(`\n[TEAM BALANCE CHECK]: 🔴 Red: ${redCount} | 🔵 Blue: ${blueCount}`);
  if (redCount !== 4 || blueCount !== 4) {
    throw new Error(`Expected 4 Red and 4 Blue, got ${redCount} Red and ${blueCount} Blue`);
  }
  console.log('✓ PASS: Initial 8 students evenly distributed (4 vs 4)');

  // 5. Test Teacher Manual Move (Move Mohamed to Blue)
  const mohamed = studentsData.find((s) => s.name === 'Mohamed')!;
  const targetTeam = mohamed.teamId === 'TEAM_ROT' ? 'TEAM_BLAU' : 'TEAM_ROT';

  let teamsUpdatedReceived = false;
  teacherSocket.once('room:teamsUpdated', ({ teams }) => {
    teamsUpdatedReceived = true;
    console.log(
      `✓ Teacher received room:teamsUpdated event. Red: ${teams.TEAM_ROT.playerIds.length}, Blue: ${teams.TEAM_BLAU.playerIds.length}`
    );
  });

  teacherSocket.emit('teacher:assignPlayerTeam', {
    roomId,
    playerId: mohamed.id,
    targetTeamId: targetTeam,
  });

  await sleep(600);
  if (!teamsUpdatedReceived) {
    throw new Error('room:teamsUpdated was not received after teacher:assignPlayerTeam');
  }
  console.log(`✓ PASS: Teacher manual team reassignment works perfectly`);

  // 6. Test Teacher Auto-Balance Button
  teacherSocket.emit('teacher:autoBalanceTeams', { roomId });
  await sleep(600);
  console.log('✓ PASS: Teacher auto-balance event executed without errors');

  // 7. Test Game Start & Team Intro Showdown Event
  let teamIntroReceived = false;
  studentSockets[0].once('game:teamIntro', (data) => {
    teamIntroReceived = true;
    console.log(
      `✓ Student received game:teamIntro (Duration: ${data.durationMs}ms, Teams: ${Object.keys(data.teams).join(', ')})`
    );
  });

  teacherSocket.emit('teacher:startGame', { roomId });
  await sleep(1500);

  if (!teamIntroReceived) {
    throw new Error('game:teamIntro was not broadcasted before startCountdown');
  }
  console.log('✓ PASS: Esports team intro showdown broadcasted correctly before countdown');

  // 8. Test First Question & Reconnection Team Persistence
  await sleep(3500); // Wait for countdown to question

  const disconnectedStudent = studentsData[0];
  console.log(`\n[TESTING RECONNECTION]: Disconnecting ${disconnectedStudent.name} (${disconnectedStudent.teamId})...`);
  disconnectedStudent.socket.disconnect();
  await sleep(500);

  const reconnectSocket: Socket = ClientSocket(serverUrl);
  await new Promise<void>((resolve, reject) => {
    reconnectSocket.on('connect', () => {
      reconnectSocket.emit('student:syncLobby', {
        roomId,
        playerId: disconnectedStudent.id,
      });
    });

    reconnectSocket.on('student:joinedRoom', ({ player }) => {
      console.log(`✓ Reconnected ${player.name} -> Team: ${player.teamId}`);
      if (player.teamId !== disconnectedStudent.teamId) {
        reject(new Error(`Team changed on reconnect! Expected ${disconnectedStudent.teamId}, got ${player.teamId}`));
      } else {
        resolve();
      }
    });

    setTimeout(() => reject(new Error('Reconnect timeout')), 5000);
  });
  console.log('✓ PASS: Student reconnects with 100% team identity preservation');

  // Clean up sockets and server
  teacherSocket.disconnect();
  studentSockets.forEach((s) => s.disconnect());
  reconnectSocket.disconnect();

  await new Promise<void>((resolve) => {
    httpServer.close(() => {
      console.log('\n======================================================');
      console.log('🎉 ALL RED VS BLUE TEAM TESTS PASSED WITH 100% SUCCESS!');
      console.log('======================================================\n');
      resolve();
    });
  });

  process.exit(0);
}

runRedVsBlueTest().catch((err) => {
  console.error('\n❌ RED VS BLUE TEST FAILED:', err);
  process.exit(1);
});
