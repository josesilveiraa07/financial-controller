import { Provider } from '@nestjs/common';
import { SignInUseCase } from 'src/application/usecases';
import { CryptoImpl } from 'src/infrastructure/crypto';
import { UsersRepository } from 'src/infrastructure/repositories';

export const SignInUseCaseProvider: Provider = {
  provide: SignInUseCase,
  inject: [UsersRepository, CryptoImpl],
  useFactory: (usersRepository: UsersRepository, crypto: CryptoImpl) => {
    return new SignInUseCase(usersRepository, crypto);
  },
};
