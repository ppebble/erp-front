import { useEffect, useState } from 'react';
import InputComponent from './inputComponent';
import useProfile from '../../store/useProfile';

type InputProps = {
	props: any;
	count: number;
	setCount: (count: number) => void;
	setValue: (state: any) => void;
	type: string;
};

const InputContainer = ({ props, count, setCount, setValue, type }: InputProps) => {
	const { career, license, coursework, skill, careerDetail, setCareerDetail, careerIndex } = useProfile();
	const [state, setState] = useState<any>([props]);

	// useEffect(() => {
	// 	setValue(state);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state]);

	useEffect(() => {
		if (state) {
			setValue(state);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	useEffect(() => {
		switch (type) {
			case 'career':
				if (career?.length !== 0) {
					setState(career);
				}
				break;
			case 'careerDetail':
				if (careerDetail?.length !== 0) {
					setState(careerDetail[careerIndex]);
				}
				break;
			case 'license':
				if (license?.length !== 0) {
					setState(license);
				}
				break;
			case 'cursework':
				if (coursework?.length !== 0) {
					setState(coursework);
				}
				break;
			case 'skill':
				if (skill?.length !== 0) {
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
			if (type === 'career') {
				setCareerDetail({ ...careerDetail, [career.length]: { id: count, projectName: '', task: '', term: '' } });
			}
			setState(state.concat(props));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	const AddInput = () => {
		setCount(count + 1);
	};

	const InputDelete = (idx: any) => {
		// setValue(state.filter((item: any, index: any) => index !== idx));
		setState(state.filter((item: any, index: any) => index !== idx));
	};

	const onChange = (e: any, idx: any) => {
		const data = {
			[e.target.id]: e.target.value,
		};

		// setValue(state.map((item: any, index: number) => (index === idx ? { ...item, ...data } : item)));
		setState(state.map((item: any, index: number) => (index === idx ? { ...item, ...data } : item)));
	};

	return <InputComponent inputItems={state} addInput={AddInput} InputDelete={InputDelete} onChange={onChange} type={type} />;
};

export default InputContainer;
