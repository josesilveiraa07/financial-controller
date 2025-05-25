import { Provider } from '@nestjs/common';
import { GetUserByIdUseCase } from 'src/application/usecases';
import { UsersRepository } from 'src/infrastructure/repositories';

export const GetUserByIdUseCaseProvider: Provider = {
  provide: GetUserByIdUseCase,
  inject: [UsersRepository],
  useFactory: (usersRepository: UsersRepository) => {
    return new GetUserByIdUseCase(usersRepository);
  },
};
