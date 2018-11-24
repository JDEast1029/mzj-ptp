import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as MaterialActions from '@actions/material';
import Filter from '@components/Material/List/Filter';
import Table from '@components/Material/List/Table/Table';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';


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
		const { materialList, actions } = this.props;
		const classes = " g-bg-white";
		const { page = 1, ...reset } = query || {};

		return (
			<SetTitle
				title="素材管理"
				className={classes}
				style={{ paddingBottom: 30 }}
			>
				<Link
					to="/material/list/add"
					className="gp-btn-blue"
					style={{ float: 'right' }}
				>
					创建素材
				</Link>

				<Filter
					actions={actions}
					query={{ page, ...reset }}
				/>
				<Table
					listInfo={materialList}
					actions={actions}
					query={{ page, ...reset }}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		materialList: state.materialList,
		routing: state.routing,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MaterialActions, dispatch),
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
