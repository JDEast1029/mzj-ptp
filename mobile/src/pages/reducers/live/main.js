import * as types from "@constants/actions/live";
import { ROUTER_CHANGE } from "@constants/actions/_common";
import { initObj, initItem } from "@utils/utils";
const initialState = {
	isFetching: 0, // 是否已经获取
	listInfo: {
		...initObj,
		totalCount: 0
	},
	title: "" // 搜索2
};
export const liveMain = (state = initialState, action) => {
	let items, currentPage, totalPage;

	switch (action.type) {
		case types.LIVE_ROOM_ROOM_LIST_GET + "_ON":
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 1
				}
			};
			return state;
		case types.LIVE_ROOM_ROOM_LIST_GET + "_SUCCESS":
			currentPage = state.listInfo.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, "room_id");
			state = {
				...state,
				isFetching: 1,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr: [...state.listInfo.itemArr, ...items.itemArr],
					itemObj: { ...state.listInfo.itemObj, ...items.itemObj },
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount
				}
			};
			return state;
		case types.LIVE_ROOM_ROOM_LIST_GET + "_REFRESH":
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, "room_id");
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr: items.itemArr,
					itemObj: items.itemObj,
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount
				}
			};
			return state;
		case types.LIVE_ROOM_ROOM_LIST_GET + "_ERROR":
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 3
				}
			};
			return state;
		case types.LIVE_ROOM_SERACH_INIT:
			return {
				...initialState,
				title: state.title
			};
		case types.LIVE_ROOM_SEARCH_CHANGE:
			return {
				...state,
				title: action.title
			};
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
		default:
			return state;
	}
};
