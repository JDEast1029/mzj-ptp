import { loginConfig } from '../containers/Login/App';
import { homeConfig } from '../containers/Home/App';
import { agentConfig } from '../containers/Agent/App';
import { crowdConfig } from '../containers/Crowd/App';
import { materialConfig } from '../containers/Material/App';
import { liveConfig } from '../containers/Live/App';
import { settingConfig } from '../containers/Setting/App';
import Layout from './Layout';
export const routeConfig = [
	// 登录首页
	{
		path: '/',
		component: Layout,
		indexRoute: { onEnter: (nextState, replace) => replace('/home/main') },
		childRoutes: [
			...homeConfig,
			...agentConfig,
			...crowdConfig,
			...materialConfig,
			...liveConfig,
			...settingConfig,
		]
	},
	...loginConfig,
	// 授权回来后给后端发起请求
	// {
	// 	path: '/',
	// 	onEnter: (nextState, replace) => replace('/login')
	// },
	// error
	{
		path: '*',
		onEnter: (nextState, replace) => replace('/login')
	}
];
