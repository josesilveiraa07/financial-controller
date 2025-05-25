import { IncomeEntity } from 'src/domain/entities';

export interface IncomesRepositoryInterface {
  findManyByUserId(userId: string): Promise<IncomeEntity[]>;
}
