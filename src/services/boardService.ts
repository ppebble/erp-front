import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { commonResult } from '../network/commonResult';
import useModal from '../store/useModal';
import { getQuery, postQuery, postUploadQuery } from './base/AxiosQueryService';
import useBoard from '../store/useBoard';
import { boardDetailType, boardType } from '../network/response/boardParams';

export const BoardService = () => {
	const { type, boardIndex, setBoard, setDetail, setClearBoardIndex } = useBoard();
	const navigate = useNavigate();
	const { openModal } = useModal();

	const boardList = {
		queryFn: () => getQuery(`/api/board/boardList/${type}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: boardType[] = common.result;
			if (common.isSuccessful) {
				if (data) {
					setBoard(data);
				}
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: false,
	};

	const insertBoard = useMutation({
		mutationFn: (params: any) => postUploadQuery(`/api/board/board/${type}`, params),
		onSuccess: () => {
			openModal({ type: 3, contents: '등록 되었습니다.' });
			navigate('/topic/notices');
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const updateBoard = useMutation({
		mutationFn: (params: any) => postUploadQuery(`/api/board/modifyBoard/${type}`, params),
		onSuccess: (result) => {
			const common: commonResult = result.response;
			console.log(common);
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	const boardDetail = {
		queryFn: () => getQuery(`/api/board/boardDetail/${type}/${boardIndex}`),
		onSuccess: (result: { response: commonResult }) => {
			const common: commonResult = result.response;
			const data: boardDetailType = common.result;
			if (common.isSuccessful) {
				if (data) {
					setDetail(data);
					navigate('/topic/noticesDetail');
					setClearBoardIndex();
				}
			}
		},
		onError: (error: any) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
		enabled: !!boardIndex,
	};

	const delBoard = useMutation({
		mutationFn: (params: any) => postQuery('/api/board/delBoard', params),
		onSuccess: (result) => {
			const common: commonResult = result.response;
			navigate('/topic/notices');
		},
		onError: (error) => {
			openModal({ type: 3, contents: error, color: 'red' });
		},
	});

	return { boardList, insertBoard, boardDetail, updateBoard, delBoard };
};

export default BoardService;
