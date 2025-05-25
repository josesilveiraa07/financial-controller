import { Provider } from '@nestjs/common';
import { RegisterUserIncomesUseCase } from 'src/application/usecases';
import {
  IncomeHistoryRepository,
  UsersRepository,
} from 'src/infrastructure/repositories';

export const RegisterUserIncomesUseCaseProvider: Provider = {
  provide: RegisterUserIncomesUseCase,
  inject: [UsersRepository, IncomeHistoryRepository],
  useFactory: (
    usersRepository: UsersRepository,
    incomeHistoryRepository: IncomeHistoryRepository,
  ) => {
    return new RegisterUserIncomesUseCase(
      usersRepository,
      incomeHistoryRepository,
    );
  },
};
