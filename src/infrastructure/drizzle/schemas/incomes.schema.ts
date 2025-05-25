import { relations } from 'drizzle-orm';
import {
  decimal,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';

export const incomesTable = pgTable('incomes', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const incomesTableRelations = relations(incomesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [incomesTable.userId],
    references: [usersTable.id],
  }),
}));
