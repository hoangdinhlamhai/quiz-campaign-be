import { CAT_TRI_TUE } from './categories.js';

interface DiscQuestion {
  content: string;
  answers: Array<{ text: string; pole: 'D' | 'I' | 'S' | 'C' }>;
}

function makeDiscQuestions(count: number): DiscQuestion[] {
  const pool: DiscQuestion[] = [
    { content: 'Khi làm việc nhóm, bạn thường:', answers: [{ text: 'Đưa ra quyết định nhanh và dẫn dắt nhóm', pole: 'D' }, { text: 'Tạo không khí vui vẻ, động viên mọi người', pole: 'I' }, { text: 'Hỗ trợ thầm lặng và giữ sự ổn định', pole: 'S' }, { text: 'Phân tích kỹ lưỡng trước khi hành động', pole: 'C' }] },
    { content: 'Khi gặp xung đột, bạn:', answers: [{ text: 'Đối mặt trực tiếp và giải quyết ngay', pole: 'D' }, { text: 'Dùng sự hài hước để xoa dịu tình hình', pole: 'I' }, { text: 'Nhường nhịn để giữ hòa khí', pole: 'S' }, { text: 'Phân tích nguyên nhân gốc rễ rồi mới nói', pole: 'C' }] },
    { content: 'Điều gì khiến bạn có động lực nhất:', answers: [{ text: 'Thử thách và cơ hội chiến thắng', pole: 'D' }, { text: 'Được công nhận và khen ngợi', pole: 'I' }, { text: 'Môi trường ổn định và an toàn', pole: 'S' }, { text: 'Được làm việc chính xác, chất lượng cao', pole: 'C' }] },
    { content: 'Phong cách giao tiếp của bạn:', answers: [{ text: 'Thẳng thắn, đi vào trọng tâm', pole: 'D' }, { text: 'Nhiệt tình, hay kể chuyện', pole: 'I' }, { text: 'Nhẹ nhàng, lắng nghe nhiều hơn nói', pole: 'S' }, { text: 'Cẩn thận, dùng dữ liệu minh chứng', pole: 'C' }] },
    { content: 'Khi nhận một dự án mới, bạn:', answers: [{ text: 'Bắt tay vào làm ngay, tính sau', pole: 'D' }, { text: 'Hào hứng chia sẻ ý tưởng với mọi người', pole: 'I' }, { text: 'Tìm hiểu kỹ yêu cầu rồi mới bắt đầu', pole: 'S' }, { text: 'Lập kế hoạch chi tiết từng bước', pole: 'C' }] },
    { content: 'Bạn sợ nhất điều gì:', answers: [{ text: 'Mất quyền kiểm soát', pole: 'D' }, { text: 'Bị cô lập, không ai quan tâm', pole: 'I' }, { text: 'Sự thay đổi đột ngột', pole: 'S' }, { text: 'Mắc sai lầm hoặc bị phê bình', pole: 'C' }] },
    { content: 'Trong cuộc họp, bạn thường:', answers: [{ text: 'Chủ trì và đưa ra kết luận', pole: 'D' }, { text: 'Phát biểu nhiều, đề xuất ý tưởng sáng tạo', pole: 'I' }, { text: 'Lắng nghe và đồng ý với đa số', pole: 'S' }, { text: 'Ghi chép và đặt câu hỏi chi tiết', pole: 'C' }] },
    { content: 'Khi bị áp lực deadline:', answers: [{ text: 'Tăng tốc và yêu cầu mọi người làm nhanh hơn', pole: 'D' }, { text: 'Vẫn lạc quan, tin rằng sẽ xong', pole: 'I' }, { text: 'Lo lắng nhưng cố gắng hoàn thành đúng hạn', pole: 'S' }, { text: 'Kiểm tra lại mọi thứ để đảm bảo không sai sót', pole: 'C' }] },
    { content: 'Bạn đánh giá thành công dựa trên:', answers: [{ text: 'Kết quả đạt được và vị trí đứng đầu', pole: 'D' }, { text: 'Sự công nhận từ mọi người xung quanh', pole: 'I' }, { text: 'Sự hài lòng và cân bằng trong cuộc sống', pole: 'S' }, { text: 'Chất lượng công việc hoàn hảo', pole: 'C' }] },
    { content: 'Khi ai đó làm sai, bạn:', answers: [{ text: 'Chỉ ra lỗi ngay và yêu cầu sửa', pole: 'D' }, { text: 'Nói đùa nhẹ nhàng rồi gợi ý cách sửa', pole: 'I' }, { text: 'Ngại nói, chờ họ tự nhận ra', pole: 'S' }, { text: 'Giải thích chi tiết tại sao sai và cách đúng', pole: 'C' }] },
    { content: 'Môi trường làm việc lý tưởng của bạn:', answers: [{ text: 'Cạnh tranh, nhiều thử thách', pole: 'D' }, { text: 'Vui vẻ, nhiều tương tác xã hội', pole: 'I' }, { text: 'Ổn định, ít thay đổi', pole: 'S' }, { text: 'Có quy trình rõ ràng, logic', pole: 'C' }] },
    { content: 'Khi phải thuyết trình, bạn:', answers: [{ text: 'Tự tin, nói ngắn gọn và mạnh mẽ', pole: 'D' }, { text: 'Hào hứng, kể nhiều câu chuyện sinh động', pole: 'I' }, { text: 'Hơi lo lắng nhưng chuẩn bị kỹ', pole: 'S' }, { text: 'Trình bày có cấu trúc, nhiều số liệu', pole: 'C' }] },
    { content: 'Bạn xử lý email công việc thế nào:', answers: [{ text: 'Trả lời ngắn gọn, đi thẳng vào vấn đề', pole: 'D' }, { text: 'Viết dài, thêm emoji và lời chào thân thiện', pole: 'I' }, { text: 'Đọc kỹ và trả lời lịch sự, cẩn thận', pole: 'S' }, { text: 'Kiểm tra lại nhiều lần trước khi gửi', pole: 'C' }] },
    { content: 'Khi được giao nhiệm vụ mới:', answers: [{ text: 'Muốn biết mục tiêu cuối cùng, tự tìm cách', pole: 'D' }, { text: 'Muốn biết ai cùng làm và có vui không', pole: 'I' }, { text: 'Muốn biết quy trình và thời gian cụ thể', pole: 'S' }, { text: 'Muốn biết tiêu chuẩn chất lượng chi tiết', pole: 'C' }] },
    { content: 'Cuối tuần, bạn thường:', answers: [{ text: 'Tham gia hoạt động thể thao, thử thách', pole: 'D' }, { text: 'Đi chơi, gặp gỡ bạn bè', pole: 'I' }, { text: 'Ở nhà nghỉ ngơi, xem phim', pole: 'S' }, { text: 'Đọc sách, học thêm kỹ năng mới', pole: 'C' }] },
    { content: 'Khi mua hàng online, bạn:', answers: [{ text: 'Quyết định nhanh, mua ngay', pole: 'D' }, { text: 'Hỏi ý kiến bạn bè trước khi mua', pole: 'I' }, { text: 'So sánh nhiều nơi, chọn nơi quen thuộc', pole: 'S' }, { text: 'Đọc kỹ review, so sánh thông số chi tiết', pole: 'C' }] },
    { content: 'Điểm yếu lớn nhất của bạn:', answers: [{ text: 'Thiếu kiên nhẫn, hay nóng tính', pole: 'D' }, { text: 'Hay nói nhiều, thiếu tập trung', pole: 'I' }, { text: 'Ngại thay đổi, khó nói "không"', pole: 'S' }, { text: 'Quá cầu toàn, hay lo lắng', pole: 'C' }] },
    { content: 'Bạn thể hiện sự quan tâm bằng cách:', answers: [{ text: 'Giúp họ giải quyết vấn đề cụ thể', pole: 'D' }, { text: 'Dành thời gian trò chuyện và vui đùa', pole: 'I' }, { text: 'Lắng nghe và luôn có mặt khi cần', pole: 'S' }, { text: 'Tìm hiểu kỹ vấn đề và đưa lời khuyên', pole: 'C' }] },
    { content: 'Khi học một kỹ năng mới:', answers: [{ text: 'Thực hành ngay, học qua trải nghiệm', pole: 'D' }, { text: 'Học cùng nhóm, trao đổi với người khác', pole: 'I' }, { text: 'Học từ từ, lặp lại nhiều lần cho quen', pole: 'S' }, { text: 'Đọc tài liệu hướng dẫn chi tiết trước', pole: 'C' }] },
    { content: 'Người khác thường mô tả bạn là:', answers: [{ text: 'Quyết đoán và mạnh mẽ', pole: 'D' }, { text: 'Vui vẻ và dễ gần', pole: 'I' }, { text: 'Đáng tin cậy và kiên nhẫn', pole: 'S' }, { text: 'Cẩn thận và chính xác', pole: 'C' }] },
    { content: 'Khi phải chờ đợi lâu:', answers: [{ text: 'Rất khó chịu, muốn mọi thứ nhanh hơn', pole: 'D' }, { text: 'Bắt chuyện với người xung quanh', pole: 'I' }, { text: 'Kiên nhẫn chờ, không phàn nàn', pole: 'S' }, { text: 'Tranh thủ đọc hoặc làm việc gì đó', pole: 'C' }] },
    { content: 'Bạn quản lý tài chính cá nhân thế nào:', answers: [{ text: 'Chi tiêu mạnh tay cho những gì muốn', pole: 'D' }, { text: 'Hay mời bạn bè, chi cho trải nghiệm', pole: 'I' }, { text: 'Tiết kiệm đều đặn, ít mạo hiểm', pole: 'S' }, { text: 'Ghi chép chi tiết, lập ngân sách rõ ràng', pole: 'C' }] },
    { content: 'Khi nhóm không đồng ý với ý kiến bạn:', answers: [{ text: 'Kiên quyết bảo vệ quan điểm của mình', pole: 'D' }, { text: 'Thuyết phục bằng sự nhiệt tình', pole: 'I' }, { text: 'Chấp nhận ý kiến đa số', pole: 'S' }, { text: 'Đưa ra bằng chứng logic để chứng minh', pole: 'C' }] },
    { content: 'Bạn xử lý stress bằng cách:', answers: [{ text: 'Tập thể dục mạnh hoặc làm việc nhiều hơn', pole: 'D' }, { text: 'Gặp gỡ bạn bè, tâm sự', pole: 'I' }, { text: 'Nghỉ ngơi, làm những việc quen thuộc', pole: 'S' }, { text: 'Phân tích nguyên nhân và lập kế hoạch giải quyết', pole: 'C' }] },
    { content: 'Khi được thăng chức, bạn:', answers: [{ text: 'Lập tức đặt mục tiêu cao hơn', pole: 'D' }, { text: 'Ăn mừng và chia sẻ tin vui với mọi người', pole: 'I' }, { text: 'Cảm thấy lo lắng về trách nhiệm mới', pole: 'S' }, { text: 'Nghiên cứu kỹ vai trò mới trước khi bắt đầu', pole: 'C' }] },
    { content: 'Bạn đánh giá một người qua:', answers: [{ text: 'Năng lực và kết quả họ đạt được', pole: 'D' }, { text: 'Tính cách và sự thú vị của họ', pole: 'I' }, { text: 'Sự chân thành và đáng tin cậy', pole: 'S' }, { text: 'Kiến thức và sự chuyên nghiệp', pole: 'C' }] },
    { content: 'Khi phải làm việc một mình cả ngày:', answers: [{ text: 'Hoàn thành nhanh rồi tìm việc khác', pole: 'D' }, { text: 'Cảm thấy buồn chán, muốn nói chuyện', pole: 'I' }, { text: 'Thoải mái, làm việc theo nhịp riêng', pole: 'S' }, { text: 'Tập trung cao độ, hiệu suất tốt nhất', pole: 'C' }] },
    { content: 'Phương châm sống của bạn gần nhất với:', answers: [{ text: '"Hành động ngay, không chờ đợi"', pole: 'D' }, { text: '"Cuộc sống là để tận hưởng"', pole: 'I' }, { text: '"Chậm mà chắc"', pole: 'S' }, { text: '"Làm đúng ngay từ đầu"', pole: 'C' }] },
    { content: 'Khi đi ăn nhóm, bạn thường:', answers: [{ text: 'Chọn quán nhanh và quyết định cho cả nhóm', pole: 'D' }, { text: 'Đề xuất nhiều nơi vui, mới lạ', pole: 'I' }, { text: 'Để người khác chọn, bạn đều OK', pole: 'S' }, { text: 'Tìm hiểu review, so sánh giá và chất lượng', pole: 'C' }] },
    { content: 'Khi có ý tưởng mới, bạn:', answers: [{ text: 'Triển khai ngay, sửa sau', pole: 'D' }, { text: 'Chia sẻ hào hứng với mọi người', pole: 'I' }, { text: 'Cân nhắc kỹ xem có khả thi không', pole: 'S' }, { text: 'Nghiên cứu thêm dữ liệu trước khi quyết định', pole: 'C' }] },
    { content: 'Bạn thích được khen về:', answers: [{ text: 'Sự quyết đoán và hiệu quả', pole: 'D' }, { text: 'Sự sáng tạo và hài hước', pole: 'I' }, { text: 'Sự đáng tin cậy và kiên nhẫn', pole: 'S' }, { text: 'Sự chính xác và chuyên nghiệp', pole: 'C' }] },
    { content: 'Khi gặp thất bại, bạn:', answers: [{ text: 'Đứng dậy ngay, tìm cách khác', pole: 'D' }, { text: 'Tâm sự với bạn bè rồi lạc quan trở lại', pole: 'I' }, { text: 'Cần thời gian hồi phục, từ từ vượt qua', pole: 'S' }, { text: 'Phân tích nguyên nhân để không lặp lại', pole: 'C' }] },
    { content: 'Bạn thích loại phim nào nhất:', answers: [{ text: 'Hành động, phiêu lưu', pole: 'D' }, { text: 'Hài, lãng mạn', pole: 'I' }, { text: 'Gia đình, tình cảm', pole: 'S' }, { text: 'Trinh thám, tài liệu', pole: 'C' }] },
    { content: 'Khi cần ra quyết định nhanh:', answers: [{ text: 'Tin vào bản năng và quyết ngay', pole: 'D' }, { text: 'Hỏi nhanh ý kiến người xung quanh', pole: 'I' }, { text: 'Chọn phương án an toàn nhất', pole: 'S' }, { text: 'Cố gắng phân tích dù thời gian ít', pole: 'C' }] },
    { content: 'Bạn thích nhận feedback thế nào:', answers: [{ text: 'Ngắn gọn, thẳng thắn, đi vào trọng tâm', pole: 'D' }, { text: 'Tích cực, có khen trước khi góp ý', pole: 'I' }, { text: 'Nhẹ nhàng, riêng tư, không trước mặt người khác', pole: 'S' }, { text: 'Chi tiết, có ví dụ cụ thể và giải pháp', pole: 'C' }] },
    { content: 'Khi tổ chức sinh nhật cho bạn:', answers: [{ text: 'Muốn tiệc hoành tráng, ấn tượng', pole: 'D' }, { text: 'Muốn đông vui, nhiều trò chơi', pole: 'I' }, { text: 'Muốn ấm cúng với vài người thân', pole: 'S' }, { text: 'Muốn mọi thứ được chuẩn bị chu đáo', pole: 'C' }] },
    { content: 'Bạn giải quyết mâu thuẫn với đồng nghiệp bằng cách:', answers: [{ text: 'Nói thẳng vấn đề và yêu cầu giải pháp', pole: 'D' }, { text: 'Mời đi cà phê, nói chuyện nhẹ nhàng', pole: 'I' }, { text: 'Tránh đối đầu, hy vọng tự giải quyết', pole: 'S' }, { text: 'Gửi email nêu rõ vấn đề và đề xuất', pole: 'C' }] },
    { content: 'Khi làm việc dưới áp lực cao:', answers: [{ text: 'Càng áp lực càng hiệu quả', pole: 'D' }, { text: 'Vẫn giữ tinh thần lạc quan cho cả nhóm', pole: 'I' }, { text: 'Cảm thấy căng thẳng nhưng vẫn cố gắng', pole: 'S' }, { text: 'Tập trung vào quy trình để không sai sót', pole: 'C' }] },
    { content: 'Bạn muốn sếp của mình:', answers: [{ text: 'Giao mục tiêu rõ ràng rồi để bạn tự làm', pole: 'D' }, { text: 'Thân thiện, hay khen và tạo không khí vui', pole: 'I' }, { text: 'Hỗ trợ, kiên nhẫn và dễ tiếp cận', pole: 'S' }, { text: 'Chuyên nghiệp, công bằng và có chuyên môn cao', pole: 'C' }] },
    { content: 'Khi phải thích nghi với công nghệ mới:', answers: [{ text: 'Dùng thử ngay, tự mày mò', pole: 'D' }, { text: 'Nhờ bạn bè hướng dẫn, học cùng nhau', pole: 'I' }, { text: 'Chờ người khác dùng trước, học theo sau', pole: 'S' }, { text: 'Đọc hướng dẫn sử dụng chi tiết trước', pole: 'C' }] },
  ];
  return pool.slice(0, count);
}

