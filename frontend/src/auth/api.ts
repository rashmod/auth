import axios from 'axios';

const api = axios.create({ baseURL: '/auth', withCredentials: true });

export async function register({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}): Promise<{ user: { id: string }; accessToken: string }> {
	const response = await api.post('/register', { name, email, password });
	return response.data;
}

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{ user: { id: string }; accessToken: string }> {
	const response = await api.post('/login', { email, password });
	return response.data;
}

export async function logout() {
	const response = await api.post('/logout');
	return response.data;
}

export async function refresh(): Promise<{ user: { id: string }; accessToken: string }> {
	const response = await api.post('/refresh-token');
	return response.data;
}
