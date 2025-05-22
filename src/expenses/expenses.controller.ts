import { Router } from 'express';
import { addExpense, getExpenses } from './expenses.service';

const router = Router();

router.post('/expenses', async (req, res) => {
  const expense = req.body;
  const result = await addExpense(expense);
  
  res.status(200).send({ success: true, id: result.id });
});

router.get('/expenses', (req, res) => {
  const expenses = getExpenses();

  res.send(expenses);
});

export default router;
