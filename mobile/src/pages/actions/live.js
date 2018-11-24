import * as types from '../constants/actions/live';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { navigator } from './_common/navigator';

/**
 * 直播消息
 */
export const addChatItem = (data) => {
	return {
		type: types.LIVE_ROOM_ADD_CHAT_WEBSOCKET,
		data
	};
};

/**
 * 进入直播间
 */
export const enterRoom = (data) => {
	return {
		type: types.LIVE_ROOM_ENTER_WEBSOCKET,
		data
	};
};

/**
 * 离开直播间
 */
export const leaveRoom = (data) => {
	return {
		type: types.LIVE_ROOM_QUIT_WEBSOCKET,
		data
	};
};

/**
 * 开始直播
 */
export const startLive = (data) => {
	return {
		type: types.LIVE_ROOM_BEGIN_WEBSOCKET,
		data
	};
};

/**
 * 结束直播
 */
export const endLive = (data) => {
	return {
		type: types.LIVE_ROOM_END_WEBSOCKET,
		data
	};
};

// 关闭聊天(即开启禁言)
export const closeChat = (data) => {
	return {
		type: types.LIVE_ROOM_CLOSE_WEBSOCKET,
		data
	};
};

// 开启聊天(即关闭禁言)
export const openChat = (data) => {
	return {
		type: types.LIVE_ROOM_OPEN_WEBSOCKET,
		data
	};
};

// 开启聊天(即关闭禁言)
export const changeShelves = (data) => {
	return {
		type: types.LIVE_ROOM_CHANGE_SHELVES_WEBSOCKET,
		data
	};
};

// 清除讨论列表
export const clearDiscussList = () => {
	return {
		type: types.LIVE_ROOM_CLEAR_DISCUSS_LIST
	};
};

export const liveRoomSearchInt = () => {
	return {
		type: types.LIVE_ROOM_SERACH_INIT,
	};
};

export const liveRoomSearchChange = (title) => {
	return {
		type: types.LIVE_ROOM_SEARCH_CHANGE,
		title
	};
};