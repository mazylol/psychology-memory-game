CREATE TABLE `state` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`round_one_score` integer DEFAULT 0 NOT NULL,
	`round_two_score` integer DEFAULT 0 NOT NULL
);
