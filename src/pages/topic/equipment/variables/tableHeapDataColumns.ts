type EquipRow = {
	inUseEmp: string;
	equipModel: string;
	state: string;
	date: string;
};
type ScheduleRow = {
	date: string;
	title: string | number;
	members?: string;
};
type AttendanceRow = {
	type: string;
	enterDate: string;
	leaveDate: string;
	day: string;
};
type DailyScheduleProps = {
	task: string;
	date: string;
	title: string;
	isAllDay: boolean;
};
type AnnualRow = {
	name: string;
	enterDate: string;
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

export const tableNotebookData: EquipRow[] = [
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Notebook UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Notebook UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
];
export const tableAnnualRow: AnnualRow[] = [
	{
		name: '연차',
		enterDate: '01-01 ~ 12-31',
		restAnn: 14,
		january: 0,
		febuary: 0,
		march: 0,
		april: 0,
		may: 0,
		june: 0,
		july: 0,
		august: 0,
		september: 0,
		october: 0,
		november: 0,
		december: 0,
	},
];
export const tableAttendanceData: AttendanceRow[] = [
	{
		type: '원격',
		day: '2024-04-17',
		enterDate: '10:00',
		leaveDate: '19:00',
	},
	{
		type: '지문',
		day: '2024-04-18',
		enterDate: '10:00',
		leaveDate: '19:00',
	},
];
export const tableScheduleData: DailyScheduleProps[] = [
	{
		isAllDay: false,
		date: '10:00 - 19:00',
		task: 'dev',
		title: '업무업무',
	},
	{
		isAllDay: true,
		date: '종일',
		task: 'personal',
		title: '연차연차',
	},
];
export const tableSchPersonalData: ScheduleRow[] = [
	{
		date: '종일',
		title: '연차연차',
	},
	{
		date: '10:00 - 19:00',
		title: '업무업무',
	},
	{
		date: '10:00 - 19:00',
		title: '업무업무',
	},
];
export const tableSchTaskData: ScheduleRow[] = [
	{
		date: '10:00 - 19:00',
		members: '이석민 외 1인',
		title: '업무업무',
	},
];

export const tableDesktopData: EquipRow[] = [
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Desktop1',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Desktop1 UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
];
export const tableMonitorData: EquipRow[] = [
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Monitor UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Monitor UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
];
export const tableServerData: EquipRow[] = [
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'server UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'server UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
];
export const tableMobileData: EquipRow[] = [
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Mob UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Mob UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
];
export const tableEtcData: EquipRow[] = [
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
	{
		inUseEmp: 'Etc UI PRO',
		state: '2458',
		equipModel: '17.5%',
		date: '12 Jan 2021',
	},
	{
		inUseEmp: 'Etc UI Free',
		state: '1485',
		equipModel: '10.8%',
		date: '21 Feb 2021',
	},
];
