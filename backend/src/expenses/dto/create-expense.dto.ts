export interface CreateExpenseDto {
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}
