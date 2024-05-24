import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	profile,
	detail,
	dept,
	education,
	army,
	career,
	license,
	coursework,
	skill,
	highSchool,
	collage,
	graduateSchool,
} from '../network/response/profileParams';
import { profileList } from '../network/response/profileList';

interface ProfileStore {
	// 기본정보
	profile: profile;
	setProfile: (state: profile) => void;
	detail: detail;
	setDetail: (state: detail) => void;
	dept: dept;
	setDept: (state: dept) => void;
	education: education;
	setEducation: (state: education) => void;
	highSchool: string[];
	setHighSchool: (state: string[]) => void;
	collage: string[];
	setCollage: (state: string[]) => void;
	graduateSchool: string[];
	setGraduateSchool: (state: string[]) => void;
	army: army;
	setArmy: (state: army) => void;
	// 경력사항
	career: career[];
	setCareer: (state: career[]) => void;
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
	// 회원 목록
	profileList: profileList[];
	setProfileList: (state: profileList[]) => void;

	setClear: () => void;
}

const useProfile = create(
	persist<ProfileStore>(
		(set) => ({
			profile: { profileNo: 0, empNo: '', userId: '', userEmail: '', pw: '', rePw: '', authority: 0, isDel: false },
			setProfile: (select) => set((state) => ({ ...state, profile: select })),
			detail: { detailNo: 0, name: '', ename: '', tel: '', address: '', residentNumber: '', birthday: '', family: '' },
			setDetail: (select) => set((state) => ({ ...state, detail: select })),
			dept: { deptNo: 0, task: '', team: '', position: '', rank: '', sciTechCertify: '', place: '', employmentDate: '' },
			setDept: (select) => set((state) => ({ ...state, dept: select })),
			education: { pEduNo: 0, highSchool: '', collage: '', graduateSchool: '' },
			setEducation: (select) => set((state) => ({ ...state, education: select })),
			highSchool: [],
			setHighSchool: (select) => set((state) => ({ ...state, highSchool: select })),
			collage: {
				collage1: '',
				collage2: '',
				collage3: '',
				collage4: '',
			},
			setCollage: (select) => set((state) => ({ ...state, collage: select })),
			graduateSchool: {
				graduateSchool1: '',
				graduateSchool2: '',
				graduateSchool3: '',
				graduateSchool4: '',
			},
			setGraduateSchool: (select) => set((state) => ({ ...state, graduateSchool: select })),
			army: { armyNo: 0, armyStart: '', armyEnd: '', armyBranch: '' },
			setArmy: (select) => set((state) => ({ ...state, army: select })),
			career: [
				{ companyName: '', jobClassification: '', employmentDate: '', resignationDate: '', careerDetail: [{ projectName: '', task: '', term: '' }] },
			],
			setCareer: (select) => set((state) => ({ ...state, career: select })),
			careerIndex: 0,
			setCareerIndex: (select) => set((state) => ({ ...state, careerIndex: select })),
			license: [{ licenseName: '', licenseDate: '' }],
			setLicense: (select) => set((state) => ({ ...state, license: select })),
			coursework: [{ eduName: '', eduStartDate: '', eduEndDate: '', institution: '' }],
			setCoursework: (select) => set((state) => ({ ...state, coursework: select })),
			skill: [{ skillName: '', skillGrade: '', criteria: '' }],
			setSkill: (select) => set((state) => ({ ...state, skill: select })),
			profileList: [],
			setProfileList: (select) => set((state) => ({ ...state, profileList: select })),
			setClear: () =>
				set(() => ({
					basic: {
						profile: { profileNo: 0, empNo: '', userId: '', userEmail: '', pw: '', rePw: '', authority: 0, isDel: false },
						detail: { detailNo: 0, name: '', ename: '', tel: '', address: '', residentNumber: '', birthday: '', family: '' },
						dept: { deptNo: 0, task: '', team: '', position: '', rank: '', sciTechCertify: '', place: '', employmentDate: '' },
						education: { pEduNo: 0, highSchool: '', collage: '', graduateSchool: '' },
						army: { armyNo: 0, armyStart: '', armyEnd: '', armyBranch: '' },
					},
					career: [
						{
							companyName: '',
							jobClassification: '',
							employmentDate: '',
							resignationDate: '',
							careerDetail: [{ projectName: '', task: '', term: '' }],
						},
					],
					careerIndex: 0,
					license: [{ licenseName: '', licenseDate: '' }],
					coursework: [{ eduName: '', eduStartDate: '', eduEndDate: '', institution: '' }],
					skill: [{ skillName: '', skillGrade: '', criteria: '' }],
				})),
		}),
		{
			name: 'ProfileStorage',
		},
	),
);

export default useProfile;
