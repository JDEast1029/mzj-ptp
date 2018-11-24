import * as types from '../constants/actions/mine';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { navigator } from './_common/navigator';

export const mineCollectSearchInit = (title) => {
	return {
		type: types.MINE_COLLECT_SEARCH_INIT,
		title
	};
};