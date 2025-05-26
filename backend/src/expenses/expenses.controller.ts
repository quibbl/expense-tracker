import { Router, Request, Response } from 'express';
import { addExpense, getExpenses } from './expenses.service';

const router = Router();

router.post('/api/expenses', async (req: Request, res: Response) => {
  const expense = await addExpense(req.body);

  res.status(200).json(expense);
});

router.get('/api/expenses', (req, res: Response) => {
  const expenses = getExpenses();

  res.send(expenses);
});

export default router;
