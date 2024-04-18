import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { Cookies } from 'react-cookie';
import mem from 'mem';

export type { AxiosResponse };

export interface ResponseTypes {
	response?: any;
	error?: any;
}

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

// client.interceptors.request.use(
// 	async (config: any) => {
// 		const { headers, data } = config;
// 		// 토큰정보가 필요한 경우 추가 입력
// 		const accessToken = sessionStorage.getItem('nex_accessToken') ? sessionStorage.getItem('nex_accessToken') : '';
// 		console.log(accessToken);
// 		const token = accessToken === '' ? null : `Bearer ${accessToken}`;
// 		return {
// 			...config,
// 			data,
// 			headers: {
// 				...headers,
// 				Authorization: token,
// 			},
// 		};
// 	},
// 	(error) => {
// 		Promise.reject(error).then(() => {});
// 	},
// );
const refTokenQuery = mem(
	async (): Promise<string> => {
		try {
			const result = await client.post('/api/auth/tokenRefresh');

			console.log(`ref token:: ${result.data}`);
			sessionStorage.setItem('nex_accessToken', result.data.result.accessToken);
			new Cookies().set('nex_refToken', result.data.result.refreshToken, {
				path: '/',
				expires: new Date(Date.now() + 86400000),
			});
			return result.data.result.accessToken;
		} catch (e) {
			sessionStorage.removeItem('nex_accessToken');
			new Cookies().remove('nex_refToken');
			return '';
		}
	},
	// 10초 동안 들어오는 토큰 갱신 요청 대기
	{ maxAge: 10000 },
);
client.interceptors.request.use((config) => {
	if (!config.headers) return config;

	let token: string | null = null;

	if (config.url?.includes('/api/auth/tokenRefresh')) {
		token = new Cookies().get('nex_refToken');
	} else {
		token = sessionStorage.getItem('nex_accessToken');
	}

	if (token !== null) {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

client.interceptors.response.use(
	async (res) => {
		console.log(res.request.responseURL?.includes('/api/auth/tokenRefresh'));
		console.log(res.request.responseURL);
		console.log(res.data.resultCode);

		if (res.data.resultCode === 'B202') {
			// eslint-disable-next-line no-param-reassign
			res.request.sent = true;
			const accessToken = await refTokenQuery();

			if (accessToken !== '') {
				// eslint-disable-next-line no-param-reassign
				res.config.headers.Authorization = `Bearer ${accessToken}`;
				return axios(res.config);
			}
		}
		if (res.data.resultCode === 'B201' || res.data.resultCode === 'B012') {
			sessionStorage.removeItem('nex_accessToken');
			new Cookies().remove('nex_refToken');
		}

		return res;
	},
	(error) => {
		Promise.reject(error).then(() => {});
	},
);

axiosRetry(client, { retries: 2 });
export default client;
