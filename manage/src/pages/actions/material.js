import * as types from "../constants/actions/material";
/**
 * 引入共用的action
 * ajax
 */
export { request } from "./_common/request";
export { navigator } from "./_common/navigator";


export const listSearchInit = () => {
	return {
		type: types.MATERIAL_MATERIAL_SEARCH_INIT
	};
};
