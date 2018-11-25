import { DEV_WITH_SERVER } from './constants';
import _common from './api/_common';
import rc from './api/rc';
import home from './api/home';
import login from './api/login';

const API = {
	...rc,
	..._common,
	...home,
	...login
};


let baseUrl;
/* global __DEV__ */
if (__DEV__) {
	// 开发环境
	if (!DEV_WITH_SERVER) { // 开发环境-前端自模拟
		baseUrl = 'http://localhost:3000/api';
	} else { // 开发环境-后端数据
		baseUrl = `https://xqb.ruishan666.com`;
		// baseUrl = `http://xqb.xqb.com`;
	}
} else {
	// 生产环境
	baseUrl = `${location.origin}`;
}
for (let i in API) {
	API[i] = baseUrl + API[i];
}
export default API;
