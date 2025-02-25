import { Link, useNavigate } from '@tanstack/react-router';
import { Triangle } from 'lucide-react';

import useAuth from '@/auth/use-auth';
import LoggedIn from '@/components/custom/logged-in';
import LoggedOut from '@/components/custom/logged-out';
import { Button } from '@/components/ui/button';

export default function Navbar() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	function handleLogout() {
		logout();
		navigate({ to: '/' });
	}

	return (
		<div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex items-end">
				<header className="sticky top-0 z-10 flex h-[57px] items-center gap-4">
					<div className="border-r p-2">
						<Button variant="outline" size="icon" aria-label="Home">
							<Triangle className="size-5 fill-foreground" />
						</Button>
					</div>
					<h1 className="text-xl font-semibold">Auth</h1>
				</header>

				<div className="ml-auto flex gap-2 p-2">
					<Link to="/" className="[&.active>*]:font-bold">
						<Button variant="link" size="sm">
							Home
						</Button>
					</Link>
					<LoggedIn>
						<Link to="/user" className="[&.active>*]:font-bold">
							<Button variant="link" size="sm">
								User
							</Button>
						</Link>
					</LoggedIn>
					<LoggedOut>
						<Link to="/login" className="[&.active>*]:font-bold">
							<Button variant="link" size="sm">
								Login
							</Button>
						</Link>
						<Link to="/register" className="[&.active>*]:font-bold">
							<Button variant="link" size="sm">
								Register
							</Button>
						</Link>
					</LoggedOut>
					<LoggedIn>
						<Button variant="link" size="sm" onClick={handleLogout}>
							Logout
						</Button>
					</LoggedIn>
				</div>
			</div>
		</div>
	);
}
