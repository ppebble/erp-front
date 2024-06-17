export const taskList = {
	sc: { id: 'sc', name: 'SC사업부', color: '#1cb9e0' },
	sf: { id: 'sf', name: 'SF&신사업부', color: '#00e413' },
	manage: { id: 'manage', name: '경영팀', color: '#f52b4d' },
	dev: { id: 'dev', name: '기술개발본부', color: '#9842fa' },
	sb: { id: 'sb', name: '전략사업본부', color: '#e9baba' },
	personal: { id: 'personal', name: '개인일정', color: '#787f8f' },
} as const;

export type MemberTagProps = {
	name: string;
	task: {
		id: string;
		name: string;
	};
	value?: string;
	profileNo: number;
};
export type AnnualResultProps = {
	validDate: string;
	totalAnnualDay: number;
	restAnnualDay: number;
	restAnn: number;
	january: number;
	febuary: number;
	march: number;
	april: number;
	may: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
};
export type MemberTagInfo = {
	name: string;
	team: string;
};
export type dailyEventProps = {
	schduleNo: number;
	title: string;
	allDay: boolean;
	date: string;
	members?: string;
};
export type taskList = (typeof taskList)[keyof typeof taskList];

type ValuesOf<E> = E[keyof E];

export enum ModalList {
	PROJECT_PARTER_ADD = 0, // 프로젝트 - 파트너 추가
	BOARD_VIEW_DETAIL = 1, // 게시판 글 상세보기
	BOARD_WRITE = 2, // 게시판 글쓰기
	ALERT_ALARM = 3, // 알림
	ALERT_CONFIRM = 4, // 수정/삭제
	ANNUAL_ADD = 5, // 연차 신청
	EQUIP_ADD = 6, // 장비 등록/조회
	BOOK_ADD = 7, // 도서 등록/조회
}
export const enum AnnualType {
	반차 = 0,
	연차 = 1,
}
export const enum SignType {
	self = 0,
	director = 2,
	CEO = 3,
	reject = 4,
	cancel = 5,
}
export enum RamType {
	DDR3 = 'DDR3',
	DDR4 = 'DDR4',
	DDR5 = 'DDR5',
}
export enum DDR3Hz {
	Hz800 = '800',
	Hz1066 = '1066',
	Hz1333 = '1333',
	Hz1600 = '1600',
	Hz1866 = '1866',
	Hz2133 = '2133',
}
export enum DDR4Hz {
	Hz1600 = '1600',
	Hz1866 = '1866',
	Hz2133 = '2133',
	Hz2400 = '2400',
	Hz2666 = '2666',
	Hz2933 = '2933',
	Hz3200 = '3200',
}
export enum DDR5Hz {
	Hz4800 = '4800',
	Hz5333 = '5333',
	Hz5866 = '5866',
	Hz6400 = '6400',
}
export enum EquipType {
	notebook = '노트북',
	desktop = '데스크탑',
	monitor = '모니터',
	server = '서버',
	mobile = '모바일',
	etc = '기타장비',
}
export enum BookStatus {
	비치중 = '비치중',
	폐기 = '폐기',
}
export enum EquipStatus {
	비치중 = '사용중',
	유휴 = '유휴',
	불량 = '불량',
	폐기 = '폐기',
}
export enum AnnualProps {
	연차 = '연차',
	오전반차 = '오전반차',
	오후반차 = '오후반차',
	경조 = '경조',
	결근 = '결근',
	하기휴가 = '하기휴가',
}
export enum OsProps {
	LINUX = 'LINUX',
	Window = 'Window',
	Android = 'Android',
	IOS = 'iOS',
}
export enum ProjectStepProps {
	요구사항분석 = '요구사항분석',
	설계 = '설계',
	개발 = '개발',
	단위테스트 = '단위테스트',
	통합테스트 = '통합테스트',
	인수 = '인수',
}
export enum ProjectStatus { // 개발진행, 운영진행 띄어쓰기 구분
	개발진행 = '개발 진행',
	운영진행 = '운영 진행',
	완료 = '완료',
	유예 = '유예',
	연구과제 = '연구과제',
}
export const taskColor = {
	sc: '#1cb9e0',
	sf: '#00e413',
	manage: '#f52b4d',
	dev: '#9842fa',
	personal: '#787f8f',
	sb: '#e9baba',
	myPersonal: '#aaafbb',
} as const;
export enum RankProps {
	주임 = '주임',
	대리 = '대리',
	과장 = '과장',
	차장 = '차장',
	부장 = '부장',
	이사 = '이사',
	상무 = '상무',
	대표 = '대표',
	회장 = '회장',
}
export enum PositionProps {
	CEO = 'CEO',
	사업부장 = '사업부장',
	본부장 = '본부장',
	연구소장 = '연구소장',
	실장 = '실장',
	팀장 = '팀장',
	파트장 = '파트장',
}
export enum WorkPlaceProps {
	본사 = '본사',
	SKT = 'SKT',
	안산 = '안산',
	윤선생 = '윤선생',
	미라콤 = '미라콤',
}
export const taskLists = [
	{ id: 'sc', name: 'SC사업부', color: taskColor.sc },
	{ id: 'sf', name: 'SF&신사업부', color: taskColor.sf },
	{ id: 'manage', name: '경영팀', color: taskColor.manage },
	{ id: 'dev', name: '기술개발본부', color: taskColor.dev },
	{ id: 'sb', name: '전략사업본부', color: taskColor.sb },
	{ id: 'personal', name: '개인일정', color: taskColor.personal },
] as const;

