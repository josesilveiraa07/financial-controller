import { IncomeEntity, IncomeHistoryEntity } from 'src/domain/entities';
import { UsersRepository } from 'src/infrastructure/repositories';
import {
  IncomeHistoryRepositoryInterface,
  RegisterUserIncomesUseCaseInput,
  RegisterUserIncomesUseCaseInterface,
  RegisterUserIncomesUseCaseOutput,
} from '../interfaces';

export class RegisterUserIncomesUseCase
  implements RegisterUserIncomesUseCaseInterface
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly incomeHistoryRepository: IncomeHistoryRepositoryInterface,
  ) {}

  private async shouldRegisterHistory(income: IncomeEntity) {
    const lastHistory =
      await this.incomeHistoryRepository.findByUserIdInTheLastDays(
        income.userId,
        income.frequency,
      );

    return lastHistory.length === 0;
  }

  async execute(
    input: RegisterUserIncomesUseCaseInput,
  ): Promise<RegisterUserIncomesUseCaseOutput> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.incomes || user.incomes.length === 0) {
      return [];
    }

    const ret: IncomeHistoryEntity[] = [];

    for (const income of user.incomes) {
      const shouldRegisterHistory = await this.shouldRegisterHistory(income);

      if (shouldRegisterHistory) {
        const incomeHistory = await this.incomeHistoryRepository.create({
          incomeId: income.id,
        });

        ret.push(incomeHistory);
      }
    }

    return ret;
  }
}
