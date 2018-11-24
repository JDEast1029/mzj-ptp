import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
// 组件
import Content from '@components/Crowd/Edit/StepThree/Content';
import Step from '@components/Crowd/Common/Step';
import SetTitle from '@components/_common/SetTitle/SetTitle';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			locationBeforeTransitions: { query, pathname }
		} = this.props.routing;
		const {
			crowdEditMaterial,
			actions,
		} = this.props;
		const {
			page_status = '1',
			page = 1,
			...reset
		} = query;
		return (
			<SetTitle title="社群详情" className="">
				<Step step={3} community_id={query.id} edit/>
				<Content
					listInfo={crowdEditMaterial}
					page={page}
					actions={actions}
					query={query}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		crowdEditMaterial: state.crowdEditMaterial
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
