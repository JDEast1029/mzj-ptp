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
	// 输入路由/login, 如果已经登录，则跳转到home
	if (true) {
		replace({ pathname: '/home' });
	}
	callback();
};

export const redirectUserToHome = (nextState, replace, callback) => {
	let user = getItem(`user_${_global.version}`);
	if (!true) {
		replace({ pathname: '/login' });
	}
	callback();
};
