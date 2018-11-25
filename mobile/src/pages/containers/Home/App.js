import { redirectUserToHome } from '../../router/auth';
export const homeConfig = [
	{
		path: 'home',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeMain').default);
			});
		},
		onEnter: redirectUserToHome
	},
];
