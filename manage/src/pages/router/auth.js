import {
	getCookie,
	setCookie,
	delCookie,
	setItem,
	getItem,
	delItem
} from "@utils/utils";

export const redirectToLogin = (nextState, replace, callback) => {
	let user = getItem(`user_${_global.version}`);
	let account = getCookie('account');  // 该cookie由后台设置，用来判断登录是否失效
	// 输入路由/login, 如果已经登录，则跳转到home
	if (user && account) {
		replace({ pathname: '/home' });
	}
	callback();
};

export const redirectUserToHome = (nextState, replace, callback) => {
	let user = getItem(`user_${_global.version}`);
	// if (!user) {
	// 	replace({ pathname: '/login' });
	// }
	callback();
};

/**
 * 设置登录状态
 *
 * @param {*} data
 * @param {*} opts
 */
export const createLoginAuth = (
	data = {},
	replace = true,
	opts = {},
	jump = true,
	callback
) => {
	_global.user = data.user;
	_global.auth = data.auth;
	_global.safe = data.safe;
	replace && setItem(`user_${_global.version}`, data);
	replace && jump && _global.history.replace("/home");
	callback && callback();
};

/**
 * 清除登录状态
 * @param {*} opts
 */
export const clearLoginAuth = (opts = {}) => {
	_global.user = {};
	_global.auth = {};
	_global.safe = {};

	delCookie("is_showed");
	delItem(`user_${_global.version}`);
	_global.history.replace("/login");
};
