import { useMutation } from '@tanstack/react-query';

import { login } from '@/auth/api';

export default function useLogin() {
	return useMutation({
		mutationFn: (input: Parameters<typeof login>) => login(...input),
		onSuccess: () => {},
	});
}
