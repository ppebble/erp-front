import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const CareerDetail = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { career, careerIndex } = useProfile();

	useEffect(() => {
		if (value !== undefined) {
			if (career && career[careerIndex]) {
				career[careerIndex].careerDetail = value;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<InputContainer
			props={{ id: count, projectName: '', task: '', term: '' }}
			count={count}
			setCount={setCount}
			setValue={setValue}
			type="careerDetail"
		/>
	);
};

export default CareerDetail;
