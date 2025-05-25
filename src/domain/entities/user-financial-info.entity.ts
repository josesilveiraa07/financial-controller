import Decimal from 'decimal.js';

export class UserFinancialInfoEntity {
  userId: string;
  wage: Decimal;
  balance: Decimal;

  constructor(props: UserFinancialInfoEntity) {
    Object.assign(this, props);
  }
}
