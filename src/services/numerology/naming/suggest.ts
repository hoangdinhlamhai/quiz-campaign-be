// Suggest — gợi ý top 5 tên phù hợp nhất, xoay theo ngày
import type { Gender, NamingBirthOverview, NameAnalysis } from '@/types';
import { VIETNAMESE_NAMES } from '@/data/vietnamese-names';
import { hashSeed, dayOfYear } from '../calc';
import { analyzeName } from './name-analysis';

/**
 * Lọc kho tên theo giới tính (bao gồm UNISEX).
 */
function filterByGender(gender: Gender) {
  return VIETNAMESE_NAMES.filter(
    n => n.gender === gender || n.gender === 'UNISEX',
  );
}

/**
 * Gợi ý top 5 tên phù hợp nhất.
 * - Lọc theo gender
 * - Score từng tên (ưu tiên bù số thiếu Lo Shu)
 * - Sort desc theo score
 * - Xoay vòng theo dayOfYear để mỗi ngày gợi ý khác nhau nhưng tất định trong ngày
 * - seed = hashSeed(birthDate + familyName) + dayOfYear(now)
 */
export function suggestNames(
  birthOverview: NamingBirthOverview,
  familyName: string,
  gender: Gender,
): NameAnalysis[] {
  const candidates = filterByGender(gender);

  // Score tất cả
  const scored = candidates.map(c => analyzeName(c.ten, familyName, birthOverview));

  // Sort desc by score, then by name for stability
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name, 'vi');
  });

  // Lấy top pool (top 20 để xoay vòng)
  const poolSize = Math.min(20, scored.length);
  const pool = scored.slice(0, poolSize);

  // Seed xoay vòng theo ngày
  const seed = hashSeed(birthOverview.birthDate + familyName) + dayOfYear(new Date());
  const offset = seed % Math.max(1, poolSize - 4);

  // Lấy 5 tên liên tiếp từ offset (wrap around)
  const result: NameAnalysis[] = [];
  for (let i = 0; i < 5 && i < pool.length; i++) {
    const idx = (offset + i) % pool.length;
    result.push(pool[idx]);
  }

  // Sort lại theo score desc cho output
  result.sort((a, b) => b.score - a.score);

  return result;
}
