import { useMutation } from 'react-query';
import { commonResult } from '../network/commonResult';
import useModal from '../store/useModal';
import { getQuery, postQuery } from './base/AxiosQueryService';
import useBoard from '../store/useBoard';
import { newsType, newsArray } from '../network/response/boardParams';

export const BoardService = () => {
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

	const insertBoard = useMutation({
		mutationFn: (params: any) => postQuery(`/api/board/board/${type}`, params),
		onSuccess: (result) => {
			const common: commonResult = result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const updateBoard = useMutation({
		mutationFn: (params: any) => postQuery(`/api/board/modifyBoard/${type}`, params),
		onSuccess: (result) => {
			const common: commonResult = result.response;
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	return { boardList, insertBoard, updateBoard };
};

export default BoardService;
