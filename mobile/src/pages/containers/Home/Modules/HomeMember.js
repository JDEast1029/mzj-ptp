import React, { Component, Fragment } from 'react';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
import { Toast } from 'antd-mobile';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Content from '@components/Home/Member/Content';

class Container extends Component {

	componentWillMount = () => {
		// Toast.loading('加载ing', 1);
	}

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, homeMember, location = {} } = this.props;
		const { query = {} } = location;
		const { listInfo } = homeMember;
		const { total_num } = listInfo;
		return (
			<WxSetTitle title={`群成员(${total_num || 0})`} back={false}>
				<Content
					actions={actions}
					listInfo={listInfo}
					query={query}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		homeMember: state.homeMember
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
