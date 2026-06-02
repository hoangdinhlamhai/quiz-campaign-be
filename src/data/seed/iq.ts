import { CAT_TRI_TUE } from './categories.js';

const quizId = 'qz_trac-nghiem-iq';

// ============================================================
// Đáp án đúng cho 30 câu IQ (index 0-5 = A-F)
// ============================================================
const iqAnswerKey: Array<{ correctIndex: number; patternHint: string }> = [
  // --- DỄ (1-10) ---
  { correctIndex: 2, patternHint: 'Lưới 2×2 tam giác xoay 90° mỗi ô — ô trống cần xoay thêm 90°' },
  { correctIndex: 4, patternHint: 'Dãy tăng số cạnh: △(3) → □(4) → ⬠(5) → ?(6 cạnh)' },
  { correctIndex: 1, patternHint: 'Hình tròn chia 4 phần — tô đen thêm 1 phần mỗi bước' },
  { correctIndex: 0, patternHint: 'Mũi tên xoay 45° theo chiều kim đồng hồ mỗi bước' },
  { correctIndex: 3, patternHint: 'Ma trận 3×3 mỗi hàng có ○△□ — thiếu hình nào?' },
  { correctIndex: 5, patternHint: 'Dãy: chấm tăng 1→2→3→4→5 → ?(6 chấm)' },
  { correctIndex: 2, patternHint: 'Hình xoay 180° qua mỗi bước (lật ngược)' },
  { correctIndex: 4, patternHint: 'Kẻ sọc tăng dần: 1→2→3 sọc ngang trong hình vuông' },
  { correctIndex: 1, patternHint: 'Hình co dần: lớn→vừa→nhỏ trong khung cố định' },
  { correctIndex: 3, patternHint: 'Luân phiên đen-trắng: ●○●○● → ?(○)' },
  // --- TRUNG BÌNH (11-20) ---
  { correctIndex: 0, patternHint: 'Ma trận 3×3: xoay 90° mỗi cột + đổi fill trắng↔đen mỗi hàng' },
  { correctIndex: 5, patternHint: 'Phép cộng hình: hình A chồng lên hình B = hình C' },
  { correctIndex: 2, patternHint: 'Đối xứng gương ngang — lật hình bên trái qua trục dọc' },
  { correctIndex: 4, patternHint: 'Ma trận 3×3: mỗi hàng/cột có đủ 3 hình VÀ 3 màu' },
  { correctIndex: 1, patternHint: 'Đường thẳng tăng dần: 1→2→3→?(4 đường tạo *)' },
  { correctIndex: 3, patternHint: 'Hình lồng nhau: ngoài xoay trái, trong xoay phải' },
  { correctIndex: 0, patternHint: 'Ma trận: hàng 1 trừ hàng 2 = hàng 3 (phép trừ hình)' },
  { correctIndex: 5, patternHint: 'Đường chéo ma trận giữ nguyên hình, các ô khác biến đổi' },
  { correctIndex: 2, patternHint: 'Mẫu lặp ABC-BCA-CAB → ô cuối cần hình gì?' },
  { correctIndex: 4, patternHint: 'Hình phóng to 2× + xoay 90° qua mỗi bước' },
  // --- KHÓ (21-30) ---
  { correctIndex: 1, patternHint: 'Ma trận 3×3: 2 quy luật — xoay hình + đổi nét liền↔đứt' },
  { correctIndex: 3, patternHint: 'Phép XOR hình: phần trùng biến mất, phần khác giữ lại' },
  { correctIndex: 0, patternHint: 'Ma trận 3×3 với 3 quy luật: hình + màu + kích cỡ' },
  { correctIndex: 5, patternHint: 'Chuỗi biến đổi: xoay 60° + thu nhỏ + đổi fill mỗi bước' },
  { correctIndex: 2, patternHint: 'Ma trận 4×4 — quy luật theo hàng VÀ cột VÀ chéo' },
  { correctIndex: 4, patternHint: 'Fractal: hình nhỏ lặp lại cấu trúc hình lớn ở scale khác' },
  { correctIndex: 1, patternHint: 'Logical AND: giữ phần chung của 2 hình → tạo hình thứ 3' },
  { correctIndex: 3, patternHint: 'Biến đổi lồng: vòng ngoài theo quy luật A, vòng trong theo B' },
  { correctIndex: 0, patternHint: 'Ma trận 3×3 với 4 quy luật đồng thời — cực khó' },
  { correctIndex: 5, patternHint: 'Chuỗi biến đổi kết hợp XOR + xoay + scale + flip' },
];

const answerLabels = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

const iqQuestions = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  const nn = String(n).padStart(2, '0');
  const qId = `${quizId}_q${n}`;
  const { correctIndex } = iqAnswerKey[i];

  return {
    question: {
      id: qId, quizId,
      content: `Câu ${n}: Hình nào hoàn thành dãy hình sau?`,
      imageUrl: `/images/iq/iq-cau-${nn}-de.png`,
      orderNumber: n, dimensionKey: null, isReverseScored: false,
    },
    answers: Array.from({ length: 6 }, (_, ai) => ({
      id: `${qId}_a${ai + 1}`, questionId: qId,
      content: `Đáp án ${answerLabels[ai].toUpperCase()}`,
      imageUrl: `/images/iq/iq-cau-${nn}-dap-an-${answerLabels[ai]}.png`,
      isCorrect: ai === correctIndex,
      scoreValue: ai === correctIndex ? 1 : 0,
      dimensionPole: null,
    })),
  };
});

export const iqQuiz = {
  id: quizId, categoryId: CAT_TRI_TUE,
  title: 'Trắc nghiệm IQ (Chỉ số thông minh)',
  slug: 'trac-nghiem-iq',
  description: 'Đánh giá chỉ số thông minh qua 30 câu hỏi hình ảnh về quy luật logic và không gian.',
  instruction: 'Quan sát dãy hình và chọn hình phù hợp nhất để hoàn thành quy luật.',
  thumbnailUrl: '/images/thumbnails/thumb-iq.png',
  quizType: 'SCORED' as const, answerFormat: 'IMAGE_CHOICE' as const,
  scaleMin: null, scaleMax: null, scaleLabelMin: null, scaleLabelMax: null,
  timeLimitMins: 30, totalQuestions: 30,
  isPublished: true, viewCount: 0, completionCount: 0, createdAt: Date.now(),
};

export const iqQuestionsData = iqQuestions;
export { iqAnswerKey };
