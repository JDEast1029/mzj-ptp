import * as types from '@constants/actions/home';
import * as commonTypes from '@constants/actions/_common';
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
	community: {},            // 群聊内容
	baseInfo: {},
};

const getAudios = (chatList = []) => {
	return chatList.filter((item) => {
		return item.msg_type == 2;
	});
};

const getIsForbid = (array = [], id) => {
	return array.findIndex((item) => item == id) > -1;
};

export const homeChatRoom = (state = initialState, action) => {
	let items, currentPage, totalPage, itemArr, id, audios, community_id;
	switch (action.type) {
		case commonTypes.BIND_USERID_POST + '_SUCCESS':
			state = {
				...state,
				baseInfo: {
					...state.baseInfo,
					...action.data
				},
				isFetching: action.data.error_code ? 0 : 1
			};
			return state;
		case types.HOME_CHAT_LIST_GET + '_ON':
			state = {
				...state,
				isFetching: 1,
				listInfo: {
					...state.listInfo,
					isEnd: 1
				}
			};
			return state;
		case types.HOME_CHAT_LIST_GET + '_SUCCESS':
			currentPage = state.listInfo.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'chat_sn');
			itemArr = [...items.itemArr, ...state.listInfo.itemArr];
			audios = getAudios(action.data.list);
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					currentPage,
					totalPage,
					itemArr,
					itemObj: { ...items.itemObj, ...state.listInfo.itemObj },
					isEnd: currentPage + 1 > totalPage ? 2 : 0,
					totalCount: action.data.totalCount,
					max_chat_id: action.data.max_chat_id || state.listInfo.max_chat_id
				},
				community: {
					...state.community,
					...action.data.community
				},
				audioChats: [...audios, ...state.audioChats]
			};
			return state;
		case types.HOME_CHAT_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'chat_sn');
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
					totalCount: action.data.totalCount
				},
			};
			return state;
		case types.HOME_CHAT_LIST_GET + "_ERROR":
			state = {
				...state,
				listInfo: {
					...state.listInfo,
					isEnd: 3
				}
			};
			return state;
		// 接受新的群聊内容
		case types.HOME_CHAT_ACCEPT_WEBSOCKET:
			id = action.data.chat_sn;
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
			if (action.data.msg_type == 4) {
				state = {
					...state,
					community: {
						...state.community,
						room_num: action.data.room_num
					}
				};
			}
			return state;
		// 群内直播已结束
		case types.HOME_CHAT_ALL_LIVE_END_WEBSOCKET:
			state = {
				...state,
				community: {
					...state.community,
					room_num: action.data.room_num,
					msg_id: action.data.msg_id,
				}
			};
			return state;
		// 开启禁言
		case types.HOME_CHAT_OPEN_FORBID_WEBSOCKET:
			community_id = state.community.community_id;
			state = {
				...state,
				community: {
					...state.community,
					is_no_say: getIsForbid(action.data.community_ids, community_id) ? '1' : '0'
				}
			};
			return state;
		// 关闭禁言
		case types.HOME_CHAT_CLOSE_FORBID_WEBSOCKET:
			community_id = state.community.community_id;
			state = {
				...state,
				community: {
					...state.community,
					is_no_say: getIsForbid(action.data.community_ids, community_id) ? '0' : '1'
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