import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const License = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setLicense } = useProfile();

	useEffect(() => {
		setLicense(value);
	}, [setLicense, value]);

	return (
		<InputContainer props={{ id: count, licenseName: '', licenseDate: '' }} count={count} setCount={setCount} setValue={setValue} type="license" />
	);
};

export default License;
