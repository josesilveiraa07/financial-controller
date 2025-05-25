import Decimal from 'decimal.js';
import { GoalEntity } from 'src/domain/entities';

export type CreateGoalInput = {
  userId: string;
  name: string;
  value: Decimal;
};

export interface GoalsRepositoryInterface {
  create(data: CreateGoalInput): Promise<GoalEntity>;
  findManyByUserId(userId: string, done?: boolean): Promise<GoalEntity[]>;
}
