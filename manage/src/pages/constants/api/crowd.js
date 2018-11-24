const api = {
	CROWD_LIST_GET: '/community/community/lists.json',
	CROWD_LIST_SILENT_GET: '/community/community/no-say.json',
	CROWD_LIST_CANCEL_SILENT_GET: '/community/community/say.json',
	CROWD_LIST_SET_MANAGE_POST: '/community/community/set-manage.json',
	CROWD_LIST_DISSOLVE_POST: '/community/community/disband.json',

	CROWD_CREATE_MEMBER_LOADER_GET: '/community/community/get-leader-set.json',
	_CROWD_CREATE_CHECK_NAME_GET: '/community/community/check-name.json',
	_CROWD_CREATE_SAVE_POST: '/community/community/save.json',
	// 详情
	_CROWD_EDIT_USER_GET: '/community/community/detail.json',
	// 编辑社群
	CROWD_EDIT_MEMBER_LIST_GET: '/community/community/detail.json',
	CROWD_EDIT_MEMBER_SET_POST: '/community/community/set-manage-one.json',
	CROWD_EDIT_MEMBER_ADD_POST: '/community/community/detail.json',
	// 编辑素材
	CROWD_EDIT_MATERIAL_LIST_GET: '/community/community/detail.json',
	CROWD_EDIT_MATERIAL_ADD_POST: '/community/community/detail.json',
	
	// 群发
	CROWD_MESSAGE_GET: '/material/material/material-list.json',
	// 群发信息
	_CROWD_MESSAGE_SUBMIT_POST: '/community/community/send-message.json',
	// 保存
	_CROWD_EDIT_USER_SAVE_POST: '/community/community/detail.json',

	// 群主设置
	_CROW_SETTING_INFO_GET: '/community/community/get-leader-set.json',
	_CROW_SETTING_INFO_SAVE_POST: '/community/community/leader-set.json',
	// 社群推广链接
	_CROW_INVITE_LINK_GET: '/community/community/invite.json',

};
export default api;
