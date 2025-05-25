import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { GoalsRepository } from 'src/infrastructure/repositories';

export const GoalsRepositoryProvider = {
  provide: GoalsRepository,
  inject: ['DATABASE_CONNECTION'],
  useFactory: (db: NodePgDatabase) => {
    return new GoalsRepository(db);
  },
};
