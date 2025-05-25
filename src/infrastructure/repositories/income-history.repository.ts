import { and, eq, gte } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  CreateIncomeHistoryInput,
  IncomeHistoryRepositoryInterface,
} from 'src/application/interfaces';
import { IncomeHistoryEntity } from 'src/domain/entities';
import { incomeHistoryTable } from '../drizzle/schemas/income-history.schema';
import { incomesTable } from '../drizzle/schemas/incomes.schema';

export class IncomeHistoryRepository
  implements IncomeHistoryRepositoryInterface
{
  constructor(private readonly db: NodePgDatabase) {}

  async create(input: CreateIncomeHistoryInput): Promise<IncomeHistoryEntity> {
    const [incomeHistory] = await this.db
      .insert(incomeHistoryTable)
      .values(input)
      .returning();

    return new IncomeHistoryEntity(incomeHistory);
  }

  async findByUserIdInTheLastDays(
    userId: string,
    days: number,
  ): Promise<IncomeHistoryEntity[]> {
    const incomeHistories = await this.db
      .select()
      .from(incomeHistoryTable)
      .leftJoin(incomesTable, eq(incomeHistoryTable.incomeId, incomesTable.id))
      .where(
        and(
          eq(incomesTable.userId, userId),
          gte(
            incomeHistoryTable.createdAt,
            new Date(Date.now() - days * 24 * 60 * 60 * 1000),
          ),
        ),
      );

    return incomeHistories.map((incomeHistory) => {
      return new IncomeHistoryEntity(incomeHistory.income_history);
    });
  }
}
