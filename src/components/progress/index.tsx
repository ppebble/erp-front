const Progress = (props: {
	value: number;
	color?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'teal' | 'navy' | 'lime' | 'cyan' | 'pink' | 'purple' | 'amber' | 'indigo' | 'gray';
	width?: string;
}) => {
	const { value, color, width } = props;
	const switchColor = (item: string | undefined) => {
		switch (item) {
			case 'red':
				'bg-red-500 dark:bg-red-400';
				break;
			case 'blue':
				'bg-blue-500 dark:bg-blue-400';
				break;
			case 'green':
				'bg-green-500 dark:bg-green-400';
				break;
			case 'yellow':
				'bg-yellow-500 dark:bg-yellow-400';
				break;
			case 'orange':
				'bg-orange-500 dark:bg-orange-400';
				break;
			case 'teal':
				'bg-teal-500 dark:bg-teal-400';
				break;
			case 'navy':
				'bg-navy-500 dark:bg-navy-400';
				break;
			case 'lime':
				'bg-lime-500 dark:bg-lime-400';
				break;
			case 'cyan':
				'bg-cyan-500 dark:bg-cyan-400';
				break;
			case 'pink':
				'bg-pink-500 dark:bg-pink-400';
				break;
			case 'purple':
				'bg-purple-500 dark:bg-purple-400';
				break;
			case 'amber':
				'bg-amber-500 dark:bg-amber-400';
				break;
			case 'indigo':
				'bg-indigo-500 dark:bg-indigo-400';
				break;
			case 'gray':
				'bg-gray-500 dark:bg-gray-400';
				break;

			default:
				'bg-brand-500 dark:bg-brand-400';
				break;
		}
	};
	return (
		<div className={`h-2 ${width || 'w-full'} rounded-full bg-gray-200 dark:bg-navy-700`}>
			<div className="flex h-full items-center justify-center rounded-full bg-brand-500 dark:bg-brand-400" style={{ width: `${value}%` }} />
		</div>
	);
};

export default Progress;
