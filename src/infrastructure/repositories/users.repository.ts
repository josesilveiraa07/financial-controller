import Decimal from 'decimal.js';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  CreateUserInput,
  UsersRepositoryInterface,
} from 'src/application/interfaces/repositories';
import { UserEntity, UserFinancialInfoEntity } from 'src/domain/entities';
import { userFinancialInfoTable, usersTable } from '../drizzle/schemas';

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
      .where(eq(usersTable.id, id))
      .leftJoin(
        userFinancialInfoTable,
        eq(usersTable.id, userFinancialInfoTable.userId),
      );

    if (!user) {
      return null;
    }

    const financialData = new UserFinancialInfoEntity({
      userId: user.users.id,
      wage: new Decimal(user.user_financial_info?.wage ?? 0),
      balance: new Decimal(user.user_financial_info?.balance ?? 0),
    });

    return new UserEntity({
      ...user.users,
      financialData,
    });
  }

  async findByExample(
    example: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const conditions = Object.entries(example).map(([key, value]) =>
      eq(usersTable[key], value),
    );

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(whereClause)
      .leftJoin(
        userFinancialInfoTable,
        eq(usersTable.id, userFinancialInfoTable.userId),
      )
      .limit(1);

    if (!user) {
      return null;
    }

    const financialData = new UserFinancialInfoEntity({
      userId: user.users.id,
      wage: new Decimal(user.user_financial_info?.wage ?? 0),
      balance: new Decimal(user.user_financial_info?.balance ?? 0),
    });

    return new UserEntity({
      ...user.users,
      financialData,
    });
  }
}
