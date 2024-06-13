import { useEffect, useState } from 'react';
import { Accordion } from '@chakra-ui/react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Career = () => {
	const [count, setCount] = useState(0);
	const [detailCount, setDetailCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setCareer } = useProfile();

	useEffect(() => {
		setCareer(value);
	}, [setCareer, value]);

	return (
		<div>
			<Accordion defaultIndex={[0]}>
				<InputContainer
					props={{
						id: count,
						companyName: '',
						jobClassification: '',
						employmentDate: '',
						resignationDate: '',
						careerDetail: [{ id: count, skillName: '', skillGrade: '', criteria: '' }],
					}}
					count={count}
					setCount={setCount}
					detailCount={detailCount}
					setDetailCount={setDetailCount}
					setValue={setValue}
					type="career"
				/>
			</Accordion>
		</div>
	);
};

export default Career;
