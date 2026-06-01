import type { Question } from '@/db/schema';
import type { AnswerInput, MiResult } from '@/types';
import { scoreLikert } from './likert';

export function scoreMi(
  questions: Question[],
  userAnswers: AnswerInput[],
  scaleMin: number,
  scaleMax: number,
): MiResult {
  const likert = scoreLikert(questions, userAnswers, { scaleMin, scaleMax });

  const intelligences: Record<string, number> = {};
  for (const [key, dim] of Object.entries(likert.dimensions)) {
    intelligences[key] = dim.percent;
  }

  return { kind: 'MI', intelligences };
}
