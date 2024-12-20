import { CookieOptions, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import env from '@/config/env';

export default class AuthService {
	static signToken(id: string, tokenType: 'access' | 'refresh') {
		if (tokenType === 'refresh') {
			return sign({ id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
		}

		return sign({ id }, env.JWT_ACCESS_SECRET, {
			expiresIn: '15m',
		});
	}

	static signTokens(id: string) {
		return {
			accessToken: AuthService.signToken(id, 'access'),
			refreshToken: AuthService.signToken(id, 'refresh'),
		};
	}

	static verifyToken(token: string, tokenType: 'access' | 'refresh') {
		if (tokenType === 'refresh') {
			return verify(token, env.JWT_REFRESH_SECRET);
		}

		return verify(token, env.JWT_ACCESS_SECRET);
	}

	static setRefreshCookie(res: Response, refreshToken: string, expires: 'now' | 'default') {
		const cookieOptions: CookieOptions = {
			httpOnly: true,
			secure: env.CLIENT_URL.includes('https'),
			path: '/api/v1/auth/refresh-token',
			maxAge: expires === 'now' ? 0 : 7 * 24 * 60 * 60 * 1000,
		};

		if (env.CLIENT_URL.includes('https')) {
			cookieOptions.sameSite = 'none';
		}

		res.cookie('refresh-token', refreshToken, cookieOptions);
	}
}
