import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AuthService from '@/auth/service';
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

		res.status(StatusCodes.CREATED).json({ data: user });
	};

	public login = async (req: Request, res: Response) => {
		const { email, password }: { email: string; password: string } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
		}

		if (user.password !== password) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid password' });
		}

		const { accessToken, refreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, refreshToken, 'default');

		res.status(StatusCodes.OK).json({ data: { user, accessToken } });
	};

	public logout = (_req: Request, res: Response) => {
		AuthService.setRefreshCookie(res, '', 'now');

		res.status(StatusCodes.NO_CONTENT).json({});
	};
}
