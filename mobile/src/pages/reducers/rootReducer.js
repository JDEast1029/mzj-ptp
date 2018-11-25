import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from './common/root';
import home from './home/root';

const rootReducer = combineReducers({
	routing: routerReducer,
	...common,
	...home,
});

export default rootReducer;
