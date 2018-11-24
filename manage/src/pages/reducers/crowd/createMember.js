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
	number: 0,
	roleArr: []
};
const initInfo = (info, loader, roleArr = []) => {
	let totalPage = Math.ceil((info.length + 1) / 10);
	const Item = initItem(info, 'user_id');
	let itemArr = {};
	Item.itemArr.unshift(0);
	Item.itemObj[0] = loader;
	Item.itemArr.forEach((val, index) => {
		Item.itemObj[val].number = ++index;
		if ( val == 0){
			Item.itemObj[val].role = 9;
		} else {
			Item.itemObj[val].role = roleArr.indexOf(val) > -1 ? 2 : 0;
		}
	});
	for (let i = 1; i <= totalPage; i++){
		itemArr[i] = Item.itemArr.slice((i - 1) * 10, 10 * i);
	}
	return {
		...initialState,
		totalPage,
		currentPage: 1,
		itemArr,
		info,
		itemObj: Item.itemObj,
		number: info.length + 1,
		loader,
		roleArr
	};
};
export const crowdCreateMember = (state = initialState, action) => {
	switch (action.type) {
		case types.CROWD_CREATE_MEMBER_LOADER_GET + '_SUCCESS':{
			const { leader_name } = action.data;
			const loader = {
				nick_name: leader_name,
				number: 1,
				role: 9
			};
			return {
				...state,
				loader,
				itemArr: { 1: [0] },
				itemObj: { 0: { ...loader } },
				number: 1
			};
		}
		case types.CROWD_CREATE_MEMBER_ADD:{
			const info = action.info.concat(state.info);
			return {
				...initInfo(info, state.loader, state.roleArr)
			};
		}
		case types.CROWD_CREATE_MEMBER_DEL:{
			const info = state.info.filter((val) => {
				return val.user_id != action.id;
			});
			return {
				...initInfo(info, state.loader, state.roleArr)
			};
		}
		case types.CROWD_CREATE_MEMBER_SET_MANAGE: {
			const { status, id } = action.data;
			if (status == 0){
				state.roleArr.push(id);
			} else {
				state.roleArr = state.roleArr.filter((val, index) => {
					return val !== id;
				});
			}
			return {
				...state,
				itemObj: {
					...state.itemObj,
					[id]: {
						...state.itemObj[id],
						role: status == 2 ? 0 : 2
					}
				}
			};
		}
		case types.CROWD_CREATE_MEMBER_ADD_INIT: {
			return {
				...initInfo(action.info.info, state.loader, action.info.roleArr)
			};
		}
		case types.CROWD_CREATE_MEMBER_CHANGE_PAGE + '_SETPAGE':
			state = {
				...state,
				curPage: action.param.page
			};
			return state;
		case ROUTER_CHANGE:
			return {
				...initialState
			};
		default:
			return state;
	}
};
