import { useMutation } from '@tanstack/react-query';

import { register } from '@/auth/api';

export default function useRegister({
	setAccessToken,
	setUserId,
}: {
	setAccessToken: (token: string | null) => void;
	setUserId: (userId: string | null) => void;
}) {
	return useMutation({
		mutationFn: (input: Parameters<typeof register>) => register(...input),
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			setUserId(data.user.id);
		},
	});
}
