import { Request, Response } from 'express';

export default class AuthController {
	constructor() {}

	public register = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};

	public login = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};

	public logout = (_req: Request, res: Response) => {
		res.status(200).json({ message: 'Hello World' });
	};
}
