import {
  CreateGoalUseCaseInput,
  CreateGoalUseCaseInterface,
  CreateGoalUseCaseOutput,
  GoalsRepositoryInterface,
  UsersRepositoryInterface,
} from '../interfaces';

export class CreateGoalUseCase implements CreateGoalUseCaseInterface {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly goalsRepository: GoalsRepositoryInterface,
  ) {}

  async execute(
    input: CreateGoalUseCaseInput,
  ): Promise<CreateGoalUseCaseOutput> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return await this.goalsRepository.create(input);
  }
}
