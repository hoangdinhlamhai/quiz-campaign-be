// Birth Overview — Lo Shu grid + Can Chi + Nạp Âm + Bát Trạch
import type { Gender, NamingBirthOverview, LoShuGrid } from '@/types';
import { getLunarYear } from '@/data/lunar-new-year';
import { getCanChi, getNapAm } from '@/data/nap-am';
import { tinhCungMenh } from '@/data/bat-trach';
import { DIGIT_TO_HANH } from '@/data/ngu-hanh';

/**
 * Đếm tần suất chữ số 1-9 trong ngày sinh (bỏ qua số 0).
 * Input: "2026-01-01" → digits "20260101" → count {1:2, 2:2, 6:1}
 */
export function buildLoShu(birthDate: string): LoShuGrid {
  const digits = birthDate.replace(/\D/g, '');
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;

  for (const ch of digits) {
    const d = Number(ch);
    if (d >= 1 && d <= 9) {
      counts[d]++;
    }
  }

  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (counts[i] === 0) missing.push(i);
  }

  return { counts, missing };
}

/**
 * Xây dựng tổng quan ngày sinh cho đặt tên.
 * Verify 01/01/2026 (Nam):
 *   - Tết 2026 = 17/02/2026 → sinh trước Tết → lunar 2025
 *   - Can Chi: (2025-4)%10=1 → Ất, (2025-4)%12=5 → Tỵ → "Ất Tỵ"
 *   - Nạp Âm: "Phúc Đăng Hỏa" / "Hỏa"
 *   - Bát Trạch: 2025 (>=2000), Nam: 9 - reduce(25)=9-7=2 → Khôn → TAY
 *   - Lo Shu: digits 2,0,2,6,0,1,0,1 → present {1:2,2:2,6:1}, missing {3,4,5,7,8,9}
 */
export function buildBirthOverview(birthDate: string, gender: Gender): NamingBirthOverview {
  const loShu = buildLoShu(birthDate);
  const lunarYear = getLunarYear(birthDate);
  const canChi = getCanChi(lunarYear);
  const napAm = getNapAm(lunarYear);
  const batTrach = tinhCungMenh(lunarYear, gender);

  // Mục tiêu đặt tên: bù số thiếu trong Lo Shu
  const missingHanh = loShu.missing.map(n => DIGIT_TO_HANH[n]).filter(Boolean);
  const uniqueHanh = [...new Set(missingHanh)];
  const goal = loShu.missing.length > 0
    ? `Nên chọn tên bù các số thiếu (${loShu.missing.join(', ')}) thuộc hành ${uniqueHanh.join(', ')} để cân bằng biểu đồ.`
    : 'Biểu đồ Lo Shu đầy đủ, chọn tên hòa hợp với mệnh chủ.';

  return {
    birthDate,
    loShu,
    canChi,
    menh: napAm.menh,
    nguHanh: napAm.nguHanh,
    trachMenh: batTrach.quai,
    trachGroup: batTrach.group,
    goal,
  };
}
