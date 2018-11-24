import { redirectUserToHome } from '../../router/auth';
export const agentConfig = [
	{
		path: '/agent',
		indexRoute: { onEnter: (nextState, replace) => replace('/agent/list') },
		childRoutes: [
			{
				path: 'list',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/AgentList').default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: '*',
				onEnter: (nextState, replace) => replace('/agent/list')
			}
		]
	}
];
