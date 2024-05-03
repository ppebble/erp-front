import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { profileDto, career, careerDetail, license, coursework, skill } from './baseParams/baseParams';

interface ProfileStore {
	// 기본정보
	basic: profileDto;
	setBasic: (state: profileDto) => void;
	// 경력사항
	career: career[];
	setCareer: (state: career[]) => void;
	careerDetail: careerDetail[];
	setCareerDetail: (state: careerDetail[]) => void;
	careerIndex: number;
	setCareerIndex: (state: number) => void;
	// 자격증
	license: license[];
	setLicense: (state: license[]) => void;
	// 교육
	coursework: coursework[];
	setCoursework: (state: coursework[]) => void;
	// 보유기술 및 외국어능력
	skill: skill[];
	setSkill: (state: skill[]) => void;
	setClear: () => void;
}

const useProfile = create(
	persist<ProfileStore>(
		(set) => ({
			basic: {
				profileNo: 0,
				empNo: '',
				userId: '',
				userEmail: '',
				pw: '',
				authority: 0,
				isDel: false,
				detailNo: 0,
				name: '',
				ename: '',
				tel: '',
				address: '',
				residentNumber: '',
				birthday: '',
				family: '',
				deptNo: 0,
				task: '',
				team: '',
				position: '',
				rank: '',
				sciTechCertify: '',
				place: '',
				employmentDate: '',
				pEduNo: 0,
				highSchool: '',
				collage: '',
				graduateSchool: '',
				armyNo: 0,
				armyStart: '',
				armyEnd: '',
				armyBranch: '',
			},
			setBasic: (select) => set((state) => ({ ...state, basic: select })),
			career: [{ companyName: '', jobClassification: '', employmentDate: '', resignationDate: '' }],
			setCareer: (select) => set((state) => ({ ...state, career: select })),
			careerDetail: [{ projectName: '', projectTask: '', projectTerm: '' }],
			setCareerDetail: (select) => set((state) => ({ ...state, careerDetail: select })),
			careerIndex: 0,
			setCareerIndex: (select) => set((state) => ({ ...state, careerIndex: select })),
			license: [{ licenseName: '', licenseDate: '' }],
			setLicense: (select) => set((state) => ({ ...state, license: select })),
			coursework: [{ eduName: '', eduStartDate: '', eduEndDate: '', institutation: '' }],
			setCoursework: (select) => set((state) => ({ ...state, coursework: select })),
			skill: [{ skilName: '', skillGrade: '', criteria: '' }],
			setSkill: (select) => set((state) => ({ ...state, skill: select })),
			setClear: () =>
				set(() => ({
					basic: {
						profileNo: 0,
						empNo: '',
						userId: '',
						userEmail: '',
						pw: '',
						authority: 0,
						isDel: false,
						detailNo: 0,
						name: '',
						ename: '',
						tel: '',
						address: '',
						residentNumber: '',
						birthday: '',
						family: '',
						deptNo: 0,
						task: '',
						team: '',
						position: '',
						rank: '',
						sciTechCertify: '',
						place: '',
						employmentDate: '',
						pEduNo: 0,
						highSchool: '',
						collage: '',
						graduateSchool: '',
						armyNo: 0,
						armyStart: '',
						armyEnd: '',
						armyBranch: '',
					},
					career: undefined,
					careerDetail: undefined,
					careerIndex: 0,
					license: undefined,
					coursework: undefined,
					skill: undefined,
				})),
		}),
		{
			name: 'SideBarStorage',
		},
	),
);

export default useProfile;
