import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { getDb } from '../db/client';
import { userResults, quizzes } from '../db/schema';
import type { ResultResponse, LockedResult, UnlockedResult, ScoreResult, MbtiResult, MbtiDetail, DiscResult, LikertResult, BigFiveResult, MiResult, IqResult } from '../types';

type Env = { Bindings: { DB: D1Database } };

const route = new Hono<Env>();

async function getMbtiDetail(type: string): Promise<MbtiDetail | undefined> {
  try {
    const { MBTI_TYPES } = await import('../data/mbti-types');
    const info = MBTI_TYPES[type];
    if (!info) return undefined;
    return {
      type: info.type,
      name: info.name,
      description: info.description,
      strengths: info.strengths,
      weaknesses: info.weaknesses,
      careers: info.careers,
    };
  } catch {
    return undefined;
  }
}

// Attach detail luận giải cho từng loại result (MBTI, DISC, LIKERT, Big Five, MI).
async function enrichScore(scoreData: ScoreResult, slug: string): Promise<void> {
  if (scoreData.kind === 'MBTI') {
    const detail = await getMbtiDetail((scoreData as MbtiResult).type);
    if (detail) (scoreData as MbtiResult).detail = detail;
    return;
  }
  if (scoreData.kind === 'DISC') {
    try {
      const { getDiscDetail } = await import('../data/disc-types');
      const detail = getDiscDetail((scoreData as DiscResult).dominant);
      if (detail) (scoreData as DiscResult).detail = detail;
    } catch { /* noop */ }
    return;
  }
  if (scoreData.kind === 'LIKERT') {
    const r = scoreData as LikertResult;
    const keys = Object.keys(r.dimensions);
    // chỉ attach cho bài single-score (1 dim TOTAL)
    if (keys.length === 1 && keys[0] === 'TOTAL') {
      try {
        const { getLikertInterp } = await import('../data/score-interpretations');
        r.detail = getLikertInterp(slug, r.dimensions.TOTAL.percent);
      } catch { /* noop */ }
    }
    return;
  }
  if (scoreData.kind === 'BIG_FIVE') {
    try {
      const { getBigFiveDetail } = await import('../data/score-interpretations');
      (scoreData as BigFiveResult).detail = getBigFiveDetail((scoreData as BigFiveResult).dimensions);
    } catch { /* noop */ }
    return;
  }
  if (scoreData.kind === 'MI') {
    try {
      const { getMiDetail } = await import('../data/score-interpretations');
      (scoreData as MiResult).detail = getMiDetail((scoreData as MiResult).intelligences);
    } catch { /* noop */ }
    return;
  }
  if (scoreData.kind === 'IQ') {
    try {
      const { getIqDetail } = await import('../data/iq-interpretation');
      (scoreData as IqResult).detail = getIqDetail((scoreData as IqResult).iqScore);
    } catch { /* noop */ }
  }
}

route.get('/results/:id', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const id = c.req.param('id');

    const row = await db
      .select()
      .from(userResults)
      .where(eq(userResults.id, id))
      .limit(1);

    if (row.length === 0) {
      return c.json({ error: 'Result not found' }, 404);
    }

    const result = row[0];

    const quizRow = await db
      .select({ title: quizzes.title, quizType: quizzes.quizType, slug: quizzes.slug })
      .from(quizzes)
      .where(eq(quizzes.id, result.quizId))
      .limit(1);

    const quiz = quizRow[0];

    if (!result.isUnlocked) {
      const locked: LockedResult = {
        isLocked: true,
        resultId: result.id,
        quizTitle: quiz?.title ?? '',
        quizType: (quiz?.quizType ?? 'MBTI') as LockedResult['quizType'],
        quizSlug: quiz?.slug ?? '',
        timeSpentSecs: result.timeSpentSecs,
      };
      return c.json(locked satisfies ResultResponse);
    }

    let scoreData = result.scoreData as unknown as ScoreResult;

    await enrichScore(scoreData, quiz?.slug ?? '');

    const unlocked: UnlockedResult = {
      isLocked: false,
      resultId: result.id,
      quizTitle: quiz?.title ?? '',
      quizType: (quiz?.quizType ?? 'MBTI') as UnlockedResult['quizType'],
      quizSlug: quiz?.slug ?? '',
      result: scoreData,
    };
    return c.json(unlocked satisfies ResultResponse);
  } catch (err) {
    return c.json({ error: 'Failed to fetch result' }, 500);
  }
});

route.post('/results/:id/unlock', async (c) => {
  try {
    const db = getDb(c.env.DB);
    const id = c.req.param('id');

    const row = await db
      .select()
      .from(userResults)
      .where(eq(userResults.id, id))
      .limit(1);

    if (row.length === 0) {
      return c.json({ error: 'Result not found' }, 404);
    }

    const result = row[0];

    if (result.isUnlocked) {
      return c.json({ error: 'Already unlocked' }, 400);
    }

    await db
      .update(userResults)
      .set({ isUnlocked: true })
      .where(eq(userResults.id, id));

    const quizRow = await db
      .select({ title: quizzes.title, quizType: quizzes.quizType, slug: quizzes.slug })
      .from(quizzes)
      .where(eq(quizzes.id, result.quizId))
      .limit(1);

    const quiz = quizRow[0];

    let scoreData = result.scoreData as unknown as ScoreResult;

    await enrichScore(scoreData, quiz?.slug ?? '');

    const unlocked: UnlockedResult = {
      isLocked: false,
      resultId: result.id,
      quizTitle: quiz?.title ?? '',
      quizType: (quiz?.quizType ?? 'MBTI') as UnlockedResult['quizType'],
      quizSlug: quiz?.slug ?? '',
      result: scoreData,
    };
    return c.json(unlocked satisfies ResultResponse);
  } catch (err) {
    return c.json({ error: 'Failed to unlock result' }, 500);
  }
});

export default route;
