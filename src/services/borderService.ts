import { commonResult } from '../network/commonResult';
import useModal from '../store/useModal';
import { getQuery } from './base/AxiosQueryService';
import useBoard from '../store/useBoard';
import { newsType, newsArray } from '../network/response/boardParams';

export const BoarderService = () => {
	const { type, setNews } = useBoard();
	const { openModal } = useModal();
	const array: newsType[] = newsArray;

	const boardList = {
		queryFn: () => getQuery(`/api/board/boardList/${type}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: newsType = common.result;
			if (common.isSuccessful) {
				setNews(array);
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!type,
	};

	// const commonQuery

	return { boardList };
};

export default BoarderService;
