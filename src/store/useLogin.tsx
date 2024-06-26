import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type UserInfo = {
	isAuthorized: boolean;
	userId?: string;
	userName?: string;
	token?: string;
};
type ActionItem = {
	login: (user: UserInfo) => void | null;
	logout: () => void | null;
	setAdminFlag: (adminFlag: string) => void | null;
};

export interface LoginPersistStore {
	isAuthorized: boolean;
	userId: string;
	userName: string;
	token: string;
	isAdmin: string;
	action: ActionItem;
}

const useLoginStore = create<LoginPersistStore>()(
	devtools(
		persist(
			(set) => ({
				isAuthorized: false, // store state
				userId: '', // store state
				userName: '',
				token: '',
				isAdmin: 'false',

				// 로그인
				action: {
					login: (user: UserInfo) =>
						set(
							{
								isAuthorized: user.isAuthorized,
								userId: user.userId,
								userName: user.userName,
								token: user.token,
							},
							false,
							'LOG_IN',
						),
					// 로그아웃
					logout: () =>
						set(
							{
								isAuthorized: false,
								userId: '',
								userName: '',
								token: '',
							},
							false,
							'LOG_OUT',
						),
					setAdminFlag: (adminFlag: string) =>
						set(
							{
								isAdmin: adminFlag,
							},
							false,
							'SET_ADMIN',
						),
				},
			}),
			{
				name: 'auth-store', // 저장소 key값
				storage: createJSONStorage(() => localStorage), // 저장소
				version: 1.0, // version 정보
				partialize: (state: any) => ({
					isAuthorized: state.isAuthorized,
					userId: state.userId,
					userName: state.userName,
					token: state.token,
				}),
			},
		),
	),
);
export const useUserName = () => useLoginStore((state) => state.userName);
export const useUserId = () => useLoginStore((state) => state.userId);
export const useIsAuth = () => useLoginStore((state) => state.isAuthorized);
export const useToken = () => useLoginStore((state) => state.token);
export const useIsAdmin = () => useLoginStore((state) => state.isAdmin);
export const useLoginAction = () => useLoginStore((state) => state.action);
export default useLoginStore;
