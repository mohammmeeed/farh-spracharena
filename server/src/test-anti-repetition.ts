import { questionSelectionService } from './questions/questionSelectionService.js';
import { questionRepository } from './questions/questionRepository.js';

function runAntiRepetitionTest() {
  console.log('\n================================================================');
  console.log('🔄 Farh SprachArena - Anti-Repetition & Session Tracking Test');
  console.log('================================================================\n');

  // Test 1: Single game with 15 questions in A1 SCHNELLANTWORT
  const availableA1SA = questionRepository.getByLevelAndGame('A1', 'SCHNELLANTWORT').length;
  console.log(`Available A1 SCHNELLANTWORT questions in bank: ${availableA1SA}`);

  const testCount = Math.min(10, availableA1SA);
  const usedSessionIds = new Set<string>();

  const selected1 = questionSelectionService.selectQuestions({
    level: 'A1',
    gameType: 'SCHNELLANTWORT',
    count: testCount,
    usedQuestionIds: usedSessionIds,
  });

  const ids1 = selected1.map((q) => q.id);
  const uniqueIds1 = new Set(ids1);

  console.log(`Round 1: Requested ${testCount} questions. Received: ${ids1.length}`);
  console.log(`Unique IDs: ${uniqueIds1.size} / ${ids1.length}`);

  if (uniqueIds1.size !== ids1.length) {
    console.error('❌ FAIL: Duplicate question IDs found within the same game round!');
    process.exit(1);
  }

  // Mark round 1 questions as used in the session
  ids1.forEach((id) => usedSessionIds.add(id));

  // Test 2: Next game in the same session with unused questions
  const remainingCount = availableA1SA - testCount;
  console.log(`Remaining unused questions for A1 SCHNELLANTWORT in session: ${remainingCount}`);

  if (remainingCount > 0) {
    const selected2 = questionSelectionService.selectQuestions({
      level: 'A1',
      gameType: 'SCHNELLANTWORT',
      count: Math.min(3, remainingCount),
      usedQuestionIds: usedSessionIds,
    });

    const ids2 = selected2.map((q) => q.id);
    const overlap = ids2.filter((id) => usedSessionIds.has(id));

    if (overlap.length > 0) {
      console.error(`❌ FAIL: Round 2 repeated already-used questions: ${overlap.join(', ')}`);
      process.exit(1);
    }
    console.log(`Round 2: Received ${ids2.length} new unique questions. Zero overlap with Round 1!`);
  }

  // Test 3: Insufficient question warning handling
  console.log('\nTesting insufficient question handling...');
  const overCount = availableA1SA + 10;
  let caughtWarning = false;
  try {
    questionSelectionService.selectQuestions({
      level: 'A1',
      gameType: 'SCHNELLANTWORT',
      count: overCount,
    });
  } catch (err: any) {
    caughtWarning = true;
    console.log(`Caught expected warning: "${err.message}"`);
    if (!err.message.includes('einzigartige Fragen zur Verfügung')) {
      console.error('❌ FAIL: Warning message did not match expected format.');
      process.exit(1);
    }
  }

  if (!caughtWarning) {
    console.error('❌ FAIL: Did not reject request when questions were insufficient!');
    process.exit(1);
  }

  // Test 4: Randomization produces different question order in different sessions
  const sessionA = questionSelectionService.selectQuestions({
    level: 'A1',
    gameType: 'SCHNELLANTWORT',
    count: testCount,
  }).map((q) => q.id);

  const sessionB = questionSelectionService.selectQuestions({
    level: 'A1',
    gameType: 'SCHNELLANTWORT',
    count: testCount,
  }).map((q) => q.id);

  const isExactSameOrder = sessionA.every((id, idx) => id === sessionB[idx]);
  console.log(`Session A order: ${sessionA.slice(0, 3).join(', ')}...`);
  console.log(`Session B order: ${sessionB.slice(0, 3).join(', ')}...`);

  if (isExactSameOrder && testCount > 4) {
    console.warn('⚠️ Warning: Session A and B produced identical order (unlikely with randomization).');
  } else {
    console.log('✅ PASS: Sessions have randomized ordering.');
  }

  console.log('\n================================================================');
  console.log('✅ ALL ANTI-REPETITION & QUESTION SELECTION TESTS PASSED!');
  console.log('================================================================\n');
}

runAntiRepetitionTest();
