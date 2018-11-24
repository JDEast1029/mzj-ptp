import * as types from '@constants/actions/crowd';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage
};
export const crowdList = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		case types.CROWD_LIST_GET + '_SUCCESS':{
			let curPage = action.param.page, // 当前页
				totalPage = action.data.totalPage, // 后端给的字段
				totalCount = action.data.totalCount,
				items = initItem(action.data.list, 'community_id');
			state = {
				...state,
				curPage,
				totalPage,
				totalCount,
				itemArr: { ...state.itemArr, [curPage]: [...items.itemArr] },
				itemObj: { ...state.itemObj, ...items.itemObj },
				isEnd: 0,
				resetPage: curPage
			};
			return state;
		}
			
		case types.CROWD_LIST_GET + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case types.CROWD_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.CROWD_LIST_SEARCH:
			return {
				...initialState
			};
		case types.CROWD_LIST_SET_MANAGE_POST + '_SUCCESS':
		case types.CROWD_LIST_CANCEL_SILENT_GET + '_SUCCESS':
		case types.CROWD_LIST_SILENT_GET + '_SUCCESS':{
			return {
				...initialState,
				resetPage: state.resetPage
			};
		}
		case types.CROWD_LIST_DISSOLVE_POST + '_SUCCESS':{
			return {
				...initPage
			};
		}
		// case layoutTypes.LAYOUT_MENU_ITEM_CLICK:
		// 	state = {
		// 		...initialState
		// 	};
		// 	return state;
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};
