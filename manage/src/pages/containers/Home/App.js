import { redirectUserToHome } from '../../router/auth';
export const homeConfig = [
	{
		path: "/home",
		indexRoute: { onEnter: (nextState, replace) => replace("/home/main") },
		childRoutes: [
			{
				path: "main",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/HomeMain").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "log",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/HomeLog").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "*",
				onEnter: (nextState, replace) => replace("/home/main")
			}
		]
	}
];
