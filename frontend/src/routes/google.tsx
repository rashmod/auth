import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import useAuth from '@/auth/use-auth';

export const Route = createFileRoute('/google')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => {
		const accessToken = search.accessToken as string | undefined;
		const id = search.id as string | undefined;

		return { accessToken, id };
	},
});

function RouteComponent() {
	const {
		refresh,
		session: { isAuthenticated },
	} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: '/' });
		}

		if (!isAuthenticated) {
			refresh.action();
		}
	}, []);

	return null;
}
