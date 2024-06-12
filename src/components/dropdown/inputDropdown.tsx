import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

type DropDownProps = {
	readOnly: boolean;
	member: string;
	index: number;
	onChange: any;
	search: any;
};

const returnUser = (item: any) => {
	alert(item.name);
};

const InputDropDown = ({ readOnly, member, index, onChange, search }: DropDownProps) => {
	return (
		<div>
			<InputGroup className="mb-2">
				<InputLeftAddon style={{ display: 'none' }} />
				<Input
					id="member"
					className={`${readOnly && 'pointer-events-none'} !min-w-[200px]`}
					defaultValue={member || ''}
					onChange={(e) => onChange(e, index)}
				/>
			</InputGroup>
			{search &&
				search.length < 10 &&
				search.map((item: any) => {
					return (
						<li key={item.name} onClick={() => returnUser(item)}>
							{item.name}
						</li>
					);
				})}
		</div>
	);
};

export default InputDropDown;
