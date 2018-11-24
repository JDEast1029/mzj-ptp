import { redirectUserToHome } from '../../router/auth';
export const liveConfig = [
	{
		path: '/live',
		indexRoute: { onEnter: (nextState, replace) => replace('/live/list') },
		childRoutes: [
			{
				path: 'list',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/LiveList').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'lecturer',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/LiveLecturer').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/add',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/LiveAdd').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: '*',
				onEnter: (nextState, replace) => replace('/live/list')
			}
		]
	}
];
