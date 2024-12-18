import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { lazy } from 'react';

import { type AuthContext } from '@/auth/auth-context';

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })));
const ReactQueryDevtools = import.meta.env.PROD
	? () => null
	: lazy(() => import('@tanstack/react-query-devtools').then((res) => ({ default: res.ReactQueryDevtools })));

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
			<ReactQueryDevtools />
		</>
	);
}
