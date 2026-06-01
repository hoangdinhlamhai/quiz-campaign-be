// Naming Engine — dispatch 3 mode: CHECK, COMPARE, SUGGEST
import type { BabyNamingInput, NamingResult } from '@/types';
import { buildBirthOverview } from './birth-overview';
import { analyzeName } from './name-analysis';
import { suggestNames } from './suggest';

/**
 * Entry point cho tính năng đặt tên con.
 * - CHECK: phân tích 1 tên
 * - COMPARE: phân tích nhiều tên để so sánh
 * - SUGGEST: gợi ý top 5 tên phù hợp
 */
export function calculateNaming(input: BabyNamingInput): NamingResult {
  const { mode, birthDate, gender, familyName, names } = input;

  // Build birth overview (chung cho cả 3 mode)
  const birthOverview = buildBirthOverview(birthDate, gender);

  switch (mode) {
    case 'CHECK': {
      if (!names || names.length === 0) {
        throw new Error('CHECK mode requires at least one name');
      }
      const analysis = analyzeName(names[0], familyName, birthOverview);
      return { kind: 'NAMING', mode, birthOverview, names: [analysis] };
    }

    case 'COMPARE': {
      if (!names || names.length === 0) {
        throw new Error('COMPARE mode requires at least one name');
      }
      const analyses = names.map(n => analyzeName(n, familyName, birthOverview));
      // Sort by score desc
      analyses.sort((a, b) => b.score - a.score);
      return { kind: 'NAMING', mode, birthOverview, names: analyses };
    }

    case 'SUGGEST': {
      const suggestions = suggestNames(birthOverview, familyName, gender);
      return { kind: 'NAMING', mode, birthOverview, names: suggestions };
    }

    default:
      throw new Error(`Unknown naming mode: ${mode}`);
  }
}
