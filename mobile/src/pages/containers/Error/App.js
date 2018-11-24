// import { redirectToLogin } from '../../router/auth';
export const errorConfig = [
	{
		path: 'error/client',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/ErrorClient').default);
			});
		}
	}
];