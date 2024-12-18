import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

import { type AuthContext } from '@/auth/auth-context';
import Navbar from '@/components/custom/navbar';

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
		<div className="grid min-h-[100dvh] grid-rows-[auto_1fr]">
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
			<Suspense fallback={null}>
				<TanStackRouterDevtools />
				<ReactQueryDevtools />
			</Suspense>
		</div>
	);
}
