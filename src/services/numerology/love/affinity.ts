import type { LoveLookupInput, LoveResult, LoveSection, LovePersonNumbers, LoveTimelineStage } from '@/types';
import { computePercent, diff, type ScoreWeights } from './core';
import { getHeadline, getSummary, getAdvice } from './text-pools';
import { buildPairInterpretations } from './pair-interpretations';
import { buildDimensions, buildRadarAxes, buildComparison } from './sections';

// AFFINITY nhấn Số Chủ Đạo (đường đời) + Số Sứ Mệnh + Số Trưởng Thành (đường dài)
const AFFINITY_WEIGHTS: ScoreWeights = {
  lifePath: 4,
  destiny: 4,
  soul: 2,
  personality: 1,
  maturity: 3,
};

function buildTimeline(percent: number): LoveTimelineStage[] {
  const good = percent >= 75;
  const mid = percent >= 62;
  return [
    {
      phase: 'Giai đoạn đầu',
      ageRange: 'Năm 1-2',
      tone: 'good',
      description: 'Giai đoạn tìm hiểu đầy hứng khởi, hai bạn khám phá và bị thu hút bởi nhau.',
    },
    {
      phase: 'Gắn kết',
      ageRange: 'Năm 3-5',
      tone: good ? 'good' : 'neutral',
      description: good
        ? 'Tình cảm chín muồi, sự gắn kết trở nên sâu sắc và bền vững.'
        : 'Giai đoạn cần điều chỉnh kỳ vọng, học cách chấp nhận khác biệt của nhau.',
    },
    {
      phase: 'Thử thách',
      ageRange: 'Năm 6-9',
      tone: mid ? 'neutral' : 'watch',
      description: mid
        ? 'Những thử thách xuất hiện nhưng hai bạn đủ vững để cùng nhau vượt qua.'
        : 'Giai đoạn nhạy cảm, cần nỗ lực giao tiếp để duyên không phai nhạt.',
    },
    {
      phase: 'Bền lâu',
      ageRange: 'Năm 10+',
      tone: good ? 'good' : 'neutral',
      description: good
        ? 'Mối duyên đạt đến sự an yên, hai bạn là điểm tựa vững chắc của nhau.'
        : 'Nếu vượt qua được các giai đoạn trước, hai bạn sẽ tìm thấy sự ổn định lâu dài.',
    },
  ];
}

function buildStrengthsWeaknesses(p1: LovePersonNumbers, p2: LovePersonNumbers) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  if (diff(p1.lifePath, p2.lifePath) <= 2) strengths.push('Cùng hướng đi trong cuộc đời, dễ đồng hành dài lâu.');
  else weaknesses.push('Mục tiêu cuộc sống khác nhau, cần dung hòa định hướng chung.');
  if (diff(p1.destiny, p2.destiny) <= 3) strengths.push('Sứ mệnh tương đồng, hỗ trợ nhau phát triển.');
  else weaknesses.push('Con đường sứ mệnh khác biệt, cần tôn trọng lựa chọn của nhau.');
  if (diff(p1.maturity, p2.maturity) <= 2) strengths.push('Cùng độ chín về tinh thần, thấu hiểu nhau khi trưởng thành.');
  else weaknesses.push('Tốc độ trưởng thành lệch nhau, cần kiên nhẫn chờ đợi.');
  if (strengths.length === 0) strengths.push('Sự khác biệt tạo cơ hội bổ sung và học hỏi lẫn nhau.');
  if (weaknesses.length === 0) weaknesses.push('Cần tránh sự nhàm chán khi quá giống nhau.');
  return { strengths, weaknesses };
}

export function buildAffinity(
  input: LoveLookupInput,
  p1: LovePersonNumbers,
  p2: LovePersonNumbers,
  textSeed: number,
): LoveResult {
  const percent = computePercent(p1, p2, AFFINITY_WEIGHTS);
  const headline = getHeadline('AFFINITY', percent, textSeed);
  const summary = getSummary('AFFINITY', percent, textSeed);

  const dims = buildDimensions(p1, p2);
  const comparison = buildComparison(p1, p2);
  const sw = buildStrengthsWeaknesses(p1, p2);

  const pairs = buildPairInterpretations([
    { label: 'Số Chủ Đạo', a: p1.lifePath, b: p2.lifePath },
    { label: 'Số Sứ Mệnh', a: p1.destiny, b: p2.destiny },
    { label: 'Số Trưởng Thành', a: p1.maturity, b: p2.maturity },
  ]);

  const longevityScore = Math.min(98, Math.round((percent + (9 - diff(p1.maturity, p2.maturity)) * 4) / 2 + 20));

  const sections: LoveSection[] = [
    { type: 'gauge', percent, headline, summary },
    {
      type: 'longevity',
      score: longevityScore,
      horizon: 'Dài hạn (10+ năm)',
      description: 'Chỉ số bền vững phản ánh khả năng đồng hành lâu dài dựa trên Số Chủ Đạo và Số Trưởng Thành.',
    },
    { type: 'dimensions', rows: dims },
    { type: 'radar', axes: buildRadarAxes(dims) },
    { type: 'pairTable', rows: comparison },
    { type: 'pairInterpretation', items: pairs },
    { type: 'timeline', stages: buildTimeline(percent) },
    { type: 'strengthsWeaknesses', strengths: sw.strengths, weaknesses: sw.weaknesses },
    { type: 'advice', title: 'Lời khuyên giữ duyên', points: getAdvice('AFFINITY', textSeed) },
    {
      type: 'explorePerson',
      people: [
        { name: input.person1.name, birth: input.person1.birthDate },
        { name: input.person2.name, birth: input.person2.birthDate },
      ],
    },
  ];

  return {
    kind: 'LOVE',
    variant: 'AFFINITY',
    percent,
    headline,
    summary,
    person1Name: input.person1.name,
    person2Name: input.person2.name,
    person1Birth: input.person1.birthDate,
    person2Birth: input.person2.birthDate,
    numbers: { p1, p2 },
    sections,
  };
}
