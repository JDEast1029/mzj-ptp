const api = {
	// 绑定会员ID
	BIND_USERID_POST: '/public/bind.json',
	// 上传图片和语言
	_UPLOAD_MEDIA_POST: '/public/upload.json',
	// UPLOAD
	_UPLOAD_IMG_POST: '/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
	_UPLOAD_FILE_POST: '/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=xcx',
	_GOODS_LIST_GET: '/product/product/list.json', //
	_USER_LEVEL: '/user/user/add-level.json', // 用户等级
	_ACCESS_TOKEN_GET: '/home/home/get-token.json',
	_XCX_CODE_POST: '/home/home/get-wxacode.json',
	_XCX_CODE_UNLIMIT_POST: '/home/home/get-wxacode-unlimit.json',
	_XCX_CODE_SHOP_POST: '/home/home/get-shop-wx-code.json', // 店铺设置进去首页
	_XCX_QR_CODE_POST: '/home/home/create-wxa-qrcode.json',
	_PSELECTGOODS_LIST_GET: '/product/product/list.json',
	_PSELECTGOODS_ACTIVITY_LIST_GET: '/product/product/activity-product-list.json',
	_PSELECTGOODS_SKU_GET: '/product/product/sku-list.json',
	_PSELECTGOODS_SELECT_INFO_GET: '/product/product/selected-product-list.json',
	_PGOODS_INFO_GET: '/product/product/get-product-info.json',
	_PGOODS_EDIT_POST: '/product/product/update.json',
	_PGOODS_ADD_POST: '/product/product/add.json',
	_PGOODS_DEL_POST: '/product/product/del.json',
	_PSELECTCOUPON_LIST_GET: '/marketing/coupon/component-list.json', // 有效的优惠券列表
	_DIYSELECTCOUPON_LIST_GET: '/marketing/coupon/component-list.json', // 优惠券列表
	_ADDRESS_DATA_GET: '/public/get-regions.json',
	_WECHAT_SHARE: '/public/get-sign.json', // 微信授权地址
};
export default api;

