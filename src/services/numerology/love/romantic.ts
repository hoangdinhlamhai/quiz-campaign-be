import type { LoveLookupInput, LoveResult, LoveSection, LovePersonNumbers } from '@/types';
import { computePercent, type ScoreWeights } from './core';
import { getHeadline, getSummary, getAdvice } from './text-pools';
import { buildPairInterpretations } from './pair-interpretations';
import { buildDimensions, buildRadarAxes, buildComparison, buildHighlights } from './sections';

// LOVE nhấn Số Linh Hồn (khao khát) + Số Thái Độ (sức hút thể hiện) + Chủ Đạo
const LOVE_WEIGHTS: ScoreWeights = {
  lifePath: 3,
  destiny: 2,
  soul: 4,
  personality: 4,
  maturity: 1,
};

const LOVE_LANGUAGES = [
  'Lời nói yêu thương',
  'Thời gian chất lượng',
  'Hành động chăm sóc',
  'Quà tặng ý nghĩa',
  'Cử chỉ âu yếm',
];

function loveLanguageFor(n: LovePersonNumbers): { label: string; description: string } {
  const idx = (n.soul + n.personality) % LOVE_LANGUAGES.length;
  const label = LOVE_LANGUAGES[idx];
  return {
    label,
    description: `Số Linh Hồn ${n.soul} cho thấy bạn cảm nhận tình yêu rõ nhất qua "${label.toLowerCase()}".`,
  };
}

export function buildRomantic(
  input: LoveLookupInput,
  p1: LovePersonNumbers,
  p2: LovePersonNumbers,
  textSeed: number,
): LoveResult {
  const percent = computePercent(p1, p2, LOVE_WEIGHTS);
  const headline = getHeadline('LOVE', percent, textSeed);
  const summary = getSummary('LOVE', percent, textSeed);

  const dims = buildDimensions(p1, p2);
  const comparison = buildComparison(p1, p2);
  const highlights = buildHighlights(dims);

  const pairs = buildPairInterpretations([
    { label: 'Số Linh Hồn', a: p1.soul, b: p2.soul },
    { label: 'Số Thái Độ', a: p1.personality, b: p2.personality },
    { label: 'Số Chủ Đạo', a: p1.lifePath, b: p2.lifePath },
  ]);

  const attractionFactors = [
    { label: 'Sức hút thể chất', value: Math.min(98, 50 + p1.personality * 2 + p2.personality) },
    { label: 'Đồng điệu cảm xúc', value: Math.min(98, 55 + (9 - Math.abs(p1.soul - p2.soul)) * 4) },
    { label: 'Chemistry trí tuệ', value: Math.min(98, 50 + (9 - Math.abs(p1.lifePath - p2.lifePath)) * 4) },
  ];
  const attractionScore = Math.round(attractionFactors.reduce((s, f) => s + f.value, 0) / attractionFactors.length);

  const sections: LoveSection[] = [
    { type: 'gauge', percent, headline, summary },
    { type: 'attractionMeter', score: attractionScore, factors: attractionFactors },
    { type: 'dimensions', rows: dims },
    { type: 'radar', axes: buildRadarAxes(dims) },
    { type: 'pairTable', rows: comparison },
    { type: 'pairInterpretation', items: pairs },
    {
      type: 'loveLanguages',
      items: [
        { person: 1 as const, ...loveLanguageFor(p1) },
        { person: 2 as const, ...loveLanguageFor(p2) },
      ],
    },
    { type: 'highlights', items: highlights },
    { type: 'advice', title: 'Lời khuyên cho tình yêu', points: getAdvice('LOVE', textSeed) },
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
    variant: 'LOVE',
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
