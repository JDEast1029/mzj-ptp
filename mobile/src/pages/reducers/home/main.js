import * as types from '@constants/actions/home';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { getItem, compareItemObj } from '@utils/utils';
import { initObj, initItem, updateItemObj, sortItemArr } from '@utils/utils';
const initialState = {
	isFetching: 0,      // 是否已经获取 
	listInfo: {
		...initObj,
		totalCount: 0
	}
};
export const homeMain = (state = initialState, action) => {
	let items, currentPage, totalPage, itemArr, itemObj, newObj, localItemObj;
	switch (action.type) {
		case types.HOME_MAIN_LIST_GET + '_ON':
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 1
				}
			};
			return state;
		case types.HOME_MAIN_LIST_GET + '_SUCCESS':
			currentPage = state.listInfo.currentPage + 1;
			totalPage = 1;
			items = initItem(action.data.list, 'community_id');
			itemArr = items.itemArr;
			newObj = items.itemObj;
			// 拿到新数据比对localStorage的数据
			localItemObj = getItem(`homeItemObj@${_global.version}`, 'localStorage');
			if (localItemObj) {
				let obj = compareItemObj(localItemObj, items.itemObj);
				newObj = obj.newObj;
			}
			state = {
				...state,
				isFetching: 1,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr,
					itemObj: newObj,
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					notice: action.data.notice
				}
			};
			return state;
		case types.HOME_MAIN_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = 1;
			items = initItem(action.data.list, 'community_id');
			itemArr = items.itemArr;
			newObj = items.itemObj;
			// 拿到新数据比对localStorage的数据
			localItemObj = getItem(`homeItemObj@${_global.version}`, 'localStorage');
			if (localItemObj) {
				let obj = compareItemObj(localItemObj, items.itemObj, items.itemArr);
				newObj = obj.newObj;
			}
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					currentPage,
					itemArr,
					itemObj: newObj,
					totalPage,
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount
				}
			};
			return state;
		case types.HOME_MAIN_LIST_GET + "_ERROR":
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 3
				}
			};
			return state;
		case types.HOME_MAIN_NOTICE_UPDATE_WEBSOCKET:
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					notice: action.data.msg
				}
			};
			return state;
		case types.HOME_MAIN_LIST_ADD_WEBSOCKET:
			const { list, opt } = action.data;
			itemArr = sortItemArr(opt, state.listInfo.itemArr, list);
			itemObj = updateItemObj(opt, state.listInfo.itemObj, list);
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					itemArr,
					itemObj
				}
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