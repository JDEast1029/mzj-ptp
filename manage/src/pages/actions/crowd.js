import * as types from '../constants/actions/crowd';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';
export { navigator } from './_common/navigator';

export const crowdListSearch = () => {
	return {
		type: types.CROWD_LIST_SEARCH
	};
};

export const crowdCreateAddMember = (info) => {
	return {
		type: types.CROWD_CREATE_MEMBER_ADD,
		info
	};
};

export const crowdCreateDelMember = (id) => {
	return {
		type: types.CROWD_CREATE_MEMBER_DEL,
		id
	};
};

export const crowdCreateAddMemberInit = (info) => {
	return {
		type: types.CROWD_CREATE_MEMBER_ADD_INIT,
		info
	};
};

export const crowdCreateSetManage  = (data) => {
	return {
		type: types.CROWD_CREATE_MEMBER_SET_MANAGE,
		data
	};
};


export const crowdCreateAddMaterial = (info) => {
	return {
		type: types.CROWD_CREATE_MATERIAL_ADD,
		info
	};
};

export const crowdCreateDelMaterial = (id) => {
	return {
		type: types.CROWD_CREATE_MATERIAL_DEL,
		id
	};
};

export const crowdCreateInitMaterial = () => {
	return {
		type: types.CROWD_CREATE_MATERIAL_INIT
	};
};

// 编辑
export const crowdEditMemberSearch = () => {
	return {
		type: types.CROWD_EDIT_MEMBER_INIT
	};
};

// 群发
export const crowdMessageSearch = () => {
	return {
		type: types.CROWD_MESSAGE_SEARCH
	};
};

export const crowdMessageSelect = (id) => {
	return {
		type: types.CROWD_MESSAGE_SELECT,
		id
	};
};

export const crowdMessageInit = () => {
	return {
		type: types.CROWD_MESSAGE_SELECT_INIT
	};
};
