import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import env from '@/config/env';
import { prisma } from '@/db/prisma';

passport.use(
	new GoogleStrategy(
		{
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/api/v1/auth/google/callback',
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				let user = await prisma.user.findFirst({ where: { googleId: profile.id } });
				console.log('found user', user);
				if (!user) {
					if (!profile.emails || profile.emails.length === 0) {
						console.log('No emails');
						done(null, undefined);
						return;
					}
					user = await prisma.user.create({
						data: {
							name: profile.displayName,
							googleId: profile.id,
							email: profile.emails[0]!.value,
						},
					});
					console.log('created user', user);
				}
				done(null, user);
			} catch (err) {
				done(err, undefined);
			}
		}
	)
);
