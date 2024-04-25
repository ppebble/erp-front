import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Coursework = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setCoursework } = useProfile();

	useEffect(() => {
		setCoursework(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<InputContainer
			props={{ id: count, eduName: '', eduStartDate: '', eduEndDate: '', institutation: '' }}
			count={count}
			setCount={setCount}
			setValue={setValue}
			type="cursework"
		/>
	);
};

export default Coursework;
