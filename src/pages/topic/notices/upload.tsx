import { useEffect, useState } from 'react';
import InputContainer from '../../../components/inputContainer';

const Upload = () => {
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();

	useEffect(() => {
		console.log(fileValue);
	}, [fileValue]);

	return (
		<div>
			<InputContainer props={{ id: fileCount, file: '' }} count={fileCount} setCount={setFileCount} setValue={setFileValue} type="attachment" />
		</div>
	);
};

export default Upload;
