import * as types from "../constants/actions/home";
/**
 * 引入共用的action
 * ajax
 */
export { request } from "./_common/request";
export { navigator } from "./_common/navigator";

export const itemSearch = data => {
	return {
		type: types.HOME_LOG_SEARCH_INIT,
		keyword: data.keyword
	};
};

export const honeData = data => {
	return {
		type: types.HOME_LOG_INIT,
		keyword: data.keyword
	};
};

export const listSearchInit = () => {
	return {
		type: types.HOME_LOG_SEARCH_INIT
	};
};
