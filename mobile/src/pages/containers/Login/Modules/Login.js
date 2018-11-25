import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Main from '@components/Login/Main';

class Container extends Component {

	render() {
		const { actions } = this.props;

		return (
			<WxSetTitle title="登录" style={{ height: window.innerHeight }}>
				<Main
					actions={actions}
				/>
			</WxSetTitle>
		);
	}
}


export default Container;
