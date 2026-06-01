import type { LikertDetail, BigFiveDimDetail, MiItemDetail } from '../types';

// ============================================
// LIKERT — diễn giải theo slug + mốc điểm (band), 5 mục
// ============================================
interface Band {
  min: number;
  label: string;
  overview: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  closing: string;
}

export const LIKERT_INTERP: Record<string, { name: string; bands: Band[] }> = {
  'trac-nghiem-eq': {
    name: 'Trí tuệ cảm xúc (EQ)',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Bạn nhận biết và quản lý cảm xúc rất tốt, dễ đồng cảm và xây dựng mối quan hệ bền vững. Đây là một lợi thế lớn trong cả công việc lẫn đời sống.',
        strengths: ['Nhận diện cảm xúc của mình và người khác nhanh, chính xác', 'Giữ bình tĩnh và kiểm soát phản ứng trong tình huống căng thẳng', 'Đồng cảm và tạo được sự tin tưởng từ người xung quanh'],
        watchouts: ['Đôi khi gánh cảm xúc của người khác quá nhiều, dễ kiệt sức', 'Có thể kỳ vọng người khác cũng nhạy cảm như mình'],
        tips: ['Đặt ranh giới cảm xúc lành mạnh để tự bảo vệ năng lượng', 'Dùng thế mạnh đồng cảm để dẫn dắt, hòa giải nhóm', 'Tiếp tục ghi nhật ký cảm xúc để duy trì sự tự nhận thức'],
        closing: 'EQ cao là nền tảng cho lãnh đạo và các mối quan hệ sâu sắc — hãy phát huy nó một cách bền vững.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn hiểu cảm xúc của mình ở mức ổn nhưng đôi lúc bị cảm xúc chi phối hành động và quyết định.',
        strengths: ['Có khả năng tự nhận thức cơ bản về cảm xúc', 'Biết tiết chế trong phần lớn tình huống thường ngày'],
        watchouts: ['Dễ phản ứng bốc đồng khi bị khiêu khích hoặc áp lực', 'Đôi khi bỏ qua tín hiệu cảm xúc của người khác khi bận'],
        tips: ['Tạm dừng 5 giây trước khi phản ứng trong lúc nóng giận', 'Luyện lắng nghe chủ động: nhắc lại ý người kia trước khi đáp', 'Gọi tên cảm xúc của mình mỗi ngày để tăng tự nhận thức'],
        closing: 'Bạn đang có nền tảng tốt — luyện tập đều đặn sẽ giúp EQ tiến lên mức cao.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn có thể gặp khó khi nhận diện hoặc kiểm soát cảm xúc, khiến các tình huống xã hội đôi khi trở nên căng thẳng.',
        strengths: ['Thường thẳng thắn, không che giấu cảm xúc', 'Có tiềm năng cải thiện rõ rệt khi bắt đầu luyện tập'],
        watchouts: ['Cảm xúc dễ dẫn dắt quyết định quan trọng', 'Có thể vô tình làm tổn thương người khác mà không nhận ra'],
        tips: ['Bắt đầu bằng việc gọi tên cảm xúc mỗi khi nó xuất hiện', 'Quan sát phản ứng cơ thể (nhịp tim, hơi thở) như tín hiệu cảm xúc', 'Hỏi người thân cách họ cảm nhận để hiểu góc nhìn khác'],
        closing: 'Trí tuệ cảm xúc hoàn toàn có thể rèn luyện — mỗi bước nhỏ đều tạo khác biệt.',
      },
    ],
  },
  'trac-nghiem-cq': {
    name: 'Trí tuệ sáng tạo (CQ)',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Bạn tư duy linh hoạt, giàu ý tưởng và không ngại phá vỡ khuôn mẫu để tìm giải pháp mới.',
        strengths: ['Nghĩ ra nhiều phương án cho cùng một vấn đề', 'Kết nối những ý tưởng tưởng chừng không liên quan', 'Thoải mái với sự mơ hồ và thử nghiệm'],
        watchouts: ['Dễ chán việc lặp lại, thiếu kiên nhẫn với quy trình', 'Nhiều ý tưởng nhưng đôi khi khó hoàn thiện đến cùng'],
        tips: ['Tìm môi trường cho phép thử nghiệm và đổi mới', 'Ghép cặp với người thực thi kỷ luật để biến ý tưởng thành kết quả', 'Ghi lại ý tưởng bất chợt để phát triển sau'],
        closing: 'Sáng tạo là tài sản quý — hãy đặt nó vào nơi được trân trọng và hiện thực hóa.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn có khả năng sáng tạo khi cần nhưng thường chọn lối làm an toàn, quen thuộc.',
        strengths: ['Biết áp dụng giải pháp đã được kiểm chứng', 'Sáng tạo tốt khi có gợi ý hoặc khuôn khổ'],
        watchouts: ['Ngại rủi ro nên bỏ lỡ ý tưởng đột phá', 'Dễ tự giới hạn vì sợ bị đánh giá'],
        tips: ['Đặt câu hỏi "nếu như..." cho mọi vấn đề quen thuộc', 'Kết hợp ý tưởng từ các lĩnh vực khác nhau', 'Cho phép bản thân thử cái mới mà không sợ sai'],
        closing: 'Sáng tạo là cơ bắp — càng luyện càng mạnh. Hãy mạnh dạn thử nghiệm.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn thiên về cách làm ổn định, quen thuộc và ít khi tìm hướng tiếp cận mới.',
        strengths: ['Đáng tin cậy, làm tốt việc theo quy trình rõ ràng', 'Tập trung và ít bị phân tâm bởi ý tưởng viển vông'],
        watchouts: ['Có thể bỏ lỡ cơ hội cải tiến', 'Khó thích nghi khi hoàn cảnh thay đổi nhanh'],
        tips: ['Dành 10 phút mỗi ngày brainstorm tự do, không phán xét', 'Tiếp xúc lĩnh vực mới (sách, podcast khác gu) để mở góc nhìn', 'Thử một cách làm khác cho việc quen thuộc mỗi tuần'],
        closing: 'Mỗi người đều có tiềm năng sáng tạo — chỉ cần cho nó không gian để nảy nở.',
      },
    ],
  },
  'trac-nghiem-aq': {
    name: 'Chỉ số vượt khó (AQ)',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Bạn kiên cường, phục hồi nhanh sau thất bại và xem nghịch cảnh là cơ hội trưởng thành.',
        strengths: ['Giữ động lực ngay cả khi mọi thứ bất lợi', 'Phục hồi nhanh sau cú sốc tinh thần', 'Chủ động tìm giải pháp thay vì than phiền'],
        watchouts: ['Có thể ôm đồm quá sức vì tin mình chịu được', 'Đôi khi xem nhẹ khó khăn của người ít kiên cường hơn'],
        tips: ['Biết khi nào nên nghỉ ngơi để tránh kiệt sức', 'Chia sẻ kinh nghiệm vượt khó để hỗ trợ người khác', 'Đặt mục tiêu thử thách hơn để tiếp tục phát triển'],
        closing: 'Sức bền tinh thần là lợi thế cả đời — hãy dùng nó để đi đường dài.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn vượt qua được khó khăn vừa phải nhưng dễ nản trước trở ngại lớn hoặc kéo dài.',
        strengths: ['Đối mặt tốt với áp lực thường ngày', 'Biết tìm sự hỗ trợ khi cần'],
        watchouts: ['Dễ mất động lực khi gặp thất bại liên tiếp', 'Đôi khi lo lắng quá mức về điều chưa xảy ra'],
        tips: ['Chia vấn đề lớn thành các bước nhỏ khả thi', 'Tập trung vào điều mình kiểm soát được', 'Xây mạng lưới hỗ trợ để dựa vào lúc khó khăn'],
        closing: 'Khả năng phục hồi tăng theo trải nghiệm — mỗi lần vượt qua là một lần mạnh hơn.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn dễ bị áp lực và nghịch cảnh làm cho chùn bước, mất phương hướng.',
        strengths: ['Nhạy cảm, biết nhận ra giới hạn của bản thân', 'Có tiềm năng cải thiện lớn khi học kỹ năng đối phó'],
        watchouts: ['Dễ bỏ cuộc khi gặp trở ngại lớn', 'Có thể để một vấn đề ảnh hưởng đến toàn bộ cuộc sống'],
        tips: ['Nhìn thất bại như dữ liệu để học, không phải bản án', 'Tách vấn đề: việc này không định nghĩa toàn bộ con người bạn', 'Tìm một người cố vấn/đồng hành để chia sẻ áp lực'],
        closing: 'Kiên cường là kỹ năng học được — hãy bắt đầu từ những thử thách nhỏ.',
      },
    ],
  },
  'trac-nghiem-sq': {
    name: 'Trí tuệ xã hội (SQ)',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Bạn giao tiếp khéo léo, dễ kết nối và đọc tốt các tình huống xã hội.',
        strengths: ['Bắt chuyện và xây dựng quan hệ tự nhiên', 'Đọc được ngôn ngữ cơ thể và không khí cuộc trò chuyện', 'Được tin tưởng và dễ gây thiện cảm'],
        watchouts: ['Có thể tiêu hao năng lượng khi luôn là người kết nối', 'Đôi khi ưu tiên hòa khí hơn quan điểm thật'],
        tips: ['Dùng kỹ năng xã hội để dẫn dắt và hòa giải nhóm', 'Giữ thời gian riêng để nạp lại năng lượng', 'Mạnh dạn nêu chính kiến khi cần, không chỉ làm hài lòng'],
        closing: 'Trí tuệ xã hội mở ra nhiều cơ hội — hãy dùng nó một cách chân thành.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn hòa nhập ổn nhưng đôi khi lúng túng trong tình huống xã hội mới hoặc đông người.',
        strengths: ['Giao tiếp tốt với người quen', 'Biết lắng nghe và tôn trọng người khác'],
        watchouts: ['Ngại chủ động trong môi trường lạ', 'Đôi khi khó đọc tín hiệu ngầm trong nhóm'],
        tips: ['Chủ động bắt chuyện nhỏ với người mới mỗi tuần', 'Quan sát ngôn ngữ cơ thể để hiểu cảm xúc người khác', 'Chuẩn bị vài chủ đề mở để cuộc trò chuyện tự nhiên hơn'],
        closing: 'Kỹ năng xã hội cải thiện rõ qua thực hành — hãy bước ra vùng an toàn dần dần.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn có thể thấy ngại hoặc mệt trong các tình huống giao tiếp xã hội.',
        strengths: ['Thường là người lắng nghe sâu sắc', 'Chất lượng hơn số lượng trong các mối quan hệ'],
        watchouts: ['Dễ bỏ lỡ cơ hội kết nối do ngại chủ động', 'Có thể bị hiểu lầm là xa cách'],
        tips: ['Bắt đầu từ cuộc trò chuyện 1-1 thay vì nhóm đông', 'Đặt câu hỏi để người khác nói, giảm áp lực lên mình', 'Tham gia nhóm theo sở thích để giao tiếp tự nhiên hơn'],
        closing: 'Kết nối là kỹ năng, không phải năng khiếu bẩm sinh — từng bước nhỏ sẽ tạo đà.',
      },
    ],
  },
  'trac-nghiem-pq': {
    name: 'Trí tuệ thể chất (PQ)',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Bạn chăm sóc cơ thể tốt, năng lượng dồi dào và lắng nghe rõ nhu cầu thể chất của mình.',
        strengths: ['Duy trì thói quen vận động và nghỉ ngơi đều đặn', 'Năng lượng ổn định suốt ngày', 'Nhận biết sớm khi cơ thể cần phục hồi'],
        watchouts: ['Có thể đặt tiêu chuẩn thể chất quá cao, dễ tự áp lực', 'Đôi khi ép bản thân tập luyện cả khi nên nghỉ'],
        tips: ['Lắng nghe tín hiệu nghỉ ngơi, tránh tập quá sức', 'Đa dạng hình thức vận động để tránh nhàm chán', 'Duy trì giấc ngủ và dinh dưỡng làm nền tảng'],
        closing: 'Sức khỏe thể chất là vốn quý nhất — bạn đang đầu tư rất đúng hướng.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn quan tâm sức khỏe ở mức cơ bản nhưng chưa duy trì đều đặn.',
        strengths: ['Có ý thức về tầm quan trọng của sức khỏe', 'Vận động khi có thời gian và điều kiện'],
        watchouts: ['Thói quen chưa ổn định, dễ bỏ giữa chừng', 'Năng lượng thất thường do ngủ/ăn chưa điều độ'],
        tips: ['Đặt lịch vận động cố định, bắt đầu từ 15 phút/ngày', 'Ưu tiên ngủ đủ giờ và uống đủ nước', 'Theo dõi năng lượng để điều chỉnh thói quen'],
        closing: 'Những thay đổi nhỏ đều đặn sẽ tạo khác biệt lớn về năng lượng và sức bền.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn có thể đang bỏ quên thể chất, dẫn đến mệt mỏi và thiếu năng lượng.',
        strengths: ['Có cơ hội cải thiện rõ rệt chỉ với vài thay đổi nhỏ', 'Nhận ra vấn đề là bước đầu quan trọng'],
        watchouts: ['Ngồi lâu, ít vận động ảnh hưởng sức khỏe lâu dài', 'Ăn/ngủ không điều độ làm giảm năng lượng và tập trung'],
        tips: ['Bắt đầu cực nhỏ: đi bộ 10 phút, uống đủ nước mỗi ngày', 'Đặt giờ ngủ cố định để cải thiện chất lượng giấc ngủ', 'Đứng dậy vận động nhẹ mỗi 1 giờ ngồi làm việc'],
        closing: 'Cơ thể đáp lại rất nhanh với sự chăm sóc — hãy bắt đầu từ hôm nay.',
      },
    ],
  },
  'trac-nghiem-suc-khoe-tam-ly': {
    name: 'Sức khỏe tâm lý',
    bands: [
      {
        min: 70, label: 'Cao',
        overview: 'Tinh thần bạn đang ở trạng thái tốt: cân bằng, lạc quan và có khả năng phục hồi cao.',
        strengths: ['Quản lý stress hiệu quả', 'Có cái nhìn tích cực và ý nghĩa về cuộc sống', 'Mối quan hệ hỗ trợ tốt'],
        watchouts: ['Đừng chủ quan — sức khỏe tinh thần cần duy trì liên tục', 'Có thể quên chăm sóc bản thân khi bận giúp người khác'],
        tips: ['Duy trì thói quen tích cực đang có', 'Tiếp tục nuôi dưỡng các mối quan hệ chất lượng', 'Giữ sự cân bằng giữa cho đi và tự chăm sóc'],
        closing: 'Bạn đang ở trạng thái đáng quý — hãy gìn giữ và lan tỏa năng lượng tích cực này.',
      },
      {
        min: 40, label: 'Trung bình',
        overview: 'Bạn ổn định ở mức khá nhưng có lúc căng thẳng hoặc cảm thấy mất cân bằng.',
        strengths: ['Vẫn duy trì được sinh hoạt và mối quan hệ', 'Có khả năng tự điều chỉnh trong phần lớn thời gian'],
        watchouts: ['Stress tích tụ nếu không được giải tỏa', 'Dễ so sánh bản thân với người khác và thấy thua kém'],
        tips: ['Dành thời gian nghỉ ngơi và làm điều mình thích', 'Chia sẻ cảm xúc với người tin cậy thay vì giữ trong lòng', 'Thực hành thở sâu hoặc thiền vài phút mỗi ngày'],
        closing: 'Chăm sóc tinh thần đều đặn sẽ giúp bạn vững vàng hơn trước sóng gió.',
      },
      {
        min: 0, label: 'Thấp',
        overview: 'Bạn có thể đang chịu nhiều áp lực tinh thần, ảnh hưởng đến cảm xúc và sinh hoạt.',
        strengths: ['Dám nhìn nhận tình trạng của mình là điều dũng cảm', 'Luôn có cách để cải thiện với sự hỗ trợ phù hợp'],
        watchouts: ['Áp lực kéo dài có thể ảnh hưởng sức khỏe và quan hệ', 'Cô lập bản thân khiến mọi thứ nặng nề hơn'],
        tips: ['Ưu tiên chăm sóc bản thân: ngủ, ăn, vận động nhẹ', 'Chia sẻ với người thân tin cậy, đừng ở một mình với cảm xúc', 'Cân nhắc tìm hỗ trợ từ chuyên gia tâm lý nếu kéo dài'],
        closing: 'Bạn không đơn độc — tìm kiếm hỗ trợ là dấu hiệu của sức mạnh, không phải yếu đuối.',
      },
    ],
  },
};

