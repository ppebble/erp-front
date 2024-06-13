import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import useProfile from '../../store/useProfile';

type InputProps = {
	id: string;
	className?: string;
	onChange: any;
	defaultValue: string | number;
};

// 이름을 입력받아 profileNo 반환
const ProfileNumberInput = ({ id, className, onChange, defaultValue }: InputProps) => {
	const { profileList } = useProfile();

	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filter = profileList.filter((item) => item.name.includes(e.target.value));
		if (filter.length === 1) {
			const test = { target: { id, value: filter[0].profileNo } };
			onChange(test);
		}
	};

	return <Input id={id} className={className} onChange={(e) => change(e)} defaultValue={defaultValue} placeholder="이름만 입력하세요." />;
};

export default ProfileNumberInput;
