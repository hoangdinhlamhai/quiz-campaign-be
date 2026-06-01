import { drizzle } from 'drizzle-orm/d1';
import { nanoid } from 'nanoid';
import * as schema from './schema';

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export function newId() {
  return nanoid(21);
}
