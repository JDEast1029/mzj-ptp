import { redirectToIndex } from './auth';
import { homeConfig } from '../containers/Home/App';

export const routeConfig = [
	...homeConfig,
	// 授权回来后给后端发起请求
	{
		path: '/',
		onEnter: (nextState, replace) => replace('/home')
	},
	{
		path: '/auth',
		onEnter: redirectToIndex
	},
	// error
	{
		path: '*',
		onEnter: (nextState, replace) => replace('/home')
	}
];
