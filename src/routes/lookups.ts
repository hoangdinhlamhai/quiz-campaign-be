import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb, newId } from '../db/client';
import { lookups } from '../db/schema';
import type {
  LoveLookupInput,
  BabyNamingInput,
  LookupSubmitResponse,
  LookupResponse,
  LockedLookup,
  UnlockedLookup,
  LookupResultData,
} from '../types';

type Env = { Bindings: { DB: D1Database } };

const route = new Hono<Env>();

route.post('/lookups/love', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const body = await c.req.json<LoveLookupInput>();

    if (!body.person1?.name || !body.person1?.birthDate || !body.person2?.name || !body.person2?.birthDate) {
      return c.json({ error: 'Invalid input: person1 and person2 with name and birthDate required' }, 400);
    }

    let resultData: LookupResultData;
    try {
      const { calculateLove } = await import('../services/numerology/love/index');
      resultData = calculateLove(body);
    } catch {
      return c.json({ error: 'Numerology service unavailable' }, 503);
    }

    const lookupId = newId();
    await db.insert(lookups).values({
      id: lookupId,
      lookupType: 'LOVE_COMPATIBILITY',
      inputsData: body as unknown as null,
      resultData: resultData as unknown as null,
      isUnlocked: false,
    });

    const response: LookupSubmitResponse = { lookupId, isLocked: true };
    return c.json(response);
  } catch (err) {
    return c.json({ error: 'Failed to process love lookup' }, 500);
  }
});

route.post('/lookups/baby-naming', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const body = await c.req.json<BabyNamingInput>();

    // Validate required fields
    if (!body.mode || !body.gender || !body.familyName || !body.birthDate) {
      return c.json({ error: 'Invalid input: mode, gender, familyName, birthDate required' }, 400);
    }
    // CHECK/COMPARE require non-empty names array
    if ((body.mode === 'CHECK' || body.mode === 'COMPARE') && (!body.names || body.names.length === 0)) {
      return c.json({ error: 'CHECK/COMPARE mode requires non-empty names array' }, 400);
    }

    let resultData: LookupResultData;
    try {
      const { calculateNaming } = await import('../services/numerology/naming/index');
      resultData = calculateNaming(body);
    } catch {
      return c.json({ error: 'Numerology service unavailable' }, 503);
    }

    const lookupId = newId();
    await db.insert(lookups).values({
      id: lookupId,
      lookupType: 'BABY_NAMING',
      inputsData: body as unknown as null,
      resultData: resultData as unknown as null,
      isUnlocked: false,
    });

    const response: LookupSubmitResponse = { lookupId, isLocked: true };
    return c.json(response);
  } catch (err) {
    return c.json({ error: 'Failed to process baby naming lookup' }, 500);
  }
});

route.get('/lookups/:id', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const id = c.req.param('id');

    const row = await db
      .select()
      .from(lookups)
      .where(eq(lookups.id, id))
      .limit(1);

    if (row.length === 0) {
      return c.json({ error: 'Lookup not found' }, 404);
    }

    const lookup = row[0];

    if (!lookup.isUnlocked) {
      const locked: LockedLookup = {
        isLocked: true,
        lookupId: lookup.id,
        lookupType: lookup.lookupType as LockedLookup['lookupType'],
      };
      return c.json(locked satisfies LookupResponse);
    }

    const unlocked: UnlockedLookup = {
      isLocked: false,
      lookupId: lookup.id,
      lookupType: lookup.lookupType as UnlockedLookup['lookupType'],
      result: lookup.resultData as unknown as LookupResultData,
    };
    return c.json(unlocked satisfies LookupResponse);
  } catch (err) {
    return c.json({ error: 'Failed to fetch lookup' }, 500);
  }
});

route.post('/lookups/:id/unlock', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const id = c.req.param('id');

    const row = await db
      .select()
      .from(lookups)
      .where(eq(lookups.id, id))
      .limit(1);

    if (row.length === 0) {
      return c.json({ error: 'Lookup not found' }, 404);
    }

    const lookup = row[0];

    if (lookup.isUnlocked) {
      return c.json({ error: 'Already unlocked' }, 400);
    }

    await db
      .update(lookups)
      .set({ isUnlocked: true })
      .where(eq(lookups.id, id));

    const unlocked: UnlockedLookup = {
      isLocked: false,
      lookupId: lookup.id,
      lookupType: lookup.lookupType as UnlockedLookup['lookupType'],
      result: lookup.resultData as unknown as LookupResultData,
    };
    return c.json(unlocked satisfies LookupResponse);
  } catch (err) {
    return c.json({ error: 'Failed to unlock lookup' }, 500);
  }
});

export default route;
