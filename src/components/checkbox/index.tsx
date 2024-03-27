import { useEffect } from 'react';

const Checkbox = (props: {
	extra?: string;
	color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'teal' | 'navy' | 'lime' | 'cyan' | 'pink' | 'purple' | 'amber' | 'indigo' | 'gray';
	[x: string]: any;
}) => {
	const { extra, color, ...rest } = props;
	// useEffect(() => {}, [color]);
	// const switchColor = (item: string | undefined) => {
	// 	switch (item) {
	// 		case 'red':
	// 			'checked:border-none checked:bg-red-500 dark:checked:bg-red-400';
	// 			break;
	// 		case 'blue':
	// 			'checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400';
	// 			break;
	// 		case 'green':
	// 			'checked:border-none checked:bg-green-500 dark:checked:bg-green-400';
	// 			break;
	// 		case 'yellow':
	// 			'checked:border-none checked:bg-yellow-500 dark:checked:bg-yellow-400';
	// 			break;
	// 		case 'orange':
	// 			'checked:border-none checked:bg-orange-500 dark:checked:bg-orange-400';
	// 			break;
	// 		case 'teal':
	// 			'checked:border-none checked:bg-teal-500 dark:checked:bg-teal-400';
	// 			break;
	// 		case 'navy':
	// 			'checked:border-none checked:bg-navy-500 dark:checked:bg-navy-400';
	// 			break;
	// 		case 'lime':
	// 			'checked:border-none checked:bg-lime-500 dark:checked:bg-lime-400';
	// 			break;
	// 		case 'cyan':
	// 			'checked:border-none checked:bg-cyan-500 dark:checked:bg-cyan-400';
	// 			break;
	// 		case 'pink':
	// 			'checked:border-none checked:bg-pink-500 dark:checked:bg-pink-400';
	// 			break;
	// 		case 'purple':
	// 			'checked:border-none checked:bg-purple-500 dark:checked:bg-purple-400';
	// 			break;
	// 		case 'amber':
	// 			'checked:border-none checked:bg-amber-500 dark:checked:bg-amber-400';
	// 			break;
	// 		case 'indigo':
	// 			'checked:border-none checked:bg-indigo-500 dark:checked:bg-indigo-400';
	// 			break;
	// 		case 'gray':
	// 			'checked:border-none checked:bg-gray-500 dark:checked:bg-gray-400';
	// 			break;

	// 		default:
	// 			'checked:bg-brand-500 dark:checked:bg-brand-400';
	// 			break;
	// 	}
	// };

	// return (
	// 	<input
	// 		type="checkbox"
	// 		className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center
	//   justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
	//   checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${switchColor(color)} ${extra}`}
	// 		name="weekly"
	// 		{...rest}
	// 	/>
	// );
	return (
		<input
			type="checkbox"
			className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400`}
			name="weekly"
			{...rest}
		/>
	);
};

export default Checkbox;
