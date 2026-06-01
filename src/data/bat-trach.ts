// Bát Trạch — Cung Phi Quái từ (năm âm lịch, giới tính)
// Đông tứ mệnh: Khảm(1), Ly(9), Chấn(3), Tốn(4)
// Tây tứ mệnh: Càn(6), Khôn(2), Cấn(8), Đoài(7)
// Công thức cung phi (phổ biến):
//   Nam: (100 - tổng 2 chữ số cuối năm âm lịch) % 9 → nếu 0 thì = 9
//   Nữ: (tổng 2 chữ số cuối năm âm lịch - 4) % 9 → nếu 0 thì = 9
//   Riêng năm 2000+: Nam: (100 - tổng 2 chữ số cuối) % 9; Nữ: (tổng 2 chữ số cuối + 6) % 9
//   Thực tế dùng công thức chuẩn: reduce tổng các chữ số năm → 1 digit
// Dùng phương pháp: lấy 2 chữ số cuối, cộng lại reduce về 1 digit, rồi áp công thức.

import type { Gender } from '@/types';

export type Quai = 'Khảm' | 'Khôn' | 'Chấn' | 'Tốn' | 'Càn' | 'Cấn' | 'Đoài' | 'Ly' | 'Trung';
export type TrachGroup = 'DONG' | 'TAY';

export interface BatTrachResult {
  quai: string;
  group: TrachGroup;
}

// Số → Quái mapping
const SO_TO_QUAI: Record<number, Quai> = {
  1: 'Khảm',
  2: 'Khôn',
  3: 'Chấn',
  4: 'Tốn',
  5: 'Trung', // Nam → Khôn, Nữ → Cấn (số 5 không có quái riêng)
  6: 'Càn',
  7: 'Đoài',
  8: 'Cấn',
  9: 'Ly',
};

const DONG_TU_MENH: Set<Quai> = new Set(['Khảm', 'Ly', 'Chấn', 'Tốn']);

/** Reduce số về 1 chữ số (cộng các digit cho đến khi <=9) */
function reduceSingle(n: number): number {
  let val = Math.abs(n);
  while (val > 9) {
    val = String(val).split('').reduce((s, d) => s + Number(d), 0);
  }
  return val;
}

/**
 * Tính cung mệnh Bát Trạch.
 * Công thức chuẩn (áp dụng cho người sinh từ 1900):
 * - Lấy 2 chữ số cuối năm âm lịch
 * - Cộng 2 chữ số, reduce về 1 digit
 * - Nam: 11 - digit (nếu >9 thì reduce lại; nếu =0 thì =9)
 *   → Thực tế: (11 - digit), nếu >9 thì trừ 9
 * - Nữ: digit + 4 (nếu >9 thì reduce)
 * Cho năm 2000+:
 * - Nam: 9 - digit (nếu =0 thì =9)
 * - Nữ: digit + 6 (nếu >9 thì reduce)
 */
export function tinhCungMenh(lunarYear: number, gender: Gender): BatTrachResult {
  const lastTwo = lunarYear % 100;
  const digitSum = reduceSingle(lastTwo);

  let cungSo: number;

  if (lunarYear < 2000) {
    if (gender === 'MALE') {
      cungSo = 11 - digitSum;
      if (cungSo > 9) cungSo -= 9;
      if (cungSo === 0) cungSo = 9;
    } else {
      cungSo = digitSum + 4;
      if (cungSo > 9) cungSo -= 9;
    }
  } else {
    if (gender === 'MALE') {
      cungSo = 9 - digitSum;
      if (cungSo <= 0) cungSo += 9;
    } else {
      cungSo = digitSum + 6;
      if (cungSo > 9) cungSo -= 9;
    }
  }

  let quai = SO_TO_QUAI[cungSo] || 'Khôn';

  // Số 5 không có quái riêng: Nam → Khôn, Nữ → Cấn
  if (quai === 'Trung') {
    quai = gender === 'MALE' ? 'Khôn' : 'Cấn';
  }

  const group: TrachGroup = DONG_TU_MENH.has(quai) ? 'DONG' : 'TAY';

  return { quai, group };
}
