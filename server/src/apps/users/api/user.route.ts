import { Router } from 'express';
import userController from './user.controller';
import auth from 'middlewares/auth.middleware';

const router = Router();

router.get('/me', auth, userController.getUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
