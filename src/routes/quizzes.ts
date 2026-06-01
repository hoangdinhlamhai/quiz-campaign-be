import { Hono } from 'hono';
import { eq, sql, and } from 'drizzle-orm';
import { getDb } from '../db/client';
import { quizzes, questions, answers, categories } from '../db/schema';
import type { PublicQuiz, PublicQuestion, PublicAnswer, QuizListItem } from '../types';

type Env = { Bindings: { DB: D1Database } };

const route = new Hono<Env>();

function toPublicAnswer(a: { id: string; content: string; imageUrl: string | null }): PublicAnswer {
  return { id: a.id, content: a.content, imageUrl: a.imageUrl };
}

function toPublicQuestion(
  q: { id: string; content: string; imageUrl: string | null; orderNumber: number },
  questionAnswers: PublicAnswer[],
  answerFormat: string
): PublicQuestion {
  return {
    id: q.id,
    content: q.content,
    imageUrl: q.imageUrl,
    orderNumber: q.orderNumber,
    answers: answerFormat === 'LIKERT_SCALE' ? [] : questionAnswers,
  };
}

function toPublicQuiz(
  quiz: typeof quizzes.$inferSelect,
  publicQuestions: PublicQuestion[]
): PublicQuiz {
  return {
    id: quiz.id,
    categoryId: quiz.categoryId,
    title: quiz.title,
    slug: quiz.slug,
    description: quiz.description,
    instruction: quiz.instruction,
    thumbnailUrl: quiz.thumbnailUrl,
    quizType: quiz.quizType as PublicQuiz['quizType'],
    answerFormat: quiz.answerFormat as PublicQuiz['answerFormat'],
    scaleMin: quiz.scaleMin,
    scaleMax: quiz.scaleMax,
    scaleLabelMin: quiz.scaleLabelMin,
    scaleLabelMax: quiz.scaleLabelMax,
    timeLimitMins: quiz.timeLimitMins,
    totalQuestions: quiz.totalQuestions,
    completionCount: quiz.completionCount,
    questions: publicQuestions,
  };
}

route.get('/quizzes', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const categorySlug = c.req.query('categorySlug');

    let categoryId: string | undefined;
    if (categorySlug) {
      const cat = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, categorySlug))
        .limit(1);
      if (cat.length === 0) {
        return c.json([] as QuizListItem[]);
      }
      categoryId = cat[0].id;
    }

    const condition = categoryId
      ? and(eq(quizzes.isPublished, true), eq(quizzes.categoryId, categoryId))
      : eq(quizzes.isPublished, true);

    const rows = await db
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
      .where(condition);

    return c.json(rows as QuizListItem[]);
  } catch (err) {
    return c.json({ error: 'Failed to fetch quizzes' }, 500);
  }
});

route.get('/quizzes/:slug', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const slug = c.req.param('slug');

    const quizRow = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.slug, slug))
      .limit(1);

    if (quizRow.length === 0) {
      return c.json({ error: 'Quiz not found' }, 404);
    }

    const quiz = quizRow[0];

    const questionRows = await db
      .select()
      .from(questions)
      .where(eq(questions.quizId, quiz.id))
      .orderBy(questions.orderNumber);

    const publicQuestions: PublicQuestion[] = await Promise.all(
      questionRows.map(async (q) => {
        const answerRows = await db
          .select({ id: answers.id, content: answers.content, imageUrl: answers.imageUrl })
          .from(answers)
          .where(eq(answers.questionId, q.id));

        const publicAnswers = answerRows.map(toPublicAnswer);
        return toPublicQuestion(q, publicAnswers, quiz.answerFormat);
      })
    );

    // Fire-and-forget viewCount increment
    db.update(quizzes)
      .set({ viewCount: sql`${quizzes.viewCount} + 1` })
      .where(eq(quizzes.id, quiz.id))
      .execute()
      .catch(() => {});

    return c.json(toPublicQuiz(quiz, publicQuestions));
  } catch (err) {
    return c.json({ error: 'Failed to fetch quiz' }, 500);
  }
});

export default route;
