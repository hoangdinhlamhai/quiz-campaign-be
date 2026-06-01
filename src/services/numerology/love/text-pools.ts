// Pool câu chữ xoay vòng theo seed-có-ngày. Mỗi tầng % có ≥8 biến thể.
// LOVE: lãng mạn, trẻ trung. AFFINITY: duyên phận, huyền học.
import { rotate } from './core';

type Variant = 'LOVE' | 'AFFINITY';
interface Tier {
  min: number;
  items: string[];
}

const HEADLINES: Record<Variant, Tier[]> = {
  LOVE: [
    { min: 88, items: ['Tâm đầu ý hợp', 'Cặp đôi định mệnh', 'Linh hồn đồng điệu', 'Yêu là thấy', 'Hai nửa hoàn hảo', 'Tình yêu sét đánh', 'Trọn vẹn từng nhịp', 'Đôi ta là một'] },
    { min: 75, items: ['Rất hợp nhau', 'Cặp đôi lý tưởng', 'Tình yêu ngọt ngào', 'Hòa hợp đáng yêu', 'Chemistry mạnh mẽ', 'Đồng điệu tâm hồn', 'Ăn ý bất ngờ', 'Yêu thương đong đầy'] },
    { min: 62, items: ['Khá hợp gu', 'Tình cảm tiềm năng', 'Bổ sung cho nhau', 'Hợp nhưng cần vun đắp', 'Chớm nở đáng yêu', 'Có duyên có phận', 'Hành trình thú vị', 'Đáng để thử'] },
    { min: 0, items: ['Trái dấu hút nhau', 'Khác biệt thú vị', 'Cần thấu hiểu thêm', 'Thử thách ngọt ngào', 'Hai thế giới gặp nhau', 'Cơ hội khám phá', 'Yêu là học hỏi', 'Đối cực hấp dẫn'] },
  ],
  AFFINITY: [
    { min: 88, items: ['Duyên phận trời định', 'Nợ duyên sâu nặng', 'Định mệnh an bài', 'Tri kỷ vạn kiếp', 'Mối duyên hiếm có', 'Trời sinh một cặp', 'Duyên lành bền chặt', 'Kết tóc se duyên'] },
    { min: 75, items: ['Duyên sâu phận đậm', 'Gắn kết bền lâu', 'Duyên lành đáng quý', 'Đồng hành dài lâu', 'Duyên nợ rõ ràng', 'Bến đỗ bình yên', 'Nương tựa vào nhau', 'Duyên trời sắp đặt'] },
    { min: 62, items: ['Có duyên cần giữ', 'Duyên phận tiềm tàng', 'Cần thời gian vun duyên', 'Duyên đến từ từ', 'Gắn kết dần sâu', 'Duyên lành chớm nở', 'Đường dài mới biết', 'Tùy duyên mà tiến'] },
    { min: 0, items: ['Duyên mỏng cần vun', 'Thử thách duyên phận', 'Khác biệt cần dung hòa', 'Duyên đến muộn', 'Cần nỗ lực giữ duyên', 'Duyên nợ trắc trở', 'Hữu duyên vô phận?', 'Tu duyên mới bền'] },
  ],
};

