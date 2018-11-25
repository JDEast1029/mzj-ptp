import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import TabsList from '@components/Home/Main/TabsList';

class Container extends Component {

	render() {
		const { actions, homeMain, location, commonInfo } = this.props;
		const { listInfo, isFetching = 0 } = homeMain;
		const { type = "1" } = location.query;

		return (
			<WxSetTitle title="不下款赔红包" style={{ height: window.innerHeight }}>
				<TabsList
					actions={actions}
					listInfo={listInfo}
					type={type}
				/>
			</WxSetTitle>
		);
	}
}

Container.childContextTypes = {
	socket: PropTypes.object,
	user_id: PropTypes.string
};

function mapStateToProps(state) {
	return {
		homeMain: state.homeMain,
		commonInfo: state.commonInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
