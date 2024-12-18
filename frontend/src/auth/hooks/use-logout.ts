import { useMutation } from '@tanstack/react-query';

import { logout } from '@/auth/api';

export default function useLogout({
	setAccessToken,
	setUserId,
}: {
	setAccessToken: (token: string | null) => void;
	setUserId: (userId: string | null) => void;
}) {
	return useMutation({
		mutationFn: (input: Parameters<typeof logout>) => logout(...input),
		onSuccess: () => {
			setAccessToken(null);
			setUserId(null);
		},
	});
}
