import * as types from '@constants/actions/material';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
	...initObj,
	title: '',
	isFetching: 0  // 是否已经获取 
};
export const materialList = (state = initialState, action) => {
	let currentPage, totalPage, items;
	switch (action.type) {
		case types.MATERIAL_LIST_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1,
				isFetching: 1
			};
			return state;
			// 上拉加载
		case types.MATERIAL_LIST_LIST_GET + '_SUCCESS':
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
		case types.MATERIAL_LIST_LIST_GET + '_REFRESH':
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
		case types.MATERIAL_LIST_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.MATERIAL_LIST_SEARCH_INIT:
			state = {
				...initialState,
				title: action.title
			};
			return state;
		case types.MATERIAL_LIST_INIT:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};