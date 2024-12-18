import { useMutation } from '@tanstack/react-query';

import { refresh } from '@/auth/api';

export default function useRefreshToken({
	setAccessToken,
	setUserId,
}: {
	setAccessToken: (token: string | null) => void;
	setUserId: (userId: string | null) => void;
}) {
	return useMutation({
		mutationFn: refresh,
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			setUserId(data.user.id);
		},
	});
}
