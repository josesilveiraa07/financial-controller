import { IncomeEntity } from './income.entity';
import { UserFinancialInfoEntity } from './user-financial-info.entity';

export class UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  financialData?: UserFinancialInfoEntity;
  incomes?: IncomeEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
