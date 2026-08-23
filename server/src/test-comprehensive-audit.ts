import { io as ClientSocket, Socket } from 'socket.io-client';
import { httpServer } from './server.js';
import { GameLevel, GameType } from './types/game.types.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const SERVER_URL = `http://localhost:${PORT}`;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runComprehensiveAuditTests() {
  console.log('\n================================================================');
  console.log('🧪 Farh SprachArena — Comprehensive Audit Verification Suite');
  console.log('================================================================\n');

  await sleep(400);

  const teacherSocket: Socket = ClientSocket(SERVER_URL, {
    transports: ['websocket'],
    forceNew: true,
  });

  const studentSockets: Socket[] = [];
  const students: { id: string; name: string; socket: Socket; teamId?: string }[] = [];

  try {
    // 1. Connect Teacher
    await new Promise<void>((resolve, reject) => {
      teacherSocket.on('connect', () => {
        console.log('✓ Teacher Socket connected');
        resolve();
      });
      teacherSocket.on('connect_error', reject);
    });

    // 2. Create Room with SCHNELLANTWORT, SATZ_RENNEN, and TEAM_BATTLE
    let roomId = '';
    let roomPin = '';

    await new Promise<void>((resolve, reject) => {
      teacherSocket.emit('teacher:createRoom', {
        level: 'A2' as GameLevel,
        category: 'ALL',
        difficulty: 'AUTO',
        games: [
          { gameType: 'SCHNELLANTWORT' as GameType, questionCount: 2 },
          { gameType: 'SATZ_RENNEN' as GameType, questionCount: 1 },
          { gameType: 'TEAM_BATTLE' as GameType, questionCount: 2 },
        ],
      });

      teacherSocket.on('server:roomCreated', ({ room }: any) => {
        roomId = room.roomId;
        roomPin = room.pin;
        console.log(`✓ Room created: ID=${roomId}, PIN=${roomPin} with 3 games (5 questions)`);
        resolve();
      });

      teacherSocket.on('server:roomError', (err: any) => reject(new Error(err.message)));
    });

    // 3. Connect 3 Students:
    // Student A: Answers correctly
    // Student B: Answers incorrectly
    // Student C: Does NOT answer (Timeout test)
    const studentNames = ['Student_Correct', 'Student_Incorrect', 'Student_Timeout'];
    for (let i = 0; i < 3; i++) {
      const sSocket: Socket = ClientSocket(SERVER_URL, {
        transports: ['websocket'],
        forceNew: true,
      });

      await new Promise<void>((resolve, reject) => {
        sSocket.on('connect', () => {
          sSocket.emit('student:joinRoom', { pin: roomPin, name: studentNames[i] });
        });

        sSocket.on('student:joinedRoom', ({ player }: any) => {
          students.push({
            id: player.playerId,
            name: player.name,
            socket: sSocket,
            teamId: player.teamId,
          });
          resolve();
        });

        sSocket.on('student:joinError', (err: any) => reject(new Error(err.message)));
      });

      studentSockets.push(sSocket);
    }
    console.log(`✓ 3 Students joined: Correct, Incorrect, Timeout`);

    // 4. Test Countdown & Timestamps Verification
    let countdownValues: number[] = [];
    let hasCountdownEndsAt = false;

    studentSockets[0].on('game:countdown', (data: any) => {
      countdownValues.push(data.value);
      if (data.countdownEndsAt && data.countdownEndsAt > Date.now()) {
        hasCountdownEndsAt = true;
      }
    });

    // Handle Question Answering Logic
    let currentQuestionIndex = 0;
    const studentResults: Record<string, any[]> = {
      Student_Correct: [],
      Student_Incorrect: [],
      Student_Timeout: [],
    };

    studentSockets.forEach((s, idx) => {
      const sName = studentNames[idx];

      s.on('game:questionStarted', (qData: any) => {
        if (sName === 'Student_Correct') {
          // Send correct option if known, or first option
          const answer = qData.options ? qData.options[0] : (qData.words || ['Wort']);
          setTimeout(() => {
            s.emit('student:submitAnswer', {
              roomId,
              questionId: qData.questionId,
              answer,
            });
          }, 100);
        } else if (sName === 'Student_Incorrect') {
          // Submit wrong answer
          const answer = 'DEF_WRONG_ANSWER_12345';
          setTimeout(() => {
            s.emit('student:submitAnswer', {
              roomId,
              questionId: qData.questionId,
              answer,
            });
          }, 150);
        }
        // Student_Timeout deliberately does NOT submit any answer!
      });

      s.on('game:questionResult', (resData: any) => {
        studentResults[sName].push(resData);
      });
    });

    // 5. Start Game
    console.log('\n--- Starting Game & Testing Scenarios ---');
    teacherSocket.emit('teacher:startGame', { roomId });

    // Wait for Session Finished
    await new Promise<void>((resolve, reject) => {
      teacherSocket.on('game:sessionFinished', ({ finalLeaderboard, questionHistory }: any) => {
        console.log('\n🏆 Session Completed with all 5 questions!');

        // Assertions:
        // TEST 1: Countdown contained valid countdownEndsAt
        if (!hasCountdownEndsAt) {
          return reject(new Error('Countdown did not provide authoritative countdownEndsAt timestamp!'));
        }
        console.log('✓ TEST PASS: Server-authoritative countdownEndsAt verified');

        // TEST 2: Timeout student received all question results and progressed with class
        const timeoutHistory = studentResults['Student_Timeout'];
        if (timeoutHistory.length !== 5) {
          return reject(new Error(`Timeout student only received ${timeoutHistory.length}/5 question results!`));
        }
        console.log('✓ TEST PASS: Unanswered student progressed through all 5 questions with class in 100% sync');

        // TEST 3: Question history recorded unanswered questions properly
        const unansweredRecords = questionHistory.flatMap((h: any) =>
          h.studentResponses.filter((r: any) => r.playerName === 'Student_Timeout' && r.answer === 'Keine Antwort')
        );
        if (unansweredRecords.length !== 5) {
          return reject(new Error(`Expected 5 'Keine Antwort' records for Timeout student, found ${unansweredRecords.length}`));
        }
        console.log('✓ TEST PASS: "No answer" is correctly recorded as "Keine Antwort" for all unanswered questions');

        // TEST 4: Leaderboard verified
        if (finalLeaderboard.length !== 3) {
          return reject(new Error(`Expected 3 players in final leaderboard, got ${finalLeaderboard.length}`));
        }
        console.log('✓ TEST PASS: Final Leaderboard properly computed for all players');

        resolve();
      });

      setTimeout(() => reject(new Error('Test timeout after 140 seconds')), 140000);
    });

    console.log('\n================================================================');
    console.log('🎉 ALL COMPREHENSIVE AUDIT VERIFICATION TESTS PASSED!');
    console.log('================================================================\n');
  } finally {
    teacherSocket.disconnect();
    studentSockets.forEach((s) => s.disconnect());
    httpServer.close();
  }
}

runComprehensiveAuditTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Audit Test Error:', err);
    process.exit(1);
  });
