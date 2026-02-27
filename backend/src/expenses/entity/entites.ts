export class Expense {
  constructor(
    public id: number,
    public name: string,
    public amount: number,
    public currency: string,
    public category: string,
    public date: Date,
    public userId: number | null,
  ) {}
}
