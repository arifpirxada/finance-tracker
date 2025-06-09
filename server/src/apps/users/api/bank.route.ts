import { Router } from 'express';
import {
  addBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from './bank.controller';
import auth from 'middlewares/auth.middleware';

const router = Router();

router.use(auth);

router.post('/', addBankAccount);
router.put('/:id', updateBankAccount);
router.delete('/:id', deleteBankAccount);

export default router;
