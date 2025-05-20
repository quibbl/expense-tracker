import express from 'express';
import router from './routes';
import expensesController from './controller/expenses.controller';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Ensure expenses controller is mounted on its intended path
app.use('/api/expenses', expensesController);

// Routes
app.use('/', router);

const PORT = process.env.PORT || 3000;

// Start the server and log the port it's running on
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express app
export default app;
