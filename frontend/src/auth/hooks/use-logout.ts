import { useMutation } from '@tanstack/react-query';

export default function useLogout() {
	return useMutation({
		mutationFn: async () => {},
		onSuccess: () => {},
	});
}
