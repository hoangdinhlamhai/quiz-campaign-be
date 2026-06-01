import type { Question } from '@/db/schema';
import type { AnswerInput, BigFiveResult } from '@/types';
import { scoreLikert } from './likert';

const BIG_FIVE_DIMS = ['O', 'C', 'E', 'A', 'N'] as const;

export function scoreBigFive(
  questions: Question[],
  userAnswers: AnswerInput[],
  scaleMin: number,
  scaleMax: number,
): BigFiveResult {
  const likert = scoreLikert(questions, userAnswers, { scaleMin, scaleMax });

  const dimensions = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  for (const dim of BIG_FIVE_DIMS) {
    dimensions[dim] = likert.dimensions[dim]?.percent ?? 0;
  }

  return { kind: 'BIG_FIVE', dimensions };
}
