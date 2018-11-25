import { redirectToIndex } from './auth';
import { homeConfig } from '../containers/Home/App';
import { loginConfig } from '../containers/Login/App';

export const routeConfig = [
	...homeConfig,
	...loginConfig,
	// 授权回来后给后端发起请求
	{
		path: '/',
		onEnter: (nextState, replace) => replace('/home')
	},
	// error
	{
		path: '*',
		onEnter: (nextState, replace) => replace('/home')
	}
];
