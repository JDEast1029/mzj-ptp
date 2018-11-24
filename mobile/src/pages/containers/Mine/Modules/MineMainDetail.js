import React, { Component, Fragment } from 'react';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/mine';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Content from '@components/Mine/Main/Detail/Content';
class Container extends Component {
	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, mineMain = {} } = this.props;
		const { data = {}, isFetching = 0 } = mineMain;
		return (
			<WxSetTitle title="个人资料" back={false} >
				<Content
					actions={actions}
					data={data}
					isFetching={isFetching}
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
