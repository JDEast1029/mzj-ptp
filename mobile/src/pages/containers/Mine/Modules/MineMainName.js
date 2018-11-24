import React, { Component, Fragment } from 'react';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/mine';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Content from '@components/Mine/Main/Name/Content';
class Container extends Component {
	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, mineMain, location: { query = {} } } = this.props;
		return (
			<WxSetTitle title="更改名称">
				<Content
					actions={actions}
					data={query}
				/>
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
