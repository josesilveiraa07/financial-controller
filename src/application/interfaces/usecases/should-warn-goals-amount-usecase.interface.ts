import { UseCase } from './usecase.interface';

export type ShouldWarnGoalsAmountUseCaseInput = {
  userId: string;
};
export type ShouldWarnGoalsAmountUseCaseOutput = {
  shouldWarn: boolean;
};

export type ShouldWarnGoalsAmountUseCaseInterface = UseCase<
  ShouldWarnGoalsAmountUseCaseInput,
  ShouldWarnGoalsAmountUseCaseOutput
>;
