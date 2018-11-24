import * as types from '@constants/actions/material';
const initialState = {
	isFetching: 0,      // 是否已经获取 
};
export const materialNotice = (state = initialState, action) => {
	switch (action.type) {
		// case types.ORDER_MAIN_GET + '_SUCCESS':
		// 	return state;
		default:
			return state;
	}
};