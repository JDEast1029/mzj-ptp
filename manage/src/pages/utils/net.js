/**
 * ajax
 * @param  {[type]} url     地址
 * @param  {[type]} method  请求类型
 * @param  {[type]} body    请求的参数
 * @param  {Object} options 扩展
 *
 */
import { ajaxFn } from 'wya-fetch';
import { message } from 'antd';
import { clearLoginAuth } from '@router/auth';
import { delCookie, getCookie, delItem } from '@utils/utils';
const loadingFn = (msg) => {
	message.destroy();
	message.loading(msg || '加载中...', 0);
};
const loadedFn = () => {
	message.destroy();
};
const setCb = () => {

};
const otherCb = (response, resolve, reject) => {
	if (response.status == -1) {
		clearLoginAuth();
		message.info('登录失效，请重新登录!');
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