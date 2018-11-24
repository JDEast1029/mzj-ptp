const api = {
	// UPLOAD
	RC_URL_UPLOAD_IMG_POST: '/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
	RC_URL_UPLOAD_FILE_POST: '/uploadfile/upimg.json?action=uploadfile&encode=utf-8&code=xcx',
	// PGALLERY
	// 分类列表
	RC_URL_PGALLERY_PATHS_LIST_GET: '/uploadfile/getfolder.json',
	// 分类重命名 // post, cat_id, cat_name
	RC_URL_PGALLERY_PATHS_ITEM_RENAME_POST: '/uploadfile/rename-cat.json',
	// 分类删除 // post, cat_id
	RC_URL_PGALLERY_PATHS_ITEM_DEL_POST: '/uploadfile/del-cat.json',
	// 分类增加 // post, cat_name
	RC_URL_PGALLERY_PATHS_ITEM_ADD_POST: '/uploadfile/add-cat.json',
	// 图片列表 // get, cat_id, file_name
	RC_URL_PGALLERY_IMGS_LIST_GET: '/uploadfile/imglist.json',
	// 图片删除 // get, file_id
	RC_URL_PGALLERY_IMGS_ITEM_DEL_POST: '/uploadfile/del-img.json',
	// 图片上传地址（oss）
	RC_URL_PGALLERY_IMGS_UPLOAD_POST: '/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
	// 图片上传（oss回调图） // post, cat_id, file_id
	RC_URL_PGALLERY_IMGS_ITEM_ADD_POST: '/uploadfile/upload-img.json',
	// 图片上传（oss重命名） // get, file_id, file_name
	RC_URL_PGALLERY_IMGS_ITEM_RENAME_POST: '/uploadfile/rename-img.json',
	// 图片移动 // get, file_id, cate_id
	RC_URL_PGALLERY_IMGS_ITEM_MOVE_POST: '/uploadfile/move-img.json',

	RC_URL_PSELECTGOODS_LIST_GET: '/setting/setting/product-list.json'
};
export default api;
