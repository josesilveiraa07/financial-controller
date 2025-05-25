import { Provider } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IncomesRepository } from 'src/infrastructure/repositories';

export const IncomesRepositoryProvider: Provider = {
  provide: IncomesRepository,
  inject: ['DATABASE_CONNECTION'],
  useFactory: (db: NodePgDatabase) => {
    return new IncomesRepository(db);
  },
};
