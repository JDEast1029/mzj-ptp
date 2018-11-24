import * as types from '@constants/actions/mine';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
	...initObj,
	title: '',
	isFetching: 0  // 是否已经获取 
};
export const mineCollect = (state = initialState, action) => {
	let currentPage, totalPage, items;
	switch (action.type) {
		case types.MINE_COLLECT_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1,
				isFetching: 1
			};
			return state;
			// 上拉加载
		case types.MINE_COLLECT_LIST_GET + '_SUCCESS':
			currentPage = state.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'material_id');
			state = {
				...state,
				currentPage,
				totalPage,
				itemArr: [...state.itemArr, ...items.itemArr],
				itemObj: { ...state.itemObj, ...items.itemObj },
				isEnd: currentPage + 1 > totalPage ? 2 : 0
			};
			return state;
			// 下拉刷新
		case types.MINE_COLLECT_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'material_id');
			state = {
				...state,
				currentPage,
				totalPage,
				itemArr: items.itemArr,
				itemObj: items.itemObj,
				isEnd: currentPage + 1 > totalPage ? 2 : 0
			};
			return state;
		case types.MINE_COLLECT_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.MINE_COLLECT_SEARCH_INIT:
			state = {
				...initialState,
				title: action.title
			};
			return state;
		case types.MINE_COLLECT_DEL_POST + '_SUCCESS':
			const itemArr = state.itemArr.filter((val, indes) => {
				return val != action.param.material_id;
			});
			return {
				...state,
				itemArr
			};
		case types.MINE_COLLECT_INIT:
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