function genericBand(percent: number): LikertDetail {
  const level = percent >= 70 ? 'Cao' : percent >= 40 ? 'Trung bình' : 'Thấp';
  return {
    name: 'Chỉ số',
    level,
    overview: percent >= 70 ? 'Bạn đạt mức cao ở chỉ số này — một thế mạnh đáng phát huy.' : percent >= 40 ? 'Bạn ở mức trung bình — còn nhiều dư địa để cải thiện.' : 'Chỉ số này còn thấp — hãy dành thời gian rèn luyện thêm.',
    strengths: ['Có nền tảng để phát triển ở lĩnh vực này'],
    watchouts: ['Cần duy trì luyện tập đều đặn để tiến bộ'],
    tips: ['Đặt mục tiêu nhỏ và theo dõi tiến độ', 'Học hỏi từ người làm tốt lĩnh vực này'],
    closing: 'Mọi kỹ năng đều có thể cải thiện qua thực hành kiên trì.',
  };
}

export function getLikertInterp(slug: string, percent: number): LikertDetail {
  const entry = LIKERT_INTERP[slug];
  if (!entry) return genericBand(percent);
  const band = entry.bands.find((b) => percent >= b.min) ?? entry.bands[entry.bands.length - 1];
  return {
    name: entry.name,
    level: band.label,
    overview: band.overview,
    strengths: band.strengths,
    watchouts: band.watchouts,
    tips: band.tips,
    closing: band.closing,
  };
}

