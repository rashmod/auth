import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default async function connectDB() {
	try {
		await prisma.$connect();
		console.info('Successfully connected to the database');
	} catch (error) {
		console.error('Error connecting to the database');
		console.error('Error: ', error);
	}
}
