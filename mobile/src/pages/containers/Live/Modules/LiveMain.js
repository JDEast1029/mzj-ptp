import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// reudx
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as creators from "@actions/live";
import * as types from "@constants/actions/live";
// 公用组件
import WxSetTitle from "@components/_common/SetTitle/WxSetTitle/WxSetTitle";
import Footer from "@components/_common/Footer/Footer";

// 业务组件
import Main from "@components/Live/Main/Content";
import Filter from "@components/Live/Main/Filter";
class Container extends Component {
	componentWillUnmount() {
		this.props.actions.navigator();
	}
	render() {
		const { actions, liveMain } = this.props;
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { listInfo, title, isFetching } = liveMain;
		const community_title = query.community_name ? `${query.community_name}的群直播` : "直播列表";
		return (
			<WxSetTitle
				title={community_title}
				className="g-flex g-fd-c"
				back={false}
			>
				<div style={{ height: _global.innerHeight - 50 }}>
					<Filter
						actions={actions}
						getInfo={this.getInfo}
						title={title}
					/>
					<Main
						isFetching={isFetching}
						actions={actions}
						listInfo={listInfo}
						title={title}
						query={query}
						isname={query.community_name}
					/>
				</div>
				{query.community_name ? null : <Footer />}
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		liveMain: state.liveMain,
		routing: state.routing
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
