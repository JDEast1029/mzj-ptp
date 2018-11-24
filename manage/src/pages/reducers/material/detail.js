/**
 * 素材详情
 */
import * as types from '@constants/actions/material';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';

const initialState = {
	materialInfo: {}
};
export const materialDetail = (state = initialState, action) => {
	switch (action.type) {
		case types.MATERIAL_DETAIL_GET + '_SUCCESS':
			state = {
				...state,
				materialInfo: {
					...state.materialInfo,
					...action.data
				}
			};
			return state;
		case ROUTER_CHANGE:
			return { ...initialState };
		default:
			return state;
	}
};
