import type { LikertDetail, BigFiveDimDetail, MiItemDetail } from '../types';

// ============================================
// LIKERT — diễn giải theo slug + mốc điểm (band)
// ============================================
interface Band {
  min: number;
  label: string;
  description: string;
}

export const LIKERT_INTERP: Record<string, { name: string; bands: Band[] }> = {
  'trac-nghiem-eq': {
    name: 'Trí tuệ cảm xúc (EQ)',
    bands: [
      { min: 70, label: 'Cao', description: 'Bạn nhận biết và quản lý cảm xúc rất tốt, dễ đồng cảm và xây dựng mối quan hệ bền vững. Hãy tiếp tục dùng thế mạnh này để dẫn dắt và hỗ trợ người khác.' },
      { min: 40, label: 'Trung bình', description: 'Bạn hiểu cảm xúc của mình ở mức ổn nhưng đôi lúc bị cảm xúc chi phối. Luyện tập lắng nghe chủ động và tạm dừng trước khi phản ứng sẽ giúp bạn tiến bộ.' },
      { min: 0, label: 'Thấp', description: 'Bạn có thể gặp khó khi nhận diện hoặc kiểm soát cảm xúc. Bắt đầu bằng việc gọi tên cảm xúc mỗi ngày và quan sát phản ứng của bản thân.' },
    ],
  },
  'trac-nghiem-cq': {
    name: 'Trí tuệ sáng tạo (CQ)',
    bands: [
      { min: 70, label: 'Cao', description: 'Bạn tư duy linh hoạt, giàu ý tưởng và không ngại phá vỡ khuôn mẫu. Hãy tìm môi trường cho phép bạn thử nghiệm và đổi mới.' },
      { min: 40, label: 'Trung bình', description: 'Bạn có khả năng sáng tạo khi cần nhưng thường theo lối an toàn. Thử đặt câu hỏi "nếu như" và kết hợp ý tưởng từ nhiều lĩnh vực để mở rộng tư duy.' },
      { min: 0, label: 'Thấp', description: 'Bạn thiên về cách làm quen thuộc, ổn định. Để khơi sáng tạo, hãy cho phép mình thử cái mới mà không sợ sai.' },
    ],
  },
  'trac-nghiem-aq': {
    name: 'Chỉ số vượt khó (AQ)',
    bands: [
      { min: 70, label: 'Cao', description: 'Bạn kiên cường, phục hồi nhanh và xem nghịch cảnh là cơ hội. Đây là nền tảng vững để theo đuổi mục tiêu dài hạn.' },
      { min: 40, label: 'Trung bình', description: 'Bạn vượt qua được khó khăn vừa phải nhưng dễ nản trước trở ngại lớn. Chia nhỏ vấn đề và xây mạng lưới hỗ trợ sẽ giúp bạn bền bỉ hơn.' },
      { min: 0, label: 'Thấp', description: 'Bạn dễ bị áp lực làm cho chùn bước. Luyện nhìn thất bại như bài học và tập trung vào điều mình kiểm soát được.' },
    ],
  },
  'trac-nghiem-sq': {
    name: 'Trí tuệ xã hội (SQ)',
    bands: [
      { min: 70, label: 'Cao', description: 'Bạn giao tiếp khéo léo, dễ kết nối và hiểu các tình huống xã hội. Kỹ năng này giúp bạn tỏa sáng trong làm việc nhóm và lãnh đạo.' },
      { min: 40, label: 'Trung bình', description: 'Bạn hòa nhập ổn nhưng đôi khi lúng túng trong tình huống mới. Quan sát ngôn ngữ cơ thể và chủ động bắt chuyện sẽ giúp bạn tự tin hơn.' },
      { min: 0, label: 'Thấp', description: 'Bạn có thể thấy ngại trong giao tiếp xã hội. Bắt đầu từ những cuộc trò chuyện nhỏ và lắng nghe nhiều hơn để dần thoải mái.' },
    ],
  },
  'trac-nghiem-pq': {
    name: 'Trí tuệ thể chất (PQ)',
    bands: [
      { min: 70, label: 'Cao', description: 'Bạn chăm sóc cơ thể tốt, năng lượng dồi dào và nhận biết rõ nhu cầu thể chất. Hãy duy trì thói quen lành mạnh này.' },
      { min: 40, label: 'Trung bình', description: 'Bạn quan tâm sức khỏe ở mức cơ bản nhưng chưa đều đặn. Đặt lịch vận động và ngủ nghỉ cố định sẽ cải thiện năng lượng đáng kể.' },
      { min: 0, label: 'Thấp', description: 'Bạn có thể đang bỏ quên thể chất. Bắt đầu từ những thay đổi nhỏ: uống đủ nước, đi bộ mỗi ngày, ngủ đúng giờ.' },
    ],
  },
  'trac-nghiem-suc-khoe-tam-ly': {
    name: 'Sức khỏe tâm lý',
    bands: [
      { min: 70, label: 'Cao', description: 'Tinh thần bạn đang ở trạng thái tốt: cân bằng, lạc quan và có khả năng phục hồi. Hãy tiếp tục duy trì những thói quen tích cực.' },
      { min: 40, label: 'Trung bình', description: 'Bạn ổn định ở mức khá nhưng có lúc căng thẳng hoặc mất cân bằng. Dành thời gian nghỉ ngơi và chia sẻ với người tin cậy sẽ giúp ích.' },
      { min: 0, label: 'Thấp', description: 'Bạn có thể đang chịu nhiều áp lực tinh thần. Hãy ưu tiên chăm sóc bản thân và cân nhắc tìm sự hỗ trợ từ người thân hoặc chuyên gia.' },
    ],
  },
};

function genericBand(percent: number): LikertDetail {
  if (percent >= 70) return { name: 'Chỉ số', level: 'Cao', description: 'Bạn đạt mức cao ở chỉ số này — một thế mạnh đáng phát huy.' };
  if (percent >= 40) return { name: 'Chỉ số', level: 'Trung bình', description: 'Bạn ở mức trung bình — còn dư địa để cải thiện thêm.' };
  return { name: 'Chỉ số', level: 'Thấp', description: 'Chỉ số này còn thấp — hãy dành thời gian rèn luyện thêm.' };
}

export function getLikertInterp(slug: string, percent: number): LikertDetail {
  const entry = LIKERT_INTERP[slug];
  if (!entry) return genericBand(percent);
  const band = entry.bands.find((b) => percent >= b.min) ?? entry.bands[entry.bands.length - 1];
  return { name: entry.name, level: band.label, description: band.description };
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
