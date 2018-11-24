import { redirectToLogin } from '../../router/auth';
export const inviteConfig = [
	{
		path: 'invite',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/InviteMain').default);
			});
		},
		onEnter: redirectToLogin
	},
];