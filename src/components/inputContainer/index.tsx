import { useEffect, useState } from 'react';
import InputComponent from './inputComponent';
import useProfile from '../../store/useProfile';
import useProject from '../../store/useProject';
import useModal from '../../store/useModal';
import useBoard from '../../store/useBoard';

type InputProps = {
	props?: any;
	count: number;
	setCount: (count: number) => void;
	detailCount?: number;
	setDetailCount?: (detailCount: number) => void;
	setValue: (state: any) => void;
	type: string;
	style?: string;
	setIndex?: (idx: number) => void;
	readOnly?: boolean;
};

const InputContainer = ({ props, count, setCount, detailCount, setDetailCount, setValue, type, style, setIndex, readOnly }: InputProps) => {
	const { career, license, coursework, skill, careerIndex, setCareer } = useProfile();
	const { projectMember, projectOutput } = useProject();
	const { detail } = useBoard();
	const [state, setState] = useState<any>([props]);
	const { openModal } = useModal();
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		if (state) {
			setValue(state);
		}
	}, [setValue, state]);

	useEffect(() => {
		switch (type) {
			case 'career':
				if (career && career.length !== 0) {
					setState(career);
				}
				break;
			case 'license':
				if (license && license.length !== 0) {
					setState(license);
				}
				break;
			case 'cursework':
				if (coursework && coursework.length !== 0) {
					setState(coursework);
				}
				break;
			case 'skill':
				if (skill && skill.length !== 0) {
					setState(skill);
				}
				break;
			case 'member':
				if (projectMember && projectMember.length !== 0) {
					setState(projectMember);
				}
				break;
			// case 'attachment':
			// 	if (projectOutput && projectOutput.length !== 0) {
			// 		setState(projectOutput);
			// 	}
			// 	break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	useEffect(() => {
		if (count !== 0) {
			setState(state.concat(props));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	useEffect(() => {
		if (detailCount) {
			const newDetail = state[careerIndex]?.careerDetail.concat({
				id: detailCount,
				projectName: '',
				task: '',
				term: '',
			});
			setState((detailList: any) =>
				detailList.map((item: any, index: number) =>
					index === careerIndex
						? {
								...item,
								careerDetail: newDetail,
							}
						: item,
				),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailCount]);

	const AddInput = () => {
		// todo : 첨부파일 최대 10개로 제한
		if (type === 'attachment') {
			let fileCount = 0;
			if (style === 'board') {
				fileCount = detail.uploadFiles.length;
			} else {
				fileCount = projectOutput.length;
			}
			if (state.length + fileCount < 10) {
				setCount(count + 1);
			} else {
				setDisable(true);
			}
		} else {
			setCount(count + 1);
		}
	};

	const AddDetail = () => {
		if (detailCount !== undefined && setDetailCount !== undefined) {
			setDetailCount(detailCount + 1);
		}
	};

	const InputDelete = (idx: any) => {
		setState(state.filter((item: any, index: any) => index !== idx));
	};

	const DetailDelete = (idx: number) => {
		const removeDetail = state[careerIndex].careerDetail.filter((item: any, index: any) => index !== idx);
		setState((detailList: any) =>
			detailList.map((item: any, index: number) =>
				index === careerIndex
					? {
							...item,
							careerDetail: removeDetail,
						}
					: item,
			),
		);
	};

	const onChange = (e: any, idx: any) => {
		if (setIndex) {
			setIndex(idx);
		}

		const data = {
			[e.target.id]: e.target.value,
		};

		setState(state.map((item: any, index: number) => (index === idx ? { ...item, ...data } : item)));
	};

	const onFileChange = (e: any, idx: number) => {
		setState(state.map((item: any, index: number) => (index === idx ? { ...item, ...e } : item)));
	};

	const onDetailChange = (e: any, idx: any) => {
		if (type === 'career') {
			const detailData = {
				[e.target.id]: e.target.value,
			};
			const change = state[careerIndex].careerDetail.map((item: any, index: number) => (index === idx ? { ...item, ...detailData } : item));
			setState((detailList: any) =>
				detailList.map((item: any, index: number) =>
					index === careerIndex
						? {
								...item,
								careerDetail: change,
							}
						: item,
				),
			);
		}
	};

	return (
		<InputComponent
			inputItems={state}
			addInput={AddInput}
			addDetail={AddDetail}
			InputDelete={InputDelete}
			detailDelete={DetailDelete}
			onChange={onChange}
			onFileChange={onFileChange}
			onDetailChange={onDetailChange}
			type={type}
			style={style}
			disable={disable}
			readOnly={readOnly}
		/>
	);
};

export default InputContainer;
