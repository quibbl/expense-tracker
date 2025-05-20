import express from 'express';
import { addExpense, getExpenses } from '../services/expenses.service';

const router = express.Router();

router.post('/expenses', (req, res) => {
  const expense = req.body;
  const result = addExpense(expense);
  res.status(201).send({ success: true, id: result.lastInsertRowid });
});

router.get('/expenses', (req, res) => {
  const expenses = getExpenses();
  res.send(expenses);
});

export default router;