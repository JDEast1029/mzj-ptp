import * as types from '@constants/actions/live';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initObj, initItem } from '@utils/utils';
const initialState = {
	isFetching: 0,            // 是否已经获取
	listInfo: {
		...initObj,
		totalCount: 0,
		max_chat_id: ''
	},
	audioChats: [],
	direction: 'DOWN',    // 加载方向 DOWN -> 下拉加载； UP -> 上拉加载
	gestureType: '1',
	bufferArr: [],       // 上拉加载时新推送过来的消息的缓存区
	bufferObj: {}        // 上拉加载时新推送过来的消息的缓存区
};

const getAudios = (chatList = []) => {
	return chatList.filter((item) => {
		return item.msg_type == 2;
	});
};

const systemTip = (state, action, id) => {
	let newState = {};
	if (state.direction === 'DOWN' 
		|| (state.direction === 'UP' && state.listInfo.isEnd == 2)) {
		// 1.下拉加载新消息直接加在尾部 2.上拉加载且已经加载完成，新消息加在尾部
	
		newState = {
			...state,
			listInfo: {
				...state.listInfo,
				itemArr: [...state.listInfo.itemArr, id],
				itemObj: { ...state.listInfo.itemObj, [id]: { ...action.data } }
			}
		};
	} else  if (state.direction === 'UP' && state.listInfo.isEnd == 0) {
		newState = {
			...state,
			bufferChat: [...state.bufferChat, id],
			bufferObj: { ...state.bufferObj, [id]: { ...action.data } }
		};
	}

	return newState;
};

export const liveRoomChat = (state = initialState, action) => {
	let items, currentPage, totalPage, isEnd, itemArr, itemObj, 
		id, audios, audioChats, bufferArr, bufferObj;
	switch (action.type) {
		case types.LIVE_ROOM_CHAT_LIST_GET + '_ON':
			state = {
				...state,
				isFetching: 1,
				listInfo: {
					...state.listInfo,
					isEnd: 1
				}
			};
			return state;
		case types.LIVE_ROOM_CHAT_LIST_GET + '_SUCCESS':
			currentPage = state.listInfo.currentPage + 1;
			totalPage = action.data.totalPage;
			isEnd = currentPage + 1 > totalPage ? 2 : 0;
			items = initItem(action.data.list, 'chat_id');
			audios = getAudios(action.data.list);

			audioChats = state.direction == 'DOWN' 
				? [...audios, ...state.audioChats]
				: [...state.audioChats, ...audios];
			itemArr = state.direction == 'DOWN' 
				? [...items.itemArr, ...state.listInfo.itemArr]
				: [...state.listInfo.itemArr, ...items.itemArr];
			itemObj = { ...state.listInfo.itemObj, ...items.itemObj };
			bufferArr = state.bufferArr;
			bufferObj = state.bufferObj;

			if (isEnd == 2) {
				itemArr = [...itemArr, ...state.bufferArr];
				itemObj = { ...itemObj, ...state.bufferObj };
				bufferArr = [];
				bufferObj = {};
			}
			
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr,
					itemObj,
					isEnd,
					totalCount: action.data.totalCount,
					max_chat_id: action.data.max_chat_id
				},
				audioChats,
				bufferArr,
				bufferObj
			};
			return state;
		case types.LIVE_ROOM_CHAT_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'chat_id');
			state = {
				...state,
				isFetching: 1,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr: items.itemArr,
					itemObj: items.itemObj,
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					max_chat_id: action.data.max_chat_id
				},
				gestureType: action.param.type,
				direction: action.param.type == 1 ? 'DOWN' : 'UP',
				bufferChat: [],  // 更换direction后清空缓存区
				bufferObj: {}
			};
			return state;
		case types.LIVE_ROOM_CHAT_LIST_GET + "_ERROR":
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 3
				}
			};
			return state;
		// 接受推送过来的消息
		case types.LIVE_ROOM_ADD_CHAT_WEBSOCKET:
			id = action.data.chat_id;
			if ((action.data.user_type == 2 || action.data.user_type == 3) && action.data.type == 1 ) {
				if (state.direction === 'DOWN' 
					|| (state.direction === 'UP' && state.listInfo.isEnd == 2)) {
					// 1.下拉加载新消息直接加在尾部 2.上拉加载且已经加载完成，新消息加在尾部
					state = {
						...state,
						listInfo: {
							...state.listInfo,
							itemArr: [...state.listInfo.itemArr, id],
							itemObj: { ...state.listInfo.itemObj, [id]: { ...action.data } }
						},
					};
					if (action.data.msg_type == 2) {
						state = {
							...state,
							audioChats: [...state.audioChats, action.data]
						};
					}
				} else  if (state.direction === 'UP' && state.listInfo.isEnd == 0) {
					state = {
						...state,
						bufferChat: [...state.bufferChat, id],
						bufferObj: { ...state.bufferObj, [id]: { ...action.data } }
					};
				}
			}
			return state;
		// 进入直播
		case types.LIVE_ROOM_ENTER_WEBSOCKET:	
		// 离开直播
		case types.LIVE_ROOM_QUIT_WEBSOCKET:
			id = action.data.chat_id;
			if (action.data.user_type == 2 || action.data.user_type == 3) {
				state = {
					...systemTip(state, action, id)
				};
			}
			return state;
		// 开始直播
		case types.LIVE_ROOM_BEGIN_WEBSOCKET:
		// 结束直播
		case types.LIVE_ROOM_END_WEBSOCKET:
		// 关闭禁言
		case types.LIVE_ROOM_OPEN_WEBSOCKET:
		// 开启禁言
		case types.LIVE_ROOM_CLOSE_WEBSOCKET:
		// 上/下架
		case types.LIVE_ROOM_CHANGE_SHELVES_WEBSOCKET:
			id = action.data.chat_id;
			state = {
				...systemTip(state, action, id)
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