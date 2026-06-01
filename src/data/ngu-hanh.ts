// Ngũ Hành — Lạc Việt mapping: số (1-9) → hành
// Nguồn: Hệ thống Lạc Việt Numerology (phổ biến tại VN)

export type NguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

/** Số (1-9) → Ngũ Hành */
export const DIGIT_TO_HANH: Record<number, NguHanh> = {
  1: 'Thủy',
  2: 'Thổ',
  3: 'Mộc',
  4: 'Mộc',
  5: 'Thổ',
  6: 'Kim',
  7: 'Kim',
  8: 'Thổ',
  9: 'Hỏa',
};

/** Vòng tương sinh: Kim → Thủy → Mộc → Hỏa → Thổ → Kim */
const SINH_CYCLE: NguHanh[] = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];

/** Vòng tương khắc: Kim → Mộc → Thổ → Thủy → Hỏa → Kim */
const KHAC_CYCLE: NguHanh[] = ['Kim', 'Mộc', 'Thổ', 'Thủy', 'Hỏa'];

export type TuongQuan = 'sinh' | 'khac' | 'hoa' | 'trung';

/**
 * So sánh ngũ hành tên vs mệnh chủ.
 * - sinh: mệnh sinh tên HOẶC tên sinh mệnh (hỗ trợ)
 * - khac: mệnh khắc tên HOẶC tên khắc mệnh (xung đột)
 * - hoa: cùng hành (hòa hợp)
 * - trung: không sinh không khắc (trung tính)
 */
export function soSanhNguHanh(hanhTen: NguHanh, hanhMenh: NguHanh): TuongQuan {
  if (hanhTen === hanhMenh) return 'hoa';

  // Kiểm tra tương sinh (mệnh sinh tên hoặc tên sinh mệnh)
  const menhIdx = SINH_CYCLE.indexOf(hanhMenh);
  const tenIdx = SINH_CYCLE.indexOf(hanhTen);
  // Mệnh sinh tên: hành tiếp theo trong vòng sinh
  if (SINH_CYCLE[(menhIdx + 1) % 5] === hanhTen) return 'sinh';
  // Tên sinh mệnh: tên là nguồn sinh cho mệnh
  if (SINH_CYCLE[(tenIdx + 1) % 5] === hanhMenh) return 'sinh';

  // Kiểm tra tương khắc
  const menhKhacIdx = KHAC_CYCLE.indexOf(hanhMenh);
  const tenKhacIdx = KHAC_CYCLE.indexOf(hanhTen);
  if (KHAC_CYCLE[(menhKhacIdx + 1) % 5] === hanhTen) return 'khac';
  if (KHAC_CYCLE[(tenKhacIdx + 1) % 5] === hanhMenh) return 'khac';

  return 'trung';
}

/** Diễn giải tương quan ngũ hành */
export function moTaTuongQuan(tuong: TuongQuan, hanhTen: NguHanh, hanhMenh: NguHanh): string {
  switch (tuong) {
    case 'sinh':
      return `${hanhTen} và ${hanhMenh} tương sinh, hỗ trợ lẫn nhau — rất tốt cho sự phát triển.`;
    case 'khac':
      return `${hanhTen} và ${hanhMenh} tương khắc, có thể gây xung đột năng lượng.`;
    case 'hoa':
      return `Cùng hành ${hanhTen}, hòa hợp tự nhiên — ổn định và cân bằng.`;
    case 'trung':
      return `${hanhTen} và ${hanhMenh} không sinh không khắc — trung tính, không ảnh hưởng nhiều.`;
  }
}
