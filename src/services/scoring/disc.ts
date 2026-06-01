import type { Answer } from '@/db/schema';
import type { AnswerInput, DiscResult } from '@/types';

type DiscPole = 'D' | 'I' | 'S' | 'C';

export function scoreDisc(
  answers: Answer[],
  userAnswers: AnswerInput[],
): DiscResult {
  const answerMap = new Map(answers.map((a) => [a.id, a]));

  const counts: DiscResult['counts'] = { D: 0, I: 0, S: 0, C: 0 };

  for (const ua of userAnswers) {
    if (!ua.answerId) continue;
    const answer = answerMap.get(ua.answerId);
    if (!answer?.dimensionPole) continue;
    const pole = answer.dimensionPole.trim() as DiscPole;
    if (pole in counts) {
      counts[pole]++;
    }
  }

  const dominant = (Object.entries(counts) as [DiscPole, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  return { kind: 'DISC', dominant, counts };
}
