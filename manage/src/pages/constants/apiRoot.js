import { DEV_WITH_SERVER } from './constants';
import _common from './api/_common';
import login from './api/login';
import home from './api/home';
import live from './api/live';
import agent from './api/agent';
import material from './api/material';
import crowd from './api/crowd';
import setting from './api/setting';
import rc from './api/rc';

const API = {
	...rc,
	..._common,
	...login,
	...home,
	...live,
	...agent,
	...material,
	...setting,
	...crowd
};

let baseUrl;
/* global __DEV__ */
if (__DEV__) {
	// 开发环境
	if (!DEV_WITH_SERVER) { // 开发环境-前端自模拟
		baseUrl = 'http://localhost:3000/api';
	} else { // 开发环境-后端数据
		baseUrl = `https://managexqb.ruishan666.com`;
	}
} else {
	// 生产环境
	baseUrl = `${location.origin}`;
}
for (let i in API) {
	API[i] = baseUrl + API[i];
}
export default API;
