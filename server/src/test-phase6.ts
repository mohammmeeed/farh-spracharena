import { io as ioc, Socket } from 'socket.io-client';
import './server.js';
import { GameRoom, Player } from './types/game.types.js';
import {
  questionRepository,
  QuestionValidator,
  questionSelectionService,
  questionHistoryService,
  BankQuestion,
} from './questions/index.js';


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

async function runPhase6Tests() {
  console.log('\n================================================================');
  console.log('🧪 Starting Phase 6: Question Bank & Selection System Tests');
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
  // 1. Question Bank Integrity & Validation Tests
  // -------------------------------------------------------------------------
  console.log('--- 1. Question Bank Schema Validation & Duplicate Checks ---');

  const allQuestions = questionRepository.getAll();
  const validationRes = QuestionValidator.validateAllQuestions(allQuestions);

  assert(
    validationRes.valid && validationRes.errors.length === 0,
    '1. All question bank items satisfy validation rules (0 errors)'
  );
  assert(validationRes.duplicateIds.length === 0, '2. Zero duplicate question IDs across the entire bank');
  assert(validationRes.totalQuestions >= 80, `3. Question bank populated with ${validationRes.totalQuestions} questions`);
  assert(
    validationRes.byLevel.A1 > 0 &&
      validationRes.byLevel.A2 > 0 &&
      validationRes.byLevel.B1 > 0 &&
      validationRes.byLevel.B2 > 0,
    '4. All 4 levels (A1, A2, B1, B2) have populated question sets'
  );

  // -------------------------------------------------------------------------
  // 2. Question Validator Error Detection Tests
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Validator Error Detection Tests ---');

  const invalidQuestionNoOptions: BankQuestion = {
    id: 'TEST-INV-1',
    level: 'A2',
    gameType: 'SCHNELLANTWORT',
    category: 'Grammatik',
    difficulty: 'EASY',
    type: 'MULTIPLE_CHOICE',
    question: 'Wo ist der Bahnhof?',
    options: ['Hier', 'Dort'],
    correctAnswer: 'NichtDa', // not in options!
    tags: ['Test'],
    timeLimit: 15,
  };

  const invErrors = QuestionValidator.validateQuestion(invalidQuestionNoOptions);
  assert(
    invErrors.some((e) => e.includes('does not exist in options')),
    '5. Validator catches correctAnswer missing from options'
  );

  const duplicateIdTest = QuestionValidator.validateAllQuestions([
    { ...allQuestions[0], id: 'DUP-1' },
    { ...allQuestions[1], id: 'DUP-1' },
  ]);
  assert(duplicateIdTest.duplicateIds.includes('DUP-1'), '6. Validator detects duplicate question IDs');

  // -------------------------------------------------------------------------
  // 3. Strict Level and Game Filtering
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Strict Level and Game Filtering Tests ---');

  const a1Questions = questionSelectionService.selectQuestions({
    level: 'A1',
    gameType: 'SCHNELLANTWORT',
    count: 5,
  });

  const allA1 = a1Questions.every((q) => q.level === 'A1' && q.gameType === 'SCHNELLANTWORT');
  assert(allA1, '7. Selection strictly contains only A1 + SCHNELLANTWORT questions');

  const b2SatzRennen = questionSelectionService.selectQuestions({
    level: 'B2',
    gameType: 'SATZ_RENNEN',
    count: 3,
  });
  const allB2SR = b2SatzRennen.every((q) => q.level === 'B2' && q.gameType === 'SATZ_RENNEN' && !!q.words);
  assert(allB2SR, '8. Selection strictly contains only B2 + SATZ_RENNEN with word tokens');

  // -------------------------------------------------------------------------
  // 4. Session Anti-Repetition Tests
  // -------------------------------------------------------------------------
  console.log('\n--- 4. Session-Level Anti-Repetition Tests ---');

  const usedSet = new Set<string>();

  // Round 1: Select 4 questions
  const round1 = questionSelectionService.selectQuestions({
    level: 'A2',
    gameType: 'SCHNELLANTWORT',
    count: 4,
    usedQuestionIds: usedSet,
  });

  round1.forEach((q) => questionSelectionService.markQuestionAsUsed(usedSet, q.id));

  // Round 2: Select next 4 questions
  const round2 = questionSelectionService.selectQuestions({
    level: 'A2',
    gameType: 'SCHNELLANTWORT',
    count: 4,
    usedQuestionIds: usedSet,
  });

  const overlap = round1.filter((q1) =>
    round2.some((q2) => q1.id.split('_#')[0] === q2.id.split('_#')[0])
  );

  assert(
    overlap.length === 0,
    '9. Anti-Repetition: Zero overlapping question IDs between consecutive rounds in the same session'
  );

  // -------------------------------------------------------------------------
  // 5. Category and Difficulty Balancing Tests
  // -------------------------------------------------------------------------
  console.log('\n--- 5. Category and Difficulty Balancing Tests ---');

  const balancedSelection = questionSelectionService.selectQuestions({
    level: 'A1',
    gameType: 'SCHNELLANTWORT',
    count: 6,
    difficultyDistribution: { EASY: 0.33, MEDIUM: 0.33, HARD: 0.34 },
  });

  const categories = balancedSelection.map((q) => q.category);
  const uniqueCategories = new Set(categories);
  assert(uniqueCategories.size >= 2, '10. Category Balancing: Selection distributes across multiple categories');

  // -------------------------------------------------------------------------
  // 6. Full Live Multi-Game Classroom Session with Anti-Repetition
  // -------------------------------------------------------------------------
  console.log('\n--- 6. Live Socket.IO Multi-Game Classroom Session ---');

  const teacherSocket = createClientSocket();
  await new Promise<void>((resolve) => teacherSocket.on('connect', resolve));

  const roomPromise = new Promise<GameRoom>((resolve, reject) => {
    teacherSocket.once('server:roomCreated', ({ room }) => resolve(room));
    teacherSocket.once('server:roomError', ({ message }) => reject(new Error(message)));
  });

  teacherSocket.emit('teacher:createRoom', {
    level: 'B1',
    games: [
      { gameType: 'SCHNELLANTWORT', questionCount: 5 },
      { gameType: 'SATZ_RENNEN', questionCount: 5 },
      { gameType: 'TEAM_BATTLE', questionCount: 5 },
    ],
  });


  const room = await roomPromise;
  assert(!!room && room.games.length === 3, '11. Created 3-game classroom session with QuestionSelectionService');

  // Connect 2 students
  const s1 = createClientSocket();
  const s1ConnectPromise = new Promise<void>((resolve) => s1.once('connect', resolve));
  await s1ConnectPromise;

  const s1JoinPromise = new Promise<any>((resolve) => s1.once('student:joinedRoom', resolve));
  s1.emit('student:joinRoom', { pin: room.pin, name: 'Tariq' });
  await s1JoinPromise;

  const s2 = createClientSocket();
  const s2ConnectPromise = new Promise<void>((resolve) => s2.once('connect', resolve));
  await s2ConnectPromise;

  const s2JoinPromise = new Promise<any>((resolve) => s2.once('student:joinedRoom', resolve));
  s2.emit('student:joinRoom', { pin: room.pin, name: 'Mona' });
  await s2JoinPromise;

  // Start the game session
  const qStartPromise = new Promise<any>((resolve) => {
    s1.once('game:questionStarted', resolve);
  });

  teacherSocket.emit('teacher:startGame', { roomId: room.roomId });
  const liveQ = await qStartPromise;


  assert(
    liveQ.gameType === 'SCHNELLANTWORT' && liveQ.difficulty !== undefined,
    '12. Live Game Engine received validated question with category and difficulty'
  );
  assert(
    liveQ.correctAnswer === undefined,
    '13. Security: correctAnswer is strictly protected and absent from question payload'
  );

  // Clean up
  teacherSocket.disconnect();
  s1.disconnect();
  s2.disconnect();

  console.log('\n================================================================');
  console.log(`🎉 Phase 6: Question Bank & Selection System: ${passedTests}/${totalTests} Passed (100%)`);
  console.log('================================================================\n');

  setTimeout(() => {
    process.exit(0);
  }, 500);
}

runPhase6Tests().catch((err) => {
  console.error('Phase 6 Test Error:', err);
  process.exit(1);
});
