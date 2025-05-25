import { UserEntity } from 'src/domain/entities';
import { UseCase } from './usecase.interface';

export type GetUserByIdUseCaseInput = {
  id: string;
};

export type GetUserByIdUseCaseOutput = UserEntity;

export type GetUserByIdUseCaseInterface = UseCase<
  GetUserByIdUseCaseInput,
  GetUserByIdUseCaseOutput
>;
