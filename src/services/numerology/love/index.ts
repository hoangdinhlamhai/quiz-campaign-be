import type { LoveLookupInput, LoveResult } from '@/types';
import { buildNumbers, hashSeed, dayOfYear } from './core';
import { buildRomantic } from './romantic';
import { buildAffinity } from './affinity';

export function calculateLove(input: LoveLookupInput): LoveResult {
  const variant = input.variant ?? 'LOVE';
  const p1 = buildNumbers(input.person1.name, input.person1.birthDate);
  const p2 = buildNumbers(input.person2.name, input.person2.birthDate);

  // textSeed có yếu tố ngày → câu chữ xoay vòng theo ngày.
  // % và con số KHÔNG dùng seed này → tất định theo cặp.
  const base = hashSeed(
    `${input.person1.name}${input.person1.birthDate}${input.person2.name}${input.person2.birthDate}${variant}`,
  );
  const textSeed = base + dayOfYear(new Date());

  return variant === 'AFFINITY'
    ? buildAffinity(input, p1, p2, textSeed)
    : buildRomantic(input, p1, p2, textSeed);
}
