import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/invite';
import * as types from '@constants/actions/invite';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Content from '@components/Invite/Main/Content';

class Container extends Component {

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, inviteMain, location = {} } = this.props;
		const { query = {} } = location;
		const { data, isFetching = 0 } = inviteMain;
		return (
			<WxSetTitle title="邀请函">
				<Content
					actions={actions}
					data={data}
					query={query}
					isFetching={isFetching}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		inviteMain: state.inviteMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
