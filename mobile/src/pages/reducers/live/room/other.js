import * as types from '@constants/actions/live';
import * as commonTypes from '@constants/actions/_common';
import { ROUTER_CHANGE } from '@constants/actions/_common';
const initialState = {
	isFetching: 0,            // 是否已经获取
	userInfo: {},             // 用户信息 
	roomInfo: {               // 直播间详情
		speak_forbid: 0,      // 是否禁言
		people_num: 0,        // 参与直播的人数
		latest_discuss: []
	}
};
export const liveRoomOther = (state = initialState, action) => {
	let people_num, latest_discuss;
	switch (action.type) {
		// 绑定user_id
		case commonTypes.BIND_USERID_POST + '_SUCCESS':
			if (!action.data.error_code) {
				state = {
					...state,
					userInfo: {
						...state.userInfo,
						...action.data,
						isBinded: true
					}
				};
			}
			return state;
		// 直播间详情
		case types.LIVE_ROOM_INFO_GET + "_SUCCESS":
			state = {
				...state,
				roomInfo: {
					...state.roomInfo,
					...action.data,
					latest_discuss: [...action.data.last_discuss]
				}
			};
			return state;
		// 关闭禁言
		case types.LIVE_ROOM_OPEN_WEBSOCKET:
			state = {
				...state,
				roomInfo: {
					...state.roomInfo,
					speak_forbid: 0
				}
			};
			return state;
		// 开启禁言
		case types.LIVE_ROOM_CLOSE_WEBSOCKET:
			state = {
				...state,
				roomInfo: {
					...state.roomInfo,
					speak_forbid: 1
				}
			};
			return state;
		// 进入直播
		case types.LIVE_ROOM_ENTER_WEBSOCKET:
		// 离开直播
		case types.LIVE_ROOM_QUIT_WEBSOCKET:
			people_num = action.data.people_num || 0;
			state = {
				...state,
				roomInfo: {
					...state.roomInfo,
					people_num
				}
			};
			return state;
		// 上/下架
		case types.LIVE_ROOM_CHANGE_SHELVES_WEBSOCKET:
			state = {
				...state,
				roomInfo: {
					...state.roomInfo,
					on_shelves: action.data.on_shelves
				}
			};
			return state;
		// 最新三条讨论 接收推送过来的信息
		case types.LIVE_ROOM_ADD_CHAT_WEBSOCKET:
			latest_discuss = [...state.roomInfo.latest_discuss, action.data];
			if (action.data.type == 2 || (action.data.user_type == 1 && action.data.type == 1)) {
				state = {
					...state,
					roomInfo: {
						...state.roomInfo,
						latest_discuss: latest_discuss.length <= 3 ? latest_discuss : latest_discuss.splice(1, 3)
					}
				};
			}
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