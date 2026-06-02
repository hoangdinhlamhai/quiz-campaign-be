import { CAT_TRI_TUE } from './categories.js';

const quizId = 'qz_trac-nghiem-mbti';

const mbtiQuestions: Array<{
  content: string;
  dimensionPole: [string, string];
  answers: [string, string];
}> = [
  { content: 'Bạn cảm thấy tràn đầy năng lượng khi:', dimensionPole: ['E', 'I'], answers: ['Giao lưu với nhiều người', 'Ở một mình hoặc với vài người thân'] },
  { content: 'Khi tham gia một buổi tiệc, bạn thường:', dimensionPole: ['E', 'I'], answers: ['Chủ động làm quen người mới', 'Chờ người khác bắt chuyện trước'] },
  { content: 'Sau một ngày dài làm việc, bạn muốn:', dimensionPole: ['E', 'I'], answers: ['Đi chơi cùng bạn bè để xả stress', 'Về nhà nghỉ ngơi một mình'] },
  { content: 'Bạn thích cách học nào hơn:', dimensionPole: ['E', 'I'], answers: ['Thảo luận nhóm, trao đổi ý kiến', 'Tự đọc sách và nghiên cứu'] },
  { content: 'Khi gặp vấn đề, bạn thường:', dimensionPole: ['E', 'I'], answers: ['Nói ra ngay để bàn bạc với người khác', 'Suy nghĩ kỹ trong đầu trước khi chia sẻ'] },
  { content: 'Bạn thường chú ý đến:', dimensionPole: ['S', 'N'], answers: ['Những chi tiết cụ thể, thực tế', 'Bức tranh tổng thể và khả năng tiềm ẩn'] },
  { content: 'Khi đọc một cuốn sách, bạn thích:', dimensionPole: ['S', 'N'], answers: ['Câu chuyện thực tế, dựa trên sự kiện có thật', 'Tiểu thuyết giả tưởng, khoa học viễn tưởng'] },
  { content: 'Bạn tin tưởng hơn vào:', dimensionPole: ['S', 'N'], answers: ['Kinh nghiệm thực tế đã trải qua', 'Trực giác và linh cảm của mình'] },
  { content: 'Khi mô tả một sự việc, bạn thường:', dimensionPole: ['S', 'N'], answers: ['Kể lại chi tiết theo trình tự', 'Tóm tắt ý chính và ý nghĩa sâu xa'] },
  { content: 'Bạn thích làm việc với:', dimensionPole: ['S', 'N'], answers: ['Dữ liệu, con số và sự kiện cụ thể', 'Ý tưởng, lý thuyết và mô hình trừu tượng'] },
  { content: 'Trong công việc, bạn ưu tiên:', dimensionPole: ['S', 'N'], answers: ['Hoàn thành từng bước một cách chính xác', 'Tìm cách làm mới, sáng tạo hơn'] },
  { content: 'Khi đưa ra quyết định quan trọng, bạn dựa vào:', dimensionPole: ['T', 'F'], answers: ['Phân tích logic và lý trí', 'Cảm xúc và giá trị cá nhân'] },
  { content: 'Khi bạn bè gặp khó khăn, bạn thường:', dimensionPole: ['T', 'F'], answers: ['Đưa ra lời khuyên và giải pháp cụ thể', 'Lắng nghe và đồng cảm với họ'] },
  { content: 'Bạn đánh giá cao hơn ở một người:', dimensionPole: ['T', 'F'], answers: ['Sự công bằng và nhất quán', 'Sự thấu hiểu và lòng nhân ái'] },
  { content: 'Trong một cuộc tranh luận, bạn:', dimensionPole: ['T', 'F'], answers: ['Tập trung vào sự thật và logic', 'Quan tâm đến cảm xúc của mọi người'] },
  { content: 'Khi phê bình ai đó, bạn:', dimensionPole: ['T', 'F'], answers: ['Nói thẳng vấn đề dù có thể làm họ buồn', 'Chọn cách nói nhẹ nhàng để không tổn thương'] },
  { content: 'Bạn cảm thấy thoải mái hơn khi:', dimensionPole: ['T', 'F'], answers: ['Mọi thứ được phân tích rõ ràng, khách quan', 'Mọi người hòa thuận và vui vẻ'] },
  { content: 'Bạn thích lối sống:', dimensionPole: ['J', 'P'], answers: ['Có kế hoạch rõ ràng, ngăn nắp', 'Linh hoạt, tùy cơ ứng biến'] },
  { content: 'Khi đi du lịch, bạn thường:', dimensionPole: ['J', 'P'], answers: ['Lên lịch trình chi tiết từ trước', 'Đi tự do, khám phá tùy hứng'] },
  { content: 'Deadline đến gần, bạn thường:', dimensionPole: ['J', 'P'], answers: ['Đã hoàn thành từ sớm vì làm theo kế hoạch', 'Làm nước rút vào phút cuối'] },
  { content: 'Bạn thích môi trường làm việc:', dimensionPole: ['J', 'P'], answers: ['Có quy trình rõ ràng, ổn định', 'Tự do, ít ràng buộc về thời gian'] },
  { content: 'Khi mua sắm, bạn thường:', dimensionPole: ['J', 'P'], answers: ['Lên danh sách trước và mua đúng thứ cần', 'Dạo quanh và mua theo cảm hứng'] },
  { content: 'Bạn cảm thấy khó chịu khi:', dimensionPole: ['J', 'P'], answers: ['Kế hoạch bị thay đổi đột ngột', 'Bị ép phải tuân theo lịch trình cứng nhắc'] },
  { content: 'Cuối tuần, bạn thường:', dimensionPole: ['J', 'P'], answers: ['Có kế hoạch cụ thể cho từng ngày', 'Để mọi thứ tự nhiên, xem hôm đó muốn gì'] },
];

export const mbtiQuiz = {
  id: quizId,
  categoryId: CAT_TRI_TUE,
  title: 'Trắc nghiệm tính cách MBTI',
  slug: 'trac-nghiem-mbti',
  description: 'Khám phá nhóm tính cách MBTI của bạn qua 24 câu hỏi. Tìm hiểu điểm mạnh, điểm yếu và nghề nghiệp phù hợp.',
  instruction: 'Chọn câu trả lời mô tả đúng bạn nhất. Không có đáp án đúng hay sai.',
  thumbnailUrl: '/images/thumbnails/thumb-mbti.png',
  quizType: 'MBTI' as const,
  answerFormat: 'TEXT_CHOICE' as const,
  scaleMin: null,
  scaleMax: null,
  scaleLabelMin: null,
  scaleLabelMax: null,
  timeLimitMins: 15,
  totalQuestions: mbtiQuestions.length,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const mbtiQuestionsData = mbtiQuestions.map((q, i) => {
  const qId = `${quizId}_q${i + 1}`;
  return {
    question: {
      id: qId,
      quizId,
      content: q.content,
      imageUrl: null,
      orderNumber: i + 1,
      dimensionKey: null,
      isReverseScored: false,
    },
    answers: q.answers.map((text, ai) => ({
      id: `${qId}_a${ai + 1}`,
      questionId: qId,
      content: text,
      imageUrl: null,
      isCorrect: false,
      scoreValue: 0,
      dimensionPole: q.dimensionPole[ai],
    })),
  };
});
