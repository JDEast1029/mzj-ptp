import * as types from '@constants/actions/_common';

const initialState = {
	isFetching: 0,
};
export const commonInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.COMMON_INFO_GET + '_SUCCESS':
			state = {
				...state,
				isFetching: 1,
				...action.data
			};
			return state;
		case types.COMMON_OPERATE_MODULE_GET + '_SUCCESS':
			state = {
				...state,
				isFetching: 1,
				module: [...action.data]
			};
			return state;
		default:
			return state;
	}
};