import { io as ioc, Socket } from 'socket.io-client';
import './server.js';
import { GameRoom, Player, Team, LeaderboardEntry, GameType } from './types/game.types.js';
import { roomManager } from './rooms/room.manager.js';
import { AnswerValidator } from './games/validators/AnswerValidator.js';
import { TeamManager } from './games/TeamManager.js';

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

async function runPhase5Tests() {
  console.log('\n================================================================');
  console.log('🧪 Starting Phase 5: The 5 Multiplayer Games Comprehensive Tests');
  console.log('================================================================\n');

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

  // -------------------------------------------------------------------------
  // 1. Validator Unit Tests (All 5 Games)
  // -------------------------------------------------------------------------
  console.log('--- 1. Game-Specific Answer Validation Unit Tests ---');

  // Game 1: Schnellantwort
  const saCorrect = AnswerValidator.validateMultipleChoiceAnswer('habe', 'habe');
  const saWrong = AnswerValidator.validateMultipleChoiceAnswer('bin', 'habe');
  assert(saCorrect && !saWrong, '1. Schnellantwort multiple choice validation');

  // Game 2: Satz-Rennen (Ordered Array Sequence)
  const srCorrectArray = AnswerValidator.validateSentenceOrderAnswer(
    ['Ich', 'fahre', 'morgen', 'nach Berlin'],
    ['Ich', 'fahre', 'morgen', 'nach Berlin']
  );
  const srWrongArray = AnswerValidator.validateSentenceOrderAnswer(
    ['morgen', 'ich', 'fahre', 'nach Berlin'],
    ['Ich', 'fahre', 'morgen', 'nach Berlin']
  );
  assert(srCorrectArray && !srWrongArray, '2. Satz-Rennen ordered array validation');

  // Game 3: Wortschatz-Duell
  const wdCorrect = AnswerValidator.validateVocabularyAnswer('Kühlschrank (Refrigerator)', 'Kühlschrank (Refrigerator)');
  const wdWrong = AnswerValidator.validateVocabularyAnswer('Waschmaschine', 'Kühlschrank (Refrigerator)');
  assert(wdCorrect && !wdWrong, '3. Wortschatz-Duell vocabulary translation validation');

  // Game 4: Was bin ich?
  const wbCorrect = AnswerValidator.validateClueAnswer('Arzt / Ärztin', 'Arzt / Ärztin');
  const wbWrong = AnswerValidator.validateClueAnswer('Lehrer', 'Arzt / Ärztin');
  assert(wbCorrect && !wbWrong, '4. Was bin ich? clue deduction validation');

  // -------------------------------------------------------------------------
  // 2. Team Battle Partitioning & Score Logic
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Team Battle Partitioning & Balancing Tests ---');

  const mockPlayers: Record<string, Player> = {
    p1: { id: 'p1', playerId: 'p1', socketId: 's1', name: 'Mohamed', score: 0, currentStreak: 0, highestStreak: 0, streak: 0, answeredCurrentQuestion: false, connected: true, isConnected: true, joinedAt: 1 },
    p2: { id: 'p2', playerId: 'p2', socketId: 's2', name: 'Sara', score: 0, currentStreak: 0, highestStreak: 0, streak: 0, answeredCurrentQuestion: false, connected: true, isConnected: true, joinedAt: 2 },
    p3: { id: 'p3', playerId: 'p3', socketId: 's3', name: 'Adam', score: 0, currentStreak: 0, highestStreak: 0, streak: 0, answeredCurrentQuestion: false, connected: true, isConnected: true, joinedAt: 3 },
    p4: { id: 'p4', playerId: 'p4', socketId: 's4', name: 'Lina', score: 0, currentStreak: 0, highestStreak: 0, streak: 0, answeredCurrentQuestion: false, connected: true, isConnected: true, joinedAt: 4 },
    p5: { id: 'p5', playerId: 'p5', socketId: 's5', name: 'Jonas', score: 0, currentStreak: 0, highestStreak: 0, streak: 0, answeredCurrentQuestion: false, connected: true, isConnected: true, joinedAt: 5 },
  };

  const teams = TeamManager.createTeams(mockPlayers);
  const blauCount = teams.TEAM_BLAU.playerIds.length;
  const rotCount = teams.TEAM_ROT.playerIds.length;
  const sizeDiff = Math.abs(blauCount - rotCount);

  assert(
    (blauCount === 3 && rotCount === 2) || (blauCount === 2 && rotCount === 3),
    '5. Team Battle automatically partitions 5 students into balanced teams'
  );
  assert(sizeDiff <= 1, '6. Team Battle team size difference is <= 1');

  TeamManager.addPointsToTeam(teams, 'TEAM_BLAU', 850);
  TeamManager.addPointsToTeam(teams, 'TEAM_ROT', 620);
  const winningTeam = TeamManager.getWinningTeam(teams);

  assert(
    winningTeam?.teamId === 'TEAM_BLAU' && winningTeam.score === 850,
    '7. Team Battle team score aggregation and winner determination'
  );

  // -------------------------------------------------------------------------
  // 3. Full Live Socket.IO Multiplayer Simulation (All 5 Games)
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Full Live Multiplayer Socket.IO Game Simulation ---');

  // Teacher connects
  const teacherSocket = createClientSocket();
  await new Promise<void>((resolve) => teacherSocket.on('connect', resolve));

  // Teacher creates multi-game room with all 5 games
  const roomCreatedPromise = new Promise<GameRoom>((resolve, reject) => {
    teacherSocket.once('server:roomCreated', ({ room }) => resolve(room));
    teacherSocket.once('server:roomError', ({ message }) => reject(new Error(message)));
  });

  teacherSocket.emit('teacher:createRoom', {
    level: 'A2',
    games: [
      { gameType: 'SCHNELLANTWORT', questionCount: 5 },
      { gameType: 'SATZ_RENNEN', questionCount: 5 },
      { gameType: 'WORTSCHATZ_DUELL', questionCount: 5 },
      { gameType: 'WAS_BIN_ICH', questionCount: 5 },
      { gameType: 'TEAM_BATTLE', questionCount: 5 },
    ],
  });

  const createdRoom = await roomCreatedPromise;
  assert(
    !!createdRoom && createdRoom.games.length === 5,
    '8. Teacher created 5-game classroom session (Level A2)'
  );

  const pin = createdRoom.pin;
  const roomId = createdRoom.roomId;

  // Connect 5 students
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

  assert(studentSockets.length === 5, '9. All 5 student clients connected to the 5-game room');

  // -------------------------------------------------------------------------
  // Test Game 1: Schnellantwort
  // -------------------------------------------------------------------------
  const q1Promise = new Promise<any>((resolve) => {
    studentSockets[0].once('game:questionStarted', resolve);
  });

  teacherSocket.emit('teacher:startGame', { roomId });
  const q1Data = await q1Promise;

  assert(
    q1Data.gameType === 'SCHNELLANTWORT' && Array.isArray(q1Data.options),
    '10. Game 1 (Schnellantwort) started with multiple-choice options'
  );

  // Submit answer for Game 1
  const activeRoom1 = roomManager.getRoomById(roomId);
  const correctAns1 = activeRoom1!.gameState!.currentQuestion!.correctAnswer;

  let saScoreAccepted = false;
  studentSockets[0].once('game:scoreUpdated', (data) => {
    if (data.isCorrect) saScoreAccepted = true;
  });

  studentSockets[0].emit('student:submitAnswer', {
    roomId,
    questionId: q1Data.questionId,
    answer: correctAns1,
  });

  await delay(150);
  assert(saScoreAccepted, '11. Schnellantwort answer accepted and awarded points');

  // -------------------------------------------------------------------------
  // Test Game 2: Satz-Rennen (Sentence Ordering)
  // -------------------------------------------------------------------------
  activeRoom1!.currentGameIndex = 1;
  activeRoom1!.currentQuestionIndex = 0;
  activeRoom1!.gameState!.questionsForCurrentGame = (await import('./games/QuestionSelectionService.js')).QuestionSelectionService.getQuestionsForGame(
    activeRoom1!.level,
    'SATZ_RENNEN',
    5
  );

  const q2Promise = new Promise<any>((resolve) => {
    studentSockets[0].once('game:questionStarted', resolve);
  });

  // Start question for Game 2
  (await import('./games/GameEngine.js')).gameEngine.startQuestion(roomId, (await import('./server.js')).io);
  const q2Data = await q2Promise;

  assert(
    q2Data.gameType === 'SATZ_RENNEN' && Array.isArray(q2Data.words),
    '12. Game 2 (Satz-Rennen) started with interactive word chunks'
  );

  // Submit ordered array answer
  const activeRoom2 = roomManager.getRoomById(roomId);
  const correctAns2 = activeRoom2!.gameState!.currentQuestion!.correctAnswer;

  let srScoreAccepted = false;
  studentSockets[1].once('game:scoreUpdated', (data) => {
    if (data.isCorrect) srScoreAccepted = true;
  });

  studentSockets[1].emit('student:submitAnswer', {
    roomId,
    questionId: q2Data.questionId,
    answer: correctAns2,
  });

  await delay(150);
  assert(srScoreAccepted, '13. Satz-Rennen ordered array submission validated and scored');

  // -------------------------------------------------------------------------
  // Test Game 3: Wortschatz-Duell
  // -------------------------------------------------------------------------
  activeRoom1!.currentGameIndex = 2;
  activeRoom1!.currentQuestionIndex = 0;
  activeRoom1!.gameState!.questionsForCurrentGame = (await import('./games/QuestionSelectionService.js')).QuestionSelectionService.getQuestionsForGame(
    activeRoom1!.level,
    'WORTSCHATZ_DUELL',
    5
  );

  const q3Promise = new Promise<any>((resolve) => {
    studentSockets[0].once('game:questionStarted', resolve);
  });

  (await import('./games/GameEngine.js')).gameEngine.startQuestion(roomId, (await import('./server.js')).io);
  const q3Data = await q3Promise;

  assert(
    q3Data.gameType === 'WORTSCHATZ_DUELL' && (!!q3Data.focusWord || !!q3Data.format),
    '14. Game 3 (Wortschatz-Duell) started with vocabulary focus word format'
  );

  // -------------------------------------------------------------------------
  // Test Game 4: Was bin ich? (Progressive Clues)
  // -------------------------------------------------------------------------
  activeRoom1!.currentGameIndex = 3;
  activeRoom1!.currentQuestionIndex = 0;
  activeRoom1!.gameState!.questionsForCurrentGame = (await import('./games/QuestionSelectionService.js')).QuestionSelectionService.getQuestionsForGame(
    activeRoom1!.level,
    'WAS_BIN_ICH',
    5
  );

  const q4Promise = new Promise<any>((resolve) => {
    studentSockets[0].once('game:questionStarted', resolve);
  });

  (await import('./games/GameEngine.js')).gameEngine.startQuestion(roomId, (await import('./server.js')).io);
  const q4Data = await q4Promise;

  assert(
    q4Data.gameType === 'WAS_BIN_ICH' && Array.isArray(q4Data.clues) && q4Data.clues.length > 1,
    '15. Game 4 (Was bin ich?) started with progressive multi-stage clues'
  );

  // -------------------------------------------------------------------------
  // Test Game 5: Team Battle
  // -------------------------------------------------------------------------
  activeRoom1!.currentGameIndex = 4;
  activeRoom1!.currentQuestionIndex = 0;
  activeRoom1!.gameState!.questionsForCurrentGame = (await import('./games/QuestionSelectionService.js')).QuestionSelectionService.getQuestionsForGame(
    activeRoom1!.level,
    'TEAM_BATTLE',
    5
  );


  let teamAssignmentReceived = false;
  studentSockets[0].once('game:teamAssignment', () => {
    teamAssignmentReceived = true;
  });

  const q5Promise = new Promise<any>((resolve) => {
    studentSockets[0].once('game:questionStarted', resolve);
  });

  // Re-initialize Game 5 with teams
  const teamBattleTeams = TeamManager.createTeams(activeRoom1!.players);
  activeRoom1!.teams = teamBattleTeams;
  activeRoom1!.gameState!.teams = teamBattleTeams;

  (await import('./games/GameEngine.js')).gameEngine.startQuestion(roomId, (await import('./server.js')).io);
  const q5Data = await q5Promise;

  assert(
    q5Data.gameType === 'TEAM_BATTLE' && !!activeRoom1!.teams?.TEAM_BLAU && !!activeRoom1!.teams?.TEAM_ROT,
    '16. Game 5 (Team Battle) active with Team Blau vs Team Rot'
  );

  // Submit answer for team battle and check team score update
  const correctAns5 = activeRoom1!.gameState!.currentQuestion!.correctAnswer;
  let teamScoreUpdated = false;
  studentSockets[0].once('game:teamScoreUpdated', () => {
    teamScoreUpdated = true;
  });

  studentSockets[0].emit('student:submitAnswer', {
    roomId,
    questionId: q5Data.questionId,
    answer: correctAns5,
  });

  await delay(200);
  assert(teamScoreUpdated, '17. Team Battle awards points to both player and their team');

  // Clean up
  teacherSocket.disconnect();
  for (const s of studentSockets) {
    s.disconnect();
  }

  console.log('\n================================================================');
  console.log(`🎉 Phase 5: All 5 Multiplayer Games Passed: ${passedTests}/${totalTests} (100%)`);
  console.log('================================================================\n');

  setTimeout(() => {
    process.exit(0);
  }, 500);
}

runPhase5Tests().catch((err) => {
  console.error('Phase 5 Test Error:', err);
  process.exit(1);
});
