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

    const userGoals = await this.goalsRepository.findManyByUserId(input.userId);

    const totalUserGoalsValue = userGoals.reduce(
      (acc, goal) => acc.add(goal.value),
      new Decimal(0),
    );

    return {
      shouldWarn: totalUserGoalsValue.gte(user.financialData?.wage ?? 0),
    };
  }
}
