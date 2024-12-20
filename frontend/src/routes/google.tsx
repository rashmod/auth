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
	const navigate = useNavigate();
	const {
		session: { setAccessToken, setUserId },
	} = useAuth();
	const { id, accessToken } = Route.useSearch();

	useEffect(() => {
		console.log({ accessToken, id });
		if (!accessToken || !id) {
			navigate({
				to: '/login',
			});
			return;
		}
		setAccessToken(accessToken);
		setUserId(id);
	}, [accessToken, id, navigate]);

	return null;
}
