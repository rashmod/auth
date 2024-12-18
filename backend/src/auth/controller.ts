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

		const { accessToken, refreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, refreshToken, 'default');

		res.status(StatusCodes.CREATED).json({ data: { user, accessToken } });
	};

	public login = async (req: Request, res: Response) => {
		const { email, password }: { email: string; password: string } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
			return;
		}

		if (user.password !== password) {
			res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid password' });
			return;
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
			res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
			return;
		}

		const { id } = AuthService.verifyToken(refreshToken, 'refresh') as { id?: string };
		if (!id) {
			res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
			return;
		}

		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
			return;
		}

		const { accessToken, refreshToken: newRefreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, newRefreshToken, 'now');

		res.status(StatusCodes.OK).json({ data: { user, accessToken } });
	};
}
