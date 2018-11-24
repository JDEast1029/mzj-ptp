import * as types from '@constants/actions/live';
const initialState = {
	isFetching: 0,      // 是否已经获取 
};
export const liveLecturer = (state = initialState, action) => {
	switch (action.type) {
		case types.LIVE_LECTURER_LIST_GET + '_SUCCESS':
			state = {
				...state,
				...action.data,
				isFetching: 1,
			};
			return state;
		case types.LIVE_LECTURER_EDIT_POST + '_SUCCESS':
		case types.LIVE_LECTURER_DEL_POST + '_SUCCESS':
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};