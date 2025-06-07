import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from 'libraries/errors/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

// route imports
import { userRouter } from './apps/users';

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan('dev')); // logs into terminal

// Routes

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/users', userRouter);

// Global error middleware
app.use(handleError);

export default app;
