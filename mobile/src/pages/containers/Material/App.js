import { redirectToLogin } from '../../router/auth';
export const materialConfig = [
	{
		path: 'material',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MaterialMain').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'material/list',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MaterialList').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'material/detail',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MaterialDetail').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'material/share',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/MaterialShare').default);
			});
		},
		onEnter: redirectToLogin
	},
];