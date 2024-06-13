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

export const uploadConfig = {
	timeout: 10000,
	withCredentials: true,
	// mode: 'cors',
	headers: {
		Accept: 'multipart/form-data',
	},
};

const client = axios.create({
	...defaultConfig,
});

const upload = axios.create({
	...uploadConfig,
});

const refTokenQuery = mem(
	async (module): Promise<string> => {
		try {
			const result = await module.post('/api/auth/tokenRefresh');

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
			const accessToken = await refTokenQuery(client);

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

upload.interceptors.request.use((config) => {
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

upload.interceptors.response.use(
	async (res) => {
		console.log(res.request.responseURL?.includes('/api/auth/tokenRefresh'));
		console.log(res.request.responseURL);
		console.log(res.data.resultCode);

		if (res.data.resultCode === 'B202') {
			// eslint-disable-next-line no-param-reassign
			res.request.sent = true;
			const accessToken = await refTokenQuery(upload);

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

// axiosRetry(client, { retries: 2 });
export { client, upload };
