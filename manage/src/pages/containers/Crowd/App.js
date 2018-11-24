import { redirectUserToHome } from '../../router/auth';
export const crowdConfig = [
	{
		path: '/crowd',
		indexRoute: { onEnter: (nextState, replace) => replace('/crowd/list') },
		childRoutes: [
			{
				path: 'list',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdList').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/create-one',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdCreateUser').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/create-two',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdCreateMember').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/create-three',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdCreateMaterial').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/edit-one',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdEditUser').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/edit-two',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdEditMember').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'list/edit-three',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdEditMaterial').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'message',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdMessage').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: 'setting',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/CrowdSetting').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: '*',
				onEnter: (nextState, replace) => replace('/crowd/list')
			}
		]
	}
];
