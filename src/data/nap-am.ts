// Nạp Âm — 60 Hoa Giáp (Can Chi) → Mệnh + Ngũ Hành
// Mỗi cặp 2 năm liên tiếp cùng nạp âm (ví dụ: Giáp Tý + Ất Sửu = Hải Trung Kim)
// Verify: Giáp Tý → "Hải Trung Kim"/"Kim", Ất Tỵ → "Phúc Đăng Hỏa"/"Hỏa"

import type { NguHanh } from './ngu-hanh';

export interface NapAmEntry {
  menh: string;
  nguHanh: NguHanh;
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

export { CAN, CHI };

/**
 * Bảng 60 Hoa Giáp — key = "Can Chi", value = {menh, nguHanh}
 * Sắp xếp theo thứ tự truyền thống (Giáp Tý → Quý Hợi)
 */
export const NAP_AM: Record<string, NapAmEntry> = {
  // 1-2: Hải Trung Kim
  'Giáp Tý': { menh: 'Hải Trung Kim', nguHanh: 'Kim' },
  'Ất Sửu': { menh: 'Hải Trung Kim', nguHanh: 'Kim' },
  // 3-4: Lư Trung Hỏa
  'Bính Dần': { menh: 'Lư Trung Hỏa', nguHanh: 'Hỏa' },
  'Đinh Mão': { menh: 'Lư Trung Hỏa', nguHanh: 'Hỏa' },
  // 5-6: Đại Lâm Mộc
  'Mậu Thìn': { menh: 'Đại Lâm Mộc', nguHanh: 'Mộc' },
  'Kỷ Tỵ': { menh: 'Đại Lâm Mộc', nguHanh: 'Mộc' },
  // 7-8: Lộ Bàng Thổ
  'Canh Ngọ': { menh: 'Lộ Bàng Thổ', nguHanh: 'Thổ' },
  'Tân Mùi': { menh: 'Lộ Bàng Thổ', nguHanh: 'Thổ' },
  // 9-10: Kiếm Phong Kim
  'Nhâm Thân': { menh: 'Kiếm Phong Kim', nguHanh: 'Kim' },
  'Quý Dậu': { menh: 'Kiếm Phong Kim', nguHanh: 'Kim' },
  // 11-12: Sơn Đầu Hỏa
  'Giáp Tuất': { menh: 'Sơn Đầu Hỏa', nguHanh: 'Hỏa' },
  'Ất Hợi': { menh: 'Sơn Đầu Hỏa', nguHanh: 'Hỏa' },
  // 13-14: Giản Hạ Thủy
  'Bính Tý': { menh: 'Giản Hạ Thủy', nguHanh: 'Thủy' },
  'Đinh Sửu': { menh: 'Giản Hạ Thủy', nguHanh: 'Thủy' },
  // 15-16: Thành Đầu Thổ
  'Mậu Dần': { menh: 'Thành Đầu Thổ', nguHanh: 'Thổ' },
  'Kỷ Mão': { menh: 'Thành Đầu Thổ', nguHanh: 'Thổ' },
  // 17-18: Bạch Lạp Kim
  'Canh Thìn': { menh: 'Bạch Lạp Kim', nguHanh: 'Kim' },
  'Tân Tỵ': { menh: 'Bạch Lạp Kim', nguHanh: 'Kim' },
  // 19-20: Dương Liễu Mộc
  'Nhâm Ngọ': { menh: 'Dương Liễu Mộc', nguHanh: 'Mộc' },
  'Quý Mùi': { menh: 'Dương Liễu Mộc', nguHanh: 'Mộc' },
  // 21-22: Tuyền Trung Thủy
  'Giáp Thân': { menh: 'Tuyền Trung Thủy', nguHanh: 'Thủy' },
  'Ất Dậu': { menh: 'Tuyền Trung Thủy', nguHanh: 'Thủy' },
  // 23-24: Ốc Thượng Thổ
  'Bính Tuất': { menh: 'Ốc Thượng Thổ', nguHanh: 'Thổ' },
  'Đinh Hợi': { menh: 'Ốc Thượng Thổ', nguHanh: 'Thổ' },
  // 25-26: Tích Lịch Hỏa
  'Mậu Tý': { menh: 'Tích Lịch Hỏa', nguHanh: 'Hỏa' },
  'Kỷ Sửu': { menh: 'Tích Lịch Hỏa', nguHanh: 'Hỏa' },
  // 27-28: Tùng Bách Mộc
  'Canh Dần': { menh: 'Tùng Bách Mộc', nguHanh: 'Mộc' },
  'Tân Mão': { menh: 'Tùng Bách Mộc', nguHanh: 'Mộc' },
  // 29-30: Trường Lưu Thủy
  'Nhâm Thìn': { menh: 'Trường Lưu Thủy', nguHanh: 'Thủy' },
  'Quý Tỵ': { menh: 'Trường Lưu Thủy', nguHanh: 'Thủy' },
  // 31-32: Sa Trung Kim
  'Giáp Ngọ': { menh: 'Sa Trung Kim', nguHanh: 'Kim' },
  'Ất Mùi': { menh: 'Sa Trung Kim', nguHanh: 'Kim' },
  // 33-34: Sơn Hạ Hỏa
  'Bính Thân': { menh: 'Sơn Hạ Hỏa', nguHanh: 'Hỏa' },
  'Đinh Dậu': { menh: 'Sơn Hạ Hỏa', nguHanh: 'Hỏa' },
  // 35-36: Bình Địa Mộc
  'Mậu Tuất': { menh: 'Bình Địa Mộc', nguHanh: 'Mộc' },
  'Kỷ Hợi': { menh: 'Bình Địa Mộc', nguHanh: 'Mộc' },
  // 37-38: Bích Thượng Thổ
  'Canh Tý': { menh: 'Bích Thượng Thổ', nguHanh: 'Thổ' },
  'Tân Sửu': { menh: 'Bích Thượng Thổ', nguHanh: 'Thổ' },
  // 39-40: Kim Bạch Kim
  'Nhâm Dần': { menh: 'Kim Bạch Kim', nguHanh: 'Kim' },
  'Quý Mão': { menh: 'Kim Bạch Kim', nguHanh: 'Kim' },
  // 41-42: Phúc Đăng Hỏa
  'Giáp Thìn': { menh: 'Phúc Đăng Hỏa', nguHanh: 'Hỏa' },
  'Ất Tỵ': { menh: 'Phúc Đăng Hỏa', nguHanh: 'Hỏa' },
  // 43-44: Thiên Hà Thủy
  'Bính Ngọ': { menh: 'Thiên Hà Thủy', nguHanh: 'Thủy' },
  'Đinh Mùi': { menh: 'Thiên Hà Thủy', nguHanh: 'Thủy' },
  // 45-46: Đại Dịch Thổ
  'Mậu Thân': { menh: 'Đại Dịch Thổ', nguHanh: 'Thổ' },
  'Kỷ Dậu': { menh: 'Đại Dịch Thổ', nguHanh: 'Thổ' },
  // 47-48: Thoa Xuyến Kim
  'Canh Tuất': { menh: 'Thoa Xuyến Kim', nguHanh: 'Kim' },
  'Tân Hợi': { menh: 'Thoa Xuyến Kim', nguHanh: 'Kim' },
  // 49-50: Tang Đố Mộc
  'Nhâm Tý': { menh: 'Tang Đố Mộc', nguHanh: 'Mộc' },
  'Quý Sửu': { menh: 'Tang Đố Mộc', nguHanh: 'Mộc' },
  // 51-52: Sơn Lâm Hỏa (còn gọi Sơn Đầu Hỏa nhóm 2 — nhưng đúng tên: Sơn Lâm Hỏa? Không — đúng là Tang Đố Mộc rồi tiếp Lôi Hỏa)
  // Correction: 51-52 = Giáp Dần + Ất Mão = Đại Khê Thủy
  'Giáp Dần': { menh: 'Đại Khê Thủy', nguHanh: 'Thủy' },
  'Ất Mão': { menh: 'Đại Khê Thủy', nguHanh: 'Thủy' },
  // 53-54: Sa Trung Thổ
  'Bính Thìn': { menh: 'Sa Trung Thổ', nguHanh: 'Thổ' },
  'Đinh Tỵ': { menh: 'Sa Trung Thổ', nguHanh: 'Thổ' },
  // 55-56: Thiên Thượng Hỏa
  'Mậu Ngọ': { menh: 'Thiên Thượng Hỏa', nguHanh: 'Hỏa' },
  'Kỷ Mùi': { menh: 'Thiên Thượng Hỏa', nguHanh: 'Hỏa' },
  // 57-58: Thạch Lựu Mộc
  'Canh Thân': { menh: 'Thạch Lựu Mộc', nguHanh: 'Mộc' },
  'Tân Dậu': { menh: 'Thạch Lựu Mộc', nguHanh: 'Mộc' },
  // 59-60: Đại Hải Thủy
  'Nhâm Tuất': { menh: 'Đại Hải Thủy', nguHanh: 'Thủy' },
  'Quý Hợi': { menh: 'Đại Hải Thủy', nguHanh: 'Thủy' },
};

/** Tính Can Chi từ năm âm lịch */
export function getCanChi(lunarYear: number): string {
  const canIdx = (lunarYear - 4) % 10;
  const chiIdx = (lunarYear - 4) % 12;
  return `${CAN[canIdx]} ${CHI[chiIdx]}`;
}

/** Tra nạp âm từ năm âm lịch */
export function getNapAm(lunarYear: number): NapAmEntry {
  const canChi = getCanChi(lunarYear);
  const entry = NAP_AM[canChi];
  if (!entry) {
    throw new Error(`Không tìm thấy nạp âm cho ${canChi} (năm ${lunarYear})`);
  }
  return entry;
}
