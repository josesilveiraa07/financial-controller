import Decimal from 'decimal.js';

export class IncomeEntity {
  id: string;
  userId: string;
  description: string;
  amount: Decimal;
  frequency: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IncomeEntity) {
    Object.assign(this, props);
  }
}
