import { nanoid } from 'nanoid';
import { CAT_TRI_TUE } from './categories.js';

interface LikertQuizDef {
  title: string;
  slug: string;
  description: string;
  questions: Array<{ content: string; isReverse?: boolean }>;
}

const likertDefs: LikertQuizDef[] = [
  {
    title: 'Trắc nghiệm chỉ số EQ (Trí tuệ cảm xúc)',
    slug: 'trac-nghiem-eq',
    description: 'Đánh giá khả năng nhận biết, hiểu và quản lý cảm xúc của bản thân và người khác.',
    questions: [
      { content: 'Tôi dễ dàng nhận ra cảm xúc của mình trong mọi tình huống.' },
      { content: 'Tôi có thể kiểm soát cơn giận ngay cả khi bị khiêu khích.' },
      { content: 'Tôi thường đặt mình vào vị trí người khác để hiểu họ.' },
      { content: 'Tôi biết cách động viên bản thân khi gặp thất bại.' },
      { content: 'Tôi nhận ra ngay khi ai đó đang buồn dù họ không nói.' },
      { content: 'Tôi thường phản ứng quá mức rồi hối hận sau đó.', isReverse: true },
      { content: 'Tôi có thể giữ bình tĩnh trong các tình huống căng thẳng.' },
      { content: 'Tôi biết điều gì khiến mình stress và cách xử lý nó.' },
      { content: 'Tôi dễ dàng xây dựng mối quan hệ tốt với người mới quen.' },
      { content: 'Tôi thường bỏ qua cảm xúc của người khác khi bận.', isReverse: true },
      { content: 'Tôi có thể thích nghi nhanh với thay đổi bất ngờ.' },
      { content: 'Tôi biết cách từ chối mà không làm tổn thương người khác.' },
      { content: 'Tôi thường suy nghĩ trước khi nói trong lúc nóng giận.' },
      { content: 'Tôi cảm thấy thoải mái khi chia sẻ cảm xúc với người thân.' },
      { content: 'Tôi hay đổ lỗi cho hoàn cảnh thay vì nhìn nhận bản thân.', isReverse: true },
      { content: 'Tôi có thể giải quyết xung đột mà không làm mất lòng ai.' },
      { content: 'Tôi nhận ra khi cảm xúc đang ảnh hưởng đến quyết định của mình.' },
      { content: 'Tôi biết cách tạo động lực cho người khác khi họ chán nản.' },
      { content: 'Tôi thường cảm thấy bất lực trước cảm xúc tiêu cực.', isReverse: true },
      { content: 'Tôi có khả năng đọc được không khí của một cuộc trò chuyện.' },
    ],
  },
  {
    title: 'Trắc nghiệm chỉ số CQ (Trí tuệ sáng tạo)',
    slug: 'trac-nghiem-cq',
    description: 'Đo lường khả năng tư duy sáng tạo, tìm giải pháp mới và phá vỡ khuôn mẫu.',
    questions: [
      { content: 'Tôi thường nghĩ ra nhiều cách giải quyết cho một vấn đề.' },
      { content: 'Tôi thích thử những cách làm mới thay vì theo lối mòn.' },
      { content: 'Tôi hay liên tưởng giữa những thứ tưởng chừng không liên quan.' },
      { content: 'Tôi cảm thấy hào hứng khi đối mặt với vấn đề chưa có lời giải.' },
      { content: 'Tôi thường đặt câu hỏi "tại sao không?" thay vì chấp nhận hiện trạng.' },
      { content: 'Tôi thích làm theo cách đã được chứng minh hơn là thử nghiệm.', isReverse: true },
      { content: 'Tôi có thể nhìn vấn đề từ nhiều góc độ khác nhau.' },
      { content: 'Tôi thường có ý tưởng mới khi đang làm việc không liên quan.' },
      { content: 'Tôi không ngại thất bại khi thử cách tiếp cận mới.' },
      { content: 'Tôi hay tưởng tượng ra những kịch bản "nếu như...".' },
      { content: 'Tôi cảm thấy khó chịu khi phải tuân theo quy trình cứng nhắc.' },
      { content: 'Tôi thường kết hợp ý tưởng từ nhiều lĩnh vực khác nhau.' },
      { content: 'Tôi thích những câu đố và thử thách trí tuệ.' },
      { content: 'Tôi hay mơ mộng và tưởng tượng về những khả năng mới.' },
      { content: 'Tôi ngại đề xuất ý tưởng khác biệt vì sợ bị đánh giá.', isReverse: true },
      { content: 'Tôi có thể tìm ra giải pháp sáng tạo dưới áp lực thời gian.' },
      { content: 'Tôi thường cải tiến quy trình làm việc của mình.' },
      { content: 'Tôi thích khám phá những lĩnh vực hoàn toàn mới.' },
      { content: 'Tôi cảm thấy thoải mái với sự mơ hồ và không chắc chắn.' },
      { content: 'Tôi hay ghi lại ý tưởng bất chợt để phát triển sau.' },
    ],
  },
  {
    title: 'Trắc nghiệm chỉ số AQ (Chỉ số vượt khó)',
    slug: 'trac-nghiem-aq',
    description: 'Đánh giá khả năng đối mặt, vượt qua nghịch cảnh và phục hồi sau thất bại.',
    questions: [
      { content: 'Khi gặp khó khăn, tôi tin rằng mình sẽ tìm được cách vượt qua.' },
      { content: 'Tôi xem thất bại là cơ hội để học hỏi và trưởng thành.' },
      { content: 'Tôi có thể duy trì động lực ngay cả khi mọi thứ không thuận lợi.' },
      { content: 'Tôi thường tìm giải pháp thay vì than phiền về vấn đề.' },
      { content: 'Khi bị từ chối, tôi nhanh chóng lấy lại tinh thần.' },
      { content: 'Tôi dễ dàng bỏ cuộc khi gặp trở ngại lớn.', isReverse: true },
      { content: 'Tôi tin rằng khó khăn giúp tôi mạnh mẽ hơn.' },
      { content: 'Tôi có thể tách biệt vấn đề và không để nó ảnh hưởng toàn bộ cuộc sống.' },
      { content: 'Tôi thường chủ động tìm cách cải thiện tình huống xấu.' },
      { content: 'Tôi cảm thấy bất lực khi đối mặt với vấn đề lớn.', isReverse: true },
      { content: 'Tôi có khả năng phục hồi nhanh sau những cú sốc tinh thần.' },
      { content: 'Tôi nhìn nhận thử thách như một phần tự nhiên của cuộc sống.' },
      { content: 'Tôi có thể giữ bình tĩnh và suy nghĩ rõ ràng trong khủng hoảng.' },
      { content: 'Tôi thường đặt mục tiêu mới sau khi hoàn thành mục tiêu cũ.' },
      { content: 'Tôi hay lo lắng quá mức về những điều chưa xảy ra.', isReverse: true },
      { content: 'Tôi tin rằng nỗ lực sẽ mang lại kết quả dù không ngay lập tức.' },
      { content: 'Tôi có thể chấp nhận thực tế và thích nghi nhanh chóng.' },
      { content: 'Tôi thường tìm được mặt tích cực trong tình huống tiêu cực.' },
      { content: 'Tôi cảm thấy mạnh mẽ hơn sau mỗi lần vượt qua khó khăn.' },
      { content: 'Tôi có mạng lưới hỗ trợ tốt khi cần giúp đỡ.' },
    ],
  },
  {
    title: 'Trắc nghiệm chỉ số SQ (Trí tuệ xã hội)',
    slug: 'trac-nghiem-sq',
    description: 'Đo lường khả năng giao tiếp, xây dựng mối quan hệ và hiểu các tình huống xã hội.',
    questions: [
      { content: 'Tôi dễ dàng bắt chuyện với người lạ trong các sự kiện.' },
      { content: 'Tôi nhận ra nhanh chóng khi ai đó không thoải mái trong nhóm.' },
      { content: 'Tôi biết cách điều chỉnh cách nói chuyện phù hợp với từng người.' },
      { content: 'Tôi thường được mọi người tin tưởng và tâm sự.' },
      { content: 'Tôi có thể hòa nhập vào bất kỳ nhóm nào một cách tự nhiên.' },
      { content: 'Tôi thường cảm thấy lúng túng trong các tình huống xã hội.', isReverse: true },
      { content: 'Tôi biết cách giữ cuộc trò chuyện thú vị và tự nhiên.' },
      { content: 'Tôi có khả năng thuyết phục người khác mà không gây áp lực.' },
      { content: 'Tôi nhận ra được các quy tắc ngầm trong nhóm xã hội.' },
      { content: 'Tôi thường gây ấn tượng tốt trong lần gặp đầu tiên.' },
      { content: 'Tôi hay nói sai lúc hoặc làm người khác khó chịu mà không biết.', isReverse: true },
      { content: 'Tôi có thể làm trung gian hòa giải khi hai người mâu thuẫn.' },
      { content: 'Tôi biết cách khen ngợi người khác một cách chân thành.' },
      { content: 'Tôi duy trì được nhiều mối quan hệ tốt đẹp lâu dài.' },
      { content: 'Tôi hiểu được ngôn ngữ cơ thể và biểu cảm của người khác.' },
      { content: 'Tôi có thể làm việc hiệu quả với nhiều kiểu người khác nhau.' },
      { content: 'Tôi thường được chọn làm đại diện hoặc phát ngôn cho nhóm.' },
      { content: 'Tôi biết khi nào nên nói và khi nào nên im lặng.' },
      { content: 'Tôi cảm thấy thoải mái khi phải nói trước đám đông.' },
      { content: 'Tôi có khả năng xây dựng mạng lưới quan hệ rộng.' },
    ],
  },
  {
    title: 'Trắc nghiệm chỉ số PQ (Trí tuệ thể chất)',
    slug: 'trac-nghiem-pq',
    description: 'Đánh giá mức độ nhận thức và chăm sóc sức khỏe thể chất, năng lượng và sức bền.',
    questions: [
      { content: 'Tôi tập thể dục đều đặn ít nhất 3 lần mỗi tuần.' },
      { content: 'Tôi ngủ đủ giấc và cảm thấy tỉnh táo vào buổi sáng.' },
      { content: 'Tôi chú ý đến chế độ dinh dưỡng hàng ngày.' },
      { content: 'Tôi có thể duy trì năng lượng ổn định suốt cả ngày.' },
      { content: 'Tôi nhận ra ngay khi cơ thể cần nghỉ ngơi.' },
      { content: 'Tôi thường bỏ bữa hoặc ăn uống không điều độ.', isReverse: true },
      { content: 'Tôi có khả năng phối hợp tay-mắt tốt trong các hoạt động.' },
      { content: 'Tôi biết cách thư giãn cơ thể khi căng thẳng.' },
      { content: 'Tôi có sức bền tốt trong các hoạt động kéo dài.' },
      { content: 'Tôi thường ngồi quá lâu mà không vận động.', isReverse: true },
      { content: 'Tôi có phản xạ nhanh trong các tình huống bất ngờ.' },
      { content: 'Tôi duy trì tư thế đúng khi ngồi làm việc.' },
      { content: 'Tôi có thể thực hiện các động tác đòi hỏi sự linh hoạt.' },
      { content: 'Tôi uống đủ nước mỗi ngày.' },
      { content: 'Tôi thường cảm thấy mệt mỏi và thiếu năng lượng.', isReverse: true },
      { content: 'Tôi có thói quen khởi động trước khi vận động mạnh.' },
      { content: 'Tôi biết giới hạn thể chất của mình và không ép quá mức.' },
      { content: 'Tôi có khả năng giữ thăng bằng tốt.' },
      { content: 'Tôi chăm sóc sức khỏe chủ động (khám định kỳ, tiêm phòng).' },
      { content: 'Tôi cảm thấy khỏe mạnh và tự tin về thể chất của mình.' },
    ],
  },
];

