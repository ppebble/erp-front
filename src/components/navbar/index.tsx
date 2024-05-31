import { useNavigate } from 'react-router-dom';
import { FiAlignJustify } from 'react-icons/fi';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = (props: { onOpenSidenav: () => void }) => {
	const { onOpenSidenav } = props;
	const navigate = useNavigate();

	return (
		<nav
			className="sticky top-0 z-40 flex flex-row flex-wrap ml-[-14px] items-center justify-between bg-white p-2 backdrop-blur-xl dark:bg-[#0b14374d]"
			style={{ boxShadow: ' 0 2px 2px -2px gray' }}
		>
			{/* 사이드바 (pc) */}
			<div className="ml-[6px]">
				<div>
					<div className="flex cursor-pointer text-xl text-gray-600 dark:text-white hidden xl:inline-block" onClick={onOpenSidenav}>
						<FiAlignJustify />
					</div>
				</div>
			</div>

			<div className="relative mt-[3px] flex h-[61px] !w-[200px] mr-0 xl:mr-[10px]  flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-400 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
				{/* 사이드바 (모바일) */}
				<span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
					<FiAlignJustify className="h-5 w-5" />
				</span>

				<Menu>
					<MenuButton className="!bg-white" as={Button} rightIcon={<ChevronDownIcon />}>
						UserName
					</MenuButton>
					<MenuList>
						<MenuItem onClick={() => navigate('signUp')}>프로필 수정</MenuItem>
						<MenuItem onClick={() => navigate('password')}>비밀번호 변경</MenuItem>
						<MenuItem onClick={() => navigate('/')} style={{ color: 'red' }}>
							로그아웃
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</nav>
	);
};

export default Navbar;
