import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DebounceClick } from "wya-rc";
import { Button } from "antd";
import { Link } from 'react-router';
import * as MaterialActions from '@actions/material';
import Filter from '@components/Material/Category/Filter';
import Table from '@components/Material/Category/Table/Table';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import Rename from "@components/Material/Category/Rename/Rename";
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillUnmount() {
		this.props.actions.navigator();
	}

	handleAdd = () => {
		Rename.popup({
			type: {
			},
		}).then((value) => {
		}).catch(() => {
			this.props.actions.listSearchInit();
		});

	};
	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { materialCategory, actions } = this.props;
		const classes = "g-bg-white";
		const { page = 1, ...reset } = query || {};
		return (
			<SetTitle title="素材分类"
				className={classes}
				style={{ paddingBottom: 50 }}
			>
				<div style={{ float: "right" }} onClick={this.handleAdd}>
					<div className="gp-btn-blue">新增分类</div>
				</div>
				<Filter actions={actions} query={{ page, ...reset }} />
				<Table
					listInfo={materialCategory}
					actions={actions}
					query={{ page, ...reset }}
				/>
			</SetTitle>
		);
	}
}


function mapStateToProps(state) {
	return {
		materialCategory: state.materialCategory,
		routing: state.routing,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MaterialActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
