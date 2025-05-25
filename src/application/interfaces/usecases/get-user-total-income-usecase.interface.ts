import Decimal from 'decimal.js';
import { UseCase } from './usecase.interface';

export type GetUserTotalIncomeUseCaseInput = {
  userId: string;
};
export type GetUserTotalIncomeUseCaseOutput = {
  totalIncome: Decimal;
};

export type GetUserTotalIncomeUseCaseInterface = UseCase<
  GetUserTotalIncomeUseCaseInput,
  GetUserTotalIncomeUseCaseOutput
>;
