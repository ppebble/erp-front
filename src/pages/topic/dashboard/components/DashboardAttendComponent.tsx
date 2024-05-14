import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useEffect, useState } from 'react';
import WeeklyAttendanceComponent from './WeeklyAttendanceComponent';
import MonthAttendanceComponent from './MonthAttendanceComponent';
import Card from '../../../../components/card';

const DashboardAttendComponent = () => {
	const [slides, setSlides] = useState<any>(null);

	const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
	const [curPage, setCurpage] = useState<number>(0);

	useEffect(() => {
		if (!swiperSetting) {
			setSwiperSetting({
				// spaceBetween: 24,
				scrollbar: { draggable: true, el: null },
				slidesPerView: 'auto',
				// onBeforeInit: (swiper: SwiperCore) => {
				// 	if (typeof swiper.params.navigation !== 'boolean') {
				// 		if (swiper.params.navigation) {
				// 			swiper.params.navigation.prevEl = prevRef.current;
				// 			swiper.params.navigation.nextEl = nextRef.current;
				// 		}
				// 	}
				// 	swiper.navigation.update();
				// },
				onSlideChange: (e) => {
					setCurpage(e.activeIndex);
				},
				onInit: (e) => {
					setSlides(e.slides);
				},
			});
		}
	}, [swiperSetting]);
	return (
		<Card extra="w-full h-full px-3 py-3">
			<div>
				<div className="mt-1 flex absolute z-20 left-[40%] w-[100px]">
					{slides &&
						slides.map((item: any, index: any) => {
							if (index === curPage) {
								return <GoDotFill className="text-brand-300 h-6 w-6" key={item.className} />;
							}
							return <GoDot className="text-gray-500 h-6 w-6" key={item.className} />;
						})}
				</div>
				{swiperSetting && (
					<Swiper {...swiperSetting}>
						<SwiperSlide>
							{/* <div className={`${isAttWeek ? '' : 'hidden h-0 w-0'} object-contain`}> */}
							<div>
								<WeeklyAttendanceComponent />
							</div>
						</SwiperSlide>
						<SwiperSlide>
							{/* <div className={`${isAttWeek ? 'hidden  h-0 w-0' : ''} object-contain`}> */}
							<div>
								<MonthAttendanceComponent />
							</div>
						</SwiperSlide>
					</Swiper>
				)}
			</div>
		</Card>
	);
};
export default DashboardAttendComponent;
