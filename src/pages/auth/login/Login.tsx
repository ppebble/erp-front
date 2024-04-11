import { FcGoogle } from 'react-icons/fc';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ForwardedRef, useRef, useState } from 'react';
import InputField from '../../../components/fields/InputField';
import Checkbox from '../../../components/checkbox';
import { useLoginAction, UserInfo } from '../../../store/useLogin';
import NormalModal from '../../../components/modal';

const Login = () => {
	const navigation = useNavigate();
	const loginAction = useLoginAction();
	const [cookies, setCookie, removeCookie] = useCookies(['userId']);
	const refUserId = useRef<HTMLInputElement>(null);
	const refUserPwd = useRef<HTMLInputElement>(null);
	const refRemeberId = useRef<HTMLInputElement>(null);
	const [isRemember, setIsRemember] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [contents, setContents] = useState<string>();

	const changeOpen = () => {
		setOpen(!open);
	};

	const doLogin = () => {
		const param = {
			userId: refUserId.current?.value,
			userPwd: refUserPwd.current?.value,
		};
		if (!param.userId || !param.userPwd) {
			changeOpen();
			setContents('id / pwd 를 입력해주세요');
		} else {
			// loginAction(param)
			//  >> param ::  로그인 후에 결과값(UserInfo)
			const heapUserInfo: UserInfo = {
				isAuthorized: true,
				token: 'token1',
				userId: refUserId.current?.value, // 원래는 API에서 리턴되는 userId
				userName: 'userName',
			};
			if (isRemember) {
				setCookie('userId', refUserId.current?.value, {
					path: '/',
					expires: new Date(Date.now() + 86400000),
				});
			}
			loginAction.login(heapUserInfo);
			navigation('/erp/dashboard');
		}
	};

	return (
		<div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
			{/* Sign in section */}
			<div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
				<h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">로그인</h4>
				<p className="mb-9 ml-1 text-base text-gray-600">@@@@</p>
				{/* Email */}
				<InputField variant="auth" extra="mb-3" label="ID" placeholder="ID" id="email" type="text" ref={refUserId} />

				{/* Password */}
				<InputField variant="auth" extra="mb-3" label="Password" placeholder="Password" id="password" type="password" ref={refUserPwd} />
				{/* Checkbox */}
				<div className="mb-4 flex items-center justify-between px-2">
					<div className="flex items-center">
						<Checkbox
							ref={refRemeberId}
							onChangeHandler={() => {
								setIsRemember(!isRemember);
							}}
						/>
						<p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">아이디 저장</p>
					</div>
					<a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href=" ">
						아이디/비밀번호 찾기
					</a>
				</div>
				<button
					className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
					onClick={() => {
						doLogin();
					}}
				>
					로그인
				</button>
				<div className="mt-4 flex items-center justify-between">
					<a href=" " className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
						신규 아이디 생성
					</a>
					<a href="http://59.6.79.198/login" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
						방문차량 주차
					</a>
				</div>
			</div>
			<NormalModal change={changeOpen} contents={contents} open={open} type={3} closeOnOverlay />
		</div>
	);
};
export default Login;
