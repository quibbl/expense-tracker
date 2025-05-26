export interface CreateExpenseDto {
  name: string;
  amount: number;
  currency: number;
  category: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}