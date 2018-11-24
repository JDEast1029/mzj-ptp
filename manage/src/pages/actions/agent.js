import * as types from '../constants/actions/agent';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { navigator } from './_common/navigator';
export const listSearchInit = () => {
	return {
		type: types.AGENT_LIST_SEARCH_INIT
	};
};