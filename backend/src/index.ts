import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import env from '@/config/env';
import connectDB from '@/db/prisma';

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
