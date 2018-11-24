import * as types from '@constants/actions/material';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
    
};
export const materialDetail = (state = initialState, action) => {
	let currentPage, totalPage, items;
	switch (action.type) {
		case types.MATERIAL_DETAIL_INFO_GET + '_SUCCESS':{
			const { material_id } = action.param;
			return {
				...state,
				[material_id]: action.data
			};
		}
		case types.MATERIAL_DETAIL_COLLECT_CHANGE_POST + '_SUCCESS':{
			const { material_id } = action.param;
			return {
				...state,
				[material_id]: {
					...state[material_id],
					is_collection: !state[material_id].is_collection
				}
			};
		}
		case types.MATERIAL_DETAIL_AUDIO_CHANGE: {
			const { audio_id, material_id, index } = action.data;
			const info = state[material_id].data.viewData.map((val, key) => {
				if (val.type == 'CUSTOM_AUDIO' && key == index){
					return {
						...val,
						data: {
							...val.data,
							is_play: !val.data.is_play
						}
					};
				} else {
					return {
						...val,
						data: {
							...val.data,
							is_play: false
						}
					};
				}
			});
			return {
				...state,
				[material_id]: {
					...state[material_id],
					data: {
						...state[material_id].data,
						viewData: info
					}
				}
			};
		}
		case ROUTER_CHANGE:
			return {
				...initialState
			};
		default:
			return state;
	}
};