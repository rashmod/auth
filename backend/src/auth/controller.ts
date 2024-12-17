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

	public login = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};

	public logout = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};
}
