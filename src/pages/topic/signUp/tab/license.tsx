import { useEffect, useState } from 'react';
import InputContainer from '../../../../components/inputContainer';
import useProfile from '../../../../store/useProfile';

const License = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();
	const { setLicense } = useProfile();

	useEffect(() => {
		setLicense(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<InputContainer props={{ id: count, licenseName: '', licenseDate: '' }} count={count} setCount={setCount} setValue={setValue} type="license" />
	);
};

export default License;
