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
	console.log('in google route component');

	useEffect(() => {
		console.log('in google use effect');
		if (isAuthenticated) {
			console.log('in google use effect: navigating to home');
			navigate({ to: '/' });
		}

		if (!isAuthenticated) {
			console.log('in google use effect: triggering refresh');
			refresh.action();
		}
	}, []);

	return null;
}
