import type { Quiz, Question, Answer } from '@/db/schema';
import type { AnswerInput, ScoreResult } from '@/types';
import { scoreMbti } from './mbti';
import { scoreDisc } from './disc';
import { scoreLikert } from './likert';
import { scoreBigFive } from './big-five';
import { scoreMi } from './mi';
import { scoreIq } from './iq';
import { scoreScored } from './scored';

export function dispatch(
  quiz: Quiz,
  questions: Question[],
  answers: Answer[],
  userAnswers: AnswerInput[],
): ScoreResult {
  const { quizType, answerFormat, scaleMin, scaleMax } = quiz;

  switch (quizType) {
    case 'MBTI':
      return scoreMbti(answers, userAnswers);

    case 'DISC':
      return scoreDisc(answers, userAnswers);

    case 'MI_LIKERT': {
      const min = scaleMin ?? 1;
      const max = scaleMax ?? 5;

      if (answerFormat === 'LIKERT_SCALE') {
        const hasBigFive = questions.some((q) =>
          ['O', 'C', 'E', 'A', 'N'].includes(q.dimensionKey ?? ''),
        );
        if (hasBigFive) return scoreBigFive(questions, userAnswers, min, max);
        return scoreMi(questions, userAnswers, min, max);
      }

      return scoreLikert(questions, userAnswers, { scaleMin: min, scaleMax: max });
    }

    case 'SCORED': {
      if (answerFormat === 'LIKERT_SCALE') {
        return scoreLikert(questions, userAnswers, {
          scaleMin: scaleMin ?? 1,
          scaleMax: scaleMax ?? 5,
        });
      }
      return scoreScored(questions, answers, userAnswers, scaleMin, scaleMax);
    }

    default:
      return scoreIq(answers, userAnswers);
  }
}

export { scoreMbti } from './mbti';
export { scoreDisc } from './disc';
export { scoreLikert } from './likert';
export { scoreBigFive } from './big-five';
export { scoreMi } from './mi';
export { scoreIq } from './iq';
export { scoreScored } from './scored';
