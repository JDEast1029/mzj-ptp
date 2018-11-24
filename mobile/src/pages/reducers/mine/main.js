import * as types from '@constants/actions/mine';
import { ROUTER_CHANGE } from '@constants/actions/_common';
const initialState = {
	isFetching: 0,      // 是否已经获取 
};
export const mineMain = (state = initialState, action) => {
	switch (action.type) {
		case types.MINE_MAIN_LIST_GET + '_SUCCESS':
			state = {
				...state,
				data: { ...action.data },
				isFetching: 1,
			};
			return state;
		default:
			return state;
	}
};