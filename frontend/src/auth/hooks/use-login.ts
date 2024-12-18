import { useMutation } from '@tanstack/react-query';

import { login } from '@/auth/api';

export default function useLogin({
	setAccessToken,
	setUserId,
}: {
	setAccessToken: (token: string | null) => void;
	setUserId: (userId: string | null) => void;
}) {
	return useMutation({
		mutationFn: (input: Parameters<typeof login>) => login(...input),
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			setUserId(data.user.id);
		},
	});
}
