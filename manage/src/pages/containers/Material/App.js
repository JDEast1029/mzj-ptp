import { redirectUserToHome } from "../../router/auth";
export const materialConfig = [
	{
		path: "/material",
		indexRoute: {
			onEnter: (nextState, replace) => replace("/material/list")
		},
		childRoutes: [
			{
				path: "list",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/MaterialList").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "list/add",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/MaterialAdd").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "list/detail",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/MaterialDetail").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "category",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/MaterialCategory").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "notice",
				getComponent: (nextState, cb) => {
					require.ensure([], require => {
						cb(null, require("./Modules/MaterialNotice").default);
					});
				},
				onEnter: redirectUserToHome
			},
			{
				path: "*",
				onEnter: (nextState, replace) => replace("/material/list")
			}
		]
	}
];
