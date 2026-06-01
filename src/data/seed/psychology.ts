import { nanoid } from 'nanoid';
import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = nanoid();

const psychQuestions: Array<{ content: string; isReverse?: boolean }> = [
  { content: 'Tôi cảm thấy hài lòng với cuộc sống hiện tại.' },
  { content: 'Tôi thường cảm thấy lo lắng mà không rõ lý do.', isReverse: true },
  { content: 'Tôi có thể tập trung vào công việc trong thời gian dài.' },
  { content: 'Tôi ngủ ngon và đủ giấc hầu hết các đêm.' },
  { content: 'Tôi cảm thấy có giá trị và được yêu thương.' },
  { content: 'Tôi hay cảm thấy cô đơn dù ở giữa mọi người.', isReverse: true },
  { content: 'Tôi có thể kiểm soát suy nghĩ tiêu cực.' },
  { content: 'Tôi cảm thấy lạc quan về tương lai.' },
  { content: 'Tôi có mối quan hệ tốt với gia đình và bạn bè.' },
  { content: 'Tôi thường cảm thấy kiệt sức về mặt tinh thần.', isReverse: true },
  { content: 'Tôi có sở thích và hoạt động mang lại niềm vui.' },
  { content: 'Tôi có thể đối mặt với áp lực mà không suy sụp.' },
  { content: 'Tôi cảm thấy cuộc sống có ý nghĩa và mục đích.' },
  { content: 'Tôi hay so sánh bản thân với người khác và thấy thua kém.', isReverse: true },
  { content: 'Tôi biết cách chăm sóc sức khỏe tinh thần của mình.' },
  { content: 'Tôi cảm thấy tự tin trong các quyết định của mình.' },
  { content: 'Tôi có thể tha thứ cho bản thân khi mắc sai lầm.' },
  { content: 'Tôi thường mất hứng thú với những thứ từng yêu thích.', isReverse: true },
  { content: 'Tôi cảm thấy cân bằng giữa công việc và cuộc sống.' },
  { content: 'Tôi có khả năng thích nghi với thay đổi trong cuộc sống.' },
];

export const psychologyQuiz = {
  id: quizId,
  categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm sức khỏe tâm lý',
  slug: 'trac-nghiem-suc-khoe-tam-ly',
  description: 'Đánh giá tổng quan sức khỏe tinh thần: mức độ hài lòng, stress, và cân bằng cảm xúc.',
  instruction: 'Đánh giá mức độ đồng ý với mỗi phát biểu theo thang 1-5.',
  thumbnailUrl: '/thumbnails/psychology.png',
  quizType: 'SCORED' as const,
  answerFormat: 'LIKERT_SCALE' as const,
  scaleMin: 1,
  scaleMax: 5,
  scaleLabelMin: 'Hoàn toàn không đồng ý',
  scaleLabelMax: 'Hoàn toàn đồng ý',
  timeLimitMins: 10,
  totalQuestions: psychQuestions.length,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const psychologyQuestionsData = psychQuestions.map((q, i) => ({
  id: nanoid(),
  quizId,
  content: q.content,
  imageUrl: null,
  orderNumber: i + 1,
  dimensionKey: 'TOTAL',
  isReverseScored: q.isReverse ?? false,
}));
