import { QuestionSelectionService } from './questions/questionSelectionService.js';
import { questionRepository } from './questions/questionRepository.js';
import { Question } from './types/game.types.js';

function runDistributionTest() {
  console.log('\n================================================================');
  console.log('🎲 Farh SprachArena - Correct Answer Position Distribution Test');
  console.log('================================================================\n');

  const questions = questionRepository.getAll().filter(
    (q) =>
      q.options &&
      q.options.length === 4 &&
      typeof q.correctAnswer === 'string' &&
      q.gameType !== 'SATZ_RENNEN'
  );

  if (questions.length === 0) {
    console.error('❌ No suitable multiple choice questions with 4 options found.');
    process.exit(1);
  }

  const SAMPLE_SIZE = 1000;
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  const optionLetters = ['A', 'B', 'C', 'D'];

  console.log(`Running simulation of ${SAMPLE_SIZE} randomized questions...\n`);

  for (let i = 0; i < SAMPLE_SIZE; i++) {
    const rawQ = questions[i % questions.length];
    const runtimeQ: Question = {
      id: rawQ.id,
      level: rawQ.level,
      gameType: rawQ.gameType,
      format: rawQ.type,
      category: rawQ.category,
      difficulty: rawQ.difficulty,
      text: rawQ.question,
      prompt: rawQ.question,
      options: [...(rawQ.options || [])],
      correctAnswer: rawQ.correctAnswer,
      timeLimit: rawQ.timeLimit,
      timeLimitSeconds: rawQ.timeLimit,
    };

    const shuffled = QuestionSelectionService.shuffleAnswers(runtimeQ);

    const correctIndex = (shuffled.options || []).findIndex(
      (opt) => opt.trim().toLowerCase() === (shuffled.correctAnswer as string).trim().toLowerCase()
    );

    if (correctIndex >= 0 && correctIndex < 4) {
      const letter = optionLetters[correctIndex] as 'A' | 'B' | 'C' | 'D';
      counts[letter]++;
    }
  }

  const pA = ((counts.A / SAMPLE_SIZE) * 100).toFixed(1);
  const pB = ((counts.B / SAMPLE_SIZE) * 100).toFixed(1);
  const pC = ((counts.C / SAMPLE_SIZE) * 100).toFixed(1);
  const pD = ((counts.D / SAMPLE_SIZE) * 100).toFixed(1);

  console.log('📊 Resulting Distribution across 1000 trials:');
  console.log('------------------------------------------------');
  console.log(`  Position A: ${counts.A.toString().padStart(4)} (${pA}%)`);
  console.log(`  Position B: ${counts.B.toString().padStart(4)} (${pB}%)`);
  console.log(`  Position C: ${counts.C.toString().padStart(4)} (${pC}%)`);
  console.log(`  Position D: ${counts.D.toString().padStart(4)} (${pD}%)`);
  console.log('------------------------------------------------\n');

  // Check that each position has between 18% and 32% (approximate 25% uniform distribution)
  const isBalanced =
    counts.A >= 180 && counts.A <= 320 &&
    counts.B >= 180 && counts.B <= 320 &&
    counts.C >= 180 && counts.C <= 320 &&
    counts.D >= 180 && counts.D <= 320;

  if (isBalanced) {
    console.log('✅ PASS: Answer positions are uniformly distributed without bias towards option A!\n');
  } else {
    console.error('❌ FAIL: Significant position bias detected.');
    process.exit(1);
  }
}

runDistributionTest();