const SUMMARIES: Record<Variant, Tier[]> = {
  LOVE: [
    { min: 78, items: [
      'Hai bạn có sức hút mãnh liệt và sự đồng điệu hiếm có. Tình yêu đến tự nhiên như hơi thở.',
      'Một cặp đôi mà ánh mắt đã đủ nói lên tất cả. Sự ăn ý khiến mọi khoảnh khắc bên nhau đều ngọt ngào.',
      'Tình cảm của hai bạn như được lập trình sẵn để hòa quyện. Càng ở bên nhau càng thấy đúng người.',
      'Chemistry giữa hai bạn rất mạnh, dễ dàng thấu hiểu và cùng nhau tạo nên những kỷ niệm đẹp.',
      'Hai trái tim cùng nhịp đập, yêu thương trao đi nhận lại một cách trọn vẹn và tự nhiên.',
      'Sự kết hợp khiến cả hai trở thành phiên bản tốt nhất của chính mình khi yêu.',
      'Một tình yêu vừa lãng mạn vừa vững chãi, nơi cả hai đều cảm thấy được trân trọng.',
      'Hai bạn bổ sung cho nhau hoàn hảo, tạo nên một mối quan hệ vừa say đắm vừa an toàn.',
    ] },
    { min: 64, items: [
      'Hai bạn có nhiều điểm hợp gu và tiềm năng phát triển tình cảm, chỉ cần thêm chút thời gian.',
      'Tình yêu có nền tảng tốt, những khác biệt nhỏ hoàn toàn có thể dung hòa bằng sự quan tâm.',
      'Cả hai hấp dẫn nhau theo cách riêng, hành trình yêu đương hứa hẹn nhiều điều thú vị.',
      'Một mối quan hệ đáng để vun đắp, nơi cả hai học cách yêu thương đúng điệu của nhau.',
      'Hai bạn có sự hòa hợp dễ chịu, càng tìm hiểu càng phát hiện nhiều điểm chung bất ngờ.',
      'Tình cảm chớm nở đầy hứa hẹn, sự chân thành sẽ là chìa khóa đưa hai bạn đến gần nhau.',
      'Cặp đôi có tiềm năng, chỉ cần cởi mở chia sẻ là tình yêu sẽ thăng hoa.',
      'Nền tảng tình cảm vững, hai bạn hoàn toàn có thể xây dựng điều đẹp đẽ cùng nhau.',
    ] },
    { min: 0, items: [
      'Hai bạn khá khác biệt, nhưng chính sự trái dấu đó tạo nên sức hút và điều để khám phá.',
      'Tình yêu giữa hai thế giới khác nhau đòi hỏi thấu hiểu, nhưng phần thưởng là sự trưởng thành.',
      'Khác biệt không phải rào cản mà là gia vị, nếu cả hai chịu lắng nghe và bao dung.',
      'Một mối quan hệ thử thách nhưng đáng giá, nơi cả hai học được nhiều điều từ nhau.',
      'Hai bạn nhìn cuộc sống theo cách khác nhau, đó là cơ hội để mở rộng thế giới của mình.',
      'Tình yêu này cần nỗ lực từ hai phía, nhưng sự khác biệt cũng làm nó thú vị hơn.',
      'Đối cực hút nhau — nếu vượt qua được khác biệt, hai bạn sẽ rất bền.',
      'Hành trình yêu đương nhiều màu sắc, đòi hỏi kiên nhẫn nhưng không thiếu điều bất ngờ.',
    ] },
  ],
  AFFINITY: [
    { min: 78, items: [
      'Mối duyên giữa hai bạn sâu nặng như đã hẹn ước từ kiếp trước, gắn kết bền chặt qua thời gian.',
      'Đây là duyên phận trời định, hai bạn được sinh ra để đồng hành và nương tựa vào nhau.',
      'Sợi dây duyên nợ giữa hai bạn rất mạnh, càng đi cùng nhau càng thấy đúng là định mệnh.',
      'Một mối duyên hiếm có, nơi hai tâm hồn thấu hiểu nhau ở tầng sâu nhất.',
      'Duyên lành đã kết, hai bạn có nền tảng vững để xây dựng một mái ấm dài lâu.',
      'Hai bạn như tri kỷ vạn kiếp gặp lại, sự gắn kết vượt lên trên tình yêu thông thường.',
      'Duyên phận an bài cho hai bạn một hành trình đồng hành đầy bình yên và sâu sắc.',
      'Mối duyên này được trời sắp đặt, hai bạn sẽ là điểm tựa vững chắc của nhau.',
    ] },
    { min: 64, items: [
      'Hai bạn có duyên phận tốt, cần thời gian vun đắp để sợi dây gắn kết ngày càng sâu.',
      'Duyên lành đang dần hình thành, sự kiên nhẫn sẽ giúp hai bạn đi được đường dài.',
      'Mối duyên có tiềm năng bền vững nếu cả hai biết trân trọng và cùng nhau vượt sóng gió.',
      'Gắn kết giữa hai bạn sẽ sâu dần theo năm tháng, duyên đến từ từ nhưng chắc chắn.',
      'Hai bạn có cơ duyên đồng hành, chỉ cần dung hòa khác biệt là duyên sẽ thành phận.',
      'Duyên phận tiềm tàng nhiều hứa hẹn, đường dài mới thấy được sự hợp nhau thật sự.',
      'Một mối duyên đáng giữ, nơi cả hai cùng học cách nâng đỡ nhau qua thời gian.',
      'Nền duyên vững vàng, nếu cùng vun trồng hai bạn sẽ có một kết cục viên mãn.',
    ] },
    { min: 0, items: [
      'Duyên giữa hai bạn còn mỏng, cần nhiều nỗ lực và bao dung để vun thành phận bền.',
      'Đây là mối duyên thử thách, đòi hỏi cả hai tu dưỡng và kiên trì mới giữ được lâu.',
      'Khác biệt khá lớn, nhưng nếu cả hai thật lòng muốn giữ, duyên vẫn có thể đơm hoa.',
      'Duyên đến có phần trắc trở, hành trình cần sự thấu hiểu và hy sinh từ hai phía.',
      'Mối duyên này cần thời gian và công sức, đường dài sẽ kiểm chứng tấm lòng của nhau.',
      'Hai bạn ở hai thế giới khác nhau, dung hòa được thì duyên mỏng cũng hóa phận sâu.',
      'Duyên phận nhiều thử thách, nhưng vượt qua được sẽ là minh chứng cho sự bền bỉ.',
      'Cần tu duyên dưỡng phận, sự chân thành sẽ là cầu nối đưa hai bạn lại gần nhau.',
    ] },
  ],
};

