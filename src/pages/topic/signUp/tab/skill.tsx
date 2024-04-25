import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const Skill = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setSkill } = useProfile();

	useEffect(() => {
		setSkill(value);
	}, [value]);

	return (
		<InputContainer
			props={{ id: count, skilName: '', skillGrade: '', criteria: '' }}
			count={count}
			setCount={setCount}
			setValue={setValue}
			type="skill"
		/>
	);
};

export default Skill;
