import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
// 组件
import Step from '@components/Crowd/Common/Step';
import Content from '@components/Crowd/Create/StepTwo/Content';
import SetTitle from '@components/_common/SetTitle/SetTitle';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			crowdCreateMember,
			actions,
			layoutActions,
			location: { state }
		} = this.props;
		return (
			<SetTitle title="创建社群" className="">
				<Step step={2} />
				<Content
					info={crowdCreateMember}
					actions={actions}
					stepOne={state}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		crowdCreateMember: state.crowdCreateMember
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
