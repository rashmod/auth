import { useContext } from 'react';

import AuthContext from '@/auth/auth-context';

export default function useAuth() {
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return auth;
}
