/**
 * ajax
 * @param  {[type]} url     地址
 * @param  {[type]} method  请求类型
 * @param  {[type]} body    请求的参数
 * @param  {Object} options 扩展
 *
 */
import { ajaxFn } from 'wya-fetch';
import { Toast } from 'antd-mobile';
import { MToasts } from 'wya-rc';
// import { redirectToLogin } from '@router/auth';
import { delCookie, getCookie, delItem } from '@utils/utils';
const loadingFn = (msg) => {
	Toast.hide();
	Toast.loading(msg || '加载中...', 0);
};
const loadedFn = () => {
	Toast.hide();
};
const setCb = () => {

};
const otherCb = (response, resolve, reject) => {
	if (response.status == -1) {
		
		if (_global.device.weixin) {
			delCookie('user_info');
			MToasts.info('授权失败', 1, () => {
				window.location.reload();
			});
		} else {
			_global.history.replace('/error/client');
		}
	}
};
const opts = {
	requestType: 'form-data:json',
};
const ajax = ajaxFn(loadingFn, loadedFn, setCb, otherCb, opts);
let net = {
	ajax
};
export default net;