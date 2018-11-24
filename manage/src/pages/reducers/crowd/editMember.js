import * as types from '@constants/actions/crowd';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage,
};
export const crowdEditMember = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_EDIT_MEMBER_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		case types.CROWD_EDIT_MEMBER_LIST_GET + '_SUCCESS': {
			let curPage = action.param.page, // 当前页
				totalPage = action.data.totalPage, // 后端给的字段
				totalCount = action.data.totalCount,
				items = initItem(action.data.list, 'community_user_id');
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

		case types.CROWD_EDIT_MEMBER_LIST_GET + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case types.CROWD_EDIT_MEMBER_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.CROWD_EDIT_MEMBER_ADD_POST + '_SUCCESS':
		case types.CROWD_EDIT_MEMBER_INIT:
			return {
				...initialState
			};
		case types.CROWD_EDIT_MEMBER_SET_POST + '_SUCCESS': {
			return {
				...initialState,
				resetPage: state.resetPage
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
