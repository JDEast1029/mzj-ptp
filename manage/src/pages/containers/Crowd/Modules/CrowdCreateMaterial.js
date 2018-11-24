import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
// 组件
import Step from '@components/Crowd/Common/Step';
import Content from '@components/Crowd/Create/StepThree/Content';
import SetTitle from '@components/_common/SetTitle/SetTitle';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			crowdCreateMaterial,
			actions,
			layoutActions,
			location: { state }
		} = this.props;
		return (
			<SetTitle title="创建社群" className="">
				<Step step={3}/>
				<Content
					info={crowdCreateMaterial}
					actions={actions}
					beforeInfo={state}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		crowdCreateMaterial: state.crowdCreateMaterial
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
