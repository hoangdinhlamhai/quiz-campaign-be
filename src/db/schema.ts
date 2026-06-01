import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// ============================================
// categories — Danh mục quiz
// ============================================
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  iconUrl: text('icon_url'),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
});

// ============================================
// quizzes — Bài test
// quizType: 'MBTI' | 'DISC' | 'SCORED' | 'MI_LIKERT'
// answerFormat: 'TEXT_CHOICE' | 'IMAGE_CHOICE' | 'LIKERT_SCALE'
// ============================================
export const quizzes = sqliteTable('quizzes', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull().references(() => categories.id),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  instruction: text('instruction'),
  thumbnailUrl: text('thumbnail_url'),
  quizType: text('quiz_type').notNull().default('MBTI'),
  answerFormat: text('answer_format').notNull().default('TEXT_CHOICE'),
  scaleMin: integer('scale_min'),
  scaleMax: integer('scale_max'),
  scaleLabelMin: text('scale_label_min'),
  scaleLabelMax: text('scale_label_max'),
  timeLimitMins: integer('time_limit_mins').notNull().default(30),
  totalQuestions: integer('total_questions').notNull().default(0),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
  viewCount: integer('view_count').notNull().default(0),
  completionCount: integer('completion_count').notNull().default(0),
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
}, (t) => ({
  categoryIdx: index('quizzes_category_idx').on(t.categoryId),
}));

// ============================================
// questions — Câu hỏi
// dimensionKey: phân loại câu hỏi Likert (vd 'O','C','E','A','N' cho BigFive; 8 loại cho MI; 'TOTAL')
// isReverseScored: câu đảo điểm (Likert)
// ============================================
export const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id').notNull().references(() => quizzes.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  orderNumber: integer('order_number').notNull(),
  dimensionKey: text('dimension_key'),
  isReverseScored: integer('is_reverse_scored', { mode: 'boolean' }).notNull().default(false),
}, (t) => ({
  quizIdx: index('questions_quiz_idx').on(t.quizId, t.orderNumber),
}));

// ============================================
// answers — Đáp án (CHỈ dùng cho TEXT_CHOICE và IMAGE_CHOICE)
// isCorrect, scoreValue, dimensionPole: ANTI-CHEAT — KHÔNG trả về client
// dimensionPole: pole như 'E','I','S','N','T','F','J','P' (MBTI) hoặc 'D','I','S','C' (DISC)
// ============================================
export const answers = sqliteTable('answers', {
  id: text('id').primaryKey(),
  questionId: text('question_id').notNull().references(() => questions.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull().default(false),
  scoreValue: integer('score_value').notNull().default(0),
  dimensionPole: text('dimension_pole'),
}, (t) => ({
  questionIdx: index('answers_question_idx').on(t.questionId),
}));

// ============================================
// user_results — Kết quả làm bài (ẩn danh)
// answersData: AnswerInput[] JSON. scoreData: ScoreResult JSON.
// isUnlocked: CPA gate đã mở khóa?
// ============================================
export const userResults = sqliteTable('user_results', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id').notNull().references(() => quizzes.id),
  answersData: text('answers_data', { mode: 'json' }),
  scoreData: text('score_data', { mode: 'json' }),
  resultType: text('result_type'),
  timeSpentSecs: integer('time_spent_secs'),
  isUnlocked: integer('is_unlocked', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
}, (t) => ({
  quizIdx: index('user_results_quiz_idx').on(t.quizId),
}));

// ============================================
// lookups — Kết quả tra cứu số học (ẩn danh)
// lookupType: 'LOVE_COMPATIBILITY' | 'BABY_NAMING'
// ============================================
export const lookups = sqliteTable('lookups', {
  id: text('id').primaryKey(),
  lookupType: text('lookup_type').notNull(),
  inputsData: text('inputs_data', { mode: 'json' }),
  resultData: text('result_data', { mode: 'json' }),
  isUnlocked: integer('is_unlocked', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').notNull().$defaultFn(() => Date.now()),
});

export type Category = typeof categories.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Answer = typeof answers.$inferSelect;
export type UserResult = typeof userResults.$inferSelect;
export type Lookup = typeof lookups.$inferSelect;
