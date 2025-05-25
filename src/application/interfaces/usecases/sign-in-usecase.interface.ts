import { UserEntity } from 'src/domain/entities';
import { UseCase } from './usecase.interface';

export type SignInUseCaseInput = {
  email: string;
  password: string;
};

export type SignInUseCaseOutput = {
  user: UserEntity;
  accessToken: string;
};

export type SignInUseCaseInterface = UseCase<
  SignInUseCaseInput,
  SignInUseCaseOutput
>;
