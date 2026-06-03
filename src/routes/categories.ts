import { Hono } from 'hono';
import { eq, sql, and } from 'drizzle-orm';
import { getDb } from '../db/client';
import { categories, quizzes } from '../db/schema';
import type { CategorySummary } from '../types';

type Env = { Bindings: { DB: D1Database } };

const route = new Hono<Env>();

route.get('/categories', async (c) => {
  try {
    const db = getDb(c.env.DB);

    const rows = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        iconUrl: categories.iconUrl,
      })
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(categories.displayOrder);

    const includeQuizzes = c.req.query('includeQuizzes') === 'true';

    const result: CategorySummary[] = await Promise.all(
      rows.map(async (cat) => {
        const countRow = await db
          .select({ count: sql<number>`count(*)` })
          .from(quizzes)
          .where(and(eq(quizzes.categoryId, cat.id), eq(quizzes.isPublished, true)));

        const summary: CategorySummary = {
          ...cat,
          quizCount: countRow[0]?.count ?? 0,
        };

        if (includeQuizzes) {
          const quizList = await db
            .select({
              id: quizzes.id,
              title: quizzes.title,
              slug: quizzes.slug,
              description: quizzes.description,
              thumbnailUrl: quizzes.thumbnailUrl,
              quizType: quizzes.quizType,
              answerFormat: quizzes.answerFormat,
              totalQuestions: quizzes.totalQuestions,
              timeLimitMins: quizzes.timeLimitMins,
            })
            .from(quizzes)
            .where(and(eq(quizzes.categoryId, cat.id), eq(quizzes.isPublished, true)));

          summary.quizzes = quizList as CategorySummary['quizzes'];
        }

        return summary;
      })
    );

    return c.json(result);
  } catch (err) {
    console.error('GET /api/categories failed', err);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

export default route;
