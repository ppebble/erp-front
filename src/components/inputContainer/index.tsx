import { useEffect, useState } from 'react';
import InputComponent from './inputComponent';
import useProfile from '../../store/useProfile';

type InputProps = {
	props: any;
	count: number;
	setCount: (count: number) => void;
	detailCount?: number;
	setDetailCount?: (detailCount: number) => void;
	setValue: (state: any) => void;
	type: string;
};

const InputContainer = ({ props, count, setCount, detailCount, setDetailCount, setValue, type }: InputProps) => {
	const { career, license, coursework, skill, careerIndex, setCareer } = useProfile();
	const [state, setState] = useState<any>([props]);

	useEffect(() => {
		if (state) {
			setValue(state);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

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
			setState((detail: any) =>
				detail.map((item: any, index: number) =>
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
		if (type === 'project') {
			if (count < 9) {
				setCount(count + 1);
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
		setState((detail: any) =>
			detail.map((item: any, index: number) =>
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
		const data = {
			[e.target.id]: e.target.value,
		};
		setState(state.map((item: any, index: number) => (index === idx ? { ...item, ...data } : item)));
	};

	const onDetailChange = (e: any, idx: any) => {
		if (type === 'career') {
			const detailData = {
				[e.target.id]: e.target.value,
			};
			const change = state[careerIndex].careerDetail.map((item: any, index: number) => (index === idx ? { ...item, ...detailData } : item));
			setState((detail: any) =>
				detail.map((item: any, index: number) =>
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
			onDetailChange={onDetailChange}
			type={type}
		/>
	);
};

export default InputContainer;
