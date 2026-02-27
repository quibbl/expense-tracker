import { CreateExpenseDto } from './dto/create-expense.dto';
import { prisma } from '../db/prisma.service';

export interface ExpenseRecord {
  id: number;
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
  userId: number | null;
}

export const createExpense = async (
  data: CreateExpenseDto,
): Promise<ExpenseRecord> => {
  return prisma.expense.create({
    data: {
      name: data.name,
      amount: data.amount,
      currency: data.currency,
      category: data.category,
      date: data.date,
      ...(data.userId != null ? { user: { connect: { id: data.userId } } } : {}),
    },
  });
};

export const selectAllExpenses = async (): Promise<ExpenseRecord[]> => {
  return prisma.expense.findMany({
    orderBy: [{ date: 'desc' }, { id: 'desc' }],
  });
};
