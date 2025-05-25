import { relations } from 'drizzle-orm';
import { decimal, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';

export const userFinancialInfoTable = pgTable('user_financial_info', {
  userId: uuid('user_id').references(() => usersTable.id),
  wage: decimal('wage', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userFinancialInfoTableRelations = relations(
  userFinancialInfoTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userFinancialInfoTable.userId],
      references: [usersTable.id],
    }),
  }),
);
