import { nanoid } from 'nanoid';
import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = nanoid();

const bigFiveQuestions: Array<{ content: string; dimension: string; isReverse?: boolean }> = [
  { content: 'Tôi thích thử những trải nghiệm mới và khác lạ.', dimension: 'O' },
  { content: 'Tôi có trí tưởng tượng phong phú.', dimension: 'O' },
  { content: 'Tôi thích suy nghĩ về các khái niệm trừu tượng.', dimension: 'O' },
  { content: 'Tôi không quan tâm đến nghệ thuật hay thẩm mỹ.', dimension: 'O', isReverse: true },
  { content: 'Tôi thích khám phá những ý tưởng mới lạ.', dimension: 'O' },
  { content: 'Tôi luôn hoàn thành công việc đúng hạn.', dimension: 'C' },
  { content: 'Tôi chú ý đến từng chi tiết nhỏ.', dimension: 'C' },
  { content: 'Tôi có xu hướng lộn xộn và thiếu tổ chức.', dimension: 'C', isReverse: true },
  { content: 'Tôi lập kế hoạch trước khi bắt đầu làm việc.', dimension: 'C' },
  { content: 'Tôi tuân thủ quy tắc và lịch trình đã đặt ra.', dimension: 'C' },
  { content: 'Tôi cảm thấy thoải mái khi ở giữa đám đông.', dimension: 'E' },
  { content: 'Tôi thích là trung tâm của sự chú ý.', dimension: 'E' },
  { content: 'Tôi thường im lặng khi ở cùng người lạ.', dimension: 'E', isReverse: true },
  { content: 'Tôi dễ dàng kết bạn mới.', dimension: 'E' },
  { content: 'Tôi cảm thấy tràn đầy năng lượng khi giao tiếp.', dimension: 'E' },
  { content: 'Tôi quan tâm đến cảm xúc của người khác.', dimension: 'A' },
  { content: 'Tôi sẵn sàng giúp đỡ người khác mà không cần đền đáp.', dimension: 'A' },
  { content: 'Tôi hay nghi ngờ ý định của người khác.', dimension: 'A', isReverse: true },
  { content: 'Tôi tin rằng mọi người về cơ bản là tốt.', dimension: 'A' },
  { content: 'Tôi cố gắng hợp tác thay vì cạnh tranh.', dimension: 'A' },
  { content: 'Tôi hay lo lắng về nhiều thứ.', dimension: 'N' },
  { content: 'Tôi dễ bị stress và căng thẳng.', dimension: 'N' },
  { content: 'Tôi hiếm khi cảm thấy buồn hay chán nản.', dimension: 'N', isReverse: true },
  { content: 'Tôi thường cảm thấy bất an về bản thân.', dimension: 'N' },
  { content: 'Tâm trạng tôi hay thay đổi thất thường.', dimension: 'N' },
];

export const bigFiveQuiz = {
  id: quizId,
  categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm Big Five (5 yếu tố tính cách)',
  slug: 'trac-nghiem-big-five',
  description: 'Khám phá 5 chiều tính cách lớn: Cởi mở, Tận tâm, Hướng ngoại, Dễ chịu, Nhạy cảm.',
  instruction: 'Đánh giá mức độ đồng ý với mỗi phát biểu theo thang 1-5.',
  thumbnailUrl: '/thumbnails/big-five.png',
  quizType: 'MI_LIKERT' as const,
  answerFormat: 'LIKERT_SCALE' as const,
  scaleMin: 1,
  scaleMax: 5,
  scaleLabelMin: 'Hoàn toàn không đồng ý',
  scaleLabelMax: 'Hoàn toàn đồng ý',
  timeLimitMins: 15,
  totalQuestions: bigFiveQuestions.length,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const bigFiveQuestionsData = bigFiveQuestions.map((q, i) => ({
  id: nanoid(),
  quizId,
  content: q.content,
  imageUrl: null,
  orderNumber: i + 1,
  dimensionKey: q.dimension,
  isReverseScored: q.isReverse ?? false,
}));