// ============================================
// Big Five — diễn giải mỗi chiều theo cao/thấp
// ============================================
export const BIG_FIVE_INTERP: Record<'O' | 'C' | 'E' | 'A' | 'N', { label: string; high: string; low: string }> = {
  O: { label: 'Cởi mở (Openness)', high: 'Bạn tò mò, giàu trí tưởng tượng và thích trải nghiệm mới mẻ, ý tưởng độc đáo.', low: 'Bạn thực tế, thích sự quen thuộc và ổn định hơn là thử nghiệm điều mới.' },
  C: { label: 'Tận tâm (Conscientiousness)', high: 'Bạn có tổ chức, kỷ luật và đáng tin cậy, luôn hoàn thành việc đến nơi đến chốn.', low: 'Bạn linh hoạt, tự phát, đôi khi thiếu kế hoạch và dễ trì hoãn.' },
  E: { label: 'Hướng ngoại (Extraversion)', high: 'Bạn năng động, hòa đồng và lấy năng lượng từ tương tác xã hội.', low: 'Bạn hướng nội, điềm tĩnh và thích không gian yên tĩnh để nạp lại năng lượng.' },
  A: { label: 'Dễ chịu (Agreeableness)', high: 'Bạn nhân hậu, hợp tác và quan tâm đến cảm xúc của người khác.', low: 'Bạn thẳng thắn, cạnh tranh và đặt logic lên trước sự hòa hợp.' },
  N: { label: 'Nhạy cảm (Neuroticism)', high: 'Bạn nhạy cảm với cảm xúc, dễ lo lắng và phản ứng mạnh với áp lực.', low: 'Bạn ổn định về cảm xúc, bình tĩnh và ít bị căng thẳng chi phối.' },
};

