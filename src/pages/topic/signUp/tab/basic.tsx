import { useState } from 'react';
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
	InputRightElement,
	Select,
} from '@chakra-ui/react';

type BasicProps = {
	mode: string;
};

const Basic = ({ mode }: BasicProps) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	// profile, profileDept, profileDetail, profileArmy, profileEducation
	return (
		<div>
			{/* profile */}
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">사원번호</InputLeftAddon>
				<Input id="empNo" readOnly value="24-001" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">아이디</InputLeftAddon>
				<Input id="userId" readOnly value="User1" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">이메일</InputLeftAddon>
				<Input id="userEmail" type="email" />
				<InputRightAddon>@nexmore.co.kr</InputRightAddon>
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">비밀번호</InputLeftAddon>
				<Input id="pw" pr="4.5rem" type={show ? 'text' : 'password'} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleClick}>
						{show ? '숨김' : '보기'}
					</Button>
				</InputRightElement>
			</InputGroup>

			{/* profileDept */}
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">부서</InputLeftAddon>
				<Select id="task" className="!min-w-[150px]">
					<option value="SC사업본부">SC사업본부</option>
					<option value="SF&신사업본부">SF&신사업본부</option>
					<option value="경영팀">경영팀</option>
					<option value="기술개발본부">기술개발본부</option>
					<option value="기업부설연구소">기업부설연구소</option>
					<option value="없음">없음</option>
				</Select>
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">팀</InputLeftAddon>
				<Select id="team" className="!min-w-[150px]">
					<option value="개발1팀">개발1팀</option>
					<option value="개발2팀">개발2팀</option>
				</Select>
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">직책</InputLeftAddon>
				<Select id="position" className="!min-w-[150px]">
					<option value="CEO">CEO</option>
					<option value="사업부장">사업부장</option>
					<option value="본부장">본부장</option>
					<option value="연구소장">연구소장</option>
					<option value="실장">실장</option>
					<option value="팀장">팀장</option>
					<option value="파트장">파트장</option>
				</Select>
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">직급</InputLeftAddon>
				<Select id="rank" className="!min-w-[150px]">
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
				<InputLeftAddon className="!min-w-[180px]">과학기술인등록번호</InputLeftAddon>
				<Input id="sciTechCertify" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">근무지</InputLeftAddon>
				<Select id="place" className="!min-w-[150px]">
					<option value="SKT">SKT</option>
					<option value="본사">본사</option>
					<option value="안산">안산</option>
					<option value="윤선생">윤선생</option>
					<option value="미라콤">미라콤</option>
				</Select>
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">입사일</InputLeftAddon>
				<Input id="employmentDate" type="date" />
			</InputGroup>

			{/* profileDetail */}
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">이름</InputLeftAddon>
				<Input id="name" className="!min-w-[200px]" />
				<InputLeftAddon className="!min-w-[100px] ml-[20px]">영문이름</InputLeftAddon>
				<Input id="eName" className="!min-w-[200px]" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">전화번호</InputLeftAddon>
				<Input id="tel" type="tel" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">주소</InputLeftAddon>
				<Input id="address" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[120px]">주민등록번호</InputLeftAddon>
				<Input id="residentNumber" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">생일</InputLeftAddon>
				<Input id="birthday" type="date" />
			</InputGroup>
			<InputGroup className="mb-2">
				<InputLeftAddon className="!min-w-[100px]">가족관계</InputLeftAddon>
				<Input id="family" />
			</InputGroup>

			{/* profileArmy */}
			<Accordion allowMultiple className="!min-w-[1500px]">
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
							<Input id="armyBranch" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[100px] ml-[20px]">복무기간</InputLeftAddon>
							<Input id="armyStart" type="date" className="!min-w-[150px]" /> <b style={{ alignContent: 'center', margin: '0 10px' }}>~</b>{' '}
							<Input id="armyEnd" type="date" className="!min-w-[150px]" />
						</InputGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			{/* profileEducation */}
			<Accordion allowMultiple className="!min-w-[1500px]">
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
							<InputLeftAddon className="!min-w-[180px]">고등학교</InputLeftAddon>
							<Input id="highSchool" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">구분</InputLeftAddon>
							<Select id="h_type" className="!min-w-[120px]">
								<option value="졸업">졸업</option>
								<option value="중퇴">중퇴</option>
								<option value="졸업예정">졸업예정</option>
							</Select>
							<InputLeftAddon className="min-w-[180px] ml-[20px]">날짜</InputLeftAddon>
							<Input id="h_date" type="date" className="!min-w-[150px]" />
						</InputGroup>
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[180px]">대학교</InputLeftAddon>
							<Input id="collage" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">전공</InputLeftAddon>
							<Input id="c_major" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">구분</InputLeftAddon>
							<Select id="c_type" className="!min-w-[120px]">
								<option value="졸업">졸업</option>
								<option value="중퇴">중퇴</option>
								<option value="졸업예정">졸업예정</option>
							</Select>
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">날짜</InputLeftAddon>
							<Input id="c_date" type="date" className="!min-w-[150px]" />
						</InputGroup>
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[180px]">복수전공1</InputLeftAddon>
							<Input id="c_doubleMajor1" placeholder="있을 시 기재" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">복수전공2</InputLeftAddon>
							<Input id="c_doubleMajor2" placeholder="있을 시 기재" className="!min-w-[200px]" />
						</InputGroup>
						<InputGroup className="mb-2">
							<InputLeftAddon className="!min-w-[180px]">대학원</InputLeftAddon>
							<Input id="graduateSchool" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">전공</InputLeftAddon>
							<Input id="g_major" className="!min-w-[200px]" />
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">구분</InputLeftAddon>
							<Select id="g_type" className="!min-w-[120px]">
								<option value="졸업">졸업</option>
								<option value="중퇴">중퇴</option>
								<option value="졸업예정">졸업예정</option>
							</Select>
							<InputLeftAddon className="!min-w-[180px] ml-[20px]">날짜</InputLeftAddon>
							<Input id="g_date" type="date" className="!min-w-[150px]" />
						</InputGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
export default Basic;
