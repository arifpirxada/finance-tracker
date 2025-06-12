import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from 'libraries/errors/errorHandler';
import setupSwagger from './config/swagger';
import cookieParser from 'cookie-parser';

// route imports
import { userRouter } from './apps/users';
import { userBankRouter } from './apps/users';
import { transactionRouter } from '@apps/transactions';

const app = express();

// Middlewares

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // logs into terminal

// Routes

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/users', userRouter);
app.use('/api/users/bank-accounts', userBankRouter);
app.use('/api/transactions', transactionRouter);

// Swagger docs
setupSwagger(app);

// Global error middleware
app.use(handleError);

export default app;
