import { insertExpense, selectAllExpenses } from '../repository/expenses.repository';

export const addExpense = (expense: { name: string; amount: number; currency: string; category: string; date: string; }) => {
  return insertExpense(expense.name, expense.amount, expense.currency, expense.category, expense.date);
}

export const getExpenses = () => {
  return selectAllExpenses();
}
