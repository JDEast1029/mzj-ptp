import * as types from '@constants/actions/invite';
import { ROUTER_CHANGE } from '@constants/actions/_common';
const initialState = {
	isFetching: 0,      // 是否已经获取 
};
export const inviteMain = (state = initialState, action) => {
	switch (action.type) {
		case types.INVITE_MAIN_LIST_GET + '_SUCCESS':
			state = {
				...state,
				isFetching: 1,
				data: { ...action.data }
			};
			return state;
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};