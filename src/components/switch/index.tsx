const Switch = (props: {
	extra?: string;
	color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'teal' | 'navy' | 'lime' | 'cyan' | 'pink' | 'purple' | 'amber' | 'indigo' | 'gray';
	[x: string]: any;
}) => {
	const { extra, color, ...rest } = props;
	const switchColor = (item: string | undefined) => {
		switch (item) {
			case 'red':
				'checked:bg-red-500 dark:checked:bg-red-400';
				break;
			case 'blue':
				'checked:bg-blue-500 dark:checked:bg-blue-400';
				break;
			case 'green':
				'checked:bg-green-500 dark:checked:bg-green-400';
				break;
			case 'yellow':
				'checked:bg-yellow-500 dark:checked:bg-yellow-400';
				break;
			case 'orange':
				'checked:bg-orange-500 dark:checked:bg-orange-400';
				break;
			case 'teal':
				'checked:bg-teal-500 dark:checked:bg-teal-400';
				break;
			case 'navy':
				'checked:bg-navy-500 dark:checked:bg-navy-400';
				break;
			case 'lime':
				'checked:bg-lime-500 dark:checked:bg-lime-400';
				break;
			case 'cyan':
				'checked:bg-cyan-500 dark:checked:bg-cyan-400';
				break;
			case 'pink':
				'checked:bg-pink-500 dark:checked:bg-pink-400';
				break;
			case 'purple':
				'checked:bg-purple-500 dark:checked:bg-purple-400';
				break;
			case 'amber':
				'checked:bg-amber-500 dark:checked:bg-amber-400';
				break;
			case 'indigo':
				'checked:bg-indigo-500 dark:checked:bg-indigo-400';
				break;
			case 'gray':
				'checked:bg-gray-500 dark:checked:bg-gray-400';
				break;

			default:
				'checked:bg-brand-500 dark:checked:bg-brand-400';
				break;
		}
	};
	return (
		<input
			type="checkbox"
			className={`relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
      before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
      before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
      checked:before:translate-x-[22px] hover:cursor-pointer
      dark:bg-white/5 checked:bg-brand-500 dark:checked:bg-brand-400 ${extra}`}
			name="weekly"
			{...rest}
		/>
	);
};

export default Switch;
