import { GoalEntity } from 'src/domain/entities';
import { CreateGoalInput } from '../repositories';
import { UseCase } from './usecase.interface';

export type CreateGoalUseCaseInput = CreateGoalInput;
export type CreateGoalUseCaseOutput = {
  goal: GoalEntity;
  shouldWarnAboutGoalsAmount: boolean;
};

export type CreateGoalUseCaseInterface = UseCase<
  CreateGoalUseCaseInput,
  CreateGoalUseCaseOutput
>;
