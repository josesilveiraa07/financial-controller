import { Provider } from '@nestjs/common';
import {
  GoalsRepositoryInterface,
  UsersRepositoryInterface,
} from 'src/application/interfaces';
import { ShouldWarnGoalsAmountUseCase } from 'src/application/usecases';

export const ShouldWarnGoalsAmountUseCaseProvider: Provider = {
  provide: ShouldWarnGoalsAmountUseCase,
  useFactory: (
    usersRepository: UsersRepositoryInterface,
    goalsRepository: GoalsRepositoryInterface,
  ) => {
    return new ShouldWarnGoalsAmountUseCase(usersRepository, goalsRepository);
  },
};
