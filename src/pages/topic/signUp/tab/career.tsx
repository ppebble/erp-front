import { useEffect, useState } from 'react';
import { Accordion } from '@chakra-ui/react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Career = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setCareer } = useProfile();

	useEffect(() => {
		setCareer(value);
	}, [value]);

	return (
		<div>
			<Accordion defaultIndex={[0]}>
				<InputContainer
					props={{ id: count, companyName: '', jobClassification: '', employmentDate: '', resignationDate: '' }}
					count={count}
					setCount={setCount}
					setValue={setValue}
					type="career"
				/>
			</Accordion>
		</div>
	);
};

export default Career;
