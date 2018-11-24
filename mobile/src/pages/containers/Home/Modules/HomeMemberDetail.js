import React, { Component, Fragment } from "react";
// reudx
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as creators from "@actions/home";
import { getCookie } from "@utils/utils";
import PropTypes from "prop-types";

// 公用组件
import WxSetTitle from "@components/_common/SetTitle/WxSetTitle/WxSetTitle";
// 业务组件
import Content from "@components/Home/MemberDetail/Content";

class Container extends Component {

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { actions, menberdetail } = this.props;

		return (
			<WxSetTitle title="个人资料" back={false}>
				<Content
					actions={actions}
					query={query}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		menberdetail: state.menberdetail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
