import type { Answer } from '@/db/schema';
import type { AnswerInput, MbtiResult } from '@/types';

type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export function scoreMbti(
  answers: Answer[],
  userAnswers: AnswerInput[],
): MbtiResult {
  const answerMap = new Map(answers.map((a) => [a.id, a]));

  const poles: MbtiResult['poles'] = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const ua of userAnswers) {
    if (!ua.answerId) continue;
    const answer = answerMap.get(ua.answerId);
    if (!answer?.dimensionPole) continue;
    const pole = answer.dimensionPole.trim() as Pole;
    if (pole in poles) {
      poles[pole]++;
    }
  }

  const type = [
    poles.E >= poles.I ? 'E' : 'I',
    poles.S >= poles.N ? 'S' : 'N',
    poles.T >= poles.F ? 'T' : 'F',
    poles.J >= poles.P ? 'J' : 'P',
  ].join('');

  return { kind: 'MBTI', type, poles };
}
