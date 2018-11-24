import { redirectToLogin } from '../../router/auth';
export const homeConfig = [
	{
		path: 'home',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeMain').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'home/member',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeMember').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'home/member/detail',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeMemberDetail').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'home/materiallist',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeMaterialList').default);
			});
		},
		onEnter: redirectToLogin
	},
	{
		path: 'home/room',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/HomeChatRoom').default);
			});
		},
		onEnter: redirectToLogin
	}

];
