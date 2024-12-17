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

	public refresh = async (req: Request, res: Response) => {
		const refreshToken: string | undefined = req.cookies['refresh-token'];
		if (!refreshToken) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
		}

		const { id } = AuthService.verifyToken(refreshToken, 'refresh') as { id?: string };
		if (!id) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
		}

		const { accessToken, refreshToken: newRefreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, newRefreshToken, 'now');

		res.status(StatusCodes.OK).json({ data: { user, accessToken } });
	};
}
