import * as types from "../constants/actions/live";
/**
 * 引入共用的action
 * ajax
 */
export { request } from "./_common/request";
export { navigator } from "./_common/navigator";

export const listSearchInit = () => {
	return {
		type: types.LIVE_LIVE_SEARCH_INIT
	};
};
