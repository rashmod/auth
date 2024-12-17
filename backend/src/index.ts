import express from 'express';

import env from '@/config/env';
import connectDB from '@/db/prisma';

const app = express();

connectDB();

app.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
