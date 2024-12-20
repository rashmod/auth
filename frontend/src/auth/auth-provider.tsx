import { ReactNode, useEffect, useState } from 'react';

import AuthContext from '@/auth/auth-context';
import useLogin from '@/auth/hooks/use-login';
import useLogout from '@/auth/hooks/use-logout';
import useRefreshToken from '@/auth/hooks/use-refresh-token';
import useRegister from '@/auth/hooks/use-register';
import { setupAxiosInterceptor } from '@/lib/setup-axios-interceptor';

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshing, setRefreshing] = useState(true);

	const register = useRegister({ setAccessToken, setUserId });
	const login = useLogin({ setAccessToken, setUserId });
	const logout = useLogout({ setAccessToken, setUserId });
	const refreshToken = useRefreshToken({ setAccessToken, setUserId });

	useEffect(() => {
		refreshToken.mutate();
		setRefreshing(false);
		setupAxiosInterceptor(setAccessToken);
	}, []);

	const isAuthenticated = !!accessToken;
	const isLoading = refreshing || refreshToken.isPending;

	return (
		<AuthContext.Provider
			value={{
				register: { action: register.mutate, isLoading: register.isPending, isSuccess: register.isSuccess },
				login: { action: login.mutate, isLoading: login.isPending, isSuccess: login.isSuccess },
				refresh: { action: refreshToken.mutate, isLoading: refreshToken.isPending, isSuccess: refreshToken.isSuccess },
				logout: logout.mutate,
				session: { isAuthenticated, isLoading, userId, setAccessToken, setUserId },
			}}
		>
			{isLoading ? <div className="flex h-screen items-center justify-center text-2xl">Loading...</div> : children}
		</AuthContext.Provider>
	);
}
