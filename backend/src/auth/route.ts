import { Router } from 'express';

import AuthController from '@/auth/controller';

const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/refresh-token', authController.refresh);

export default router;
