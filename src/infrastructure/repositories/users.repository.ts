import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  CreateUserInput,
  UsersRepositoryInterface,
} from 'src/application/interfaces/repositories';
import { UserEntity } from 'src/domain/entities';
import { usersTable } from '../drizzle/schemas';

export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) {}

  async create(user: CreateUserInput): Promise<UserEntity> {
    const [newUser] = await this.db
      .insert(usersTable)
      .values({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      })
      .returning();

    return new UserEntity(newUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user ? new UserEntity(user) : null;
  }

  async findByExample(
    example: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const conditions = Object.entries(example).map(([key, value]) =>
      eq(usersTable[key], value),
    );

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [user] = await this.db.select().from(usersTable).where(whereClause);

    return user ? new UserEntity(user) : null;
  }
}