function buildDiscQuiz(questionCount: 20 | 30 | 40) {
  const quizId = `qz_trac-nghiem-disc-${questionCount}`;
  const questions = makeDiscQuestions(questionCount);

  const quiz = {
    id: quizId, categoryId: CAT_TRI_TUE,
    title: `Trắc nghiệm DISC (${questionCount} câu)`,
    slug: `trac-nghiem-disc-${questionCount}`,
    description: `Khám phá phong cách hành vi DISC của bạn qua ${questionCount} câu hỏi tình huống thực tế.`,
    instruction: 'Chọn câu trả lời mô tả đúng bạn nhất trong mỗi tình huống.',
    thumbnailUrl: '/images/thumbnails/thumb-disc.png',
    quizType: 'DISC' as const, answerFormat: 'TEXT_CHOICE' as const,
    scaleMin: null, scaleMax: null, scaleLabelMin: null, scaleLabelMax: null,
    timeLimitMins: questionCount <= 20 ? 10 : questionCount <= 30 ? 15 : 20,
    totalQuestions: questionCount,
    isPublished: true, viewCount: 0, completionCount: 0, createdAt: Date.now(),
  };

  const questionsData = questions.map((q, i) => {
    const qId = `${quizId}_q${i + 1}`;
    return {
      question: {
        id: qId, quizId, content: q.content, imageUrl: null,
        orderNumber: i + 1, dimensionKey: null, isReverseScored: false,
      },
      answers: q.answers.map((a, ai) => ({
        id: `${qId}_a${ai + 1}`, questionId: qId, content: a.text, imageUrl: null,
        isCorrect: false, scoreValue: 0, dimensionPole: a.pole,
      })),
    };
  });

  return { quiz, questionsData };
}

export const disc20 = buildDiscQuiz(20);
export const disc30 = buildDiscQuiz(30);
export const disc40 = buildDiscQuiz(40);
