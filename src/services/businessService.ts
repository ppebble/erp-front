import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getQuery, postQuery, postUploadQuery } from './base/AxiosQueryService';
import { commonResult } from '../network/commonResult';
import { businessList as businessListType, businessDetailParams } from '../network/response/businessParams';
import useModal from '../store/useModal';
import useBusiness from '../store/useBusiness';

export const BusinessService = () => {
	const { businessNo, setBusinessList, setBusinessDetail } = useBusiness();
	const { openModal } = useModal();
	const navigate = useNavigate();

	const businessList = {
		queryFn: () => getQuery('/api/business/businessList'),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: businessListType[] = common.result;
			if (common.isSuccessful) {
				setBusinessList(data);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	};

	const businessDetail = {
		queryFn: () => getQuery(`/api/business/businessDetail/${businessNo}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: businessDetailParams = common.result;
			if (common.isSuccessful) {
				setBusinessDetail(data);
				navigate('/topic/businessDetail');
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!businessNo,
	};

	return { businessList, businessDetail };
};
