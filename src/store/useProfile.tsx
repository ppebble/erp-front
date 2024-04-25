import { create } from 'zustand';

interface ProfileProps {
	empNo: string;
	userId: string;
	userEmail: string;
	pw: string;
	task: string;
	team: string;
	position: string;
	rank: string;
	sciTechCertify: string;
	employmentDate: string;
	name: string;
	eName: string;
	tel: string;
	address: string;
	residentNumber: string;
	birthday: string;
	family: string;
	armyBranch: string;
	armyStart: string;
	armyEnd: string;
	highSchool: string;
	collage: string;
	doubleMajor: string;
	graduateSchool: string;
}

interface ProfileStore {
	// 기본정보
	profile: ProfileProps | undefined;
	setProfile: (state: any) => void;
	// 경력사항
	career: any[];
	setCareer: (state: any) => void;
	// 자격증
	license: any;
	setLicense: (state: any) => void;
	// 교육
	coursework: any;
	setCoursework: (state: any) => void;
	// 보유기술 및 외국어능력
	skill: any;
	setSkill: (state: any) => void;
}

const useProfile = create<ProfileStore>()((set) => ({
	profile: undefined,
	setProfile: (state) =>
		set(() => ({
			profile: state,
		})),
	career: [],
	setCareer: (state) =>
		set(() => ({
			career: state,
		})),
	license: [],
	setLicense: (state) =>
		set(() => ({
			license: state,
		})),
	coursework: [],
	setCoursework: (state) =>
		set(() => ({
			coursework: state,
		})),
	skill: [],
	setSkill: (state) =>
		set(() => ({
			skill: state,
		})),
}));

export default useProfile;
