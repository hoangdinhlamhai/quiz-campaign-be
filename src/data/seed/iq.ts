import { nanoid } from 'nanoid';
import { CAT_TRI_TUE } from './categories.js';

const quizId = nanoid();

const iqQuestions = Array.from({ length: 15 }, (_, i) => {
  const n = i + 1;
  const qId = nanoid();
  const correctIndex = Math.floor(Math.random() * 6);

  return {
    question: {
      id: qId,
      quizId,
      content: `Câu ${n}: Hình nào hoàn thành dãy hình sau?`,
      imageUrl: `/iq/q${n}.png`,
      orderNumber: n,
      dimensionKey: null,
      isReverseScored: false,
    },
    answers: Array.from({ length: 6 }, (_, ai) => ({
      id: nanoid(),
      questionId: qId,
      content: String.fromCharCode(65 + ai),
      imageUrl: `/iq/q${n}-${String.fromCharCode(97 + ai)}.png`,
      isCorrect: ai === correctIndex,
      scoreValue: ai === correctIndex ? 1 : 0,
      dimensionPole: null,
    })),
  };
});

export const iqQuiz = {
  id: quizId,
  categoryId: CAT_TRI_TUE,
  title: 'Trắc nghiệm IQ (Chỉ số thông minh)',
  slug: 'trac-nghiem-iq',
  description: 'Đánh giá chỉ số thông minh qua 15 câu hỏi hình ảnh về quy luật logic và không gian.',
  instruction: 'Quan sát dãy hình và chọn hình phù hợp nhất để hoàn thành quy luật. Thời gian giới hạn.',
  thumbnailUrl: '/thumbnails/iq.png',
  quizType: 'SCORED' as const,
  answerFormat: 'IMAGE_CHOICE' as const,
  scaleMin: null,
  scaleMax: null,
  scaleLabelMin: null,
  scaleLabelMax: null,
  timeLimitMins: 20,
  totalQuestions: 15,
  isPublished: true,
  viewCount: 0,
  completionCount: 0,
  createdAt: Date.now(),
};

export const iqQuestionsData = iqQuestions;
