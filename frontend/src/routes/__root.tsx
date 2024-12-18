import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { lazy } from 'react';

import { type AuthContext } from '@/auth/auth-context';

const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null
		: lazy(() =>
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
				}))
			);

type RouterContext = { auth: AuthContext };

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div>Hello "__root"!</div>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
