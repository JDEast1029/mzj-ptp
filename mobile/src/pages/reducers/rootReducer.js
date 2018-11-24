import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from './common/root';
import home from './home/root';
import live from './live/root';
import material from './material/root';
import mine from './mine/root';
import invite from './invite/root';

const rootReducer = combineReducers({
	routing: routerReducer,
	...common,
	...home,
	...live,
	...material,
	...mine,
	...invite
});

export default rootReducer;
