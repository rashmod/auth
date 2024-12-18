import { createContext } from 'react';

import { login, register } from '@/auth/api';

export type AuthContext = {
	register: { action: (...input: Parameters<typeof register>) => void; isLoading: boolean; isSuccess: boolean };
	login: { action: (...input: Parameters<typeof login>) => void; isLoading: boolean; isSuccess: boolean };
	logout: () => void;
	session: {
		isAuthenticated: boolean;
		isLoading: boolean;
		userId: string | null;
	};
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
