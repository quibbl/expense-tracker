import {
  createExpense,
  selectAllExpenses,
  ExpenseRecord,
} from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const addExpense = async (
  expense: CreateExpenseDto,
): Promise<ExpenseRecord> => {
  return createExpense(expense);
};

export const getExpenses = async (): Promise<ExpenseRecord[]> => {
  return selectAllExpenses();
};
