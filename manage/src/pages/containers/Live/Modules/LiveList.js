import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as LiveActions from "@actions/live";
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';
// 组件
import SetTitle from "@components/_common/SetTitle/SetTitle";
import Filter from "@components/Live/List/Filter";
import Table from "@components/Live/List/Table/Table";
import AddBtn from "@components/Live/List/AddBtn";

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
		const { liveList, actions, router } = this.props;
		const classes = "g-bg-white";
		const { page = 1, ...reset } = query || {};
		return (
			<SetTitle
				title="直播列表"
				className={classes}
			>
				<AddBtn />
				<Filter 
					actions={actions} 
					query={{ page, ...reset }} 
				/>
				<Table
					listInfo={liveList}
					actions={actions}
					query={{ page, ...reset }}
					router={router}
				/>
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
