import { redirectToLogin } from '../../router/auth';
export const liveConfig = [
	{
		path: 'live',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/LiveMain').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'live/room',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/LiveRoom').default);
			});
		},
		onEnter: redirectToLogin
	}
];