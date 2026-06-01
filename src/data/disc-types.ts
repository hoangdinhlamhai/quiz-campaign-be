import type { DiscDetail } from '../types';

// Luận giải 4 nhóm hành vi DISC — nội dung tiếng Việt.
// Key theo chữ cái đầu của dominant pole.
export const DISC_TYPES: Record<'D' | 'I' | 'S' | 'C', DiscDetail> = {
  D: {
    group: 'D',
    name: 'Dominance',
    title: 'Người Thủ Lĩnh',
    description:
      'Người thuộc nhóm D là những cá nhân mạnh mẽ, quyết đoán, và tập trung vào kết quả. Bạn là người tiên phong, luôn sẵn sàng đối mặt với thử thách và không ngần ngại đưa ra những quyết định khó khăn. Bạn thích kiểm soát môi trường xung quanh và luôn hướng tới mục tiêu một cách trực diện.',
    traits: [
      { label: 'Tự tin và quyết đoán', desc: 'Bạn tin tưởng vào khả năng của mình và ra quyết định nhanh chóng.' },
      { label: 'Tập trung vào mục tiêu', desc: 'Luôn đặt kết quả lên hàng đầu và làm mọi cách để đạt được nó.' },
      { label: 'Thích cạnh tranh', desc: 'Bạn xem thử thách là cơ hội để chứng tỏ bản thân và giành chiến thắng.' },
      { label: 'Thẳng thắn', desc: 'Giao tiếp một cách trực tiếp, không vòng vo.' },
      { label: 'Năng động và chủ động', desc: 'Luôn tìm kiếm cơ hội và hành động thay vì chờ đợi.' },
    ],
    improvements: [
      'Có thể thiếu kiên nhẫn với những người chậm chạp hoặc thiếu quyết đoán.',
      'Đôi khi có thể bị xem là độc đoán hoặc thiếu sự đồng cảm.',
      'Cần chú ý hơn đến chi tiết và lắng nghe ý kiến của người khác.',
    ],
  },
  I: {
    group: 'I',
    name: 'Influence',
    title: 'Người Truyền Cảm Hứng',
    description:
      'Người thuộc nhóm I là những cá nhân nhiệt tình, lạc quan, và giỏi giao tiếp. Bạn tỏa ra năng lượng tích cực, dễ dàng kết nối với mọi người và truyền cảm hứng cho những người xung quanh. Bạn thích môi trường vui vẻ, nhiều tương tác và được công nhận.',
    traits: [
      { label: 'Nhiệt tình và lạc quan', desc: 'Bạn luôn nhìn vào mặt tích cực và lan tỏa năng lượng cho mọi người.' },
      { label: 'Giỏi giao tiếp', desc: 'Dễ dàng bắt chuyện, thuyết phục và xây dựng mối quan hệ.' },
      { label: 'Sáng tạo', desc: 'Luôn có nhiều ý tưởng mới mẻ và cách tiếp cận độc đáo.' },
      { label: 'Thân thiện', desc: 'Tạo không khí cởi mở, dễ gần và được nhiều người yêu mến.' },
      { label: 'Truyền cảm hứng', desc: 'Có khả năng khích lệ và động viên người khác hành động.' },
    ],
    improvements: [
      'Đôi khi nói nhiều hơn lắng nghe và thiếu tập trung vào chi tiết.',
      'Có thể bốc đồng, quyết định theo cảm xúc hơn là logic.',
      'Cần cải thiện khả năng theo dõi và hoàn thành công việc đến cùng.',
    ],
  },
  S: {
    group: 'S',
    name: 'Steadiness',
    title: 'Người Kiên Định',
    description:
      'Người thuộc nhóm S là những cá nhân điềm tĩnh, kiên nhẫn, và đáng tin cậy. Bạn coi trọng sự ổn định, hòa hợp và luôn sẵn sàng hỗ trợ người khác. Bạn là chỗ dựa vững chắc cho tập thể, làm việc bền bỉ và trung thành.',
    traits: [
      { label: 'Kiên nhẫn và điềm tĩnh', desc: 'Bạn giữ được sự bình tĩnh ngay cả trong áp lực.' },
      { label: 'Đáng tin cậy', desc: 'Luôn giữ lời hứa và hoàn thành trách nhiệm một cách bền bỉ.' },
      { label: 'Biết lắng nghe', desc: 'Quan tâm và thấu hiểu cảm xúc của người khác.' },
      { label: 'Hợp tác', desc: 'Đề cao sự hòa hợp và làm việc nhóm hiệu quả.' },
      { label: 'Trung thành', desc: 'Gắn bó lâu dài với tập thể và những người bạn tin tưởng.' },
    ],
    improvements: [
      'Có thể ngại thay đổi và khó thích nghi với điều mới.',
      'Đôi khi khó nói "không" và ngại đối đầu khi cần thiết.',
      'Cần chủ động hơn trong việc bày tỏ quan điểm cá nhân.',
    ],
  },
  C: {
    group: 'C',
    name: 'Conscientiousness',
    title: 'Người Tận Tâm',
    description:
      'Người thuộc nhóm C là những cá nhân cẩn trọng, chính xác, và coi trọng chất lượng. Bạn làm việc theo nguyên tắc, chú ý đến từng chi tiết và luôn hướng tới sự hoàn hảo. Bạn dựa vào dữ liệu và logic để đưa ra quyết định sáng suốt.',
    traits: [
      { label: 'Chính xác và tỉ mỉ', desc: 'Bạn chú ý đến từng chi tiết để đảm bảo không sai sót.' },
      { label: 'Tư duy logic', desc: 'Ra quyết định dựa trên dữ liệu và phân tích kỹ lưỡng.' },
      { label: 'Có nguyên tắc', desc: 'Tuân thủ quy trình và tiêu chuẩn chất lượng cao.' },
      { label: 'Cẩn trọng', desc: 'Cân nhắc kỹ mọi rủi ro trước khi hành động.' },
      { label: 'Chuyên nghiệp', desc: 'Đề cao chất lượng và sự chuẩn mực trong công việc.' },
    ],
    improvements: [
      'Có thể quá cầu toàn, dẫn đến chậm trễ trong quyết định.',
      'Đôi khi quá tập trung vào chi tiết mà bỏ qua bức tranh tổng thể.',
      'Cần cởi mở hơn và bớt khắt khe với bản thân lẫn người khác.',
    ],
  },
};

export function getDiscDetail(dominant: string): DiscDetail | undefined {
  const key = dominant.trim().charAt(0).toUpperCase() as 'D' | 'I' | 'S' | 'C';
  return DISC_TYPES[key];
}
