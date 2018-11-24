import * as types from '@constants/actions/agent';
import * as layoutTypes from '@constants/actions/layout';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage,
	isFetching: 0,
	resetPage: 1
};
export const agentList = (state = initialState, action) => {
	let curPage, totalPage, items, id, totalCount;
	switch (action.type) {
		case types.AGENT_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		case types.AGENT_LIST_GET + '_SUCCESS':
			curPage = action.param.page; // 当前页
			totalPage = action.data.totalPage; // 后端给的字段
			totalCount = action.data.totalCount || 0;
			items = initItem(action.data.list, 'user_id');
			state = {
				...state,
				curPage,
				totalPage,
				totalCount,
				itemArr: { ...state.itemArr, [curPage]: [...items.itemArr] },
				itemObj: { ...state.itemObj, ...items.itemObj },
				isEnd: 0,
				resetPage: curPage,
				isFetching: 1
			};
			return state;
		case types.AGENT_LIST_GET + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page,
				resetPage: action.param.page,
			};
			return state;
		case types.AGENT_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.AGENT_LIST_INVITE_POST + '_SUCCESS':
		case types.AGENT_LIST_ADJUST_POST + '_SUCCESS':
		case types.AGENT_LIST_BAN_POST + '_SUCCESS':
		case types.AGENT_LIST_CHANGE_POST + '_SUCCESS':
			state = {
				...initialState,
				resetPage: state.curPage,
			};
			return state;
		case types.AGENT_LIST_SEARCH_INIT:
		case layoutTypes.LAYOUT_MENU_ITEM_CLICK:
			state = {
				...initialState
			};
			return state;
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};