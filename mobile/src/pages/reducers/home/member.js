import * as types from '@constants/actions/home';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
	isFetching: 0,      // 是否已经获取
	listInfo: {
		...initObj,
		totalCount: 0
	}
};
export const homeMember = (state = initialState, action) => {
	let items, currentPage, totalPage, total_num;
	switch (action.type) {
		case types.HOME_MEMBER_LIST_GET + '_ON':
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 1
				}
			};
			return state;
		case types.HOME_MEMBER_LIST_GET + '_SUCCESS':
			currentPage = state.listInfo.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'community_user_id');
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr: [...state.listInfo.itemArr, ...items.itemArr],
					itemObj: { ...state.listInfo.itemObj, ...items.itemObj },
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					total_num: action.data.total_num
				}
			};
			return state;
		case types.HOME_MEMBER_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'community_user_id');
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
		case types.HOME_MEMBER_LIST_GET + '_ERROR':
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 3
				}
			};
			return state;
		case types.HOME_MEMBER_SEARCH_INIT:
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