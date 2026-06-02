import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = 'qz_trac-nghiem-big-five';

const bigFiveQuestions: Array<{ content: string; dimension: string; isReverse?: boolean }> = [
  // ===== O — Openness / Cởi mở (10 câu) =====
  { content: 'Tôi thích thử những trải nghiệm mới và khác lạ.', dimension: 'O' },
  { content: 'Tôi có trí tưởng tượng phong phú.', dimension: 'O' },
  { content: 'Tôi thích suy nghĩ về các khái niệm trừu tượng.', dimension: 'O' },
  { content: 'Tôi không quan tâm đến nghệ thuật hay thẩm mỹ.', dimension: 'O', isReverse: true },
  { content: 'Tôi thích khám phá những ý tưởng mới lạ.', dimension: 'O' },
  { content: 'Tôi tò mò về nhiều lĩnh vực khác nhau.', dimension: 'O' },
  { content: 'Tôi thích đọc sách hoặc xem phim về những chủ đề lạ.', dimension: 'O' },
  { content: 'Tôi thích làm theo cách quen thuộc hơn là thử cách mới.', dimension: 'O', isReverse: true },
  { content: 'Tôi dễ dàng chấp nhận những quan điểm khác biệt.', dimension: 'O' },
  { content: 'Tôi thường mơ mộng và tưởng tượng về nhiều khả năng.', dimension: 'O' },
  // ===== C — Conscientiousness / Tận tâm (10 câu) =====
  { content: 'Tôi luôn hoàn thành công việc đúng hạn.', dimension: 'C' },
  { content: 'Tôi chú ý đến từng chi tiết nhỏ.', dimension: 'C' },
  { content: 'Tôi có xu hướng lộn xộn và thiếu tổ chức.', dimension: 'C', isReverse: true },
  { content: 'Tôi lập kế hoạch trước khi bắt đầu làm việc.', dimension: 'C' },
  { content: 'Tôi tuân thủ quy tắc và lịch trình đã đặt ra.', dimension: 'C' },
  { content: 'Tôi kiên trì theo đuổi mục tiêu dù gặp khó khăn.', dimension: 'C' },
  { content: 'Tôi thường trì hoãn công việc quan trọng.', dimension: 'C', isReverse: true },
  { content: 'Tôi làm việc một cách có hệ thống và phương pháp.', dimension: 'C' },
  { content: 'Tôi cố gắng làm tốt nhất mọi thứ mình đảm nhận.', dimension: 'C' },
  { content: 'Tôi dễ dàng bị phân tâm khi đang làm việc.', dimension: 'C', isReverse: true },
  // ===== E — Extraversion / Hướng ngoại (10 câu) =====
  { content: 'Tôi cảm thấy thoải mái khi ở giữa đám đông.', dimension: 'E' },
  { content: 'Tôi thích là trung tâm của sự chú ý.', dimension: 'E' },
  { content: 'Tôi thường im lặng khi ở cùng người lạ.', dimension: 'E', isReverse: true },
  { content: 'Tôi dễ dàng kết bạn mới.', dimension: 'E' },
  { content: 'Tôi cảm thấy tràn đầy năng lượng khi giao tiếp.', dimension: 'E' },
  { content: 'Tôi thích tham gia các hoạt động nhóm hơn làm một mình.', dimension: 'E' },
  { content: 'Tôi cảm thấy kiệt sức sau khi giao tiếp nhiều.', dimension: 'E', isReverse: true },
  { content: 'Tôi chủ động bắt chuyện với người mới quen.', dimension: 'E' },
  { content: 'Tôi thích những buổi tiệc đông vui.', dimension: 'E' },
  { content: 'Tôi thích dành thời gian một mình hơn đi chơi.', dimension: 'E', isReverse: true },
  // ===== A — Agreeableness / Dễ chịu (10 câu) =====
  { content: 'Tôi quan tâm đến cảm xúc của người khác.', dimension: 'A' },
  { content: 'Tôi sẵn sàng giúp đỡ người khác mà không cần đền đáp.', dimension: 'A' },
  { content: 'Tôi hay nghi ngờ ý định của người khác.', dimension: 'A', isReverse: true },
  { content: 'Tôi tin rằng mọi người về cơ bản là tốt.', dimension: 'A' },
  { content: 'Tôi cố gắng hợp tác thay vì cạnh tranh.', dimension: 'A' },
  { content: 'Tôi dễ dàng tha thứ cho người làm tôi tổn thương.', dimension: 'A' },
  { content: 'Tôi thường phê phán người khác khi họ mắc lỗi.', dimension: 'A', isReverse: true },
  { content: 'Tôi cố gắng nhìn mọi việc từ góc nhìn của người khác.', dimension: 'A' },
  { content: 'Tôi thường nhường nhịn để giữ hòa khí.', dimension: 'A' },
  { content: 'Tôi cảm thấy khó chịu khi phải chiều theo ý người khác.', dimension: 'A', isReverse: true },
  // ===== N — Neuroticism / Nhạy cảm (10 câu) =====
  { content: 'Tôi hay lo lắng về nhiều thứ.', dimension: 'N' },
  { content: 'Tôi dễ bị stress và căng thẳng.', dimension: 'N' },
  { content: 'Tôi hiếm khi cảm thấy buồn hay chán nản.', dimension: 'N', isReverse: true },
  { content: 'Tôi thường cảm thấy bất an về bản thân.', dimension: 'N' },
  { content: 'Tâm trạng tôi hay thay đổi thất thường.', dimension: 'N' },
  { content: 'Tôi dễ dàng bình tĩnh lại sau khi tức giận.', dimension: 'N', isReverse: true },
  { content: 'Tôi thường nghĩ quá nhiều về những điều đã qua.', dimension: 'N' },
  { content: 'Tôi cảm thấy dễ bị tổn thương bởi lời nói người khác.', dimension: 'N' },
  { content: 'Tôi ít khi cảm thấy cô đơn hay buồn bã.', dimension: 'N', isReverse: true },
  { content: 'Tôi hay cảm thấy áp lực trong các tình huống xã hội.', dimension: 'N' },
];

export const bigFiveQuiz = {
  id: quizId, categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm Big Five (5 yếu tố tính cách)',
  slug: 'trac-nghiem-big-five',
  description: 'Khám phá 5 chiều tính cách lớn: Cởi mở, Tận tâm, Hướng ngoại, Dễ chịu, Nhạy cảm.',
  instruction: 'Đánh giá mức độ đồng ý với mỗi phát biểu theo thang 1-5.',
  thumbnailUrl: '/images/thumbnails/thumb-big-five.png',
  quizType: 'MI_LIKERT' as const, answerFormat: 'LIKERT_SCALE' as const,
  scaleMin: 1, scaleMax: 5,
  scaleLabelMin: 'Hoàn toàn không đồng ý', scaleLabelMax: 'Hoàn toàn đồng ý',
  timeLimitMins: 20, totalQuestions: bigFiveQuestions.length,
  isPublished: true, viewCount: 0, completionCount: 0, createdAt: Date.now(),
};

export const bigFiveQuestionsData = bigFiveQuestions.map((q, i) => ({
  id: `${quizId}_q${i + 1}`, quizId,
  content: q.content, imageUrl: null,
  orderNumber: i + 1, dimensionKey: q.dimension,
  isReverseScored: q.isReverse ?? false,
}));
