import express from 'express';
import authController from './auth/auth.controller';
import expensesController from './expenses/expenses.controller';
import userController from './user/user.controller';
import { requireAccessToken } from './helpers/middlewares/access-token.middleware';

const app = express();

app.use(express.json());

app.use('/api/auth', authController);
app.use('/api/expenses', requireAccessToken, expensesController);
app.use('/api/users', requireAccessToken, userController);

export default app;
