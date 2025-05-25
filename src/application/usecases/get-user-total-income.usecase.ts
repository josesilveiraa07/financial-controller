import Decimal from 'decimal.js';
import {
  GetUserTotalIncomeUseCaseInput,
  GetUserTotalIncomeUseCaseInterface,
  GetUserTotalIncomeUseCaseOutput,
} from '../interfaces';
import { IncomesRepositoryInterface } from '../interfaces/repositories';

export class GetUserTotalIncomeUseCase
  implements GetUserTotalIncomeUseCaseInterface
{
  constructor(private readonly incomesRepository: IncomesRepositoryInterface) {}

  async execute(
    input: GetUserTotalIncomeUseCaseInput,
  ): Promise<GetUserTotalIncomeUseCaseOutput> {
    const incomes = await this.incomesRepository.findManyByUserId(input.userId);

    const totalIncome = incomes.reduce(
      (acc, income) => acc.add(income.amount),
      new Decimal(0),
    );

    return {
      totalIncome,
    };
  }
}
