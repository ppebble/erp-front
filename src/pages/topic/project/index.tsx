import { useState } from 'react';
import Card from '../../../components/card';
import InputContainer from '../../../components/inputContainer';

const Project = () => {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState<any>();

	return (
		<div className="mt-5 grid h-full">
			<Card extra="w-full pb-10 p-4 h-[80vh]">
				<header className="relative flex items-center justify-between">
					<div className="text-xl font-bold text-navy-700 dark:text-white">프로젝트</div>
				</header>

				<div className="mt-8 overflow-x-scroll xl:overflow-x-hidden h-full">
					<InputContainer props={{ id: count, projectName: '' }} count={count} setCount={setCount} setValue={setValue} type="project" />
				</div>
			</Card>
		</div>
	);
};

export default Project;
