import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Triangle } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import useAuth from '@/auth/use-auth';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import env from '@/config/env';

export const Route = createFileRoute('/register')({
	component: Register,
	beforeLoad: ({ context }) => {
		if (context.auth.session.isAuthenticated) {
			throw redirect({ to: '/user' });
		}
	},
});

const RegisterSchema = z
	.object({
		name: z.string().min(2, 'Username must be at least 2 characters'),
		email: z.string().email('Invalid email'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(1, 'Required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

const defaultValues: RegisterSchema = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

type RegisterSchema = z.infer<typeof RegisterSchema>;

function Register() {
	const form = useForm<RegisterSchema>({ resolver: zodResolver(RegisterSchema), defaultValues });

	const {
		register,
		session: { isAuthenticated },
	} = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: '/user' });
		}
	}, [isAuthenticated, navigate]);

	const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
		register.action(data);
	};

	return (
		<div className="grid h-full w-full lg:grid-cols-2">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Register</h1>
						<p className="text-balance text-muted-foreground">Enter your email below to register your account</p>
					</div>
					<Form {...form}>
						<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormDescription>This is how others will see you</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="m@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="confirmPassword"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full">
								Submit
							</Button>

							<Button type="button" className="w-full" variant="secondary">
								<Link to={`${env.VITE_BACKEND_API_URL}/auth/google`}>Register with Google</Link>
							</Button>
						</form>
					</Form>
					<div className="mt-4 space-x-1 text-center text-sm">
						<span>Already have an account?</span>
						<Link to="/login" className="underline">
							Log in
						</Link>
					</div>
				</div>
			</div>

			<div className="hidden place-items-center bg-muted lg:grid">
				<Triangle className="size-96 fill-foreground object-cover" />
			</div>
		</div>
	);
}
