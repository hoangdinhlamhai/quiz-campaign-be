import type { IqDetail } from '../types';

// ============================================
// IQ — diễn giải theo dải điểm (5 mục)
// Lưu ý: mang tính tham khảo/giải trí, không phải đánh giá lâm sàng.
// ============================================
const IQ_BANDS: { min: number; detail: IqDetail }[] = [
  {
    min: 130,
    detail: {
      band: 'Rất xuất sắc (130+)',
      overview: 'Điểm IQ của bạn nằm trong nhóm rất cao, cho thấy khả năng suy luận logic và nhận thức không gian vượt trội so với phần lớn mọi người.',
      cognitiveStrengths: [
        'Nhận ra quy luật phức tạp nhanh chóng',
        'Tư duy trừu tượng và suy luận nhiều bước xuất sắc',
        'Học khái niệm mới với rất ít lặp lại',
      ],
      growthAreas: [
        'Kiên nhẫn với người tư duy chậm hơn',
        'Biến ý tưởng phức tạp thành hành động cụ thể',
      ],
      tips: [
        'Tìm thử thách trí tuệ đủ khó để không nhàm chán',
        'Phát triển trí tuệ cảm xúc song song với trí tuệ logic',
        'Chia sẻ, hướng dẫn người khác để củng cố hiểu biết',
      ],
      note: 'Điểm đã được chuẩn hóa theo độ tuổi và chỉ mang tính tham khảo, không thay thế đánh giá chuyên môn.',
    },
  },
  {
    min: 120,
    detail: {
      band: 'Xuất sắc (120-129)',
      overview: 'Bạn có năng lực tư duy logic và giải quyết vấn đề cao, xử lý tốt các bài toán đòi hỏi suy luận.',
      cognitiveStrengths: [
        'Phân tích vấn đề có hệ thống',
        'Nắm bắt quy luật và mối liên hệ tốt',
        'Học nhanh trong môi trường đòi hỏi tư duy',
      ],
      growthAreas: [
        'Rèn tốc độ xử lý dưới áp lực thời gian',
        'Cân bằng giữa phân tích và quyết định dứt khoát',
      ],
      tips: [
        'Thử các bài toán logic, cờ vua, lập trình để duy trì độ sắc bén',
        'Áp dụng tư duy phân tích vào vấn đề thực tế',
        'Đọc đa lĩnh vực để mở rộng nền tảng kiến thức',
      ],
      note: 'Điểm đã được chuẩn hóa theo độ tuổi và chỉ mang tính tham khảo.',
    },
  },
  {
    min: 110,
    detail: {
      band: 'Trên trung bình (110-119)',
      overview: 'Khả năng tư duy của bạn cao hơn mức trung bình, đủ để xử lý tốt phần lớn các thử thách trí tuệ thường gặp.',
      cognitiveStrengths: [
        'Suy luận logic vững vàng',
        'Tiếp thu kiến thức mới hiệu quả',
        'Giải quyết vấn đề quen thuộc nhanh',
      ],
      growthAreas: [
        'Luyện các dạng bài trừu tượng, nhiều bước',
        'Tăng khả năng tập trung khi gặp bài khó',
      ],
      tips: [
        'Duy trì thói quen học và đọc đều đặn',
        'Thử thách bản thân với bài toán khó dần',
        'Ngủ đủ và vận động để não hoạt động tối ưu',
      ],
      note: 'Điểm đã được chuẩn hóa theo độ tuổi và chỉ mang tính tham khảo.',
    },
  },
  {
    min: 90,
    detail: {
      band: 'Trung bình (90-109)',
      overview: 'Bạn ở mức trung bình — đây là nhóm phổ biến nhất, cho thấy khả năng tư duy cân đối và ổn định.',
      cognitiveStrengths: [
        'Xử lý tốt các tình huống và bài toán hàng ngày',
        'Học hỏi ổn định khi có thời gian luyện tập',
      ],
      growthAreas: [
        'Rèn kỹ năng nhận diện quy luật phức tạp',
        'Tăng tốc độ và độ chính xác qua luyện tập',
      ],
      tips: [
        'Chơi trò chơi trí tuệ (sudoku, câu đố logic) thường xuyên',
        'Học một kỹ năng mới để kích thích não bộ',
        'Chia bài toán lớn thành các bước nhỏ dễ xử lý',
      ],
      note: 'IQ không cố định — luyện tập và môi trường đều có thể cải thiện tư duy. Điểm chỉ mang tính tham khảo.',
    },
  },
  {
    min: 0,
    detail: {
      band: 'Cần rèn luyện thêm (dưới 90)',
      overview: 'Kết quả lần này ở mức dưới trung bình. Đừng lo lắng — IQ phản ánh trạng thái tại thời điểm làm bài và hoàn toàn có thể cải thiện.',
      cognitiveStrengths: [
        'Mỗi người có thế mạnh riêng ngoài tư duy logic hình ảnh',
        'Tiềm năng tiến bộ rõ rệt khi luyện tập đúng cách',
      ],
      growthAreas: [
        'Làm quen với các dạng bài suy luận hình ảnh, quy luật',
        'Cải thiện sự tập trung và bình tĩnh khi làm bài',
      ],
      tips: [
        'Luyện các bài tập quy luật hình ảnh đơn giản trước',
        'Đảm bảo nghỉ ngơi, tỉnh táo khi làm bài test',
        'Đọc sách và chơi trò chơi tư duy để rèn não bộ dần',
      ],
      note: 'Bài test có yếu tố tâm trạng và sự tập trung. Hãy thử lại khi thoải mái — kết quả chỉ mang tính tham khảo.',
    },
  },
];

export function getIqDetail(iqScore: number): IqDetail {
  const band = IQ_BANDS.find((b) => iqScore >= b.min) ?? IQ_BANDS[IQ_BANDS.length - 1];
  return band.detail;
}
