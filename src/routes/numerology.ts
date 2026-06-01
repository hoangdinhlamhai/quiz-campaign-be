import { Hono } from 'hono';
import type { NumerologyProfile } from '../types';

type Env = { Bindings: { DB: D1Database } };
const route = new Hono<Env>();

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

export default route;