function buildLikertQuiz(def: LikertQuizDef) {
  const quizId = nanoid();
  const quiz = {
    id: quizId,
    categoryId: CAT_TRI_TUE,
    title: def.title,
    slug: def.slug,
    description: def.description,
    instruction: 'Đánh giá mức độ đồng ý với mỗi phát biểu theo thang 1-5.',
    thumbnailUrl: `/thumbnails/${def.slug.replace('trac-nghiem-', '')}.png`,
    quizType: 'SCORED' as const,
    answerFormat: 'LIKERT_SCALE' as const,
    scaleMin: 1,
    scaleMax: 5,
    scaleLabelMin: 'Hoàn toàn không đồng ý',
    scaleLabelMax: 'Hoàn toàn đồng ý',
    timeLimitMins: 10,
    totalQuestions: def.questions.length,
    isPublished: true,
    viewCount: 0,
    completionCount: 0,
    createdAt: Date.now(),
  };

  const questionsData = def.questions.map((q, i) => ({
    id: nanoid(),
    quizId,
    content: q.content,
    imageUrl: null,
    orderNumber: i + 1,
    dimensionKey: 'TOTAL',
    isReverseScored: q.isReverse ?? false,
  }));

  return { quiz, questionsData };
}

export const eqQuiz = buildLikertQuiz(likertDefs[0]);
export const cqQuiz = buildLikertQuiz(likertDefs[1]);
export const aqQuiz = buildLikertQuiz(likertDefs[2]);
export const sqQuiz = buildLikertQuiz(likertDefs[3]);
export const pqQuiz = buildLikertQuiz(likertDefs[4]);
