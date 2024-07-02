import { useState } from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import useProfile from '../../store/useProfile';

type InputProps = {
	id: string;
	className?: string;
	onChange: any;
	defaultValue: string | number;
	index?: any;
};

// 이름을 입력받아 profileNo 반환
const ProfileNumberInput = ({ id, className, onChange, defaultValue, index }: InputProps) => {
	const { profileList } = useProfile();
	const [filter, setFilter] = useState<any>();

	const change = (e: any) => {
		setFilter(profileList.filter((item) => item.name.includes(e.target.value)));
		if (filter?.length === 1) {
			if (index === undefined) {
				onChange({ target: { id, value: filter[0].profileNo } });
			} else {
				onChange({ target: { id, value: filter[0].profileNo } }, index);
			}
		}
	};

	const isError = filter?.length === 0;

	return (
		<FormControl isInvalid={isError}>
			<Input id={id} className={className} onChange={(e) => change(e)} defaultValue={defaultValue} placeholder="이름만 입력하세요." />
			{!isError ? <FormHelperText /> : <FormErrorMessage>해당 사용자가 없습니다.</FormErrorMessage>}
		</FormControl>
	);
};

export default ProfileNumberInput;
