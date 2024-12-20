import { Router } from 'express';
import passport from 'passport';

import AuthController from '@/auth/controller';

const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/refresh-token', authController.refresh);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
	'/google/callback',
	passport.authenticate('google', { session: false, failureRedirect: '/login' }),
	authController.googleCallback
);

export default router;
