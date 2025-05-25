export class IncomeHistoryEntity {
  id: string;
  incomeId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IncomeHistoryEntity) {
    Object.assign(this, props);
  }
}
