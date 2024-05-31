import { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, InputGroup, InputLeftAddon, InputRightElement, Spacer } from '@chakra-ui/react';
import { ProfileService } from '../../../services/profileService';
import useModal from '../../../store/useModal';

const Password = () => {
	const { modifyPw } = ProfileService();
	const { openModal } = useModal();
	const [password, setPassword] = useState({ pw: '', rePw: '' });
	const [show, setShow] = useState(false);
	const [reShow, setReShow] = useState(false);
	const handle = () => setShow(!show);
	const reHandle = () => setReShow(!reShow);

	const changePw = (e: any) => {
		const { id, value } = e.target;
		setPassword({ ...password, [id]: value });
	};

	const modify = () => {
		if (password.pw === password.rePw) {
			modifyPw.mutate(password.pw);
		} else {
			openModal({ type: 3, contents: '변경할 비밀번호가 일치하지 않습니다.<br/>비밀번호를 다시 확인해 주세요.', color: 'red' });
		}
	};

	return (
		<div className="mt-5 grid">
			<Card className="w-full h-full pt-[20px] pb-10 sm:px-[20px]">
				<div className="flex pl-[10%] pr-[20%]">
					<header className="flex mt-[auto] float-left">
						<div className="text-xl font-bold text-navy-700">비밀번호 변경</div>
					</header>
				</div>
				<div className="mt-5 overflow-x-scroll xl:overflow-x-hidden min-h-[800px] xl:pl-[10%] xl:pr-[20%] md:pl-[10%] md:pr-[10%]">
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[150px]">비밀번호 확인</InputLeftAddon>
						<Input
							id="pw"
							className="!min-w-[100px]"
							onChange={(e) => changePw(e)}
							autoComplete="off"
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="변경할 비밀번호를 한번 더 입력하세요."
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
							onChange={(e) => changePw(e)}
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
					<div className="w-full text-end">
						<Button className="w-[150px]" onClick={() => modify()}>
							변경
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Password;
