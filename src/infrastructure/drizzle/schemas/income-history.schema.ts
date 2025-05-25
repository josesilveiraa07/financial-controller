import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { incomesTable } from './incomes.schema';

export const incomeHistoryTable = pgTable('income_history', {
  id: uuid().primaryKey().defaultRandom(),
  incomeId: uuid('income_id')
    .references(() => incomesTable.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
