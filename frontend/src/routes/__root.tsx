import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null
		: React.lazy(() =>
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
				}))
			);

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<React.Fragment>
			<div>Hello "__root"!</div>
			<Outlet />
			<TanStackRouterDevtools />
		</React.Fragment>
	);
}
