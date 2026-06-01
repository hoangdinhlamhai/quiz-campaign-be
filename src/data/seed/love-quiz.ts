import { nanoid } from 'nanoid';
import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = nanoid();

const loveQuestions: Array<{
  content: string;
  answers: Array<{ text: string; score: number }>;
}> = [
  {
    content: 'Khi yêu, điều quan trọng nhất với bạn là:',
    answers: [
      { text: 'Sự chung thủy và tin tưởng', score: 4 },
      { text: 'Sự lãng mạn và bất ngờ', score: 3 },
      { text: 'Sự tự do và không gian riêng', score: 2 },
      { text: 'Sự ổn định về tài chính', score: 1 },
    ],
  },
  {
    content: 'Bạn thể hiện tình yêu chủ yếu qua:',
    answers: [
      { text: 'Lời nói yêu thương và khen ngợi', score: 3 },
      { text: 'Hành động chăm sóc cụ thể', score: 4 },
      { text: 'Dành thời gian bên nhau', score: 3 },
      { text: 'Quà tặng và bất ngờ', score: 2 },
    ],
  },
  {
    content: 'Khi xảy ra mâu thuẫn với người yêu, bạn:',
    answers: [
      { text: 'Nói chuyện thẳng thắn ngay lập tức', score: 4 },
      { text: 'Cần thời gian bình tĩnh rồi mới nói', score: 3 },
      { text: 'Tránh đối đầu, hy vọng tự qua', score: 1 },
      { text: 'Nhờ bạn bè hoặc người thân tư vấn', score: 2 },
    ],
  },
  {
    content: 'Mối quan hệ lý tưởng của bạn là:',
    answers: [
      { text: 'Hai người bổ sung cho nhau', score: 4 },
      { text: 'Hai người giống nhau về sở thích', score: 3 },
      { text: 'Tự do, không ràng buộc quá nhiều', score: 2 },
      { text: 'Đam mê mãnh liệt, yêu hết mình', score: 3 },
    ],
  },
  {
    content: 'Bạn nghĩ gì về việc hy sinh trong tình yêu:',
    answers: [
      { text: 'Sẵn sàng hy sinh nếu đối phương xứng đáng', score: 4 },
      { text: 'Cả hai cùng nhường nhịn, không ai hy sinh một chiều', score: 3 },
      { text: 'Không nên hy sinh quá nhiều cho ai', score: 2 },
      { text: 'Tình yêu đích thực không cần hy sinh', score: 1 },
    ],
  },
  {
    content: 'Khi người yêu gặp khó khăn, bạn:',
    answers: [
      { text: 'Luôn ở bên và hỗ trợ hết mình', score: 4 },
      { text: 'Cho lời khuyên và giải pháp cụ thể', score: 3 },
      { text: 'Tôn trọng không gian, chờ họ cần mới giúp', score: 2 },
      { text: 'Động viên tinh thần từ xa', score: 2 },
    ],
  },
  {
    content: 'Bạn đánh giá sự tương hợp dựa trên:',
    answers: [
      { text: 'Giá trị sống và mục tiêu chung', score: 4 },
      { text: 'Sự hấp dẫn và chemistry', score: 2 },
      { text: 'Tính cách bổ sung cho nhau', score: 3 },
      { text: 'Hoàn cảnh gia đình và xã hội', score: 1 },
    ],
  },
  {
    content: 'Về chuyện ghen tuông, bạn:',
    answers: [
      { text: 'Ghen vừa phải là dấu hiệu quan tâm', score: 3 },
      { text: 'Tin tưởng hoàn toàn, không ghen', score: 4 },
      { text: 'Hay ghen nhưng cố kiểm soát', score: 2 },
      { text: 'Ghen nhiều vì sợ mất người yêu', score: 1 },
    ],
  },
  {
    content: 'Bạn nghĩ tình yêu cần bao lâu để phát triển:',
    answers: [
      { text: 'Cần thời gian dài để hiểu nhau sâu sắc', score: 4 },
      { text: 'Yêu từ cái nhìn đầu tiên là có thật', score: 2 },
      { text: 'Vài tháng là đủ để biết có hợp không', score: 3 },
      { text: 'Không có thời gian cố định, tùy người', score: 3 },
    ],
  },
  {
    content: 'Khi mối quan hệ trở nên nhàm chán, bạn:',
    answers: [
      { text: 'Chủ động tạo sự mới mẻ và bất ngờ', score: 4 },
      { text: 'Nói chuyện thẳng thắn về cảm giác', score: 3 },
      { text: 'Chấp nhận đó là giai đoạn bình thường', score: 3 },
      { text: 'Cân nhắc liệu có nên tiếp tục không', score: 1 },
    ],
  },
  {
    content: 'Bạn chia sẻ bí mật với người yêu ở mức nào:',
    answers: [
      { text: 'Chia sẻ mọi thứ, không giấu gì', score: 4 },
      { text: 'Chia sẻ hầu hết, giữ vài điều riêng tư', score: 3 },
      { text: 'Chỉ chia sẻ khi được hỏi', score: 2 },
      { text: 'Giữ nhiều điều cho riêng mình', score: 1 },
    ],
  },
  {
    content: 'Về tương lai mối quan hệ, bạn:',
    answers: [
      { text: 'Lên kế hoạch cùng nhau từ sớm', score: 4 },
      { text: 'Để mọi thứ tự nhiên phát triển', score: 3 },
      { text: 'Tập trung vào hiện tại, chưa nghĩ xa', score: 2 },
      { text: 'Lo lắng về tương lai nhưng ngại nói', score: 1 },
    ],
  },
  {
    content: 'Khi bạn bè không thích người yêu bạn:',
    answers: [
      { text: 'Lắng nghe lý do nhưng tự quyết định', score: 4 },
      { text: 'Cố gắng tạo cơ hội để họ hiểu nhau', score: 3 },
      { text: 'Bạn bè không có quyền can thiệp', score: 2 },
      { text: 'Suy nghĩ lại về mối quan hệ', score: 2 },
    ],
  },
  {
    content: 'Điều bạn không thể chấp nhận trong tình yêu:',
    answers: [
      { text: 'Sự phản bội và nói dối', score: 4 },
      { text: 'Sự kiểm soát và mất tự do', score: 3 },
      { text: 'Sự thờ ơ và không quan tâm', score: 3 },
      { text: 'Sự khác biệt quá lớn về lối sống', score: 2 },
    ],
  },
  {
    content: 'Bạn tin rằng tình yêu đích thực là:',
    answers: [
      { text: 'Chọn yêu mỗi ngày dù khó khăn', score: 4 },
      { text: 'Cảm giác mãnh liệt không thể cưỡng lại', score: 2 },
      { text: 'Sự đồng hành và tôn trọng lẫn nhau', score: 4 },
      { text: 'Duyên số, gặp đúng người đúng thời điểm', score: 2 },
    ],
  },
];

export const loveQuiz = {
  id: quizId,
  categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm phong cách tình yêu',
  slug: 'trac-nghiem-phong-cach-tinh-yeu',
  description: 'Khám phá phong cách yêu đương, cách bạn thể hiện và tiếp nhận tình cảm trong mối quan hệ.',
  instruction: 'Chọn câu trả lời phản ánh đúng nhất suy nghĩ và hành vi của bạn.',
  thumbnailUrl: '/thumbnails/love.png',
  quizType: 'SCORED' as const,
  answerFormat: 'TEXT_CHOICE' as const,
  scaleMin: null,
  scaleMax: null,
  scaleLabelMin: null,
  scaleLabelMax: null,
  timeLimitMins: 10,
  totalQuestions: loveQuestions.length,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const loveQuestionsData = loveQuestions.map((q, i) => {
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
