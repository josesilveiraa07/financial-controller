import { IncomeHistoryEntity } from 'src/domain/entities';
import { UseCase } from './usecase.interface';

export type RegisterUserIncomesUseCaseInput = {
  userId: string;
};
export type RegisterUserIncomesUseCaseOutput = IncomeHistoryEntity[];

export type RegisterUserIncomesUseCaseInterface = UseCase<
  RegisterUserIncomesUseCaseInput,
  RegisterUserIncomesUseCaseOutput
>;
