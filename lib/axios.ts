import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { getDataLocalStr } from './utils';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 0,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
	},
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		try {
			const tokenObj = getDataLocalStr('accessToken');

			if (tokenObj?.accessToken) {
				config.headers.setAuthorization(`Bearer ${tokenObj?.accessToken}`);
			}
			return config;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	(error: any) => Promise.reject(error)
);

const publicAxiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 0,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
	},
});

export { axiosInstance, publicAxiosInstance };
