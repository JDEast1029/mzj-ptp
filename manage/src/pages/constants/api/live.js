const api = {
	// 讲师管理
	LIVE_LECTURER_LIST_GET: '/room/lecturer/list.json',
	LIVE_LECTURER_EDIT_POST: '/room/lecturer/add.json',
	LIVE_LECTURER_DEL_POST: '/room/lecturer/del.json',
	LIVE_LECTURER_DETAIL_GET: '/room/lecturer/lecturer-info.json',
	// 直播列表
	LIVE_LIST_LIST_GET: "/room/room/get-list.json",
	// 直播下架/上架
	LIVE_LIST_ON_SHELVES_GET: '/room/room/on-shelves.json',
	// 直播新建页面
	LIVE_ADD_ROOM_POST: '/room/room/save-room.json',
	// 直播编辑页面
	LIVE_EDIT_ROOM_GET: '/room/room/room-info.json',
	// 直播列表的权重值
	LIVE_LIST_UPDATE_SORT_POST: '/room/room/update-sort.json',
	// 直播 删除直播
	LIVE_LIST_ROOM_DEL_POST: '/room/room/delete.json',
	// 直播 获取讲师列表
	LIVE_LIST_ROOM_LECTURER_LIST_GET: '/room/lecturer/get-lecturer-name-by-id.json',
	// 直播 获取讲师简介
	LIVE_LIST_ROOM_LECTURER_INFO_GET: '/room/lecturer/get-lecturer-info.json',
	// 直播 获取社群列表
	LIVE_LIST_ROOM_COMMUNITY_LIST_GET: '/community/community/public-lists.json',
	MATERIAL_ADD_POST: '/material/material/material-post.json',
	MATERIAL_DETAIL_GET: '/material/material/material-get.json',
	_MATERIAL_CATEGORY_LIST_GET: '/material/category/category-list.json',
	_LIVE_MAIN_LIST_SHARECODE_GET: '/room/room/qr-code.json',
};
export default api;
