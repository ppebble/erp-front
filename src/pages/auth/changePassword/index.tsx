import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/react';
import useModal from '../../../store/useModal';
import AuthService from '../../../services/authService';

const ChangePassword = () => {
	const check = AuthService().checkResetPwExpired;
	const modify = AuthService().modifyPassword;
	const [show, setShow] = useState(false);
	const [reShow, setReShow] = useState(false);
	const handle = () => setShow(!show);
	const reHandle = () => setReShow(!reShow);
	const refPw = useRef<HTMLInputElement>(null);
	const refRePw = useRef<HTMLInputElement>(null);
	const { openModal } = useModal();
	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		check.mutate(params.key);
	}, []);

	const change = () => {
		if (refPw.current?.value !== refRePw.current?.value) {
			openModal({ type: 3, contents: '입력한 비밀번호가 일치하지 않습니다.', color: 'red' });
		} else {
			modify.mutate({ resetId: params.key, password: refPw.current?.value });
		}
	};

	return (
		<div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
			<div className="mt-[10vh] w-full max-w-full flex-col items-center lg:pl-0 xl:max-w-[510px]">
				<h4 className="mb-2.5 text-4xl font-bold text-navy-700">비밀번호 변경</h4>
				<p className="mb-9 ml-1 text-base text-gray-600">비밀번호를 입력하세요.</p>

				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[150px]">비밀번호</InputLeftAddon>
					<Input
						id="pw"
						className="!min-w-[100px]"
						ref={refPw}
						autoComplete="off"
						pr="4.5rem"
						type={show ? 'text' : 'password'}
						placeholder="변경할 비밀번호를 입력하세요."
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handle}>
							{show ? '숨김' : '보기'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<InputGroup className="mb-10">
					<InputLeftAddon className="!min-w-[150px]">비밀번호 확인</InputLeftAddon>
					<Input
						id="rePw"
						className="!min-w-[100px]"
						ref={refRePw}
						autoComplete="off"
						pr="4.5rem"
						type={reShow ? 'text' : 'password'}
						placeholder="변경할 비밀번호를 한번 더 입력하세요."
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={reHandle}>
							{reShow ? '숨김' : '보기'}
						</Button>
					</InputRightElement>
				</InputGroup>

				<button
					className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700"
					onClick={() => change()}
				>
					비밀번호 변경
				</button>
			</div>
		</div>
	);
};

export default ChangePassword;
