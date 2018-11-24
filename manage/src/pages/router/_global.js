
/**
 * 全部变量初始化及使用
 */
import ReactDOM from 'react-dom';
import { getItem, setItem, delItem, getCookie, getDevice, getParseUrl, getUrlParam, defineProperty } from '../utils/utils';
import { RcInstance } from 'wya-rc';
import API_ROOT from '@constants/apiRoot';
import { createLoginAuth } from './auth';

typeof window === "object" ? window.BROWSER = true : window.BROWSER = false;
/**
 * 主要目的是禁止随意操作全局对象
 */
let GLOBAL_OBJECT = new Proxy({}, {
	get: (obj, key) => {
		if (!(key in obj)) {
			throw new Error(`${key} isn't in _global`);
		}
		return obj[key];
	},
	set: (obj, key, value) => {
		if (key in obj) {
			obj[key] = value;
			return true;
		};
		throw new Error(`_global had inited, so you can't add key with '${key}'`);
	}
});

BROWSER ? window._global = GLOBAL_OBJECT : this._global = GLOBAL_OBJECT;
BROWSER ? window.__DEV__ = process.env.NODE_ENV : this.__DEV__ = process.env.NODE_ENV;
/**
 * hack
 * 移动端的延迟 location
 */
defineProperty(_global, 'tag', false);
/**
 * 环境
 */
defineProperty(_global, 'env', process.env.NODE_ENV);
/**
 * 缩放比例
 */
defineProperty(_global, 'scale', 1);
/**
 * 全局状态
 */
defineProperty(_global, 'config', {});
/**
 * 用于缓存的版本的管理
 */
defineProperty(_global, 'version', '1.0');
/**
 * 记忆滚动
 */
defineProperty(_global, 'scroll', {});
/**
 * ios中微信支付的坑
 * 获取第一次加载的页面pathname值
 */
defineProperty(_global, 'landingPage', location.pathname);
/**
 * ios中微信分享的坑
 * 已修复，可以无视
 */
defineProperty(_global, 'landingSharePage', `${location.origin}${location.pathname}${location.search}`);
/**
 * GUID
 */
defineProperty(_global, 'GUID', location.host.split(".")[0]);
/**
 * APIS组件的清理
 * @return {}
 */

defineProperty(_global, 'APIS', {});
/**
 * 用户信息
 */
defineProperty(_global, 'user', {});
defineProperty(_global, 'auth', {});
defineProperty(_global, 'safe', {});
createLoginAuth(getItem(`user_${_global.version}`) || {}, false);

/**
 * 设备信息状态
 */
defineProperty(_global, 'device', getDevice());
defineProperty(_global, 'innerWidth', BROWSER ? window.innerWidth : 0);
defineProperty(_global, 'innerHeight', BROWSER ? window.innerHeight : 0);
defineProperty(_global, 'initApis', () => {
	for (let i in _global.APIS) {
		if (_global.APIS[i] && _global.APIS.hasOwnProperty(i)) {
			ReactDOM.unmountComponentAtNode(_global.APIS[i]);
			document.body.removeChild(_global.APIS[i]);
			delete _global.APIS[i];
		}
	}
	RcInstance.clean();
});
/**
 * 重复点击侧边栏的时候，重置antd表单内容
 */
defineProperty(_global, 'form', undefined);
defineProperty(_global, 'initForm', () => {
	_global.form && _global.form.resetFields();
});

/**
 * 如果带#号键，用hashchange
 */
window.addEventListener('popstate', function (e) {
	/**
	 *清理缓存
	 */
	delItem('sku_goods');
	delItem('sku_selected');
	// 页面初始化，卸载组件，同样不使得存在内存中；
	_global.initApis();
}, false);

// 只需要注册一次
RcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: API_ROOT['RC_URL_UPLOAD_IMG_POST'],
		URL_UPLOAD_FILE_POST: API_ROOT['RC_URL_UPLOAD_FILE_POST']
	},
	PGallery: {
		// 分类列表
		URL_PGALLERY_PATHS_LIST_GET: API_ROOT['RC_URL_PGALLERY_PATHS_LIST_GET'],
		// 分类重命名 // post, cat_id, cat_name
		URL_PGALLERY_PATHS_ITEM_RENAME_POST: API_ROOT['RC_URL_PGALLERY_PATHS_ITEM_RENAME_POST'],
		// 分类删除 // post, cat_id
		URL_PGALLERY_PATHS_ITEM_DEL_POST: API_ROOT['RC_URL_PGALLERY_PATHS_ITEM_DEL_POST'],
		// 分类增加 // post, cat_name
		URL_PGALLERY_PATHS_ITEM_ADD_POST: API_ROOT['RC_URL_PGALLERY_PATHS_ITEM_ADD_POST'],
		// 图片列表 // get, cat_id, file_name
		URL_PGALLERY_IMGS_LIST_GET: API_ROOT['RC_URL_PGALLERY_IMGS_LIST_GET'],
		// 图片删除 // get, file_id
		URL_PGALLERY_IMGS_ITEM_DEL_POST: API_ROOT['RC_URL_PGALLERY_IMGS_ITEM_DEL_POST'],
		// 图片上传地址（oss）
		URL_PGALLERY_IMGS_UPLOAD_POST: API_ROOT['RC_URL_PGALLERY_IMGS_UPLOAD_POST'],
		// 图片上传（oss回调图） // post, cat_id, file_id
		URL_PGALLERY_IMGS_ITEM_ADD_POST: API_ROOT['RC_URL_PGALLERY_IMGS_ITEM_ADD_POST'],
		// 图片上传（oss重命名） // get, file_id, file_name
		URL_PGALLERY_IMGS_ITEM_RENAME_POST: API_ROOT['RC_URL_PGALLERY_IMGS_ITEM_RENAME_POST'],
		// 图片移动 // get, file_id, cate_id
		URL_PGALLERY_IMGS_ITEM_MOVE_POST: API_ROOT['RC_URL_PGALLERY_IMGS_ITEM_MOVE_POST'],
		EXT_PGALLERY_IMG_SRC_SUF: '!1-0'
	},
	PSelectGoods: {
		URL_PSELECTGOODS_LIST_GET: API_ROOT['RC_URL_PSELECTGOODS_LIST_GET'],
	}
});

