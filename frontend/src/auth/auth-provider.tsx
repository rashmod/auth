import { ReactNode, useState } from 'react';

import AuthContext from '@/auth/auth-context';
import useLogin from '@/auth/hooks/use-login';
import useLogout from '@/auth/hooks/use-logout';
import useRefreshToken from '@/auth/hooks/use-refresh-token';
import useRegister from '@/auth/hooks/use-register';

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshing, setRefreshing] = useState(true);

	const register = useRegister({ setAccessToken, setUserId });
	const login = useLogin({ setAccessToken, setUserId });
	const logout = useLogout({ setAccessToken, setUserId });
	const refreshToken = useRefreshToken({ setAccessToken, setUserId });

	const isAuthenticated = accessToken !== null;
	const isLoading = refreshing || refreshToken.isPending;

	return (
		<AuthContext.Provider
			value={{
				register: register.mutate,
				login: login.mutate,
				logout: logout.mutate,
				session: { isAuthenticated, isLoading, userId, setAccessToken },
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
