import { Request, Response } from 'express';

import { prisma } from '@/db/prisma';

export default class AuthController {
	public register = async (req: Request, res: Response) => {
		const { name, email, password }: { name: string; email: string; password: string } = req.body;

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		res.status(201).json({ data: user });
	};

	public login = async (req: Request, res: Response) => {
		const { email, password }: { email: string; password: string } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (user.password !== password) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		res.status(200).json({ data: user });
	};

	public logout = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};
}
