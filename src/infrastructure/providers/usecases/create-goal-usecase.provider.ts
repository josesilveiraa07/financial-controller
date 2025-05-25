import { Provider } from '@nestjs/common';
import {
  CreateGoalUseCase,
  ShouldWarnGoalsAmountUseCase,
} from 'src/application/usecases';
import { GoalsRepository } from 'src/infrastructure/repositories';

export const CreateGoalUseCaseProvider: Provider = {
  provide: CreateGoalUseCase,
  inject: [GoalsRepository, ShouldWarnGoalsAmountUseCase],
  useFactory: (
    goalsRepository: GoalsRepository,
    shouldWarnGoalsAmountUseCase: ShouldWarnGoalsAmountUseCase,
  ) => {
    return new CreateGoalUseCase(goalsRepository, shouldWarnGoalsAmountUseCase);
  },
};
