export class Expense {
  constructor(
    public amount: number,
    public description: string,
    public date: Date,
    public id: number
  ) {}
}
