import { createContext } from 'react';

import { login, logout, register } from '@/auth/api';

export type AuthContext = {
	register: (input: Parameters<typeof register>) => void;
	login: (input: Parameters<typeof login>) => void;
	logout: (input: Parameters<typeof logout>) => void;
	session: {
		isAuthenticated: boolean;
		isLoading: boolean;
		userId: string | null;
		setAccessToken: (token: string) => void;
	};
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
