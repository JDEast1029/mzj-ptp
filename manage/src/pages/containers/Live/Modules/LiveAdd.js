import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as LiveActions from "@actions/live";
// 组件
import SetTitle from "@components/_common/SetTitle/SetTitle";
import AddLive from "@components/Live/List/AddLive";

class App extends Component {
	constructor(...params) {
		super(...params);
	}

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { liveList, actions, layoutActions, location } = this.props;
		const classes = "g-container g-bg-white";
		const { page = 1, ...reset } = query || {};
		const title = location.state !== undefined  ? "编辑直播" : "新建直播";
		
		return (
			<SetTitle
				title={title}
				className={classes}
				style={{ paddingBottom: 50 }}
			>
				<AddLive actions={actions} query={query} location = {location} />
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		liveList: state.liveList,
		routing: state.routing
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(LiveActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
