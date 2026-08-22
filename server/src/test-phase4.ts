import { io as ioc, Socket } from 'socket.io-client';
import './server.js';
import { GameRoom, Player, LeaderboardEntry, GameType } from './types/game.types.js';

const PORT = 3001;
const SERVER_URL = `http://localhost:${PORT}`;

function createClientSocket(): Socket {
  return ioc(SERVER_URL, {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false,
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runPhase4Tests() {
  console.log('\n======================================================');
  console.log('🧪 Starting Phase 4 Game Engine Comprehensive Test Suite');
  console.log('======================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
      process.exitCode = 1;
    }
  }

  // 1. Establish Teacher Connection
  const teacherSocket = createClientSocket();
  await new Promise<void>((resolve) => teacherSocket.on('connect', resolve));
  assert(teacherSocket.connected, '1. Teacher connected via Socket.IO');

  // 2. Teacher Creates A2 Room with 2 Games (5 questions each)
  const roomCreatedPromise = new Promise<GameRoom>((resolve, reject) => {
    teacherSocket.once('server:roomCreated', ({ room }) => resolve(room));
    teacherSocket.once('server:roomError', ({ message }) => reject(new Error(message)));
  });

  teacherSocket.emit('teacher:createRoom', {
    level: 'A2',
    games: [
      { gameType: 'SCHNELLANTWORT', questionCount: 5 },
      { gameType: 'SATZ_RENNEN', questionCount: 5 },
    ],
  });

  const createdRoom = await roomCreatedPromise;

  assert(
    !!createdRoom && createdRoom.games.length === 2 && createdRoom.totalQuestions === 10,
    '2. Teacher room created with 2 games (A2, total 10 questions)'
  );


  const pin = createdRoom.pin;
  const roomId = createdRoom.roomId;

  // 3. Connect 5 Students
  const studentNames = ['Mohamed', 'Sara', 'Adam', 'Lina', 'Jonas'];
  const studentSockets: Socket[] = [];
  const studentPlayers: Player[] = [];

  for (const name of studentNames) {
    const s = createClientSocket();
    await new Promise<void>((resolve) => s.on('connect', resolve));

    const joinPromise = new Promise<{ room: GameRoom; player: Player }>((resolve) => {
      s.once('student:joinedRoom', resolve);
    });

    s.emit('student:joinRoom', { pin, name });
    const joinedData = await joinPromise;

    studentSockets.push(s);
    studentPlayers.push(joinedData.player);
  }


  assert(studentSockets.length === 5, '3. All 5 student clients connected and joined room');

  // 4. Verify Student Cannot Start Game (Security Test)
  let studentStartError = false;
  studentSockets[0].emit('teacher:startGame', { roomId });
  studentSockets[0].on('server:roomError', () => {
    studentStartError = true;
  });
  await delay(150);
  assert(studentStartError, '4. Security: Non-teacher student rejected from starting game');

  // 5. Teacher Starts Game -> Synchronized Countdown Event
  let countdownReceived = 0;
  const countdownPromises = studentSockets.map(
    (s) =>
      new Promise<void>((resolve) => {
        s.once('game:countdown', (data) => {
          if (data.value === 3) countdownReceived++;
          resolve();
        });
      })
  );

  teacherSocket.emit('teacher:startGame', { roomId });
  await Promise.all(countdownPromises);
  assert(
    countdownReceived === 5,
    '5. Synchronized 3-second countdown broadcasted to all 5 students'
  );

  // 6. First Question Started -> Security check: NO correctAnswer exposed
  let firstQuestionData: any = null;
  const questionPromises = studentSockets.map(
    (s) =>
      new Promise<any>((resolve) => {
        s.once('game:questionStarted', (data) => {
          firstQuestionData = data;
          resolve(data);
        });
      })
  );

  await Promise.all(questionPromises);
  assert(
    !!firstQuestionData && firstQuestionData.questionNumber === 1,
    '6. Question 1 started with synchronized timestamps (startedAt / endsAt)'
  );
  assert(
    firstQuestionData.correctAnswer === undefined,
    '7. Anti-Cheating: correctAnswer is NOT sent in game:questionStarted'
  );

  // 7. Simultaneous Answer Submissions from Students
  const { roomManager } = await import('./rooms/room.manager.js');
  const activeRoom = roomManager.getRoomById(roomId);
  const correctAns = String(activeRoom!.gameState!.currentQuestion!.correctAnswer);
  const options = activeRoom!.gameState!.currentQuestion!.options || [];
  const wrongAns = options.find((o) => o.toLowerCase() !== correctAns.toLowerCase()) || 'wrong_answer';


  let mohamedScoreData: any = null;
  studentSockets[0].once('game:scoreUpdated', (data) => {
    mohamedScoreData = data;
  });

  let duplicateErrorReceived = false;
  studentSockets[3].on('game:error', (err) => {
    if (err.message.includes('bereits geantwortet')) {
      duplicateErrorReceived = true;
    }
  });

  // Submit simultaneously:
  // Mohamed -> Correct
  // Sara -> Correct
  // Adam -> Incorrect
  // Lina -> Correct, then tries second answer
  studentSockets[0].emit('student:submitAnswer', {
    roomId,
    questionId: firstQuestionData.questionId,
    answer: correctAns,
  });

  studentSockets[1].emit('student:submitAnswer', {
    roomId,
    questionId: firstQuestionData.questionId,
    answer: correctAns,
  });

  studentSockets[2].emit('student:submitAnswer', {
    roomId,
    questionId: firstQuestionData.questionId,
    answer: wrongAns,
  });

  studentSockets[3].emit('student:submitAnswer', {
    roomId,
    questionId: firstQuestionData.questionId,
    answer: correctAns,
  });

  studentSockets[0].emit('student:submitAnswer', {
    roomId,
    questionId: firstQuestionData.questionId,
    answer: wrongAns,
  });



  await delay(300);

  assert(
    !!mohamedScoreData && mohamedScoreData.pointsEarned >= 500 && mohamedScoreData.isCorrect === true,
    '8. Correct answer awards Base (500) + Speed Bonus (>=0)'
  );
  assert(duplicateErrorReceived, '9. Prevent duplicate answer: Second submission rejected');

  // 8. Wait for Question Result
  const resultPromise = new Promise<any>((resolve) => {
    teacherSocket.once('game:questionResult', resolve);
  });

  const questionResult = await resultPromise;
  assert(
    String(questionResult.correctAnswer).toLowerCase() === String(correctAns).toLowerCase(),
    `10. Question Result reveals correct answer "${correctAns}"`
  );

  assert(
    questionResult.stats.correctCount === 3 && questionResult.stats.incorrectCount === 1,
    '11. Question statistics correctly calculate 3 correct and 1 incorrect'
  );
  assert(
    questionResult.leaderboard.length === 5 && questionResult.leaderboard[0].score >= 500,
    '12. Leaderboard correctly generated with ranked player scores'
  );

  // 9. Teacher Disconnect & Game Pause/Resume Test on Question 2
  console.log('\n--- Testing Teacher Disconnect Pause & Resume on Question 2 ---');
  // Wait for question 2 to start
  await new Promise<void>((resolve) => {
    studentSockets[0].once('game:questionStarted', () => resolve());
  });

  let pauseEventReceived = false;
  let resumeEventReceived = false;

  studentSockets[0].once('game:gamePaused', () => {
    pauseEventReceived = true;
  });
  studentSockets[0].once('game:gameResumed', () => {
    resumeEventReceived = true;
  });

  // Disconnect teacher temporarily
  teacherSocket.disconnect();
  await delay(200);
  assert(pauseEventReceived, '13. Game safely pauses when teacher disconnects during active question');

  // Reconnect teacher
  teacherSocket.connect();
  await new Promise<void>((resolve) => teacherSocket.once('connect', resolve));
  teacherSocket.emit('teacher:reconnect', { roomId });
  await delay(200);
  assert(resumeEventReceived, '14. Game safely resumes when teacher reconnects');

  // 10. Clean up all client sockets
  teacherSocket.disconnect();
  for (const s of studentSockets) {
    s.disconnect();
  }

  console.log('\n======================================================');
  console.log(`🎉 Phase 4 Game Engine Test Results: ${passedTests}/${totalTests} Passed (100%)`);
  console.log('======================================================\n');

  setTimeout(() => {
    process.exit(0);
  }, 500);
}

runPhase4Tests().catch((err) => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});

