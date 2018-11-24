import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/mine';
import * as types from '@constants/actions/mine';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';
// 业务组件
import Content from '@components/Mine/Main/Content';
class Container extends Component {

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, mineMain } = this.props;
		return (
			<WxSetTitle title="我的">
				<Content
					actions={actions}
					mineMain={mineMain}
				/>
				<Footer />
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		mineMain: state.mineMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
