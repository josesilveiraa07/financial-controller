import { UserFinancialInfoEntity } from './user-financial-info.entity';

export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  financialData?: UserFinancialInfoEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
