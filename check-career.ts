import Database from 'better-sqlite3';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const dir = resolve('.', '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const f = readdirSync(dir).find(x => x.endsWith('.sqlite') && x !== 'metadata.sqlite')!;
const db = new Database(resolve(dir, f));
const rows = db.prepare("SELECT slug, is_published FROM quizzes WHERE slug LIKE '%nghe-nghiep%'").all();
console.log('Career quiz status:', rows);
db.close();
