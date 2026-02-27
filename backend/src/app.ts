import express from 'express';
import authController from './auth/auth.controller';
import expensesController from './expenses/expenses.controller';

const app = express();

app.use(express.json());

app.use('/api/auth', authController);
app.use('/api/expenses', expensesController);

export default app;
