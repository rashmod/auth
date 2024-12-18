import { useMutation } from '@tanstack/react-query';

import { refresh } from '@/auth/api';

export default function useRefreshToken() {
	return useMutation({
		mutationFn: (input: Parameters<typeof refresh>) => refresh(...input),
		onSuccess: () => {},
	});
}
