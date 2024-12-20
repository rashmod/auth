import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AuthService from '@/auth/service';
import env from '@/config/env';
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
		console.log('refresh token endpoint');
		console.log(req.cookies);
		const refreshToken: string | undefined = req.cookies['refresh-token'];
		if (!refreshToken) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'Unauthorized' });
			return;
		}
		console.log('refresh token received');

		const { id } = AuthService.verifyToken(refreshToken, 'refresh') as { id?: string };
		if (!id) {
			res.status(StatusCodes.BAD_REQUEST).json({ message: 'Unauthorized' });
			return;
		}
		console.log('refresh token verified');

		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
			return;
		}
		console.log('user found', user);

		const { accessToken, refreshToken: newRefreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, newRefreshToken, 'default');

		res.status(StatusCodes.OK).json({ data: { user, accessToken } });
	};

	public googleCallback = async (req: Request, res: Response) => {
		const user = req.user as { id: string; name: string; email: string };
		const { refreshToken } = AuthService.signTokens(user.id);

		AuthService.setRefreshCookie(res, refreshToken, 'default');

		res.redirect(env.CLIENT_URL);
	};
}
