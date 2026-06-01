// Name Analysis — score + ngũ hành tên + tương sinh/khắc + combined Lo Shu + chỉ số
import type { NamingBirthOverview, NameAnalysis, NamingNumberRow, LoShuGrid } from '@/types';
import { computeCoreNumbers, reduceWithKarmic, normalizeName, LETTER_VALUES } from '../calc';
import { DIGIT_TO_HANH, soSanhNguHanh, moTaTuongQuan } from '@/data/ngu-hanh';
import type { NguHanh } from '@/data/ngu-hanh';
import { buildLoShu } from './birth-overview';

/** Lấy các chữ số từ tên (qua letter values) để kết hợp Lo Shu */
function nameDigits(name: string): number[] {
  const normalized = normalizeName(name);
  const digits: number[] = [];
  for (const ch of normalized) {
    const val = LETTER_VALUES[ch];
    if (val) digits.push(val);
  }
  return digits;
}

/** Kết hợp Lo Shu ngày sinh + chữ số tên */
function combinedLoShu(birthDate: string, fullName: string): LoShuGrid {
  const base = buildLoShu(birthDate);
  const nDigits = nameDigits(fullName);

  // Clone counts
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = base.counts[i] || 0;

  for (const d of nDigits) {
    if (d >= 1 && d <= 9) counts[d]++;
  }

  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (counts[i] === 0) missing.push(i);
  }

  return { counts, missing };
}

/** Tổng giá trị chữ cái của tên (trước reduce) — để dò Số Nợ Nghiệp qua các bước */
function rawNameSum(name: string): number {
  const normalized = normalizeName(name);
  let total = 0;
  for (const ch of normalized) {
    const val = LETTER_VALUES[ch];
    if (val) total += val;
  }
  return total;
}

/** Keywords cho từng con số */
const NUMBER_KEYWORDS: Record<number, string[]> = {
  1: ['Lãnh đạo', 'Độc lập', 'Sáng tạo'],
  2: ['Hợp tác', 'Nhạy cảm', 'Hòa hợp'],
  3: ['Biểu đạt', 'Vui vẻ', 'Nghệ thuật'],
  4: ['Ổn định', 'Kỷ luật', 'Thực tế'],
  5: ['Tự do', 'Phiêu lưu', 'Linh hoạt'],
  6: ['Trách nhiệm', 'Yêu thương', 'Gia đình'],
  7: ['Trí tuệ', 'Tâm linh', 'Phân tích'],
  8: ['Quyền lực', 'Thành công', 'Vật chất'],
  9: ['Nhân đạo', 'Lý tưởng', 'Bao dung'],
  11: ['Trực giác', 'Tâm linh', 'Truyền cảm'],
  22: ['Kiến tạo', 'Tầm nhìn', 'Thực hiện'],
  33: ['Thầy dạy', 'Hy sinh', 'Chữa lành'],
};

/**
 * Tính score tất định (0-100, clamp 50-100).
 * Dùng nhiều thành phần LIÊN TỤC (không bucket thô) để các tên phân hóa rõ:
 * - Ngũ hành tương quan với mệnh chủ (0-30): sinh > hòa > trung > khắc
 * - Hòa hợp Số Sứ Mệnh ↔ Số Chủ Đạo (0-25, liên tục theo độ lệch)
 * - Hòa hợp Số Linh Hồn ↔ Số Chủ Đạo (0-20, liên tục)
 * - Hòa hợp Số Cân Bằng ↔ Số Chủ Đạo (0-15, liên tục)
 * - Bù số thiếu Lo Shu (0-10, theo TỈ LỆ số thiếu được bù)
 * Tên dài thường bù gần hết số thiếu → fill ít trọng số; phân hóa chính đến
 * từ các con số riêng của mỗi tên.
 */
function harmonyOf(value: number, lifePath: number, max: number): number {
  const d = Math.abs(value - lifePath);
  return Math.max(0, Math.round(max - (d / 9) * max));
}

function calculateScore(
  tuong: 'sinh' | 'khac' | 'hoa' | 'trung',
  destiny: number,
  soul: number,
  balance: number,
  lifePath: number,
  birthMissing: number[],
  combined: LoShuGrid,
): number {
  const hanhScore = tuong === 'sinh' ? 30 : tuong === 'hoa' ? 22 : tuong === 'trung' ? 14 : 6;
  const destinyScore = harmonyOf(destiny, lifePath, 25);
  const soulScore = harmonyOf(soul, lifePath, 20);
  const balanceScore = harmonyOf(balance, lifePath, 15);

  // Bù số thiếu: tỉ lệ số thiếu đã được bù (0-10)
  let filled = 0;
  for (const num of birthMissing) {
    if (combined.counts[num] > 0) filled++;
  }
  const fillScore = birthMissing.length > 0
    ? Math.round((filled / birthMissing.length) * 10)
    : 10;

  const total = hanhScore + destinyScore + soulScore + balanceScore + fillScore; // 0-100
  return Math.min(100, Math.max(50, total));
}

/**
 * Phân tích một tên cụ thể.
 */
export function analyzeName(
  name: string,
  familyName: string,
  birthOverview: NamingBirthOverview,
): NameAnalysis {
  const fullName = `${familyName} ${name}`;
  const core = computeCoreNumbers(fullName, birthOverview.birthDate);

  // Ngũ hành tên từ destiny number
  const nguHanhTen: NguHanh = DIGIT_TO_HANH[core.destiny] || 'Thổ';
  const menhHanh = birthOverview.nguHanh as NguHanh;
  const tuong = soSanhNguHanh(nguHanhTen, menhHanh);
  const tuongText = moTaTuongQuan(tuong, nguHanhTen, menhHanh);

  // Combined Lo Shu
  const combined = combinedLoShu(birthOverview.birthDate, fullName);

  // Score
  const score = calculateScore(
    tuong, core.destiny, core.soul, core.balance, core.lifePath,
    birthOverview.loShu.missing, combined,
  );

  // Number rows
  const numbers: NamingNumberRow[] = [
    {
      key: 'destiny',
      label: 'Số Sứ Mệnh',
      value: core.destiny,
      keywords: NUMBER_KEYWORDS[core.destiny] || ['Đặc biệt'],
    },
    {
      key: 'soul',
      label: 'Số Linh Hồn',
      value: core.soul,
      keywords: NUMBER_KEYWORDS[core.soul] || ['Đặc biệt'],
    },
    {
      key: 'balance',
      label: 'Số Cân Bằng',
      value: core.balance,
      keywords: NUMBER_KEYWORDS[core.balance] || ['Đặc biệt'],
    },
  ];

  // Detect karmic debt — dò qua các bước reduce của tổng tên (49→13→4 ⇒ 13)
  const { karmic } = reduceWithKarmic(rawNameSum(fullName));
  if (karmic) {
    numbers.push({
      key: 'karmic',
      label: 'Số Nợ Nghiệp',
      value: karmic,
      keywords: ['Bài học', 'Thử thách', 'Trưởng thành'],
      isKarmic: true,
    });
  }

  return {
    name,
    fullName,
    score,
    nguHanhTen,
    tuongSinhKhac: tuong,
    tuongText,
    combinedLoShu: combined,
    numbers,
  };
}
