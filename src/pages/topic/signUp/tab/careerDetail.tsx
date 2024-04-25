import { useState } from 'react';
import { AccordionPanel } from '@chakra-ui/react';
import InputContainer from '../../../../components/inputContainer';

const Career = () => {
	const [count, setCount] = useState(0);

	return (
		<AccordionPanel id="panel">
			<InputContainer props={{ id: count, projectName: '', task: '', term: '' }} count={count} setCount={setCount} type="careerDetail" />
		</AccordionPanel>
	);
};

export default Career;
