import { setCookie, delCookie, getCookie, hashUrl, getUrlParam } from '@utils/utils';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
import { MToasts } from 'wya-rc';
const AUTH_TO = "/auth/get-url.json";
const AUTH_BACK = "/auth/get-code.json";
/**
 * 重定向到授权登录
 */
export const redirectToAuth = (nextState) => {
	let param = {
		url: `${nextState.location.pathname}${nextState.location.search}`,
		wx_type: "1",
	};
	net.ajax({
		url: AUTH_TO,
		type: 'GET',
		param
	}).then((res) => {
		// let url = `http://${location.hostname}:88/auth?url=${nextState.location.pathname}${nextState.location.search}`;
		location.href = res.data.url; // open.weixin.com?....
	}).catch((res) => {
		MToasts.info(res.msg, 1.5);
	});
	
};

/**
 * 未登录
 * 成功设置cookie，
 * error就去跳转到授权页面
 */
const promiseAuthCb = () => {
	return new Promise((resolve, reject) => {
		let param = {
			code: getUrlParam('code')
		};
		net.ajax({
			url: AUTH_BACK,
			type: 'GET',
			param,
		}).then((res) => {
			resolve(res);
		}).catch((res) => {
			MToasts.info(res.msg, 1.5);
			reject(res);
		});
	});
};

/**
 * 获取用户的登录状态信息
 * @param nextState 
 */
export const loggedIn = (nextState) => {
	let state = false; // 未登录
	let authInfo = getCookie('user_info');
	if (authInfo) {
		state = true;
	}
	return state;
};

/**
 * 定向路由-用户已登录-用户端首页
 */

export const redirectToLogin = async (nextState, replace, callback) => {
	if (!loggedIn(nextState) && _global.device.weixin && process.env.NODE_ENV === "production") { // 未登陆（未授权）
		// 去授权登录
		redirectToAuth(nextState);
		// callback('未登录');
		return;
	}
	callback();
};

/**
 * 重定向路由-用户已登录-用户端首页
 */
export const redirectToIndex = async (nextState, replace, callback) => {
	// 授权回来的地址 /auth/index
	if (loggedIn(nextState)) { 
		// 指定链接，否则之前授权后再授权的就会去‘/’
		replace('/home');	
		callback();
	} else {
		try {
			let res = await promiseAuthCb();
			// _global.config = await promiseGlobalCb();
			// replace(`${res.data.url || '/shop/'}`);
			location.href = `${res.data.url || '/auth'}`; // wechat share hack
			callback();
		} catch (err) {
			// redirectToAuth(nextState);
			callback('未登录');
		}
	}
};