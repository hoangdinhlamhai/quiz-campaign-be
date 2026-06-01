CREATE TABLE `answers` (
	`id` text PRIMARY KEY NOT NULL,
	`question_id` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text,
	`is_correct` integer DEFAULT false NOT NULL,
	`score_value` integer DEFAULT 0 NOT NULL,
	`dimension_pole` text,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `answers_question_idx` ON `answers` (`question_id`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`icon_url` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE TABLE `lookups` (
	`id` text PRIMARY KEY NOT NULL,
	`lookup_type` text NOT NULL,
	`inputs_data` text,
	`result_data` text,
	`is_unlocked` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`quiz_id` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text,
	`order_number` integer NOT NULL,
	`dimension_key` text,
	`is_reverse_scored` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `questions_quiz_idx` ON `questions` (`quiz_id`,`order_number`);--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`instruction` text,
	`thumbnail_url` text,
	`quiz_type` text DEFAULT 'MBTI' NOT NULL,
	`answer_format` text DEFAULT 'TEXT_CHOICE' NOT NULL,
	`scale_min` integer,
	`scale_max` integer,
	`scale_label_min` text,
	`scale_label_max` text,
	`time_limit_mins` integer DEFAULT 30 NOT NULL,
	`total_questions` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`view_count` integer DEFAULT 0 NOT NULL,
	`completion_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `quizzes_slug_unique` ON `quizzes` (`slug`);--> statement-breakpoint
CREATE INDEX `quizzes_category_idx` ON `quizzes` (`category_id`);--> statement-breakpoint
CREATE TABLE `user_results` (
	`id` text PRIMARY KEY NOT NULL,
	`quiz_id` text NOT NULL,
	`answers_data` text,
	`score_data` text,
	`result_type` text,
	`time_spent_secs` integer,
	`is_unlocked` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_results_quiz_idx` ON `user_results` (`quiz_id`);