export const TASK_LIST = {
	sc: { id: 'sc', name: 'SC사업부', color: '#1cb9e0' },
	sf: { id: 'sf', name: 'SF&신사업부', color: '#00e413' },
	manage: { id: 'manage', name: '경영팀', color: '#f52b4d' },
	dev: { id: 'dev', name: '기술개발본부', color: '#9842fa' },
	sb: { id: 'sb', name: '전략사업본부', color: '#e9baba' },
	personal: { id: 'personal', name: '개인일정', color: '#787f8f' },
} as const;

export type TASK_LIST = (typeof TASK_LIST)[keyof typeof TASK_LIST];

type ValuesOf<E> = E[keyof E];
