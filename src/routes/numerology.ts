import { Hono } from 'hono';
import { count, eq } from 'drizzle-orm';
import { getDb, newId } from '../db/client';
import { lookups } from '../db/schema';
import type { NumerologyProfile, NumberMeaning, NumerologyLookupMeta } from '../types';

type Env = { Bindings: { DB: D1Database } };
const route = new Hono<Env>();

const LOOKUP_TYPE = 'NUMEROLOGY_PROFILE';
// Số chủ đạo hợp lệ: 1-9 + 3 số bậc thầy
const MASTER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

async function countLookups(db: ReturnType<typeof getDb>): Promise<number> {
  const rows = await db
    .select({ value: count() })
    .from(lookups)
    .where(eq(lookups.lookupType, LOOKUP_TYPE));
  return rows[0]?.value ?? 0;
}

route.get('/numerology/profile', async (c) => {
  const name = c.req.query('name');
  const birthDate = c.req.query('birthDate');

  if (!name || !birthDate) {
    return c.json({ error: 'name and birthDate query params required' }, 400);
  }

  try {
    const { calculateProfile } = await import('../services/numerology/profile');
    const profile: NumerologyProfile = calculateProfile(name, birthDate);
    return c.json(profile);
  } catch {
    return c.json({ error: 'Profile calculation failed' }, 500);
  }
});

// Meta cho form tra cứu: lượt tra cứu THẬT + ý nghĩa các số chủ đạo (chips)
route.get('/numerology/lookups/meta', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const { getNumInfo } = await import('../services/numerology/interpretations');
    const numbers: NumberMeaning[] = MASTER_NUMBERS.map((n) => {
      const info = getNumInfo(n);
      return {
        number: n,
        keywords: info.keywords,
        strength: info.strength,
        weakness: info.weakness,
        desc: info.desc,
      };
    });
    const meta: NumerologyLookupMeta = { count: await countLookups(db), numbers };
    return c.json(meta);
  } catch {
    return c.json({ error: 'Failed to load numerology meta' }, 500);
  }
});

// Đếm 1 lượt tra cứu thần số học cá nhân (ẩn danh, không lưu input)
route.post('/numerology/lookups', async (c) => {
  try {
    const db = getDb(c.env.DB);
    await db.insert(lookups).values({
      id: newId(),
      lookupType: LOOKUP_TYPE,
      inputsData: null,
      resultData: null,
      isUnlocked: true,
    });
    return c.json({ count: await countLookups(db) });
  } catch {
    return c.json({ error: 'Failed to record numerology lookup' }, 500);
  }
});

export default route;
