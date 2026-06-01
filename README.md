# quiz-be

Quiz & Numerology platform backend — Hono on Cloudflare Workers with D1 (SQLite).

## Setup

```bash
npm install
```

## Dev Commands

```bash
npm run dev            # Start local dev server (wrangler, port 8787)
npm run db:generate    # Generate migration SQL from schema
npm run db:migrate     # Apply migrations to local D1
npm run typecheck      # TypeScript check
```

## Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **IDs**: nanoid
