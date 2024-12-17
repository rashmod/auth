import { ReactNode } from 'react';

import AuthContext from './auth-context';

export default function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<AuthContext.Provider
			value={{
				register: () => {},
				login: () => {},
				logout: () => {},
				session: { isAuthenticated: false, isLoading: false, userId: null, setAccessToken: () => {} },
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
