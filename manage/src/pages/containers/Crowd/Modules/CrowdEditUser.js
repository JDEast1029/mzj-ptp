import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';

// 公用组件
import SetTitle from '@components/_common/SetTitle/SetTitle';

// 业务组件
import Step from '@components/Crowd/Common/Step';
import Content from '@components/Crowd/Edit/StepOne/Content';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			actions,
			location: { query }
		} = this.props;
		return (
			<SetTitle title="社群详情" className="">
				<Step step={1} community_id={query.id} edit/>
				<Content 
					id={query.id}
				/>
			</SetTitle>
		);
	}
}

export default App;