export function getBigFiveDetail(dims: { O: number; C: number; E: number; A: number; N: number }): BigFiveDimDetail[] {
  return (['O', 'C', 'E', 'A', 'N'] as const).map((key) => {
    const percent = dims[key];
    const info = BIG_FIVE_INTERP[key];
    const isHigh = percent >= 50;
    return {
      key,
      label: info.label,
      percent,
      level: isHigh ? 'Cao' : 'Thấp',
      description: isHigh ? info.high : info.low,
    };
  });
}

// ============================================
// MI — diễn giải 8 loại trí thông minh
// ============================================
export const MI_INTERP: Record<string, { label: string; description: string }> = {
  NGON_NGU: { label: 'Ngôn ngữ', description: 'Khả năng dùng từ ngữ, đọc viết và diễn đạt ý tưởng hiệu quả.' },
  LOGIC: { label: 'Logic - Toán học', description: 'Khả năng tư duy logic, phân tích và làm việc với con số, quy luật.' },
  KHONG_GIAN: { label: 'Không gian', description: 'Khả năng hình dung không gian, thiết kế và định hướng tốt.' },
  AM_NHAC: { label: 'Âm nhạc', description: 'Sự nhạy cảm với giai điệu, nhịp điệu và âm thanh.' },
  VAN_DONG: { label: 'Vận động', description: 'Khả năng phối hợp cơ thể, khéo léo và vận động linh hoạt.' },
  THIEN_NHIEN: { label: 'Thiên nhiên', description: 'Khả năng quan sát, phân loại và kết nối với thế giới tự nhiên.' },
  TUONG_TAC: { label: 'Tương tác', description: 'Khả năng thấu hiểu, giao tiếp và làm việc với người khác.' },
  NOI_TAM: { label: 'Nội tâm', description: 'Khả năng tự nhận thức, hiểu rõ cảm xúc và động lực bản thân.' },
};

export function getMiDetail(intel: Record<string, number>): { items: MiItemDetail[]; topLabels: string[] } {
  const items: MiItemDetail[] = Object.entries(intel)
    .map(([key, percent]) => {
      // MI thật (NGON_NGU...) → MI_INTERP; quiz Big Five (MI_LIKERT) dùng key O/C/E/A/N → BIG_FIVE_INTERP
      const mi = MI_INTERP[key];
      if (mi) return { label: mi.label, percent, description: mi.description };
      const bf = BIG_FIVE_INTERP[key as 'O' | 'C' | 'E' | 'A' | 'N'];
      if (bf) return { label: bf.label, percent, description: percent >= 50 ? bf.high : bf.low };
      return { label: key, percent, description: '' };
    })
    .sort((a, b) => b.percent - a.percent);
  const topLabels = items.slice(0, 3).map((i) => i.label);
  return { items, topLabels };
}
