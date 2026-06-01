import { Hono } from 'hono';
import { eq, sql } from 'drizzle-orm';
import { getDb, newId } from '../db/client';
import { quizzes, questions, answers, userResults } from '../db/schema';
import type { SubmitPayload, SubmitResponse, ScoreResult, AnswerInput } from '../types';
import type { Question, Answer } from '../db/schema';

type Env = { Bindings: { DB: D1Database } };

const route = new Hono<Env>();

async function dispatch(
  quiz: { quizType: string; answerFormat: string; scaleMin: number | null; scaleMax: number | null },
  questionRows: Question[],
  answerRows: Answer[],
  userAnswers: AnswerInput[],
  age?: number
): Promise<ScoreResult> {
  switch (quiz.quizType) {
    case 'MBTI': {
      const { scoreMbti } = await import('../services/scoring/mbti');
      return scoreMbti(answerRows, userAnswers);
    }
    case 'DISC': {
      const { scoreDisc } = await import('../services/scoring/disc');
      return scoreDisc(answerRows, userAnswers);
    }
    case 'SCORED': {
      const { scoreScored } = await import('../services/scoring/scored');
      return scoreScored(questionRows, answerRows, userAnswers, quiz.scaleMin, quiz.scaleMax, age);
    }
    case 'MI_LIKERT': {
      const { scoreMi } = await import('../services/scoring/mi');
      return scoreMi(questionRows, userAnswers, quiz.scaleMin ?? 1, quiz.scaleMax ?? 5);
    }
    default: {
      const { scoreLikert } = await import('../services/scoring/likert');
      return scoreLikert(questionRows, userAnswers, { scaleMin: quiz.scaleMin ?? 1, scaleMax: quiz.scaleMax ?? 5 });
    }
  }
}

route.post('/submit', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const body = await c.req.json<SubmitPayload>();

    if (!body.quizId || !Array.isArray(body.answers) || body.answers.length === 0) {
      return c.json({ error: 'Invalid payload: quizId and answers required' }, 400);
    }

    const quizRow = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.id, body.quizId))
      .limit(1);

    if (quizRow.length === 0) {
      return c.json({ error: 'Quiz not found' }, 404);
    }

    const quiz = quizRow[0];

    const questionRows = await db
      .select()
      .from(questions)
      .where(eq(questions.quizId, quiz.id));

    const answerRows = await db
      .select()
      .from(answers)
      .where(
        sql`${answers.questionId} IN (SELECT id FROM questions WHERE quiz_id = ${quiz.id})`
      );

    let scoreData: ScoreResult;
    try {
      scoreData = await dispatch(quiz, questionRows, answerRows, body.answers, body.age);
    } catch {
      return c.json({ error: 'Scoring service unavailable' }, 503);
    }

    const resultId = newId();
    await db.insert(userResults).values({
      id: resultId,
      quizId: quiz.id,
      answersData: body.answers as unknown as null,
      scoreData: scoreData as unknown as null,
      resultType: scoreData.kind,
      timeSpentSecs: body.timeSpentSecs ?? null,
      isUnlocked: false,
    });

    // Fire-and-forget completionCount increment
    db.update(quizzes)
      .set({ completionCount: sql`${quizzes.completionCount} + 1` })
      .where(eq(quizzes.id, quiz.id))
      .execute()
      .catch(() => {});

    const response: SubmitResponse = { resultId, isLocked: true };
    return c.json(response);
  } catch (err) {
    return c.json({ error: 'Failed to submit quiz' }, 500);
  }
});

export default route;
