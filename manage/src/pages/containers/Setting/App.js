import { redirectUserToHome } from '../../router/auth';
export const settingConfig = [
	{
		path: '/setting',
		indexRoute: { onEnter: (nextState, replace) => replace('/setting/system') },
		childRoutes: [
			{
				path: 'system',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/SettingSystem').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'wechat',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/SettingWechat').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: '*',
				onEnter: (nextState, replace) => replace('/setting/system')
			}
		]
	}
];
