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
import { delCookie, getCookie, delItem } from '@utils/utils';

const loadingFn = (msg) => {
	Toast.hide();
	Toast.loading(msg || '加载中...', 0);
};
const loadedFn = () => {
	Toast.hide();
};

const otherFn = (res, resolve, reject) => {
	switch (res.status) {
		case -1:
			delItem(`user_${_global.version}`);
			_global.history.replace('/login');
			break;
		default:
			break;
	}
	
};
const defaultOptions = {
	onLoading: loadingFn,
	onLoaded: loadedFn,
	onOther: otherFn,
	requestType: 'form-data:json',
};

const ajax = ajaxFn(defaultOptions);
const net = {
	ajax
};
export default net;
