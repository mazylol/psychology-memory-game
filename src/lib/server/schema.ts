import { integer, text } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const state = sqliteTable('state', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull(),

	roundOneScore: integer('round_one_score').notNull().default(0),
	roundTwoScore: integer('round_two_score').notNull().default(0)
});
