import { Router } from 'express';

const router = Router();

router.post('/register', (_req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

router.post('/login', (_req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

router.post('/logout', (_req, res) => {
	res.status(200).json({ message: 'Hello World' });
});

export default router;
