import { Router, Request, Response } from 'express';
import { addExpense, getExpenses } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body as Partial<CreateExpenseDto>;

    if (
      !payload.name ||
      payload.amount === undefined ||
      !payload.currency ||
      !payload.category ||
      !payload.date
    ) {
      res.status(400).json({ message: 'Missing required expense fields' });
      return;
    }

    const amount = Number(payload.amount);
    if (!Number.isFinite(amount)) {
      res.status(400).json({ message: 'Amount must be a valid number' });
      return;
    }

    const parsedDate = new Date(payload.date);
    if (Number.isNaN(parsedDate.getTime())) {
      res.status(400).json({ message: 'Date must be a valid ISO string' });
      return;
    }

    const expense = await addExpense({
      name: payload.name,
      amount,
      currency: payload.currency,
      category: payload.category,
      date: parsedDate,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Failed to create expense:', error);
    res.status(500).json({ message: 'Failed to create expense' });
  }
});

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await getExpenses();

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});

export default router;
