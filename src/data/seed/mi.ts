import { CAT_NGHE_NGHIEP } from './categories.js';

const quizId = 'qz_trac-nghiem-da-tri-tue-mi';

type MiDimension = 'NGON_NGU' | 'LOGIC' | 'KHONG_GIAN' | 'AM_NHAC' | 'VAN_DONG' | 'THIEN_NHIEN' | 'TUONG_TAC' | 'NOI_TAM';

const miQuestionsByDimension: Record<MiDimension, string[]> = {
  NGON_NGU: [
    'Tôi thích đọc sách, báo hoặc viết lách.',
    'Tôi dễ dàng diễn đạt ý tưởng bằng lời nói.',
    'Tôi thích chơi các trò chơi chữ như ô chữ, đố vui.',
    'Tôi nhớ tốt những gì mình đọc hoặc nghe.',
    'Tôi thích học ngoại ngữ mới.',
    'Tôi có khả năng thuyết phục người khác bằng lời nói.',
  ],
  LOGIC: [
    'Tôi thích giải các bài toán và câu đố logic.',
    'Tôi hay tìm quy luật và mối liên hệ giữa các sự vật.',
    'Tôi thích phân tích vấn đề một cách có hệ thống.',
    'Tôi giỏi tính nhẩm và làm việc với con số.',
    'Tôi thích thí nghiệm và kiểm chứng giả thuyết.',
    'Tôi hay đặt câu hỏi "tại sao" và "như thế nào".',
  ],
  KHONG_GIAN: [
    'Tôi dễ dàng hình dung vật thể trong không gian 3D.',
    'Tôi thích vẽ, thiết kế hoặc chụp ảnh.',
    'Tôi có khả năng đọc bản đồ và định hướng tốt.',
    'Tôi nhớ hình ảnh tốt hơn chữ viết.',
    'Tôi thích xếp hình, lắp ráp hoặc mô hình.',
    'Tôi chú ý đến màu sắc, hình dạng và bố cục.',
  ],
  AM_NHAC: [
    'Tôi dễ dàng nhận ra giai điệu và nhịp điệu.',
    'Tôi thường hát hoặc ngân nga khi làm việc.',
    'Tôi có thể nhớ bài hát sau vài lần nghe.',
    'Tôi nhạy cảm với âm thanh xung quanh.',
    'Tôi thích chơi nhạc cụ hoặc sáng tác.',
    'Âm nhạc ảnh hưởng mạnh đến tâm trạng của tôi.',
  ],
  VAN_DONG: [
    'Tôi thích các hoạt động thể chất và thể thao.',
    'Tôi học tốt nhất khi được thực hành trực tiếp.',
    'Tôi có khả năng phối hợp cơ thể tốt.',
    'Tôi thích làm đồ thủ công hoặc sửa chữa.',
    'Tôi khó ngồi yên một chỗ trong thời gian dài.',
    'Tôi diễn đạt ý tưởng tốt qua cử chỉ và hành động.',
  ],
  THIEN_NHIEN: [
    'Tôi thích quan sát và tìm hiểu về thiên nhiên.',
    'Tôi dễ dàng phân biệt các loài cây, hoa, động vật.',
    'Tôi cảm thấy thư giãn khi ở ngoài trời.',
    'Tôi quan tâm đến vấn đề môi trường và sinh thái.',
    'Tôi thích trồng cây hoặc chăm sóc vật nuôi.',
    'Tôi nhận ra các quy luật và chu kỳ trong tự nhiên.',
  ],
  TUONG_TAC: [
    'Tôi thích làm việc nhóm hơn làm một mình.',
    'Tôi dễ dàng hiểu cảm xúc và động cơ của người khác.',
    'Tôi thường được bạn bè tìm đến để xin lời khuyên.',
    'Tôi có khả năng lãnh đạo và tổ chức nhóm.',
    'Tôi thích tham gia các hoạt động cộng đồng.',
    'Tôi giao tiếp hiệu quả với nhiều kiểu người.',
  ],
  NOI_TAM: [
    'Tôi thường suy ngẫm về bản thân và cuộc sống.',
    'Tôi hiểu rõ điểm mạnh và điểm yếu của mình.',
    'Tôi thích dành thời gian một mình để suy nghĩ.',
    'Tôi có mục tiêu rõ ràng và biết mình muốn gì.',
    'Tôi viết nhật ký hoặc ghi lại suy nghĩ cá nhân.',
    'Tôi tự đặt ra tiêu chuẩn cao cho bản thân.',
  ],
};

const allQuestions: Array<{ content: string; dimensionKey: MiDimension }> = [];
const dimensions = Object.keys(miQuestionsByDimension) as MiDimension[];
for (const dim of dimensions) {
  for (const q of miQuestionsByDimension[dim]) {
    allQuestions.push({ content: q, dimensionKey: dim });
  }
}

export const miQuiz = {
  id: quizId, categoryId: CAT_NGHE_NGHIEP,
  title: 'Trắc nghiệm Đa trí tuệ (MI)',
  slug: 'trac-nghiem-da-tri-tue-mi',
  description: 'Khám phá 8 loại trí thông minh theo lý thuyết Howard Gardner.',
  instruction: 'Đánh giá mức độ đồng ý với mỗi phát biểu theo thang 1-5.',
  thumbnailUrl: '/images/thumbnails/thumb-mi.png',
  quizType: 'MI_LIKERT' as const, answerFormat: 'LIKERT_SCALE' as const,
  scaleMin: 1, scaleMax: 5,
  scaleLabelMin: 'Hoàn toàn không đồng ý', scaleLabelMax: 'Hoàn toàn đồng ý',
  timeLimitMins: 20, totalQuestions: allQuestions.length,
  isPublished: true, viewCount: 0, completionCount: 0, createdAt: Date.now(),
};

export const miQuestionsData = allQuestions.map((q, i) => ({
  id: `${quizId}_q${i + 1}`, quizId,
  content: q.content, imageUrl: null,
  orderNumber: i + 1, dimensionKey: q.dimensionKey,
  isReverseScored: false,
}));
