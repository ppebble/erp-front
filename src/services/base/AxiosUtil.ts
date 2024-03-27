import { baseParams } from '../../store/baseParams/baseParams';

export const replaceEtcUrlToData = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export const setGetApiParams = (params: baseParams[]) => {
	let url: string = '?';

	params.forEach((v) => {
		url += `${v.key}=${v.value}&`;
	});

	return url.substring(0, url.length - 1);
};
