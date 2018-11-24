import * as types from '@constants/actions/material';
import { ROUTER_CHANGE } from '@constants/actions/_common';
const initialState = {
	list: [],
	selectArr: []
};
export const materialShare = (state = initialState, action) => {
	switch (action.type) {
		case types.MATERIAL_SHARE_LIST_GET + '_SUCCESS': {
			return {
				...state,
				list: [
					...action.data.list
				]
			};
		}
		case types.MATERIAL_SHARE_SELECT_CHANGE:{
			let selectArr = [...state.selectArr];
			const { community_id } = action;
			if (state.selectArr.indexOf(community_id) > -1){
				selectArr = selectArr.filter((val, index) => {
					return val != community_id;
				});
			} else {
				selectArr.push(community_id);
			}
			return {
				...state,
				selectArr
			};
		}
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};