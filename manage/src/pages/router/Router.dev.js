import 'babel-polyfill';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import { initialState } from '../stores/stores';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';
import { defineProperty } from '../utils/utils';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/**
 * 暴露唯一全局的量
 */
import './_global.js';

/**
 * Dev
 */
import DevTools from '@components/DevTools/DevTools';
import { DEBUG } from '../constants/constants';

/**
 * pages
 */
import { routeConfig } from './routes.js';

const store = configureStore(initialState);

defineProperty(_global, 'history', syncHistoryWithStore(browserHistory, store));

class Root extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentDidCatch(error, info) {
	}
	render() {
		return (
			<Provider store={store}>
				<LocaleProvider locale={zh_CN}>
					<div>
						<Router history={_global.history} routes={routeConfig} />
						{/* {(DEBUG) ? <DevTools /> : null} */}
					</div>
				</LocaleProvider>
			</Provider>
		);
	}
}
render(<Root />, document.getElementById('pages'));

if (module.hot) { // 启用热更新
	module.hot.accept('./routes.js', () => {
		console.log('[HRM] routes.js Callback');
	});
}


