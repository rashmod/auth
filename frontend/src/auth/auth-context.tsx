import { createContext } from 'react';

type AuthContextType = {
	register: () => void;
	login: () => void;
	logout: () => void;
	session: {
		isAuthenticated: boolean;
		isLoading: boolean;
		userId: string | null;
		setAccessToken: (token: string) => void;
	};
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
