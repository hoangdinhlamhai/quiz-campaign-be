import { nanoid } from 'nanoid';
import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = nanoid();

const careerQuestions: Array<{
  content: string;
  answers: Array<{ text: string; score: number }>;
}> = [
  {
    content: 'Bạn thích loại công việc nào nhất:',
    answers: [
      { text: 'Làm việc với con người, giúp đỡ và hướng dẫn', score: 4 },
      { text: 'Phân tích dữ liệu và giải quyết vấn đề logic', score: 3 },
      { text: 'Sáng tạo nội dung, thiết kế hoặc nghệ thuật', score: 3 },
      { text: 'Quản lý, lãnh đạo và ra quyết định', score: 4 },
    ],
  },
  {
    content: 'Môi trường làm việc lý tưởng của bạn:',
    answers: [
      { text: 'Văn phòng yên tĩnh, tập trung cá nhân', score: 2 },
      { text: 'Không gian mở, nhiều tương tác nhóm', score: 3 },
      { text: 'Linh hoạt, có thể làm việc từ xa', score: 4 },
      { text: 'Ngoài trời hoặc di chuyển nhiều', score: 3 },
    ],
  },
  {
    content: 'Khi chọn nghề, yếu tố nào quan trọng nhất:',
    answers: [
      { text: 'Thu nhập cao và ổn định', score: 2 },
      { text: 'Đam mê và ý nghĩa công việc', score: 4 },
      { text: 'Cơ hội thăng tiến và phát triển', score: 3 },
      { text: 'Cân bằng cuộc sống và công việc', score: 3 },
    ],
  },
  {
    content: 'Bạn xử lý áp lực công việc thế nào:',
    answers: [
      { text: 'Lập kế hoạch chi tiết và thực hiện từng bước', score: 4 },
      { text: 'Nhờ đồng nghiệp hỗ trợ và chia sẻ', score: 3 },
      { text: 'Tìm cách sáng tạo để giải quyết nhanh', score: 3 },
      { text: 'Chấp nhận áp lực như một phần của công việc', score: 2 },
    ],
  },
  {
    content: 'Kỹ năng nào bạn tự tin nhất:',
    answers: [
      { text: 'Giao tiếp và thuyết trình', score: 3 },
      { text: 'Phân tích và tư duy logic', score: 4 },
      { text: 'Sáng tạo và tưởng tượng', score: 3 },
      { text: 'Tổ chức và quản lý thời gian', score: 4 },
    ],
  },
  {
    content: 'Bạn thích học hỏi qua cách nào:',
    answers: [
      { text: 'Đọc sách và nghiên cứu tài liệu', score: 3 },
      { text: 'Thực hành trực tiếp và trải nghiệm', score: 4 },
      { text: 'Tham gia khóa học và workshop', score: 3 },
      { text: 'Quan sát và học từ người có kinh nghiệm', score: 3 },
    ],
  },
  {
    content: 'Bạn muốn đóng góp cho xã hội qua:',
    answers: [
      { text: 'Giáo dục và truyền đạt kiến thức', score: 4 },
      { text: 'Công nghệ và đổi mới sáng tạo', score: 3 },
      { text: 'Y tế và chăm sóc sức khỏe', score: 3 },
      { text: 'Kinh doanh và tạo việc làm', score: 3 },
    ],
  },
  {
    content: 'Khi làm việc nhóm, vai trò bạn thường đảm nhận:',
    answers: [
      { text: 'Người lên ý tưởng và đề xuất', score: 3 },
      { text: 'Người thực hiện và hoàn thành', score: 4 },
      { text: 'Người kết nối và điều phối', score: 3 },
      { text: 'Người kiểm tra và đảm bảo chất lượng', score: 3 },
    ],
  },
  {
    content: 'Bạn đánh giá thành công nghề nghiệp dựa trên:',
    answers: [
      { text: 'Sự công nhận và danh tiếng', score: 2 },
      { text: 'Sự hài lòng và niềm vui trong công việc', score: 4 },
      { text: 'Thu nhập và tài sản tích lũy', score: 2 },
      { text: 'Tác động tích cực đến người khác', score: 4 },
    ],
  },
  {
    content: 'Bạn phản ứng thế nào khi phải thay đổi nghề:',
    answers: [
      { text: 'Hào hứng với cơ hội mới', score: 4 },
      { text: 'Lo lắng nhưng sẵn sàng thử', score: 3 },
      { text: 'Cần thời gian suy nghĩ kỹ', score: 2 },
      { text: 'Tránh thay đổi nếu có thể', score: 1 },
    ],
  },
  {
    content: 'Loại dự án nào khiến bạn hào hứng nhất:',
    answers: [
      { text: 'Dự án dài hạn, phức tạp và thử thách', score: 4 },
      { text: 'Dự án ngắn hạn, đa dạng và linh hoạt', score: 3 },
      { text: 'Dự án có tác động xã hội rõ ràng', score: 3 },
      { text: 'Dự án sáng tạo, không có khuôn mẫu', score: 3 },
    ],
  },
  {
    content: 'Bạn thích làm việc với:',
    answers: [
      { text: 'Con số, dữ liệu và hệ thống', score: 3 },
      { text: 'Con người và mối quan hệ', score: 4 },
      { text: 'Ý tưởng và khái niệm trừu tượng', score: 3 },
      { text: 'Vật liệu và sản phẩm hữu hình', score: 2 },
    ],
  },
  {
    content: 'Điều gì khiến bạn mất động lực nhất:',
    answers: [
      { text: 'Công việc lặp đi lặp lại, nhàm chán', score: 3 },
      { text: 'Không được công nhận nỗ lực', score: 3 },
      { text: 'Môi trường tiêu cực và xung đột', score: 4 },
      { text: 'Không có cơ hội phát triển', score: 4 },
    ],
  },
  {
    content: '5 năm tới, bạn muốn:',
    answers: [
      { text: 'Trở thành chuyên gia trong lĩnh vực', score: 4 },
      { text: 'Khởi nghiệp hoặc làm chủ', score: 3 },
      { text: 'Có vị trí quản lý, lãnh đạo', score: 3 },
      { text: 'Tự do tài chính, làm điều mình thích', score: 3 },
    ],
  },
  {
    content: 'Bạn xử lý thất bại trong công việc thế nào:',
    answers: [
      { text: 'Phân tích nguyên nhân và rút kinh nghiệm', score: 4 },
      { text: 'Nhanh chóng chuyển sang cơ hội khác', score: 3 },
      { text: 'Tìm sự hỗ trợ từ mentor hoặc đồng nghiệp', score: 3 },
      { text: 'Cần thời gian hồi phục trước khi tiếp tục', score: 2 },
    ],
  },
];

export const careerQuiz = {
  id: quizId,
  categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm xu hướng nghề nghiệp',
  slug: 'trac-nghiem-xu-huong-nghe-nghiep',
  description: 'Khám phá xu hướng nghề nghiệp phù hợp với tính cách, kỹ năng và giá trị sống của bạn.',
  instruction: 'Chọn câu trả lời phản ánh đúng nhất suy nghĩ và hành vi của bạn.',
  thumbnailUrl: '/thumbnails/career.png',
  quizType: 'SCORED' as const,
  answerFormat: 'TEXT_CHOICE' as const,
  scaleMin: null,
  scaleMax: null,
  scaleLabelMin: null,
  scaleLabelMax: null,
  timeLimitMins: 10,
  totalQuestions: careerQuestions.length,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const careerQuestionsData = careerQuestions.map((q, i) => {
  const qId = nanoid();
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
    answers: q.answers.map((a) => ({
      id: nanoid(),
      questionId: qId,
      content: a.text,
      imageUrl: null,
      isCorrect: false,
      scoreValue: a.score,
      dimensionPole: null,
    })),
  };
});
