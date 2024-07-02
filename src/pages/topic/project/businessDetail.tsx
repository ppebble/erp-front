import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { Button, Input, InputGroup, InputLeftAddon, Divider, Card } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { MdLaptopChromebook } from 'react-icons/md';
import useModal from '../../../store/useModal';
import useBusiness from '../../../store/useBusiness';
import CustomClickableOneLineWidget from '../../../components/widget/CustomOneLineWidget';
import { useScroll } from '../../../store/useScroll';
import ColumnsTable from '../../../components/columnsTable';

// 연구과제 상세보기
const BusinessDetail = () => {
	const { businessDetail } = useBusiness();
	const navigate = useNavigate();
	const { openModal, closeModal } = useModal();
	const columnHelper = createColumnHelper<any>();
	const [title, setTitle] = useState('기본정보');
	const { divHeight } = useScroll();
	const [height, setHeight] = useState(divHeight);

	const retrunCost = (cost: number) => {
		return cost
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			.concat(' 천원');
	};

	const sumCost = () => {
		let sum = 0;
		if (businessDetail?.detail.cost) {
			sum =
				businessDetail.detail.cost.fundingCost +
				businessDetail.detail.cost.privateCost +
				businessDetail.detail.cost.privateGoods +
				businessDetail.detail.cost.etcCost;
		}

		return retrunCost(sum);
	};

	const addTag = (value: any) => {
		return <p className="text-md font-bold">{value}</p>;
	};

	const columns = [
		columnHelper.accessor('role', {
			id: '구분',
			cell: (info) => addTag(info.getValue()),
			size: 300,
		}),
		columnHelper.accessor('empNo', {
			id: '사원번호',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
		columnHelper.accessor('createDate', {
			id: '작성일',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
		columnHelper.accessor('modifyDate', {
			id: '수정일',
			cell: (info) => addTag(info.getValue()),
			size: 100,
		}),
	];

	const memberClick = () => {
		console.log('member');
	};

	const deleteOk = () => {
		closeModal();
	};

	const deleteBusiness = () => {
		openModal({ type: 4, contents: `<p className='text-xl'>삭제 하시겠습니까?</p>`, color: 'red', okClick: deleteOk });
	};

	const updateBusiness = () => {
		navigate('/topic/businessModify', { state: { isNew: false } });
	};

	useEffect(() => {
		console.log(businessDetail);
	}, [businessDetail]);

	useEffect(() => {
		setHeight(divHeight);
	}, [divHeight]);

	return (
		<div className="overflow-auto flex min-h-[800px]" style={{ height: `${height}` }}>
			<Card className="!flex-row mt-5">
				<div className="float-left text-right md:w-[10%] xl:w-[20%] min-w-[200px]">
					<div className="mt-3 mr-5">
						<CustomClickableOneLineWidget
							icon={<MdLaptopChromebook className="h-7 w-7" />}
							title="기본정보"
							onClickHandler={() => {
								setTitle('기본정보');
							}}
							selectedTitle={title}
						/>
						<CustomClickableOneLineWidget
							icon={<HiOutlineDesktopComputer className="h-6 w-6" />}
							title="기관"
							onClickHandler={() => {
								setTitle('기관');
							}}
							selectedTitle={title}
						/>
						<CustomClickableOneLineWidget
							icon={<MdLaptopChromebook className="h-7 w-7" />}
							title="연구비"
							onClickHandler={() => {
								setTitle('연구비');
							}}
							selectedTitle={title}
						/>
					</div>
				</div>
				<div className="w-full pr-[20%]">
					<header className="relative flex items-center justify-between mb-4">
						<div className="w-full text-2xl font-bold text-navy-700 dark:text-white ml-1">
							<Button className="mr-[1rem]" onClick={() => navigate('/topic/project')}>
								<ArrowLeftIcon />
							</Button>
							연구과제 상세보기
							<div className="text-end">
								<Button className="w-[150px]" colorScheme="green" onClick={() => updateBusiness()}>
									수정
								</Button>
								<Button className="w-[150px]" colorScheme="red" ml={3} onClick={() => deleteBusiness()}>
									삭제
								</Button>
							</div>
						</div>
					</header>
					{title === '기본정보' && (
						<>
							{/* info */}
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[120px]">사업명</InputLeftAddon>
								<Input id="businessName" className="pointer-events-none" defaultValue={businessDetail?.detail.info.businessName || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[120px]">참여유형</InputLeftAddon>
								<Input id="participationType" className="pointer-events-none" defaultValue={businessDetail?.detail.info.participationType || ''} />
								<InputLeftAddon className="!min-w-[120px] ml-[20px]">시행부처</InputLeftAddon>
								<Input id="department" className="pointer-events-none" defaultValue={businessDetail?.detail.info.department || ''} />
							</InputGroup>
							<InputGroup className="mb-3">
								<InputLeftAddon className="!min-w-[120px]">시작일</InputLeftAddon>
								<Input id="startDate" className="pointer-events-none" defaultValue={businessDetail?.detail.info.startDate || ''} />
								<InputLeftAddon className="!min-w-[120px] ml-[20px]">종료일</InputLeftAddon>
								<Input id="endDate" className="pointer-events-none" defaultValue={businessDetail?.detail.info.endDate || ''} />
							</InputGroup>
							<InputGroup className="mb-3">
								<InputLeftAddon className="!min-w-[120px]">작성자</InputLeftAddon>
								<Input id="register" className="pointer-events-none" defaultValue={businessDetail?.detail.info.register || ''} />
								<InputLeftAddon className="!min-w-[120px] ml-[20px]">작성일</InputLeftAddon>
								<Input id="createDate" className="pointer-events-none" defaultValue={businessDetail?.detail.info.createDate || ''} />
								<InputLeftAddon className="!min-w-[120px] ml-[20px]">수정일</InputLeftAddon>
								<Input id="modifyDate" className="pointer-events-none" defaultValue={businessDetail?.detail.info.modifyDate || ''} />
							</InputGroup>
						</>
					)}
					{title === '기관' && (
						<>
							{/* institution */}
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">전문 연구 기관명</InputLeftAddon>
								<Input id="proResearchIns" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.proResearchIns || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">전문 연구 기관 과제명</InputLeftAddon>
								<Input id="proResearchName" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.proResearchName || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">전문 연구 기관 과제번호</InputLeftAddon>
								<Input id="proResearchNo" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.proResearchNo || ''} />
							</InputGroup>
							<Divider className="my-3" />
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">주관 연구 기관명</InputLeftAddon>
								<Input id="headResearchIns" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.headResearchIns || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">주관 연구 기관 과제명</InputLeftAddon>
								<Input
									id="headResearchName"
									className="pointer-events-none"
									defaultValue={businessDetail?.detail.institution.headResearchName || ''}
								/>
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">주관 연구 기관 과제번호</InputLeftAddon>
								<Input id="headResearchNo" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.headResearchNo || ''} />
							</InputGroup>
							<Divider className="my-3" />
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">협동 연구 기관명</InputLeftAddon>
								<Input
									id="jointResearchIns"
									className="pointer-events-none"
									defaultValue={businessDetail?.detail.institution.jointResearchIns || ''}
								/>
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">협동 연구 기관 과제명</InputLeftAddon>
								<Input
									id="jointResearchName"
									className="pointer-events-none"
									defaultValue={businessDetail?.detail.institution.jointResearchName || ''}
								/>
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">협동 연구 기관 과제번호</InputLeftAddon>
								<Input id="jointResearchNo" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.jointResearchNo || ''} />
							</InputGroup>
							<Divider className="my-3" />
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">세부 과제명</InputLeftAddon>
								<Input id="detailNo" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.detailNo || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[13rem]">세부 과제번호</InputLeftAddon>
								<Input id="detailName" className="pointer-events-none" defaultValue={businessDetail?.detail.institution.detailName || ''} />
							</InputGroup>
						</>
					)}
					{title === '연구비' && (
						<>
							{/* info */}
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[9.3rem]">총 연구비</InputLeftAddon>
								<Input id="sumCost" className="pointer-events-none" defaultValue={sumCost() || ''} />
							</InputGroup>
							<InputGroup className="mb-2">
								<InputLeftAddon className="!min-w-[9.3rem]">정부 지원금</InputLeftAddon>
								<Input id="fundingCost" className="pointer-events-none" defaultValue={retrunCost(businessDetail?.detail.cost.fundingCost) || ''} />
							</InputGroup>
							<InputGroup className="mb-3">
								<InputLeftAddon className="!min-w-[9.3rem]">민간 현금 지원금</InputLeftAddon>
								<Input id="privateCost" className="pointer-events-none" defaultValue={retrunCost(businessDetail?.detail.cost.privateCost) || ''} />
							</InputGroup>
							<InputGroup className="mb-3">
								<InputLeftAddon className="!min-w-[9.3rem]">민간 현물 지원금</InputLeftAddon>
								<Input id="privateGoods" className="pointer-events-none" defaultValue={retrunCost(businessDetail?.detail.cost.privateGoods) || ''} />
							</InputGroup>
							<InputGroup className="mb-3">
								<InputLeftAddon className="!min-w-[9.3rem]">기타 지원금</InputLeftAddon>
								<Input id="etcCost" className="pointer-events-none" defaultValue={retrunCost(businessDetail?.detail.cost.etcCost) || ''} />
							</InputGroup>
						</>
					)}
					<Divider className="my-3" />

					<ColumnsTable
						list={businessDetail.member}
						columns={columns}
						show={10}
						isClick
						detailButton={memberClick}
						isSearch={false}
						columnsType="table"
						minH={34}
						type="연구과제"
					/>
				</div>
			</Card>
		</div>
	);
};

export default BusinessDetail;
