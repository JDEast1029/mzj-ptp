const api = {
	'_COMMON_AGENT_LIST_GET': '/user/user/public.json',
	// 音频弹窗
	'_COMMON_AUDIO_LIST_GET': '/uploadfile/audio-list.json',
	'_COMMON_AUDIO_ADD_SAVE_POST': '/uploadfile/save-audio.json',
	'_COMMON_AUDIO_DEL_POST': '/uploadfile/del-audio.json',
	// 首页log操作模块下拉菜单
	COMMON_OPERATE_MODULE_GET: '/setting/log/log-select.json',
	// 素材分类列表
	_COMMON_CATEGORY_LIST_GET: '/material/category/public-list.json',
	// 社群列表
	_COMMON_CROWD_LIST_GET: '/community/community/public-lists.json',
	// 素材列表
	_COMMON_MATERIAL_LIST_GET: '/material/material/public-list.json',
	COMMON_INFO_GET: '/community/community/public-lists.json',
	// 素材列表下拉
	_COMMON_CATEGORY_SELECT_LIST_GET: '/material/category/category-select.json',
	// 图片上传接口
	_COMMON_IMG_UPLOAD: '/uploadfile/upimg.json?action=uploadfile&encode=utf-8&code=xqb',
	// 刷新邀请链接
	_COMMON_REFRESH_INVITE_LINK_GET: '/community/community/refresh.json'
};
export default api;