const ADVICE: Record<Variant, string[][]> = {
  LOVE: [
    ['Dành thời gian chất lượng bên nhau mỗi ngày', 'Bày tỏ tình cảm bằng cả lời nói và hành động', 'Giữ sự lãng mạn và bất ngờ trong mối quan hệ'],
    ['Lắng nghe nhiều hơn nói', 'Tôn trọng không gian riêng của nhau', 'Cùng tạo những kỷ niệm mới mẻ'],
    ['Thẳng thắn chia sẻ cảm xúc thật', 'Đừng để hiểu lầm tích tụ', 'Trân trọng những điều nhỏ bé của đối phương'],
    ['Học cách yêu theo ngôn ngữ của đối phương', 'Cùng nhau vượt qua thử thách thay vì đổ lỗi', 'Giữ ngọn lửa đam mê luôn cháy'],
  ],
  AFFINITY: [
    ['Xây dựng niềm tin vững chắc qua từng ngày', 'Cùng nhau đặt mục tiêu dài hạn', 'Tôn trọng giá trị và gia đình của nhau'],
    ['Kiên nhẫn vun đắp duyên phận', 'Học cách tha thứ và bao dung', 'Đồng hành qua cả lúc khó khăn'],
    ['Giữ sự chân thành làm gốc', 'Cùng nhau trưởng thành về tinh thần', 'Đừng để cái tôi phá vỡ mối duyên'],
    ['Trân trọng mối duyên hiếm có này', 'Cân bằng giữa cho đi và nhận lại', 'Nuôi dưỡng sự gắn kết bằng sự thấu hiểu'],
  ],
};

function pickTier(tiers: Tier[], percent: number): Tier {
  return tiers.find((t) => percent >= t.min) ?? tiers[tiers.length - 1];
}

export function getHeadline(variant: Variant, percent: number, seed: number): string {
  return rotate(pickTier(HEADLINES[variant], percent).items, seed);
}

export function getSummary(variant: Variant, percent: number, seed: number): string {
  return rotate(pickTier(SUMMARIES[variant], percent).items, seed);
}

export function getAdvice(variant: Variant, seed: number): string[] {
  return rotate(ADVICE[variant], seed);
}
