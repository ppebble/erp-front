import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { profileVO } from './baseParams/baseParams';

interface ProfileStore {
	// 기본정보
	profile: profileVO | undefined;
	setProfile: (state: any) => void;
	// 경력사항
	career: any[];
	setCareer: (state: any) => void;
	careerDetail: any[];
	setCareerDetail: (state: any) => void;
	careerIndex: number;
	setCareerIndex: (state: number) => void;
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

// const useProfile = create<ProfileStore>()((set) => ({
// 	profile: undefined,
// 	setProfile: (state) =>
// 		set(() => ({
// 			profile: state,
// 		})),
// 	career: [],
// 	setCareer: (state) =>
// 		set(() => ({
// 			career: state,
// 		})),
// 	careerDetail: [],
// 	setCareerDetail: (state) =>
// 		set(() => ({
// 			careerDetail: state,
// 		})),
// 	careerIndex: 0,
// 	setCareerIndex: (state) =>
// 		set(() => ({
// 			careerIndex: state,
// 		})),
// 	license: [],
// 	setLicense: (state) =>
// 		set(() => ({
// 			license: state,
// 		})),
// 	coursework: [],
// 	setCoursework: (state) =>
// 		set(() => ({
// 			coursework: state,
// 		})),
// 	skill: [],
// 	setSkill: (state) =>
// 		set(() => ({
// 			skill: state,
// 		})),
// }));

const useProfile = create(
	persist<ProfileStore>(
		(set) => ({
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
			careerDetail: [],
			setCareerDetail: (state) =>
				set(() => ({
					careerDetail: state,
				})),
			careerIndex: 0,
			setCareerIndex: (state) =>
				set(() => ({
					careerIndex: state,
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
		}),
		{
			name: 'SideBarStorage',
		},
	),
);

export default useProfile;
