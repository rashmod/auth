import axios from 'axios';

import { refresh } from '@/auth/api';

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;

export function setupAxiosInterceptor(setAccessToken: (token: string | null) => void) {
	axiosInstance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (!axios.isAxiosError(error) || !error.response || ![401].includes(error.response.status)) {
				return Promise.reject(error);
			}

			const { config: originalRequest, response: originalResponse } = error;
			if (!originalRequest) {
				console.error('error: there is no original request', error);
				return Promise.reject(error);
			}

			if (originalResponse.data.message === 'RefreshTokenInvalid') {
				console.error('error: JsonWebTokenError', error);
				return Promise.reject(error);
			}

			try {
				const res = await refresh();
				const {
					data: { accessToken },
				} = res;
				console.log(res);

				axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
				setAccessToken(accessToken);

				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				setAccessToken(null);
				console.error('error: failed to refresh token', refreshError);
				return Promise.reject(refreshError);
			}
		}
	);
}

export default axiosInstance;
