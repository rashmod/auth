import { createContext } from 'react';

import { login, register } from '@/auth/api';

export type AuthContext = {
	register: (input: Parameters<typeof register>) => void;
	login: (input: Parameters<typeof login>) => void;
	logout: () => void;
	session: {
		isAuthenticated: boolean;
		isLoading: boolean;
		userId: string | null;
	};
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
