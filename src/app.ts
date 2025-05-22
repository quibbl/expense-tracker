import express from 'express';
import expensesController from './expenses/expenses.controller';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', expensesController);


export default app;
