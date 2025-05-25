import { Provider } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UsersRepository } from 'src/infrastructure/repositories';

export const UsersRepositoryProvider: Provider = {
  provide: UsersRepository,
  inject: ['DRIZZLE_CONNECTION'],
  useFactory: (db: NodePgDatabase) => {
    return new UsersRepository(db);
  },
};
