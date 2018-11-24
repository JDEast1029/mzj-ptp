import * as types from '@constants/actions/live';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
	isFetching: 0,            // 是否已经获取
	discussInfo: {
		...initObj,
		totalCount: 0,
		max_discuss_id: ''
	}
};
export const liveRoomDiscuss = (state = initialState, action) => {
	let items, currentPage, totalPage, id;
	switch (action.type) {
		// 直播间讨论列表
		case types.LIVE_ROOM_DISCUSS_LIST_GET + '_ON':
			state = {
				...state,
				discussInfo: {
					...state.discussInfo,
					isEnd: 1
				}
			};
			return state;
		case types.LIVE_ROOM_DISCUSS_LIST_GET + '_SUCCESS':
			currentPage = state.discussInfo.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'discuss_id');
			state = {
				...state,
				isFetching: 1,
				discussInfo: {
					...state.discussInfo,
					currentPage,
					totalPage,
					itemArr: [...state.discussInfo.itemArr, ...items.itemArr],
					itemObj: { ...state.discussInfo.itemObj, ...items.itemObj },
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					max_discuss_id: action.data.max_discuss_id
				}
			};
			return state;
		case types.LIVE_ROOM_DISCUSS_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'discuss_id');
			state = {
				...state,
				discussInfo: {
					...state.discussInfo,
					currentPage,
					totalPage,
					itemArr: items.itemArr,
					itemObj: items.itemObj,
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					max_discuss_id: action.data.max_discuss_id
				}
			};
			return state;
		case types.LIVE_ROOM_DISCUSS_LIST_GET + "_ERROR":
			state = {
				...state,
				discussInfo: {
					...state.discussInfo,
					isEnd: 3
				}
			};
			return state;
		// 讨论列表 接收推送过来的信息
		case types.LIVE_ROOM_ADD_CHAT_WEBSOCKET:
			id = action.data.chat_id;
			if (action.data.type == 2 && state.isFetching == 1) {
				state = {
					...state,
					discussInfo: {
						...state.discussInfo,
						itemArr: [id, ...state.discussInfo.itemArr],
						itemObj: { [id]: { ...action.data }, ...state.discussInfo.itemObj },
						totalCount: state.discussInfo.totalCount + 1
					}
				};
			}
			return state;
		case types.LIVE_ROOM_CLEAR_DISCUSS_LIST:
		case ROUTER_CHANGE:
			state = {
				...initialState
			};
			return state;
		default:
			return state;
	}
};