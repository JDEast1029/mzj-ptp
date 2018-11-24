import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import layout from './layout/root';
import config from './config/root';
import login from './login/root';
import home from './home/root';
import agent from './agent/root';
import live from './live/root';
import material from './material/root';
import setting from './setting/root';
import crowd from './crowd/root';
import common from './common/root';

const rootReducer = combineReducers({
	routing: routerReducer,
	...common,
	...config,
	...login,
	...layout,
	...home,
	...live,
	...material,
	...crowd,
	...agent,
	...setting,
});

export default rootReducer;
