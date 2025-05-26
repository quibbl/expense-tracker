import { createExpense, selectAllExpenses } from './expenses.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';

export const addExpense = (expense: CreateExpenseDto) => {
  return createExpense(expense);
}

export const getExpenses = () => {
  return selectAllExpenses();
}
