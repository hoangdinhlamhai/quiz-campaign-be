import Database from 'better-sqlite3';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { QuizType, AnswerFormat } from '../../types.js';

import { categoriesData, LOOKUP_TOOLS } from './categories.js';
import { mbtiQuiz, mbtiQuestionsData } from './mbti.js';
import { disc20, disc30, disc40 } from './disc.js';
import { eqQuiz, cqQuiz, aqQuiz, sqQuiz, pqQuiz } from './likert-indices.js';
import { bigFiveQuiz, bigFiveQuestionsData } from './big-five.js';
import { miQuiz, miQuestionsData } from './mi.js';
import { iqQuiz, iqQuestionsData } from './iq.js';
import { psychologyQuiz, psychologyQuestionsData } from './psychology.js';
import { loveQuiz, loveQuestionsData } from './love-quiz.js';
import { careerQuiz, careerQuestionsData } from './career.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = resolve(
  __dirname,
  '../../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/c204843922c7d8b0460aacd7d5eef263a2ad6de9bd92c76a90ee80ed8b6b331b.sqlite'
);

function seed() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  const tx = db.transaction(() => {
    // Clear in FK-safe order
    db.exec('DELETE FROM answers');
    db.exec('DELETE FROM questions');
    db.exec('DELETE FROM user_results');
    db.exec('DELETE FROM quizzes');
    db.exec('DELETE FROM lookups');
    db.exec('DELETE FROM categories');

    // Insert categories
    const insertCat = db.prepare(
      'INSERT INTO categories (id, name, slug, description, icon_url, display_order, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    for (const c of categoriesData) {
      insertCat.run(c.id, c.name, c.slug, c.description, c.iconUrl, c.displayOrder, c.isActive ? 1 : 0, c.createdAt);
    }

    // Insert quizzes
    const insertQuiz = db.prepare(
      `INSERT INTO quizzes (id, category_id, title, slug, description, instruction, thumbnail_url, quiz_type, answer_format, scale_min, scale_max, scale_label_min, scale_label_max, time_limit_mins, total_questions, is_published, view_count, completion_count, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const insertQuestion = db.prepare(
      'INSERT INTO questions (id, quiz_id, content, image_url, order_number, dimension_key, is_reverse_scored) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    const insertAnswer = db.prepare(
      'INSERT INTO answers (id, question_id, content, image_url, is_correct, score_value, dimension_pole) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    interface QuizRow {
      id: string;
      categoryId: string;
      title: string;
      slug: string;
      description: string | null;
      instruction: string | null;
      thumbnailUrl: string | null;
      quizType: QuizType;
      answerFormat: AnswerFormat;
      scaleMin: number | null;
      scaleMax: number | null;
      scaleLabelMin: string | null;
      scaleLabelMax: string | null;
      timeLimitMins: number;
      totalQuestions: number;
      isPublished: boolean;
      viewCount: number;
      completionCount: number;
      createdAt: number;
    }

    function seedQuiz(quiz: QuizRow) {
      insertQuiz.run(
        quiz.id, quiz.categoryId, quiz.title, quiz.slug, quiz.description, quiz.instruction,
        quiz.thumbnailUrl, quiz.quizType, quiz.answerFormat, quiz.scaleMin, quiz.scaleMax,
        quiz.scaleLabelMin, quiz.scaleLabelMax, quiz.timeLimitMins, quiz.totalQuestions,
        quiz.isPublished ? 1 : 0, quiz.viewCount, quiz.completionCount, quiz.createdAt
      );
    }

    function seedQuestionsWithAnswers(data: Array<{ question: any; answers: any[] }>) {
      for (const item of data) {
        const q = item.question;
        insertQuestion.run(q.id, q.quizId, q.content, q.imageUrl, q.orderNumber, q.dimensionKey, q.isReverseScored ? 1 : 0);
        for (const a of item.answers) {
          insertAnswer.run(a.id, a.questionId, a.content, a.imageUrl, a.isCorrect ? 1 : 0, a.scoreValue, a.dimensionPole);
        }
      }
    }

    function seedLikertQuestions(data: Array<{ id: string; quizId: string; content: string; imageUrl: string | null; orderNumber: number; dimensionKey: string; isReverseScored: boolean }>) {
      for (const q of data) {
        insertQuestion.run(q.id, q.quizId, q.content, q.imageUrl, q.orderNumber, q.dimensionKey, q.isReverseScored ? 1 : 0);
      }
    }

    // MBTI
    seedQuiz(mbtiQuiz);
    seedQuestionsWithAnswers(mbtiQuestionsData);

    // DISC 20/30/40
    seedQuiz(disc20.quiz);
    seedQuestionsWithAnswers(disc20.questionsData);
    seedQuiz(disc30.quiz);
    seedQuestionsWithAnswers(disc30.questionsData);
    seedQuiz(disc40.quiz);
    seedQuestionsWithAnswers(disc40.questionsData);

    // IQ
    seedQuiz(iqQuiz);
    seedQuestionsWithAnswers(iqQuestionsData);

    // EQ/CQ/AQ/SQ/PQ (Likert — no answers)
    for (const lq of [eqQuiz, cqQuiz, aqQuiz, sqQuiz, pqQuiz]) {
      seedQuiz(lq.quiz);
      seedLikertQuestions(lq.questionsData);
    }

    // Big Five (Likert — no answers)
    seedQuiz(bigFiveQuiz);
    seedLikertQuestions(bigFiveQuestionsData);

    // MI (Likert — no answers)
    seedQuiz(miQuiz);
    seedLikertQuestions(miQuestionsData);

    // Psychology (Likert — no answers)
    seedQuiz(psychologyQuiz);
    seedLikertQuestions(psychologyQuestionsData);

    // Love quiz (TEXT_CHOICE with scoreValue)
    seedQuiz(loveQuiz);
    seedQuestionsWithAnswers(loveQuestionsData);

    // Career quiz (TEXT_CHOICE with scoreValue)
    seedQuiz(careerQuiz);
    seedQuestionsWithAnswers(careerQuestionsData);

    console.log('Seed complete!');
    console.log(`Categories: ${categoriesData.length}`);

    const quizCount = db.prepare('SELECT COUNT(*) as cnt FROM quizzes').get() as { cnt: number };
    const questionCount = db.prepare('SELECT COUNT(*) as cnt FROM questions').get() as { cnt: number };
    const answerCount = db.prepare('SELECT COUNT(*) as cnt FROM answers').get() as { cnt: number };
    console.log(`Quizzes: ${quizCount.cnt}`);
    console.log(`Questions: ${questionCount.cnt}`);
    console.log(`Answers: ${answerCount.cnt}`);

    console.log('\nLookup tools (convention for FE):');
    for (const tool of LOOKUP_TOOLS) {
      console.log(`  - ${tool.name} [${tool.lookupType}] → slug: ${tool.slug}`);
    }
  });

  tx();
  db.close();
}

seed();
