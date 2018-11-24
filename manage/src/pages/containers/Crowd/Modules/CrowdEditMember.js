import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
// 组件
import Step from '@components/Crowd/Common/Step';
import Content from '@components/Crowd/Edit/StepTwo/Content';
import Search from '@components/Crowd/Edit/StepTwo/Search';
import SetTitle from '@components/_common/SetTitle/SetTitle';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			locationBeforeTransitions: { query, pathname }
		} = this.props.routing;
		const { crowdEditMember, actions } = this.props;
		const {
			page_status = '1',
			page = 1,
			...reset
		} = query;
		return (
			<SetTitle title="社群详情" className="">
				<Step step={2} community_id={query.id} edit/>
				<Search
					actions={actions}
					listInfo={crowdEditMember}
					query={{ status, page, ...reset }}
				/>
				<Content
					listInfo={crowdEditMember}
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
		crowdEditMember: state.crowdEditMember
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
