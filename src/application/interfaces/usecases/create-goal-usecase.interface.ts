import { GoalEntity } from 'src/domain/entities';
import { CreateGoalInput } from '../repositories';
import { UseCase } from './usecase.interface';

export type CreateGoalUseCaseInput = CreateGoalInput;
export type CreateGoalUseCaseOutput = GoalEntity;

export type CreateGoalUseCaseInterface = UseCase<
  CreateGoalUseCaseInput,
  CreateGoalUseCaseOutput
>;
