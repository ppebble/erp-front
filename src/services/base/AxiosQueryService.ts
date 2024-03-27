import type { AxiosError } from 'axios';
import client from '../../client';

export const getQuery = async (url: string): Promise<{ data?: any; error?: { status: any; data: any } }> => {
	try {
		const result = await client.get(url);
		return { data: result.data };
	} catch (e) {
		const error = e as AxiosError;
		return {
			error: {
				status: error.response?.status,
				data: error.response?.data || error.message,
			},
		};
	}
};

export const postQuery = async (url: string, params?: any): Promise<{ data?: any; error?: { status: any; data: any } }> => {
	try {
		const result = await client.post(url, params);

		return { data: result.data };
	} catch (e) {
		const error = e as AxiosError;
		return {
			error: {
				status: error.response?.status,
				data: error.response?.data || error.message,
			},
		};
	}
};
