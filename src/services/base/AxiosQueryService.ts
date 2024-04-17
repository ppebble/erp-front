import type { AxiosError } from 'axios';
import client, { ResponseTypes } from '../../client';

export const getQuery = async (url: string): Promise<ResponseTypes> => {
	try {
		const result = await client.get(url);
		return { response: result.data };
	} catch (e) {
		const error = e as AxiosError;
		return {
			error,
		};
	}
};

export const postQuery = async (url: string, params?: any): Promise<ResponseTypes> => {
	try {
		const result = await client.post(url, params);

		return { response: result.data };
	} catch (e) {
		const error = e as AxiosError;
		return {
			error,
		};
	}
};
