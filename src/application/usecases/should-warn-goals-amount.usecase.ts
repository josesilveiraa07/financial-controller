import Decimal from 'decimal.js';
import {
  GoalsRepositoryInterface,
  ShouldWarnGoalsAmountUseCaseInput,
  ShouldWarnGoalsAmountUseCaseInterface,
  ShouldWarnGoalsAmountUseCaseOutput,
  UsersRepositoryInterface,
} from '../interfaces';

export class ShouldWarnGoalsAmountUseCase
  implements ShouldWarnGoalsAmountUseCaseInterface
{
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly goalsRepository: GoalsRepositoryInterface,
  ) {}

  async execute(
    input: ShouldWarnGoalsAmountUseCaseInput,
  ): Promise<ShouldWarnGoalsAmountUseCaseOutput> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.financialData) {
      throw new Error('User financial data not found');
    }

    const notDoneUserGoals = await this.goalsRepository.findManyByUserId(
      input.userId,
      false,
    );

    const totalUserGoalsValue = notDoneUserGoals.reduce(
      (acc, goal) => acc.add(goal.value),
      new Decimal(0),
    );

    return {
      shouldWarn: totalUserGoalsValue.gte(user.financialData.wage),
    };
  }
}
