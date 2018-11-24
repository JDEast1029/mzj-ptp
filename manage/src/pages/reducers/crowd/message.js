import * as types from '@constants/actions/crowd';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage,
	selectArr: []
};
export const crowdMessage = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_MESSAGE_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		case types.CROWD_MESSAGE_GET + '_SUCCESS': {
			let curPage = action.param.page, // 当前页
				totalPage = action.data.totalPage, // 后端给的字段
				totalCount = action.data.totalCount,
				items = initItem(action.data.list, 'material_id');
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

		case types.CROWD_MESSAGE_GET + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case types.CROWD_MESSAGE_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		case types.CROWD_MESSAGE_INIT:
			return {
				...initialState
			};
		case types.CROWD_MESSAGE_SEARCH:
			return {
				...initialState,
				selectArr: state.selectArr
			};
		case types.CROWD_MESSAGE_SELECT:
			const { id } = action;
			let { selectArr } = state;
			if (selectArr.indexOf(id) > -1){
				selectArr = selectArr.filter((val) => {
					return val != id;
				});
			} else {
				selectArr.push(id);
			}
			return {
				...state,
				selectArr
			};
	
		// case layoutTypes.LAYOUT_MENU_ITEM_CLICK:
		// 	state = {
		// 		...initialState
		// 	};
		// 	return state;
		case types.CROWD_MESSAGE_SELECT_INIT: {
			return {
				...state,
				selectArr: []
			};
		}
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};
