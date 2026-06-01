import type { LovePairInterpretation } from '@/types';
import { diff, matchLevel } from './core';

// ── Nhóm năng lượng số ──
type EnergyGroup = 'INTELLECT' | 'EMOTION' | 'CREATIVE' | 'POWER' | 'MASTER';

const GROUP_OF: Record<number, EnergyGroup> = {
  1: 'INTELLECT', 5: 'INTELLECT', 7: 'INTELLECT',
  2: 'EMOTION', 4: 'EMOTION', 6: 'EMOTION',
  3: 'CREATIVE', 9: 'CREATIVE',
  8: 'POWER',
  11: 'MASTER', 22: 'MASTER', 33: 'MASTER',
};

function groupOf(n: number): EnergyGroup {
  return GROUP_OF[n] ?? 'EMOTION';
}

const GROUP_LABEL: Record<EnergyGroup, string> = {
  INTELLECT: 'lý trí - khám phá',
  EMOTION: 'tình cảm - gắn kết',
  CREATIVE: 'sáng tạo - tự do',
  POWER: 'quyền lực - tham vọng',
  MASTER: 'năng lượng bậc thầy',
};

// Ma trận luận giải nhóm × nhóm (đối xứng) — key sắp xếp theo alphabet
const PAIR_TEXT: Record<string, string> = {
  'INTELLECT|INTELLECT': 'Cả hai cùng thiên về lý trí và khám phá, dễ thấu hiểu cách suy nghĩ của nhau nhưng cần chủ động hâm nóng cảm xúc.',
  'EMOTION|INTELLECT': 'Một người trọng cảm xúc, một người trọng lý trí — bổ sung tốt nếu biết tôn trọng cách yêu khác biệt của nhau.',
  'CREATIVE|INTELLECT': 'Sự kết hợp giữa trí tuệ và sáng tạo tạo nên những cuộc trò chuyện thú vị, cùng nhau mở mang tầm nhìn.',
  'INTELLECT|POWER': 'Lý trí gặp tham vọng — cặp đôi mục tiêu rõ ràng, cần cân bằng giữa logic và quyền lực để tránh tranh giành.',
  'INTELLECT|MASTER': 'Trí tuệ gặp năng lượng bậc thầy — tiềm năng phát triển tinh thần sâu sắc, truyền cảm hứng cho nhau.',
  'EMOTION|EMOTION': 'Hai tâm hồn giàu cảm xúc, dễ đồng điệu và chăm sóc nhau, chỉ cần giữ không gian riêng để tránh phụ thuộc.',
  'CREATIVE|EMOTION': 'Cảm xúc gặp sáng tạo — mối quan hệ lãng mạn, nhiều màu sắc, nuôi dưỡng nhau bằng sự quan tâm tinh tế.',
  'EMOTION|POWER': 'Trái tim ấm áp gặp ý chí mạnh mẽ — một người che chở, một người dẫn dắt, hợp nếu cùng hướng về tổ ấm.',
  'EMOTION|MASTER': 'Cảm xúc sâu sắc cộng hưởng năng lượng bậc thầy, tạo nên sự gắn kết tâm linh khó tả.',
  'CREATIVE|CREATIVE': 'Hai tâm hồn tự do và sáng tạo, cuộc sống nhiều cảm hứng nhưng cần một người giữ nhịp ổn định.',
  'CREATIVE|POWER': 'Sáng tạo gặp tham vọng — cặp đôi biến ý tưởng thành hiện thực, cần thống nhất ai cầm lái.',
  'CREATIVE|MASTER': 'Sáng tạo bay bổng gặp tầm nhìn bậc thầy — cùng nhau kiến tạo điều ý nghĩa và lan tỏa.',
  'POWER|POWER': 'Hai ý chí mạnh mẽ — có thể là đồng minh quyền lực hoặc đối thủ, chìa khóa là tôn trọng và chia sẻ quyền quyết định.',
  'MASTER|POWER': 'Tham vọng gặp năng lượng bậc thầy — tiềm năng thành tựu lớn nếu cùng phụng sự một lý tưởng chung.',
  'MASTER|MASTER': 'Hai năng lượng bậc thầy gặp nhau — mối duyên định mệnh hiếm có, đòi hỏi sự trưởng thành để giữ cân bằng.',
};

function pairKey(a: EnergyGroup, b: EnergyGroup): string {
  return [a, b].sort().join('|');
}

function interpretOne(numberLabel: string, a: number, b: number): LovePairInterpretation {
  const ga = groupOf(a);
  const gb = groupOf(b);
  const verdict = matchLevel(diff(a, b));
  let text = PAIR_TEXT[pairKey(ga, gb)] ?? '';
  if (a === b) {
    text = `Cùng mang số ${a} (${GROUP_LABEL[ga]}) — sự đồng điệu tự nhiên, hai bạn phản ứng với cuộc sống theo cách rất giống nhau. ${text}`;
  }
  return { numberLabel, p1: a, p2: b, verdict, text };
}

// Tạo danh sách luận giải theo các con số được nhấn (emphasis) của từng variant
export function buildPairInterpretations(
  emphasis: { label: string; a: number; b: number }[],
): LovePairInterpretation[] {
  return emphasis.map((e) => interpretOne(e.label, e.a, e.b));
}
