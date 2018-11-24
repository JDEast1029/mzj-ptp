import * as types from '../constants/actions/material';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { navigator } from './_common/navigator';

export const materialListSearchInit = (title) => {
	return {
		type: types.MATERIAL_LIST_SEARCH_INIT,
		title
	};
};

export const materialListInit = (title) => {
	return {
		type: types.MATERIAL_LIST_INIT
	};
};

export const materialShareSelect = (community_id) => {
	return {
		type: types.MATERIAL_SHARE_SELECT_CHANGE,
		community_id
	};
};

export const materialDetailAudioChange = (data) => {
	return {
		type: types.MATERIAL_DETAIL_AUDIO_CHANGE,
		data
	};
};