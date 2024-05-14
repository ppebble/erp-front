import { useEffect, useState } from 'react';
import { AccordionPanel } from '@chakra-ui/react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const CareerDetail = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { careerDetail, setCareerDetail, careerIndex } = useProfile();

	useEffect(() => {
		if (value !== undefined) {
			setCareerDetail({ ...careerDetail, [careerIndex]: value });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

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

export default CareerDetail;
