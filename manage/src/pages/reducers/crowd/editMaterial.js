import * as types from '@constants/actions/crowd';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage,
	community_material_num: 0
};
export const crowdEditMaterial = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_EDIT_MATERIAL_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		case types.CROWD_EDIT_MATERIAL_LIST_GET + '_SUCCESS': {
			let curPage = action.param.page, // 当前页
				totalPage = action.data.totalPage, // 后端给的字段
				totalCount = action.data.totalCount,
				community_material_num = action.data.community_material_num,
				items = initItem(action.data.list, 'category_id');
			state = {
				...state,
				curPage,
				totalPage,
				totalCount,
				itemArr: { ...state.itemArr, [curPage]: [...items.itemArr] },
				itemObj: { ...state.itemObj, ...items.itemObj },
				isEnd: 0,
				resetPage: curPage,
				community_material_num
			};
			return state;
		}

		case types.CROWD_EDIT_MATERIAL_LIST_GET + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case types.CROWD_EDIT_MATERIAL_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.CROWD_EDIT_MATERIAL_ADD_POST + '_SUCCESS':
		case types.CROWD_EDIT_MATERIAL_INIT:
			return {
				...initialState
			};
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};
