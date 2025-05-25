import { CryptoInterface, UsersRepositoryInterface } from '../interfaces';
import {
  SignInUseCaseInput,
  SignInUseCaseInterface,
  SignInUseCaseOutput,
} from '../interfaces/usecases/sign-in-usecase.interface';

export class SignInUseCase implements SignInUseCaseInterface {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly crypto: CryptoInterface,
  ) {}

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const user = await this.usersRepository.findByExample({
      email: input.email,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.crypto.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return {
      user,
      accessToken: '',
    };
  }
}
