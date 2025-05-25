import { IncomeHistoryEntity } from 'src/domain/entities';

export type CreateIncomeHistoryInput = {
  incomeId: string;
};

export interface IncomeHistoryRepositoryInterface {
  create(input: CreateIncomeHistoryInput): Promise<IncomeHistoryEntity>;

  findByUserIdInTheLastDays(
    userId: string,
    days: number,
  ): Promise<IncomeHistoryEntity[]>;
}
