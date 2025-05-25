import { UserEntity } from 'src/domain/entities';
import {
  GetUserByIdUseCaseInput,
  GetUserByIdUseCaseInterface,
  UsersRepositoryInterface,
} from '../interfaces';

export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async execute(input: GetUserByIdUseCaseInput): Promise<UserEntity> {
    const user = await this.usersRepository.findById(input.id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
