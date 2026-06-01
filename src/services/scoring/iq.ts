import type { Answer } from '@/db/schema';
import type { AnswerInput, IqResult } from '@/types';

// [ngưỡng tỉ lệ đúng, IQ gốc, nhãn]
const IQ_TABLE: [number, number, string][] = [
  [0.95, 140, 'Thiên tài'],
  [0.90, 130, 'Rất xuất sắc'],
  [0.80, 120, 'Xuất sắc'],
  [0.70, 110, 'Trên trung bình'],
  [0.50, 100, 'Trung bình'],
  [0.30, 90, 'Dưới trung bình'],
  [0.15, 80, 'Kém'],
  [0.00, 70, 'Rất kém'],
];

// Phân loại theo điểm IQ (dùng chung cho cả điểm gốc lẫn điểm đã chuẩn hóa)
const IQ_LABELS: [number, string][] = [
  [140, 'Thiên tài'],
  [130, 'Rất xuất sắc'],
  [120, 'Xuất sắc'],
  [110, 'Trên trung bình'],
  [100, 'Trung bình'],
  [90, 'Dưới trung bình'],
  [80, 'Kém'],
  [0, 'Rất kém'],
];

function classify(iq: number): string {
  for (const [threshold, label] of IQ_LABELS) {
    if (iq >= threshold) return label;
  }
  return 'Rất kém';
}

// Chuẩn hóa theo độ tuổi (deviation IQ): cùng số câu đúng, nhóm tuổi có chuẩn
// thấp hơn → IQ tương đối cao hơn. 18-29 là nhóm mốc tham chiếu.
function ageAdjustment(age?: number): number {
  if (!age || age < 1) return 0;
  if (age < 13) return 10;
  if (age <= 17) return 6;
  if (age <= 29) return 0;
  if (age <= 49) return 3;
  if (age <= 64) return 6;
  return 9;
}

export function scoreIq(
  answers: Answer[],
  userAnswers: AnswerInput[],
  age?: number,
): IqResult {
  const answerMap = new Map(answers.map((a) => [a.id, a]));

  let correct = 0;
  const total = userAnswers.length;

  for (const ua of userAnswers) {
    if (!ua.answerId) continue;
    const answer = answerMap.get(ua.answerId);
    if (answer?.isCorrect) correct++;
  }

  const ratio = total > 0 ? correct / total : 0;

  let baseIq = 70;
  for (const [threshold, score] of IQ_TABLE) {
    if (ratio >= threshold) {
      baseIq = score;
      break;
    }
  }

  const iqScore = Math.min(160, Math.max(40, baseIq + ageAdjustment(age)));

  return {
    kind: 'IQ',
    correct,
    total,
    iqScore,
    classification: classify(iqScore),
    age,
  };
}
