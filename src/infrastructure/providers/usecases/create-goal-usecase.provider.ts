import { Provider } from '@nestjs/common';
import { CreateGoalUseCase } from 'src/application/usecases';
import {
  GoalsRepository,
  UsersRepository,
} from 'src/infrastructure/repositories';

export const CreateGoalUseCaseProvider: Provider = {
  provide: CreateGoalUseCase,
  inject: [UsersRepository, GoalsRepository],
  useFactory: (
    usersRepository: UsersRepository,
    goalsRepository: GoalsRepository,
  ) => {
    return new CreateGoalUseCase(usersRepository, goalsRepository);
  },
};
