import { useMutation } from '@tanstack/react-query';

import { register } from '@/auth/api';

export default function useRegister() {
	return useMutation({
		mutationFn: (input: Parameters<typeof register>) => register(...input),
		onSuccess: () => {},
	});
}
