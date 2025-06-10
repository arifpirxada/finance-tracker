import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from 'libraries/errors/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import cookieParser from 'cookie-parser';

// route imports
import { userRouter } from './apps/users';
import { userBankRouter } from './apps/users';
import { transactionRouter } from '@apps/transactions';

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan('dev')); // logs into terminal

// Routes

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/users', userRouter);
app.use('/users/bank-accounts', userBankRouter);
app.use('/transactions', transactionRouter);

// Global error middleware
app.use(handleError);

export default app;
