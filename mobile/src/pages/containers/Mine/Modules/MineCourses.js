import React, { Component, Fragment } from 'react';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/mine';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import Content from '@components/Mine/Courses/Content';
class Container extends Component {

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const { actions, mineCourses } = this.props;
		const { listInfo, isFetching = 0 } = mineCourses;
		return (
			<WxSetTitle title="我的课程">
				<Content
					actions={actions}
					listInfo={listInfo}
					isFetching={isFetching}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		mineCourses: state.mineCourses,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
