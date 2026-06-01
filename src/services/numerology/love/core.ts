import { computeCoreNumbers, hashSeed, dayOfYear, rotate } from '../calc';
import type { LovePersonNumbers } from '@/types';

export function buildNumbers(name: string, birthDate: string): LovePersonNumbers {
  const c = computeCoreNumbers(name, birthDate);
  return {
    lifePath: c.lifePath,
    destiny: c.destiny,
    soul: c.soul,
    personality: c.personality,
    maturity: c.maturity,
    balance: c.balance,
  };
}

// ── Helpers ──
export function diff(a: number, b: number): number {
  return Math.abs(a - b);
}

export function matchLevel(d: number): 'high' | 'medium' | 'low' {
  if (d <= 2) return 'high';
  if (d <= 5) return 'medium';
  return 'low';
}

// re-export shared core để love/index.ts + text-pools.ts giữ import từ './core'
export { hashSeed, dayOfYear, rotate };

// ── Trọng số chấm điểm: LOVE vs AFFINITY nhấn các con số khác nhau ──
// Lưu ý: `balance` (số thứ 6) cố ý KHÔNG tham gia chấm % — chỉ dùng để vẽ dimensions.
export interface ScoreWeights {
  lifePath: number;
  destiny: number;
  soul: number;
  personality: number;
  maturity: number;
}

// % tất định theo cặp — KHÔNG dùng seed thời gian.
// Công thức phân hóa mạnh: mỗi con số đóng góp theo độ gần + trọng số variant.
export function computePercent(
  p1: LovePersonNumbers,
  p2: LovePersonNumbers,
  weights: ScoreWeights,
): number {
  const keys: (keyof ScoreWeights)[] = ['lifePath', 'destiny', 'soul', 'personality', 'maturity'];
  let score = 0;
  let totalWeight = 0;

  for (const key of keys) {
    const w = weights[key];
    totalWeight += w;
    const d = diff(p1[key], p2[key]);
    // closeness 0..1: cùng số = 1, lệch 9 = ~0
    const closeness = Math.max(0, 1 - d / 9);
    score += w * closeness;
  }

  // base 52..96 — trải rộng để các cặp phân hóa rõ
  const normalized = totalWeight > 0 ? score / totalWeight : 0.5;
  const percent = 52 + Math.round(normalized * 44);
  return Math.min(98, Math.max(50, percent));
}
