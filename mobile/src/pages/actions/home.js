import * as types from "../constants/actions/home";
/**
 * 引入共用的action
 * ajax
 */
export { request } from "./_common/request";
export { navigator } from "./_common/navigator";
// 公告变化
export const updateNotice = data => {
	return {
		type: types.HOME_MAIN_NOTICE_UPDATE_WEBSOCKET,
		data
	};
};
// 监听新加社群时-add
export const changeList = data => {
	return {
		type: types.HOME_MAIN_LIST_ADD_WEBSOCKET,
		data
	};
};

export const memberSearchInit = data => {
	return {
		type: types.HOME_MEMBER_SEARCH_INIT,
		data
	};
};

export const materialListSearchInit = title => {
	return {
		type: types.MATERIAL_LIST_SEARCH_INIT,
		title
	};
};

export const materialListInit = title => {
	return {
		type: types.MATERIAL_LIST_INIT
	};
};

export const materialShartInit = title => {
	return {
		type: types.MATERIAL_SHARE_SELECT_CHANGE_INIT
	};
};

export const homeMaterialListSelect = community_id => {
	return {
		type: types.MATERIAL_SHARE_SELECT_CHANGE,
		community_id
	};
};

/**
 * 添加推送过来的群聊信息
 * @param data
 * @returns {{type: string, data: *}}
 */
export const addChatItem = data => {
	return {
		type: types.HOME_CHAT_ACCEPT_WEBSOCKET,
		data
	};
};

/**
 * 群聊中的直播全部结束
 */
export const allLiveEnd = data => {
	return {
		type: types.HOME_CHAT_ALL_LIVE_END_WEBSOCKET,
		data
	};
};

/**
 * 开启禁言
 */
export const openForbid = data => {
	return {
		type: types.HOME_CHAT_OPEN_FORBID_WEBSOCKET,
		data
	};
};

/**
 * 关闭禁言
 */
export const closeForbid = data => {
	return {
		type: types.HOME_CHAT_CLOSE_FORBID_WEBSOCKET,
		data
	};
};
