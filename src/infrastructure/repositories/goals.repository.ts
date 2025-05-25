import Decimal from 'decimal.js';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  CreateGoalInput,
  GoalsRepositoryInterface,
} from 'src/application/interfaces';
import { GoalEntity } from 'src/domain/entities';
import { goalsTable } from '../drizzle/schemas';

export class GoalsRepository implements GoalsRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) {}
  async findManyByUserId(userId: string): Promise<GoalEntity[]> {
    const goals = await this.db
      .select()
      .from(goalsTable)
      .where(eq(goalsTable.userId, userId));

    return goals.map(
      (goal) =>
        new GoalEntity({
          id: goal.id,
          name: goal.name,
          value: new Decimal(goal.value),
          userId: goal.userId!,
          createdAt: goal.createdAt,
          updatedAt: goal.updatedAt,
        }),
    );
  }

  async create(data: CreateGoalInput): Promise<GoalEntity> {
    const [goal] = await this.db
      .insert(goalsTable)
      .values({
        name: data.name,
        value: data.value.toString(),
        userId: data.userId,
      })
      .returning();

    return new GoalEntity({
      id: goal.id,
      name: goal.name,
      value: new Decimal(goal.value),
      userId: goal.userId!,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    });
  }
}
