import { relations } from 'drizzle-orm';
import {
  decimal,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';

export const goalsTable = pgTable('goals', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => usersTable.id),
  name: varchar('name', { length: 255 }).notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const goalsTableRelations = relations(goalsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [goalsTable.userId],
    references: [usersTable.id],
  }),
}));
