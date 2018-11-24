import { redirectToIndex } from './auth';
import { homeConfig } from '../containers/Home/App';
import { materialConfig } from '../containers/Material/App';
import { liveConfig } from '../containers/Live/App';
import { mineConfig } from '../containers/Mine/App';
import { inviteConfig } from '../containers/Invite/App';
import { errorConfig } from '../containers/Error/App';

export const routeConfig = [
	...homeConfig,
	...materialConfig,
	...liveConfig,
	...mineConfig,
	...inviteConfig,
	...errorConfig,
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
