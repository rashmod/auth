import { useMutation } from '@tanstack/react-query';

export default function useRefreshToken() {
	return useMutation({
		mutationFn: async () => {},
		onSuccess: () => {},
	});
}
