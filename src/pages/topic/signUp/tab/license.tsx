import { useRef, createElement } from 'react';
import { Button } from '@chakra-ui/react';

const License = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const addLicense = () => {
		const element: any = '<input />';
		divRef.current?.appendChild(element);
	};

	return (
		<div>
			<div ref={divRef} />
			<Button onClick={() => addLicense()}>추가</Button>
		</div>
	);
};

export default License;
