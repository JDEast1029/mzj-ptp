import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layout from './layout/root';
import login from './login/root';
import home from './home/root';
import common from './common/root';

const rootReducer = combineReducers({
	routing: routerReducer,
	...common,
	...login,
	...layout,
	...home,
});

export default rootReducer;
