import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import AuthService from '../../../services/authService';

const FindPassword = () => {
	const send = AuthService().sendResetUrl;
	const navigate = useNavigate();
	const refUserEmail = useRef<HTMLInputElement>(null);

	const sendEmail = () => {
		send.mutate({ content: refUserEmail.current?.value });
	};

	return (
		<div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
			<div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
				<div>
					<Button className="mr-[2rem]" onClick={() => navigate('/auth/login')}>
						<ArrowLeftIcon />
					</Button>
				</div>
				<h4 className="mb-2.5 text-4xl font-bold text-navy-700">비밀번호 찾기</h4>
				<p className="mb-9 ml-1 text-base text-gray-600">이메일을 통해 비밀번호 수정 링크가 전송됩니다.</p>

				<InputGroup className="mb-2">
					<Input id="userEmail" className="!min-w-[100px]" placeholder="이메일을 입력하세요." ref={refUserEmail} />
					<InputRightAddon>@nexmore.co.kr</InputRightAddon>
				</InputGroup>

				<button
					className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700"
					onClick={() => sendEmail()}
				>
					링크 발송
				</button>
			</div>
		</div>
	);
};

export default FindPassword;
