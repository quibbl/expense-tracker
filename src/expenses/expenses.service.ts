import { insertExpense, selectAllExpenses } from '../repository/expenses.repository';
import { Expense } from './entites';

export const addExpense = (expense: Expense) => {
  return insertExpense(expense);
}

export const getExpenses = () => {
  return selectAllExpenses();
}
