import { questionRepository } from './questionRepository.js';
import { QuestionValidator } from './questionValidator.js';

function runCliValidation() {
  console.log('\n================================================================');
  console.log('🔍 Farh SprachArena - Question Bank Validation CLI');
  console.log('================================================================\n');

  const questions = questionRepository.getAll();
  const res = QuestionValidator.validateAllQuestions(questions);

  console.log(`📊 Question Bank Summary:`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Total questions:   ${res.totalQuestions}`);
  console.log(`A1 questions:      ${res.byLevel.A1}`);
  console.log(`A2 questions:      ${res.byLevel.A2}`);
  console.log(`B1 questions:      ${res.byLevel.B1}`);
  console.log(`B2 questions:      ${res.byLevel.B2}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Game Breakdown:`);
  console.log(`  ⚡ Schnellantwort:    ${res.byGame.SCHNELLANTWORT}`);
  console.log(`  🧩 Satz-Rennen:       ${res.byGame.SATZ_RENNEN}`);
  console.log(`  🧠 Wortschatz-Duell:  ${res.byGame.WORTSCHATZ_DUELL}`);
  console.log(`  🕵️ Was bin ich?:      ${res.byGame.WAS_BIN_ICH}`);
  console.log(`  ⚔️ Team Battle:       ${res.byGame.TEAM_BATTLE}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Difficulty Breakdown:`);
  console.log(`  🟢 EASY:              ${res.byDifficulty.EASY}`);
  console.log(`  🟡 MEDIUM:            ${res.byDifficulty.MEDIUM}`);
  console.log(`  🔴 HARD:              ${res.byDifficulty.HARD}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`Duplicates:        ${res.duplicateIds.length}`);
  console.log(`Invalid questions: ${res.errors.length}`);
  console.log(`Warnings:          ${res.warnings.length}`);
  console.log(`================================================================\n`);

  if (res.errors.length > 0) {
    console.error('❌ Validation Errors:');
    res.errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
    console.log('\n');
    process.exit(1);
  }

  if (res.warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    res.warnings.forEach((warn, i) => console.warn(`  ${i + 1}. ${warn}`));
    console.log('\n');
  }

  console.log('✅ All questions verified successfully! Question bank is ready for production.\n');
}

runCliValidation();
