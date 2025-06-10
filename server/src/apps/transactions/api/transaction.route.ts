import { Router } from 'express';
import auth from 'middlewares/auth.middleware';
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './transaction.controller';

const router = Router();

router.use(auth);

router.get('/', getTransactions);
router.post('/', addTransaction);
router.put('/', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
