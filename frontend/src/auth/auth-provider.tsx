import { ReactNode } from 'react';

import AuthContext from '@/auth/auth-context';
import useLogin from '@/auth/hooks/use-login';
import useLogout from '@/auth/hooks/use-logout';
import useRefreshToken from '@/auth/hooks/use-refresh-token';
import useRegister from '@/auth/hooks/use-register';

export default function AuthProvider({ children }: { children: ReactNode }) {
	const register = useRegister();
	const login = useLogin();
	const logout = useLogout();
	const refreshToken = useRefreshToken();

	return (
		<AuthContext.Provider
			value={{
				register: register.mutate,
				login: login.mutate,
				logout: logout.mutate,
				session: { isAuthenticated: false, isLoading: false, userId: null, setAccessToken: () => {} },
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
