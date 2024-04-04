import Card from '../card';

const CustomClickableOneLineWidget = (props: { icon: JSX.Element; title: string; onClickHandler: any }) => {
	const { icon, title, onClickHandler } = props;

	return (
		<div className="hover:cursor-pointer" onClick={onClickHandler}>
			<Card extra="!flex-row flex-grow items-center rounded-[20px]">
				<div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
					<div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
						<span className="flex items-center text-brand-500 dark:text-white">{icon}</span>
					</div>
				</div>

				<div className="h-50 ml-4 flex w-auto flex-col justify-center">
					<h4 className="text-xl font-bold text-navy-700 dark:text-white">{title}</h4>
				</div>
			</Card>
		</div>
	);
};

export default CustomClickableOneLineWidget;
