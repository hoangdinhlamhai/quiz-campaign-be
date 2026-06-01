// Compact numerology interpretations — all dynamic per number
interface NumInfo {
  keywords: string[];
  strength: string;
  weakness: string;
  career: string[];
  desc: string;
}

const NUM_DATA: Record<number, NumInfo> = {
  1: { keywords: ['Tự do', 'Phiêu lưu', 'Linh hoạt', 'Tò mò'], strength: 'Sứ mệnh Dẫn đầu', weakness: 'Bài học về sự tình tứ', career: ['Quản lý', 'Khởi nghiệp'], desc: 'Bạn là người tiên phong, yêu tự do, luôn tìm kiếm sự thay đổi và những trải nghiệm mới.' },
  2: { keywords: ['Hợp tác', 'Nhạy cảm', 'Kiên nhẫn', 'Ngoại giao'], strength: 'Sứ mệnh Kết nối', weakness: 'Bài học về sự tự tin', career: ['Xã hội', 'Tư vấn'], desc: 'Bạn là người hòa giải, giỏi lắng nghe, có khả năng kết nối mọi người.' },
  3: { keywords: ['Sáng tạo', 'Hoạt bát', 'Lạc quan', 'Biểu đạt'], strength: 'Sứ mệnh Truyền cảm hứng', weakness: 'Bài học về sự thể hiện', career: ['Nghệ thuật', 'Truyền thông'], desc: 'Bạn là người sáng tạo, có khiếu giao tiếp và truyền đạt ý tưởng.' },
  4: { keywords: ['Kỷ luật', 'Thực tế', 'Ổn định', 'Chăm chỉ'], strength: 'Sứ mệnh Xây dựng', weakness: 'Bài học về sự cho đi', career: ['Kỹ thuật', 'Xây dựng'], desc: 'Bạn là người đáng tin cậy, có tổ chức, giỏi xây dựng nền tảng vững chắc.' },
  5: { keywords: ['Tự do', 'Phiêu lưu', 'Linh hoạt', 'Tò mò'], strength: 'Sứ mệnh Khám phá', weakness: 'Bài học về sự linh hoạt', career: ['Du lịch', 'Truyền thông'], desc: 'Bạn là người năng động, yêu tự do, luôn tìm kiếm trải nghiệm mới.' },
  6: { keywords: ['Yêu thương', 'Trách nhiệm', 'Chăm sóc', 'Hài hòa'], strength: 'Sứ mệnh Chữa lành', weakness: 'Bài học về sự cho đi', career: ['Y tế', 'Giáo dục'], desc: 'Bạn là người yêu thương, có trách nhiệm, luôn muốn chăm sóc người khác.' },
  7: { keywords: ['Trí tuệ', 'Phân tích', 'Tâm linh', 'Nội tâm'], strength: 'Sứ mệnh Tìm kiếm', weakness: 'Bài học về niềm tin', career: ['Nghiên cứu', 'Công nghệ'], desc: 'Bạn là người trí tuệ, thích tìm hiểu sâu, có khả năng phân tích mạnh.' },
  8: { keywords: ['Quyền lực', 'Tham vọng', 'Tài chính', 'Lãnh đạo'], strength: 'Sứ mệnh Thành đạt', weakness: 'Bài học về tài chính', career: ['Tài chính', 'Quản lý'], desc: 'Bạn là người có tham vọng, giỏi quản lý tài chính và đạt được mục tiêu lớn.' },
  9: { keywords: ['Nhân ái', 'Vị tha', 'Lý tưởng', 'Sáng tạo'], strength: 'Sứ mệnh Phụng sự', weakness: 'Bài học về lòng vị tha', career: ['Nghệ thuật', 'Xã hội'], desc: 'Bạn là người nhân ái, có lý tưởng cao đẹp, luôn muốn đóng góp cho xã hội.' },
  11: { keywords: ['Trực giác', 'Tâm linh', 'Truyền cảm hứng', 'Nhạy cảm'], strength: 'Sứ mệnh Khai sáng', weakness: 'Bài học về sự cân bằng', career: ['Tâm linh', 'Tư vấn'], desc: 'Bạn mang năng lượng bậc thầy, có trực giác mạnh và khả năng truyền cảm hứng.' },
  22: { keywords: ['Kiến tạo', 'Tầm nhìn', 'Thực tiễn', 'Quyền lực'], strength: 'Sứ mệnh Kiến tạo', weakness: 'Bài học về tầm nhìn', career: ['Kiến trúc', 'Quản lý'], desc: 'Bạn là nhà kiến tạo bậc thầy, có tầm nhìn lớn và khả năng hiện thực hóa ước mơ.' },
  33: { keywords: ['Đại sư', 'Chữa lành', 'Hy sinh', 'Tình yêu'], strength: 'Sứ mệnh Đại sư', weakness: 'Bài học về sự hy sinh', career: ['Giáo dục', 'Y tế'], desc: 'Bạn mang năng lượng của bậc đại sư, sống vì tình yêu thương vô điều kiện.' },
};

const CYCLE_NAMES = ['GIEO HẠT', 'CHÍN', 'THU HOẠCH'] as const;

const PERSONAL_YEAR_TITLES: Record<number, string> = {
  1: 'NGƯỜI PHIÊU LƯU - NĂM CỦA SỰ TỰ DO VÀ THAY ĐỔI',
  2: 'NGƯỜI KIÊN NHẪN - NĂM CỦA SỰ HỢP TÁC',
  3: 'NGƯỜI SÁNG TẠO - NĂM CỦA SỰ BIỂU ĐẠT',
  4: 'NGƯỜI XÂY DỰNG - NĂM CỦA NỀN TẢNG',
  5: 'NGƯỜI KHÁM PHÁ - NĂM CỦA SỰ THAY ĐỔI',
  6: 'NGƯỜI CHĂM SÓC - NĂM CỦA TRÁCH NHIỆM',
  7: 'NGƯỜI TÌM KIẾM - NĂM CỦA TRÍ TUỆ',
  8: 'NGƯỜI THÀNH ĐẠT - NĂM CỦA QUYỀN LỰC',
  9: 'NGƯỜI HOÀN THÀNH - NĂM CỦA SỰ KẾT THÚC',
};

const CAREER_GROUPS = ['Quản lý', 'Kỹ thuật', 'Xã hội', 'Nghệ thuật', 'Nghiên cứu', 'Nghiệp vụ'] as const;

export function getNumInfo(n: number): NumInfo {
  return NUM_DATA[n] ?? NUM_DATA[Math.min(n, 9)];
}

export { NUM_DATA, CYCLE_NAMES, PERSONAL_YEAR_TITLES, CAREER_GROUPS };
export type { NumInfo };
