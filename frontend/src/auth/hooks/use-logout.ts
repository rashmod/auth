import { useMutation } from '@tanstack/react-query';

import { logout } from '@/auth/api';

export default function useLogout() {
	return useMutation({
		mutationFn: (input: Parameters<typeof logout>) => logout(...input),
		onSuccess: () => {},
	});
}
