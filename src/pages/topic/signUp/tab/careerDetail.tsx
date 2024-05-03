import { useEffect, useState } from 'react';
import { AccordionPanel } from '@chakra-ui/react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Career = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { careerDetail, setCareerDetail, careerIndex, setCareerIndex } = useProfile();

	useEffect(() => {
		if (value !== undefined) {
			setCareerDetail({ ...careerDetail, [careerIndex]: value });
		}
	}, [value]);

	// useEffect(() => {
	// 	console.log(careerDetail);
	// }, [careerDetail]);

	return (
		<AccordionPanel id="panel">
			<InputContainer
				props={{ id: count, projectName: '', task: '', term: '' }}
				count={count}
				setCount={setCount}
				setValue={setValue}
				type="careerDetail"
			/>
		</AccordionPanel>
	);
};

export default Career;
