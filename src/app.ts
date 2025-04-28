import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
import router from './routes';
app.use('/', router);

export default app;