// 쓸지 알 수 없음
export const errorCode = {
	7000: { code: '7000', message: 'SUCCESS' },
	B001: { code: 'B001', message: 'Bad Request Exception.' },
	B002: { code: 'B002', message: 'Invalid Type Value.' },
	B003: { code: 'B003', message: 'Invalid Value.' },
	B004: { code: 'B004', message: 'No value entered.' },
	B005: { code: 'B005', message: 'Invalid I/O Value' },
	B006: { code: 'B006', message: 'Unauthorized Access.' },
	B007: { code: 'B007', message: 'Forbidden Exception.' },
	B008: { code: 'B008', message: 'Resource Not Found.' },
	B009: { code: 'B009', message: 'Null Point Exception.' },
	B010: { code: 'B010', message: 'There are duplicate values.' },
	B011: { code: 'B011', message: 'Internal Server Error Exception.' },
	B012: { code: 'B012', message: 'Already token value exist.' },
	B013: { code: 'B013', message: 'uploadFile is Null.' },
	B014: { code: 'B014', message: 'One of the upload files is null.' },
	B999: { code: 'B999', message: 'Business Exception Error.' },
	B101: { code: 'B101', message: 'Insert Transaction Error Exception.' },
	B102: { code: 'B102', message: 'Update Transaction Error Exception.' },
	B103: { code: 'B103', message: 'Delete Transaction Error Exception.' },
	B201: { code: 'B201', message: 'Invalid JWT Token.' },
	B202: { code: 'B202', message: 'Expired JWT Token.' },
	B203: { code: 'B203', message: 'Expired JWT Refresh Token.' },
	B204: { code: 'B204', message: 'Unsupported JWT Token.' },
	B205: { code: 'B205', message: 'JWT claims string is empty.' },
	B206: { code: 'B206', message: 'Token with no permissions information.' },
	B207: { code: 'B207', message: 'Invalid token request.' },
	B300: { code: 'B300', message: '아이디나 비밀번호가 잘못 입력되었습니다.' },
};

export const getErrorCode = (code: string) => {
	switch (code) {
		case '7000': {
			return errorCode['7000'];
		}
		case 'B001':
			return errorCode.B001;
		case 'B002':
			return errorCode.B002;
		case 'B003':
			return errorCode.B003;
		case 'B004':
			return errorCode.B004;
		case 'B005':
			return errorCode.B005;
		case 'B006':
			return errorCode.B006;
		case 'B007':
			return errorCode.B007;
		case 'B008':
			return errorCode.B008;
		case 'B009':
			return errorCode.B009;
		case 'B010':
			return errorCode.B010;
		case 'B011':
			return errorCode.B011;
		case 'B012':
			return errorCode.B012;
		case 'B013':
			return errorCode.B013;
		case 'B014':
			return errorCode.B014;
		case 'B999':
			return errorCode.B999;
		case 'B101':
			return errorCode.B101;
		case 'B102':
			return errorCode.B102;
		case 'B103':
			return errorCode.B103;
		case 'B201':
			return errorCode.B201;
		case 'B202':
			return errorCode.B202;
		case 'B203':
			return errorCode.B203;
		case 'B204':
			return errorCode.B204;
		case 'B205':
			return errorCode.B205;
		case 'B206':
			return errorCode.B206;
		case 'B207':
			return errorCode.B207;
		case 'B300':
			return errorCode.B300;
		default:
			return undefined;
	}
};
