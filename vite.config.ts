import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default defineConfig(({ mode }) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const env = loadEnv(mode, process.cwd());

	const localApi = env.VITE_TEST_URL2;
	const SIMSApi = env.VITE_TEST_URL1;
	return {
		plugins: [react()],
		// base: '/erp/dist',
		server: {
			port: 3000,
			proxy: {
				'/api': {
					target: localApi,
					changeOrigin: true,
					ws: true,
					secure: false,
				},
				'/datainfo': {
					target: SIMSApi,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
		},
		preview: {
			port: 4173,
			proxy: {
				'/api': {
					target: localApi,
					changeOrigin: true,
					ws: true,
					secure: false,
				},
				'/datainfo': {
					target: SIMSApi,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
		},
	};
});
