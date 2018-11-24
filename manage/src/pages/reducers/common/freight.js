import * as types from '@constants/actions/_common';

const initialState = {
	isFetching: 0,
	list: []
};
export const freightInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.FREIGHT_TEMPLATE_GET + '_SUCCESS':
			state = {
				...state,
				isFetching: 1,
				list: action.data
			};
			return state;
		case types.FREIGHT_TEMPLATE_INIT: 
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};