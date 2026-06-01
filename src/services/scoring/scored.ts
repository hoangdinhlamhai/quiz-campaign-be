import type { Question, Answer } from '@/db/schema';
import type { AnswerInput, LikertResult, IqResult } from '@/types';
import { scoreLikert } from './likert';
import { scoreIq } from './iq';

export function scoreScored(
  questions: Question[],
  answers: Answer[],
  userAnswers: AnswerInput[],
  scaleMin: number | null,
  scaleMax: number | null,
  age?: number,
): LikertResult | IqResult {
  const hasLikert = userAnswers.some((ua) => ua.scaleValue != null);

  if (hasLikert && scaleMin != null && scaleMax != null) {
    return scoreLikert(questions, userAnswers, { scaleMin, scaleMax });
  }

  return scoreIq(answers, userAnswers, age);
}
