import * as React from 'react';
import CryptoJS from 'crypto-js';

export const decryptData = (encryptedData: any, key: any) => {
	// "ToKen"을 "/"로 대체
	const decryptedBase64 = encryptedData.replace(/ToKen/g, '/');

	// URL 디코딩
	const urlDecodedData = decodeURIComponent(decryptedBase64);

	// Base64 decode
	const encryptedBytes = CryptoJS.enc.Base64.parse(urlDecodedData).toString(CryptoJS.enc.Base64);

	// Prepare key and IV
	const keyBytes = CryptoJS.enc.Utf8.parse(key.substring(0, 16));
	const ivBytes = CryptoJS.enc.Utf8.parse(key.substring(0, 16));

	// Decrypt
	const decrypted = CryptoJS.AES.decrypt(encryptedBytes, keyBytes, {
		iv: ivBytes,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});

	// Convert from bytes to string
	const result = decrypted.toString(CryptoJS.enc.Utf8);
	return result;
};
