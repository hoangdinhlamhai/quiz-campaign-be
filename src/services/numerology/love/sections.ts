import type { LovePersonNumbers, LoveDimension, LoveComparisonRow, LoveHighlight } from '@/types';
import { diff, matchLevel } from './core';

// 9 chiều — mỗi chiều map tới 1 con số cụ thể của từng người (phân hóa thật)
const DIMENSION_LABELS = [
  'Mạnh mẽ - Độc lập',
  'Lắng nghe - Khéo léo',
  'Sáng tạo - Hoạt bát',
  'Cẩn thận - Thực tế',
  'Năng động - Linh hoạt',
  'Quan tâm - Yêu thương',
  'Thông thái - Khám phá',
  'Công bằng - Lý tưởng',
  'Trách nhiệm - Rộng lượng',
];

// scale 1 con số (1-33) → percent 30-95, trải đều theo index để các chiều khác nhau
function scale(value: number, i: number): number {
  const base = ((value * 7 + i * 13) % 60) + 30; // 30..89
  return Math.min(95, base);
}

function pickNum(n: LovePersonNumbers, i: number): number {
  const order = [n.lifePath, n.soul, n.destiny, n.personality, n.maturity, n.balance];
  return order[i % order.length];
}

export function buildDimensions(p1: LovePersonNumbers, p2: LovePersonNumbers): LoveDimension[] {
  return DIMENSION_LABELS.map((label, i) => ({
    label,
    person1Percent: scale(pickNum(p1, i), i),
    person2Percent: scale(pickNum(p2, i), i),
  }));
}

// Radar: lấy 5 trục cô đọng từ dimensions
export function buildRadarAxes(dims: LoveDimension[]) {
  const idx = [0, 2, 4, 6, 8];
  return idx.map((i) => ({
    axis: dims[i].label.split(' - ')[0],
    p1: dims[i].person1Percent,
    p2: dims[i].person2Percent,
  }));
}

export function buildComparison(p1: LovePersonNumbers, p2: LovePersonNumbers): LoveComparisonRow[] {
  const rows: { label: string; a: number; b: number }[] = [
    { label: 'Số Chủ Đạo', a: p1.lifePath, b: p2.lifePath },
    { label: 'Số Sứ Mệnh', a: p1.destiny, b: p2.destiny },
    { label: 'Số Linh Hồn', a: p1.soul, b: p2.soul },
    { label: 'Số Thái Độ', a: p1.personality, b: p2.personality },
    { label: 'Số Trưởng Thành', a: p1.maturity, b: p2.maturity },
  ];
  return rows.map((r) => ({
    label: r.label,
    person1: String(r.a),
    person2: String(r.b),
    match: matchLevel(diff(r.a, r.b)),
  }));
}

export function buildHighlights(dims: LoveDimension[]): LoveHighlight[] {
  const descs = [
    'Cả hai cùng thể hiện mạnh đặc điểm này, tạo nền tảng vững cho sự hòa hợp.',
    'Khía cạnh hai bạn đồng điệu rõ rệt, giúp giảm xung đột và tăng thấu hiểu.',
    'Hai bạn phản ứng tương tự trong lĩnh vực này, gắn kết tự nhiên và bền vững.',
  ];
  return dims
    .map((d) => ({ d, gap: Math.abs(d.person1Percent - d.person2Percent) }))
    .sort((a, b) => a.gap - b.gap)
    .slice(0, 3)
    .map((x, i) => ({ title: x.d.label, description: descs[i % descs.length] }));
}

export { DIMENSION_LABELS };
