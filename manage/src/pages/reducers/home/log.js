import * as types from "@constants/actions/home";
import * as layoutTypes from "@constants/actions/layout";
import { ROUTER_CHANGE } from "@constants/actions/_common";
import { initPage, initItem } from "@utils/utils";

const initialState = {
	...initPage,
	isFetching: 0,
	resetPage: 1
};
export const homeLog = (state = initialState, action) => {
	let curPage, totalPage, totalCount, items, id, type;
	switch (action.type) {
		case types.HOME_LOG_LIST_GET + "_ON":
			state = {
				...state,
				isEnd: 1
			};
			return state;

		case types.HOME_LOG_LIST_GET + "_SUCCESS":
			curPage = action.param.page; // 当前页
			totalPage = action.data.totalPage; // 后端给的字段
			totalCount = action.data.totalCount; // 后端给的字段
			items = initItem(action.data.list, "log_id");
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
		case types.HOME_LOG_LIST_GET + "_SETPAGE":
			state = {
				...state,
				curPage: action.param.page,
				resetPage: action.param.page
			};
			return state;
		case types.HOME_LOG_LIST_GET + "_ERROR":
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.HOME_LOG_SEARCH_INIT:
			state = {
				...initialState
			};
			return state;
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
