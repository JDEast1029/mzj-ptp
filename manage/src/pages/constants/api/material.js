const api = {
	// 获取素材列表
	'MATERIAL_LIST_GET': '/material/material/material-list.json',
	// 获取素材分类下拉框
	'MATERIAL_CATEGORY_SELECT_LIST_GET': '/material/category/category-select.json',
	// 删除素材列表中的删除按钮
	'MATERIAL_LIST_DEL_GET': '/material/material/material-del.json',
	// 删除 素材分类中的删除
	'MATERIAL_CATEGORY_LIST_DEL_GET': '/material/category/category-del.json',
	// 获取素材分类列表
	'MATERIAL_CATEGORY_LIST_GET': '/material/category/category-list.json',
	// 素材修改权重
	'MATERIAL_LIST_UPDATE_SORT_GET': '/material/category/change-sort.json',
	// 素材列表的弹框
	'MATERIAL_LIST_MODEL_MATERIAL_CHANGE_POST': '/material/material/material-change.json',
	// 素材分类的所有素材弹框
	'MATERIAL_CATEGORY_MODEL_MATERIAL_LIST_POST': '/material/category/category-change.json',
	// 素材分类的关联社群弹框
	'MATERIAL_CATEGORY_MODEL_COMMUNITY_LIST_POST': '/material/category/community-change.json',
	// 素材分类新建分类
	'MATERIAL_CATEGORY_MODEL_ADD_CATEGORY_POST': '/material/category/category-post.json',
	// 全员公告 提交
	'MATERIAL_NOTICE_POST': '/material/notice/notice.json',
	// 全员公告 获取
	'MATERIAL_NOTICE_INFO_GET': '/material/notice/notice-info.json'
	
};
export default api;

