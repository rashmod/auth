import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AuthProvider from '@/auth/auth-provider';
import '@/index.css';
import QueryClientProvider from '@/providers/query-client';
import RouterProvider from '@/providers/router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider>
			<AuthProvider>
				<RouterProvider />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
