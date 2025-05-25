import Decimal from 'decimal.js';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  CreateGoalInput,
  GoalsRepositoryInterface,
} from 'src/application/interfaces';
import { GoalEntity } from 'src/domain/entities';
import { goalsTable } from '../drizzle/schemas';

export class GoalsRepository implements GoalsRepositoryInterface {
  constructor(private readonly db: NodePgDatabase) {}
  async findManyByUserId(
    userId: string,
    done?: boolean,
  ): Promise<GoalEntity[]> {
    const conditions = [eq(goalsTable.userId, userId)];

    if (done !== null && done !== undefined) {
      conditions.push(eq(goalsTable.done, done));
    }

    const goals = await this.db
      .select()
      .from(goalsTable)
      .where(and(...conditions));

    return goals.map(
      (goal) =>
        new GoalEntity({
          id: goal.id,
          name: goal.name,
          value: new Decimal(goal.value),
          done: goal.done,
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
      done: goal.done,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    });
  }
}
