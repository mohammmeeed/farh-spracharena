import { io as ClientSocket, Socket } from 'socket.io-client';
import { httpServer } from './server.js';
import { GameLevel, GameType } from './types/game.types.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const SERVER_URL = `http://localhost:${PORT}`;

async function runMultiplayerE2ETest() {
  console.log('\n================================================================');
  console.log('🎮 Farh SprachArena - Full 1-Teacher + 10-Students E2E Simulation');
  console.log('================================================================\n');

  // Small delay for server initialization
  await new Promise((r) => setTimeout(r, 500));

  const teacherSocket: Socket = ClientSocket(SERVER_URL, {
    transports: ['websocket'],
    forceNew: true,
  });

  const studentSockets: Socket[] = [];
  const STUDENT_COUNT = 10;
  const studentNames = [
    'Lukas Müller', 'Sophie Schmidt', 'Maximilian Weber', 'Emma Fischer',
    'Leon Meyer', 'Mia Wagner', 'Paul Becker', 'Hannah Schulz',
    'Jonas Hoffmann', 'Lea Schäfer'
  ];

  try {
    // 1. Connect Teacher
    await new Promise<void>((resolve, reject) => {
      teacherSocket.on('connect', () => {
        console.log('✅ Teacher connected to server.');
        resolve();
      });
      teacherSocket.on('connect_error', reject);
    });

    // 2. Teacher creates 5-Game Multi-Game Room (Level: A2)
    const gamesConfig = [
      { gameType: 'SCHNELLANTWORT' as GameType, questionCount: 5 },
      { gameType: 'SATZ_RENNEN' as GameType, questionCount: 4 },
      { gameType: 'WORTSCHATZ_DUELL' as GameType, questionCount: 4 },
      { gameType: 'WAS_BIN_ICH' as GameType, questionCount: 4 },
      { gameType: 'TEAM_BATTLE' as GameType, questionCount: 5 },
    ];

    let roomPin = '';
    let roomId = '';

    await new Promise<void>((resolve, reject) => {
      teacherSocket.emit('teacher:createRoom', {
        level: 'A2' as GameLevel,
        games: gamesConfig,
        category: 'ALL',
        difficulty: 'AUTO',
      });

      teacherSocket.on('server:roomCreated', ({ room }: any) => {
        roomPin = room.pin;
        roomId = room.roomId;
        console.log(`✅ Teacher created Room ${roomId} (PIN: ${roomPin}) with ${gamesConfig.length} games.`);
        resolve();
      });

      teacherSocket.on('server:roomError', (err: any) => {
        reject(new Error(err.message));
      });
    });

    // 3. Connect and Join 10 Students
    console.log(`\nConnecting and joining ${STUDENT_COUNT} students into Room ${roomPin}...`);
    for (let i = 0; i < STUDENT_COUNT; i++) {
      const studentSocket: Socket = ClientSocket(SERVER_URL, {
        transports: ['websocket'],
        forceNew: true,
      });

      await new Promise<void>((resolve, reject) => {
        studentSocket.on('connect', () => {
          studentSocket.emit('student:joinRoom', {
            pin: roomPin,
            name: studentNames[i],
          });
        });

        studentSocket.on('student:joinedRoom', ({ player }: any) => {
          console.log(`  👤 Student ${i + 1}/${STUDENT_COUNT} "${player.name}" joined successfully.`);
          resolve();
        });

        studentSocket.on('student:joinError', (err: any) => {
          reject(new Error(err.message));
        });
      });

      studentSockets.push(studentSocket);
    }

    console.log(`✅ All ${STUDENT_COUNT} students joined the room lobby!`);

    // 4. Session Tracking: Collect question IDs to assert NO REPETITION
    const sessionSeenQuestionIds: string[] = [];

    // Track each question once from Teacher screen
    teacherSocket.on('game:questionStarted', (qData: any) => {
      sessionSeenQuestionIds.push(qData.questionId);
      console.log(`  [${qData.gameType}] Question ${qData.questionNumber}/${qData.totalQuestions}: ${qData.questionId} ("${qData.text.slice(0, 35)}...")`);
    });

    // Track when session finishes
    const sessionFinishedPromise = new Promise<void>((resolve) => {
      teacherSocket.on('game:sessionFinished', ({ finalLeaderboard, winner }: any) => {
        console.log('\n🏆 SESSION FINISHED!');
        console.log(`Winner: ${typeof winner === 'object' && 'name' in winner ? winner.name : JSON.stringify(winner)}`);
        console.log(`Final Leaderboard: ${finalLeaderboard.length} players ranked.`);
        resolve();
      });
    });

    // Handle student gameplay answering automatically
    studentSockets.forEach((s) => {
      s.on('game:questionStarted', (qData: any) => {
        // Pick an answer
        let chosenAnswer: string | string[] = '';
        if (qData.options && qData.options.length > 0) {
          const randIdx = Math.floor(Math.random() * qData.options.length);
          chosenAnswer = qData.options[randIdx];
        } else if (qData.words && qData.words.length > 0) {
          chosenAnswer = [...qData.words];
        }

        setTimeout(() => {
          s.emit('student:submitAnswer', {
            roomId,
            questionId: qData.questionId,
            answer: chosenAnswer,
          });
        }, 50 + Math.random() * 150);
      });
    });

    // 5. Teacher Starts the Game
    console.log('\n🚀 Teacher starts game session...');
    teacherSocket.emit('teacher:startGame', { roomId });

    // Wait for all 5 games to complete
    console.log('Running all 5 multiplayer game rounds (Schnellantwort, Satz-Rennen, Wortschatz-Duell, Was bin ich?, Team Battle)...');
    await sessionFinishedPromise;

    // 6. Verify Anti-Repetition
    console.log('\n================================================================');
    console.log('🔍 Session Verification Results:');
    console.log('----------------------------------------------------------------');
    console.log(`Total Question Plays in Session: ${sessionSeenQuestionIds.length}`);
    const uniqueIds = new Set(sessionSeenQuestionIds);
    console.log(`Unique Question IDs:             ${uniqueIds.size}`);

    if (uniqueIds.size !== sessionSeenQuestionIds.length) {
      console.error('❌ FAIL: Duplicate question detected inside session!');
      process.exit(1);
    } else {
      console.log('✅ PASS: Exactly ZERO question repetitions across all 5 games in the session!');
    }

    console.log('================================================================\n');
  } finally {
    // Cleanup sockets
    teacherSocket.disconnect();
    studentSockets.forEach((s) => s.disconnect());
    httpServer.close();
  }
}

runMultiplayerE2ETest()
  .then(() => {
    console.log('🎉 Full Multiplayer E2E Simulation completed successfully with exit code 0.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Simulation Error:', err);
    process.exit(1);
  });
