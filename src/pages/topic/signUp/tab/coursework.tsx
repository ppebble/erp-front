import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Coursework = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setCoursework } = useProfile();

	useEffect(() => {
		setCoursework(value);
	}, [setCoursework, value]);

	return (
		<InputContainer
			props={{ id: count, eduName: '', eduStartDate: '', eduEndDate: '', institution: '' }}
			count={count}
			setCount={setCount}
			setValue={setValue}
			type="cursework"
		/>
	);
};

export default Coursework;
