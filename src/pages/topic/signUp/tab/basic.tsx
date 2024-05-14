import { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Select,
} from '@chakra-ui/react';
import ProfileService from '../../../../services/profileService';
import useProfile from '../../../../store/useProfile';
import useModal from '../../../../store/useModal';

const Basic = () => {
	const [show, setShow] = useState(false);
	const [highSchool, setHighSchool] = useState<string[]>();
	const [collage, setCollage] = useState<string[]>();
	const [graduateSchool, setGraduateSchool] = useState<string[]>();

	const { profile, detail, dept, education, army, setProfile, setDetail, setDept, setEducation, setArmy } = useProfile();
	const { openModal } = useModal();

	const idCheck = ProfileService().idCheckMutation;

	const handleClick = () => setShow(!show);

	const isAvailable = () => {
		if (profile) {
			idCheck.mutate(profile.userId);
		}
	};

	useEffect(() => {
		if (education) {
			setHighSchool(education.highSchool.split('/'));
			setCollage(education.collage.split('/'));
			setGraduateSchool(education.graduateSchool.split('/'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeProfile = (e: any) => {
		const { id, value } = e.target;
		setProfile({ ...profile, [id]: value });
	};

	const changeDetail = (e: any) => {
		const { id, value } = e.target;
		setDetail({ ...detail, [id]: value });
	};

	const changeDept = (e: any) => {
		const { id, value } = e.target;
		setDept({ ...dept, [id]: value });
	};

	const changeEducation = (e: any) => {
		const { id, value } = e.target;
		setEducation({ ...education, [id]: value });
	};

	const changeArmy = (e: any) => {
		const { id, value } = e.target;
		setArmy({ ...army, [id]: value });
	};

	useEffect(() => {
		if (idCheck.isSuccess) {
			if (idCheck.data.response.isSuccessful) {
				openModal({ type: 3, contents: '사용 가능한 아이디 입니다.' });
			} else {
				openModal({ type: 3, contents: '사용할수 없는 아이디 입니다.', color: 'red' });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idCheck.isSuccess, idCheck.isError]);

	// profile, profileDept, profileDetail, profileArmy, profileEducation
	return (
		<div>
			<form>
				{/* profile */}
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">사원번호</InputLeftAddon>
					<Input id="empNo" className="!min-w-[100px]" readOnly defaultValue={profile.empNo || ''} />
					<InputLeftAddon className="!min-w-[150px] ml-[20px]">국가연구자번호</InputLeftAddon>
					<Input id="sciTechCertify" onChange={(e) => changeDept(e)} defaultValue={dept.sciTechCertify || ''} />
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">아이디</InputLeftAddon>
					{profile.userId === '' ? (
						<>
							<Input id="userId" className="!min-w-[100px]" onChange={(e) => changeProfile(e)} defaultValue={profile.userId || ''} />
							<InputRightAddon>
								<Button onClick={() => isAvailable()}>중복확인</Button>
							</InputRightAddon>
						</>
					) : (
						<Input id="userId" className="!min-w-[100px]" onChange={(e) => changeProfile(e)} defaultValue={profile.userId || ''} />
					)}

					<InputLeftAddon className="!min-w-[100px] ml-[20px]">이메일</InputLeftAddon>
					<Input id="userEmail" className="!min-w-[100px]" onChange={(e) => changeProfile(e)} defaultValue={profile.userEmail || ''} />
					<InputRightAddon>@nexmore.co.kr</InputRightAddon>
				</InputGroup>

				<Accordion className="mb-[10px]" allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									+ 비밀번호 변경
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[100px]">비밀번호</InputLeftAddon>
								<Input
									id="pw"
									className="!min-w-[100px]"
									onChange={(e) => changeProfile(e)}
									autoComplete="off"
									pr="4.5rem"
									type={show ? 'text' : 'password'}
									placeholder="변경할 비밀번호를 입력하세요."
								/>
								<InputLeftAddon className="!min-w-[100px] ml-[20px]">비밀번호 확인</InputLeftAddon>
								<Input
									id="rePw"
									className="!min-w-[100px]"
									onChange={(e) => changeProfile(e)}
									autoComplete="off"
									pr="4.5rem"
									type={show ? 'text' : 'password'}
									placeholder="변경할 비밀번호를 한번 더 입력하세요."
								/>
								<Button className="ml-[20px] w-[150px]" size="md" onClick={handleClick}>
									{show ? '숨김' : '보기'}
								</Button>
							</InputGroup>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>

				{/* profileDept */}
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">부서</InputLeftAddon>
					<Select id="task" key="task" className="!min-w-[160px]" onChange={(e) => changeDept(e)} defaultValue={dept.task || ''}>
						<option value="SC사업본부">SC사업본부</option>
						<option value="SF&신사업본부">SF&신사업본부</option>
						<option value="경영팀">경영팀</option>
						<option value="기술개발본부">기술개발본부</option>
						<option value="기업부설연구소">기업부설연구소</option>
						<option value="없음">없음</option>
					</Select>
					<InputLeftAddon className="!min-w-[70px] ml-[20px]">팀</InputLeftAddon>
					<Select id="team" key="team" className="!min-w-[100px]" onChange={(e) => changeDept(e)} defaultValue={dept.team || ''}>
						<option value="개발1팀">개발1팀</option>
						<option value="개발2팀">개발2팀</option>
					</Select>
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">직책</InputLeftAddon>
					<Select id="position" key="position" className="!min-w-[100px]" onChange={(e) => changeDept(e)} defaultValue={dept.position || ''}>
						<option value="CEO">CEO</option>
						<option value="사업부장">사업부장</option>
						<option value="본부장">본부장</option>
						<option value="연구소장">연구소장</option>
						<option value="실장">실장</option>
						<option value="팀장">팀장</option>
						<option value="파트장">파트장</option>
						<option value="">없음</option>
					</Select>
					<InputLeftAddon className="!min-w-[70px] ml-[20px]">직급</InputLeftAddon>
					<Select id="rank" key="rank" className="!min-w-[100px]" onChange={(e) => changeDept(e)} defaultValue={dept.rank || ''}>
						<option value="주임">주임</option>
						<option value="대리">대리</option>
						<option value="과장">과장</option>
						<option value="차장">차장</option>
						<option value="부장">부장</option>
						<option value="이사">이사</option>
						<option value="상무">상무</option>
						<option value="대표">대표</option>
						<option value="회장">회장</option>
					</Select>
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">근무지</InputLeftAddon>
					<Select id="place" key="place" className="!min-w-[150px]" onChange={(e) => changeDept(e)} defaultValue={dept.place || ''}>
						<option value="SKT">SKT</option>
						<option value="본사">본사</option>
						<option value="안산">안산</option>
						<option value="윤선생">윤선생</option>
						<option value="미라콤">미라콤</option>
					</Select>
					<InputLeftAddon className="!min-w-[100px] ml-[20px]">입사일</InputLeftAddon>
					<Input id="employmentDate" type="date" onChange={(e) => changeDept(e)} defaultValue={dept.employmentDate || ''} />
				</InputGroup>
				{/* profileDetail */}
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">이름</InputLeftAddon>
					<Input id="name" className="!min-w-[100px]" onChange={(e) => changeDetail(e)} defaultValue={detail.name || ''} />
					<InputLeftAddon className="!min-w-[100px] ml-[20px]">영문이름</InputLeftAddon>
					<Input id="eName" className="!min-w-[100px]" onChange={(e) => changeDetail(e)} defaultValue={detail.ename || ''} />
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">전화번호</InputLeftAddon>
					<Input id="tel" type="tel" onChange={(e) => changeDetail(e)} defaultValue={detail.tel || ''} />
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">주소</InputLeftAddon>
					<Input id="address" onChange={(e) => changeDetail(e)} defaultValue={detail.address || ''} />
				</InputGroup>
				{detail.residentNumber === '' || detail.residentNumber === undefined ? (
					<InputGroup className="mb-2">
						<InputLeftAddon className="!min-w-[120px]">주민등록번호</InputLeftAddon>
						<Input id="residentNumber" onChange={(e) => changeDetail(e)} placeholder="변경할 주민등록번호를 입력하세요." />
					</InputGroup>
				) : (
					''
				)}
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">생일</InputLeftAddon>
					<Input id="birthday" type="date" onChange={(e) => changeDetail(e)} defaultValue={detail.birthday || ''} />
				</InputGroup>
				<InputGroup className="mb-2">
					<InputLeftAddon className="!min-w-[100px]">가족관계</InputLeftAddon>
					<Input id="family" onChange={(e) => changeDetail(e)} defaultValue={detail.family || ''} />
				</InputGroup>

				{/* profileArmy */}
				<Accordion className="mb-[10px]" allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									+ 병역 정보 입력
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[100px]">병과</InputLeftAddon>
								<Input id="armyBranch" className="!min-w-[100px]" onChange={(e) => changeArmy(e)} defaultValue={army.armyBranch || ''} />
								<InputLeftAddon className="!min-w-[100px] ml-[20px]">복무기간</InputLeftAddon>
								<Input id="armyStart" type="date" className="!min-w-[100px]" onChange={(e) => changeArmy(e)} defaultValue={army.armyStart || ''} />
								<b style={{ alignContent: 'center', margin: '0 10px' }}>~</b>
								<Input id="armyEnd" type="date" className="!min-w-[100px]" onChange={(e) => changeArmy(e)} defaultValue={army.armyEnd || ''} />
							</InputGroup>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>

				{/* profileEducation */}
				<Accordion allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									+ 학력 사항 입력
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[100px]">고등학교</InputLeftAddon>
								<Input id="highSchool" className="!min-w-[200px]" defaultValue={highSchool ? highSchool[0] : ''} />
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">구분</InputLeftAddon>
								<Select id="highType" key="highType" className="!min-w-[120px]" defaultValue={highSchool ? highSchool[1] : ''}>
									<option value="졸업">졸업</option>
									<option value="중퇴">중퇴</option>
									<option value="졸업예정">졸업예정</option>
								</Select>
								<InputLeftAddon className="min-w-[70px] ml-[20px]">날짜</InputLeftAddon>
								<Input id="highDate" type="month" className="!min-w-[150px]" defaultValue={highSchool ? highSchool[2] : ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[100px]">대학교</InputLeftAddon>
								<Input id="collage" className="!min-w-[200px]" defaultValue={collage ? collage[0] : ''} />
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">전공</InputLeftAddon>
								<Input id="collageMajor" className="!min-w-[200px]" defaultValue={collage ? collage[1] : ''} />
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">구분</InputLeftAddon>
								<Select id="collageType" key="collageType" className="!min-w-[120px]" defaultValue={collage ? collage[2] : ''}>
									<option value="졸업">졸업</option>
									<option value="중퇴">중퇴</option>
									<option value="졸업예정">졸업예정</option>
								</Select>
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">날짜</InputLeftAddon>
								<Input id="c_date" type="month" className="!min-w-[150px]" defaultValue={collage ? collage[3] : ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[100px]">대학원</InputLeftAddon>
								<Input id="graduateSchool" className="!min-w-[200px]" defaultValue={graduateSchool ? graduateSchool[0] : ''} />
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">전공</InputLeftAddon>
								<Input id="graduateMajor" className="!min-w-[200px]" defaultValue={graduateSchool ? graduateSchool[1] : ''} />
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">구분</InputLeftAddon>
								<Select id="graduateType" key="graduateType" className="!min-w-[120px]" defaultValue={graduateSchool ? graduateSchool[2] : ''}>
									<option value="졸업">졸업</option>
									<option value="중퇴">중퇴</option>
									<option value="졸업예정">졸업예정</option>
								</Select>
								<InputLeftAddon className="!min-w-[70px] ml-[20px]">날짜</InputLeftAddon>
								<Input id="graduateDate" type="date" className="!min-w-[150px]" defaultValue={graduateSchool ? graduateSchool[3] : ''} />
							</InputGroup>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</form>
		</div>
	);
};
export default Basic;
