import { Provider } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IncomeHistoryRepository } from 'src/infrastructure/repositories';

export const IncomeHistoryRepositoryProvider: Provider = {
  provide: IncomeHistoryRepository,
  inject: ['DATABASE_CONNECTION'],
  useFactory: (db: NodePgDatabase) => {
    return new IncomeHistoryRepository(db);
  },
};
