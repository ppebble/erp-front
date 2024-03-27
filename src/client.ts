import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { replaceEtcUrlToData } from './services/base/AxiosUtil';

export type { AxiosResponse };

export const defaultConfig = {
	timeout: 10000,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
};

const client = axios.create({
	...defaultConfig,
});

client.interceptors.request.use(
	async (config: any) => {
		const { headers, data } = config;
		// 토큰정보가 필요한 경우 추가 입력
		// const accessToken = headers?.Authorization ? 'token' : localStorage?.getItem('access_token');
		return {
			...config,
			data,
			headers: {
				...headers,
			},
		};
	},
	(error) => {
		Promise.reject(error).then(() => {});
	},
);

client.interceptors.response.use(
	async (response: any) => {
		return replaceEtcUrlToData(response);
	},
	(error) => {
		Promise.reject(error).then(() => {});
	},
);

axiosRetry(client, { retries: 2 });
export default client;
