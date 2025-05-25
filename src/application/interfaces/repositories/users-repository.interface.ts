import { UserEntity } from 'src/domain/entities';

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export interface UsersRepositoryInterface {
  create(user: CreateUserInput): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByExample(example: Partial<UserEntity>): Promise<UserEntity | null>;
}
