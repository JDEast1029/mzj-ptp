import { redirectToLogin } from '../../router/auth';
export const mineConfig = [
	{
		path: 'mine',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MineMain').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'mine/detail',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MineMainDetail').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'mine/name',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MineMainName').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'mine/courses',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MineCourses').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'mine/collect',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MineCollect').default);
			});
		},
		onEnter: redirectToLogin
	}
];