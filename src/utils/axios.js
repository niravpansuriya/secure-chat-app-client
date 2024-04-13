import axios from 'axios';
import { getAccessTokenFromCookie } from './cookie';

const axiosInstance = axios.create({
	baseURL: 'https://de7a-174-114-232-152.ngrok-free.app/',
	// baseURL: 'http://localhost:8000/',
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = getAccessTokenFromCookie();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			if (window.location.pathname != '/login') {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
