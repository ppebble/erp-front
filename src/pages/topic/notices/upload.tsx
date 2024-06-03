import { useEffect, useState } from 'react';
import InputContainer from '../../../components/inputContainer';
import { testParam } from '../../../network/commonResult';
import { TestUploadService } from '../../../services/testUploadService';

const Upload = () => {
	const [fileCount, setFileCount] = useState(0);
	const [fileValue, setFileValue] = useState<any>();
	const service = TestUploadService().fileUpload;

	const upload = () => {
		const test: testParam = { name: '테스트', age: '11' };
		const formData = new FormData();

		console.log(fileValue);
		fileValue.forEach((v: any) => {
			console.log(v);
			formData.append('uploadFiles', v[0]);
		});
		formData.append('data', JSON.stringify(test));
		// // eslint-disable-next-line no-restricted-syntax
		// for (const key of formData.keys()) {
		// 	console.log(key);
		// }
		//
		// // eslint-disable-next-line no-restricted-syntax
		// for (const value of formData.values()) {
		// 	console.log(value);
		// }

		service.mutate(formData);
	};
	return (
		<div>
			<button onClick={upload}>업로드</button>
			<InputContainer props={{ id: fileCount, file: '' }} count={fileCount} setCount={setFileCount} setValue={setFileValue} type="attachment" />
		</div>
	);
};

export default Upload;
