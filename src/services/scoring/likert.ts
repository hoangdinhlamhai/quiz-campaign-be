import type { Question, Answer } from '@/db/schema';
import type { AnswerInput, LikertResult } from '@/types';

interface LikertOpts {
  scaleMin: number;
  scaleMax: number;
}

export function scoreLikert(
  questions: Question[],
  userAnswers: AnswerInput[],
  opts: LikertOpts,
): LikertResult {
  const questionMap = new Map(questions.map((q) => [q.id, q]));
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};
  const maxPerItem = opts.scaleMax;

  for (const ua of userAnswers) {
    if (ua.scaleValue == null) continue;
    const q = questionMap.get(ua.questionId);
    if (!q) continue;

    let v = ua.scaleValue;
    if (q.isReverseScored) {
      v = opts.scaleMax + opts.scaleMin - v;
    }

    const key = q.dimensionKey ?? 'TOTAL';
    sums[key] = (sums[key] ?? 0) + v;
    counts[key] = (counts[key] ?? 0) + 1;
  }

  const dimensions: LikertResult['dimensions'] = {};

  for (const key of Object.keys(sums)) {
    const raw = sums[key];
    const max = counts[key] * maxPerItem;
    const percent = max > 0 ? Math.round((raw / max) * 100) : 0;
    const level = percent >= 70 ? 'Cao' : percent >= 40 ? 'Trung bình' : 'Thấp';
    dimensions[key] = { raw, max, percent, level };
  }

  return { kind: 'LIKERT', dimensions };
}
