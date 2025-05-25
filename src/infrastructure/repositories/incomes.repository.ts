import Decimal from 'decimal.js';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { IncomesRepositoryInterface } from 'src/application/interfaces';
import { IncomeEntity } from 'src/domain/entities';
import { incomesTable } from '../drizzle/schemas/incomes.schema';

export class IncomesRepository implements IncomesRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) {}

  async findManyByUserId(userId: string): Promise<IncomeEntity[]> {
    const incomes = await this.db
      .select()
      .from(incomesTable)
      .where(eq(incomesTable.userId, userId));

    return incomes.map(
      (income) =>
        new IncomeEntity({
          id: income.id,
          userId: income.userId,
          description: income.description,
          amount: new Decimal(income.amount),
          frequency: income.frequency,
          createdAt: income.createdAt,
          updatedAt: income.updatedAt,
        }),
    );
  }
}
