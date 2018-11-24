import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// reudx
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as creators from "@actions/home";
import * as types from "@constants/actions/home";

// 公用组件
import { Col, Row } from "antd";
import SetTitle from "@components/_common/SetTitle/SetTitle";
import Filter from "@components/Home/Log/Filter";
import Table from "@components/Home/Log/Table/Table";


class Container extends Component {
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
		const { actions, homeLog, moduleList } = this.props;
		const classes = "g-bg-white";
		const { page = 1, ...reset } = query || {};

		return (
			<SetTitle
				title="操作日志"
				className={classes}
				style={{ paddingBottom: 50 }}
			>
				<Filter
					actions={actions}
					query={{ page, ...reset }}
					moduleList={moduleList}
				/>
				<Table
					listInfo={homeLog}
					actions={actions}
					query={{ page, ...reset }}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		homeLog: state.homeLog,
		moduleList: state.commonInfo.module
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
