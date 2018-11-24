import * as types from "@constants/actions/home";
import * as layoutTypes from "@constants/actions/layout";
import { ROUTER_CHANGE } from "@constants/actions/_common";
const initialState = {
	isFetching: 0 // 是否已经获取
};
export const homeMain = (state = initialState, action) => {
	switch (action.type) {
		case types.HOME_MAIN_GET + "_SUCCESS":
			return state;
		case ROUTER_CHANGE:
		case types.HOME_LOG_SEARCH_INIT:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};
