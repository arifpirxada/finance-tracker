import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from 'libraries/errors/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import auth from 'middlewares/auth.middleware';
import cookieParser from 'cookie-parser';

// route imports
import { userRouter } from './apps/users';

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

app.get('/auth', auth, (req, res) => {
  res.send('Authenticated');
});

app.use('/users', userRouter);

// Global error middleware
app.use(handleError);

export default app;
