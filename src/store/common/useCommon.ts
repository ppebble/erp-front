import { taskColor } from '../../components/calendar/utils/event-utils';

export const TASK_LIST = {
	sc: { id: 'sc', name: 'SC사업부', color: taskColor.sc },
	sf: { id: 'sf', name: 'SF&신사업부', color: taskColor.sf },
	manage: { id: 'manage', name: '경영팀', color: taskColor.manage },
	dev: { id: 'dev', name: '기술개발본부', color: taskColor.dev },
	sb: { id: 'sb', name: '전략사업본부', color: taskColor.sb },
	personal: { id: 'personal', name: '개인일정', color: taskColor.personal },
} as const;

export type TASK_LIST_KEY = (typeof TASK_LIST)[keyof typeof TASK_LIST];

type ValuesOf<E> = E[keyof E];
