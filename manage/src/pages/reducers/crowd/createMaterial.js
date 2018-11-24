import * as types from '@constants/actions/crowd';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';
const initialState = {
	...initPage,
	isEnd: 0,
	curPage: 1,
	loader: {},
	info: [],
	currentPage: 1,
	number: 0
};
const initInfo = (info) => {
	info = info.map((val, index) => {
		return {
			...val,
			number: ++index
		};
	});
	let totalPage = Math.ceil(info.length / 10);
	const Item = initItem(info, 'category_id');
	let itemArr = {};
	for (let i = 1; i <= totalPage; i++) {
		itemArr[i] = Item.itemArr.slice((i - 1) * 10, 10 * i);
	}
	return {
		...initialState,
		totalPage,
		currentPage: 1,
		itemArr,
		info,
		itemObj: Item.itemObj,
		number: Item.length
	};
};
export const crowdCreateMaterial = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_CREATE_MATERIAL_ADD: {
			const info = action.info.concat(state.info);
			return {
				...initInfo(info, state.loader)
			};
		}
		case types.CROWD_CREATE_MATERIAL_DEL: {
			const info = state.info.filter((val) => {
				return val.category_id != action.id;
			});
			return {
				...initInfo(info)
			};
		}
		case types.CROWD_CREATE_MATERIAL_CHANGE_PAGE + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case types.CROWD_CREATE_MATERIAL_INIT:
			return {
				...initialState
			};
		default:
			return state;
	}
};
