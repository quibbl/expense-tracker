import { PrismaClient } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';

const prisma = new PrismaClient();


export const createExpense = async (data: CreateExpenseDto) => {
  try {
    const newExpense = await prisma.expense.create({
      data,
    });
    return newExpense;
  } catch (error) {
    console.error('Error inserting expense:', error);
    throw error;
  }
};

export const selectAllExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany();
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};
