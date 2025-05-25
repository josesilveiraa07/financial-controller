import {
  CreateGoalUseCaseInput,
  CreateGoalUseCaseInterface,
  CreateGoalUseCaseOutput,
  GoalsRepositoryInterface,
  ShouldWarnGoalsAmountUseCaseInterface,
} from '../interfaces';

export class CreateGoalUseCase implements CreateGoalUseCaseInterface {
  constructor(
    private readonly goalsRepository: GoalsRepositoryInterface,
    private readonly shouldWarnGoalsAmountUseCase: ShouldWarnGoalsAmountUseCaseInterface,
  ) {}

  async execute(
    input: CreateGoalUseCaseInput,
  ): Promise<CreateGoalUseCaseOutput> {
    const goal = await this.goalsRepository.create(input);

    const { shouldWarn } = await this.shouldWarnGoalsAmountUseCase.execute({
      userId: input.userId,
    });

    return {
      goal,
      shouldWarnAboutGoalsAmount: shouldWarn,
    };
  }
}
