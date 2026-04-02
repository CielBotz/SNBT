import { Question } from '../types/quiz';
import { TPS_QUESTIONS } from './questions/tps';
import { LITERASI_ID_QUESTIONS } from './questions/literasi_id';
import { LITERASI_EN_QUESTIONS } from './questions/literasi_en';
import { MATEMATIKA_QUESTIONS } from './questions/matematika';
import { HOTS_QUESTIONS } from './questions/hots';
import { SNBT2025_QUESTIONS } from './questions/snbt2025';
import {
  SUBTEST_BLUEPRINTS,
  buildQuestionBankBySubtest,
  auditTryoutPackages,
  assessQuestionValidity,
} from './questionGovernance';

export const QUESTIONS: Question[] = [
  ...TPS_QUESTIONS,
  ...LITERASI_ID_QUESTIONS,
  ...LITERASI_EN_QUESTIONS,
  ...MATEMATIKA_QUESTIONS,
  ...HOTS_QUESTIONS,
  ...SNBT2025_QUESTIONS,
];

export const QUESTIONS_BY_SUBTEST = buildQuestionBankBySubtest(QUESTIONS);

export const QUESTION_VALIDITY = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, assessQuestionValidity(question)]),
);

export const TRYOUT_BLUEPRINT = SUBTEST_BLUEPRINTS;

export const TRYOUT_AUDIT = auditTryoutPackages(QUESTIONS);
