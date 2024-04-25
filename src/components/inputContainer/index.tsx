import { useEffect, useState } from 'react';
import InputComponent from './inputComponent';

type InputProps = {
	props: any;
	count: number;
	setCount: (count: number) => void;
	setValue?: (state: any) => void;
	type: string;
	select?: number;
};

const InputContainer = ({ props, count, setCount, type, select, setValue }: InputProps) => {
	const [state, setState] = useState<any>([props]);

	useEffect(() => {
		if (count !== 0) {
			setState(state.concat(props));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	const AddInput = () => {
		setCount(count + 1);
	};

	const InputDelete = (idx: any) => {
		setState(state.filter((item: any, index: any) => index !== idx));
	};

	const onChange = (e: any, idx: any) => {
		const data = {
			[e.target.id]: e.target.value,
		};

		const changeState = state.map((item: any, index: number) => (index === idx ? { ...item, ...data } : item));

		if (setValue) {
			setValue(changeState);
		}
		setState(changeState);
	};

	return <InputComponent inputItems={state} addInput={AddInput} InputDelete={InputDelete} onChange={onChange} type={type} />;
};

export default InputContainer;
