import Decimal from 'decimal.js';

export class GoalEntity {
  id: string;
  userId: string;
  name: string;
  value: Decimal;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: GoalEntity) {
    Object.assign(this, data);
  }
}
