const Progress = (props: {
	value: number;
	color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'teal' | 'navy' | 'lime' | 'cyan' | 'pink' | 'purple' | 'amber' | 'indigo' | 'gray';
	width?: string;
}) => {
	const { value, color, width } = props;
	const switchColor = (item: string | undefined) => {
		switch (item) {
			case 'red':
				return 'bg-red-500 dark:bg-red-400';
				break;
			case 'blue':
				return 'bg-blue-500 dark:bg-blue-400';
				break;
			case 'green':
				return 'bg-green-500 dark:bg-green-400';
				break;
			case 'yellow':
				return 'bg-yellow-500 dark:bg-yellow-400';
				break;
			case 'orange':
				return 'bg-orange-500 dark:bg-orange-400';
				break;
			case 'teal':
				return 'bg-teal-500 dark:bg-teal-400';
				break;
			case 'navy':
				return 'bg-navy-500 dark:bg-navy-400';
				break;
			case 'lime':
				return 'bg-lime-500 dark:bg-lime-400';
				break;
			case 'cyan':
				return 'bg-cyan-500 dark:bg-cyan-400';
				break;
			case 'pink':
				return 'bg-pink-500 dark:bg-pink-400';
				break;
			case 'purple':
				return 'bg-purple-500 dark:bg-purple-400';
				break;
			case 'amber':
				return 'bg-amber-500 dark:bg-amber-400';
				break;
			case 'indigo':
				return 'bg-indigo-500 dark:bg-indigo-400';
				break;
			case 'gray':
				return 'bg-gray-500 dark:bg-gray-400';
				break;

			default:
				return 'bg-brand-500 dark:bg-brand-400';
				break;
		}
	};
	return (
		<div className={`h-2 ${width || 'w-full'} rounded-full bg-gray-200 dark:bg-navy-700`}>
			<div
				className={`flex h-full items-center justify-center rounded-full ${switchColor(color)} dark:bg-brand-400`}
				style={{ width: `${value}%` }}
			/>
		</div>
	);
};

export default Progress;
