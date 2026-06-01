export const LETTER_VALUES: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const MASTER_NUMBERS = new Set([11, 22, 33]);
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

export function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
}

export function reduceNumber(value: number): number {
  let current = value;
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = String(current)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return current;
}

export function calculateLifePath(birthDate: string): number {
  const digits = birthDate.replace(/\D/g, '');
  const total = digits.split('').reduce((sum, d) => sum + Number(d), 0);
  return reduceNumber(total);
}

export function calculateNameNumber(
  name: string,
  mode: 'all' | 'vowels' | 'consonants',
): number {
  const normalized = normalizeName(name);
  let total = 0;

  for (const ch of normalized) {
    const value = LETTER_VALUES[ch];
    if (!value) continue;
    if (mode === 'vowels' && !VOWELS.has(ch)) continue;
    if (mode === 'consonants' && VOWELS.has(ch)) continue;
    total += value;
  }

  return reduceNumber(total);
}

export function calculateNumerology(name: string, birthDate: string) {
  return {
    lifePath: calculateLifePath(birthDate),
    destiny: calculateNameNumber(name, 'all'),
    soul: calculateNameNumber(name, 'vowels'),
    personality: calculateNameNumber(name, 'consonants'),
  };
}

export function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ============================================
// SHARED CORE — nguồn DUY NHẤT cho mọi trang numerology.
// Trước đây bị copy ở love/core.ts + profile.ts → gom về đây.
// ============================================

const KARMIC_DEBTS = new Set([13, 14, 16, 19]);

export function calcMaturity(lifePath: number, destiny: number): number {
  return reduceNumber(lifePath + destiny);
}

export function calcBalance(name: string): number {
  const parts = normalizeName(name).split(/\s+/).filter(Boolean);
  const sum = parts.reduce((s, p) => s + (p.charCodeAt(0) - 96), 0);
  return reduceNumber(sum);
}

export function calcAttitude(birthDate: string): number {
  const [, m, d] = birthDate.split('-').map(Number);
  return reduceNumber((m || 0) + (d || 0));
}

// Phát hiện Số Nợ Nghiệp (13/14/16/19) trong tổng TRƯỚC khi reduce
export function detectKarmicDebt(rawSum: number): number | null {
  return KARMIC_DEBTS.has(rawSum) ? rawSum : null;
}

// Reduce + bắt Số Nợ Nghiệp xuất hiện ở BẤT KỲ bước hai-chữ-số nào trong quá trình
// rút gọn (vd 49→13→4 ⇒ karmic 13). Tên dài tổng lớn nên phải duyệt từng bước,
// không chỉ kiểm tổng thô.
export function reduceWithKarmic(value: number): { value: number; karmic: number | null } {
  let current = value;
  let karmic: number | null = null;
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    if (KARMIC_DEBTS.has(current)) karmic = current;
    current = String(current)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return { value: current, karmic };
}

// Ngày thứ mấy trong năm (1-366) — dùng để xoay vòng nội dung theo ngày
export function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((now - start) / 86_400_000);
}

// Chọn 1 phần tử trong pool theo seed (tất định theo seed)
export function rotate<T>(pool: T[], seed: number): T {
  return pool[Math.abs(seed) % pool.length];
}

// 7 con số cốt lõi — mọi trang (love, profile, naming) dùng chung
export interface CoreNumbers {
  lifePath: number;
  destiny: number;
  soul: number;
  personality: number;
  maturity: number;
  balance: number;
  attitude: number;
}

export function computeCoreNumbers(name: string, birthDate: string): CoreNumbers {
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateNameNumber(name, 'all');
  return {
    lifePath,
    destiny,
    soul: calculateNameNumber(name, 'vowels'),
    personality: calculateNameNumber(name, 'consonants'),
    maturity: calcMaturity(lifePath, destiny),
    balance: calcBalance(name),
    attitude: calcAttitude(birthDate),
  };
}
