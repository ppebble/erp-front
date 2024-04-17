export const taskList = {
	sc: { id: 'sc', name: 'SC사업부', color: '#1cb9e0' },
	sf: { id: 'sf', name: 'SF&신사업부', color: '#00e413' },
	manage: { id: 'manage', name: '경영팀', color: '#f52b4d' },
	dev: { id: 'dev', name: '기술개발본부', color: '#9842fa' },
	sb: { id: 'sb', name: '전략사업본부', color: '#e9baba' },
	personal: { id: 'personal', name: '개인일정', color: '#787f8f' },
} as const;

export type taskList = (typeof taskList)[keyof typeof taskList];

type ValuesOf<E> = E[keyof E];

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
