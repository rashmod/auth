import { createFileRoute } from '@tanstack/react-router';

import useAuth from '@/auth/use-auth';

export const Route = createFileRoute('/_auth/user')({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		session: { userId },
	} = useAuth();

	return <div>Hello user {userId}!</div>;
}
