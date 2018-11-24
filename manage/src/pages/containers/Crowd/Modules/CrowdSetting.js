import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
import Content from '@components/Crowd/Setting/Content';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			crowdSetting,
			actions,
			layoutActions
		} = this.props;
		return (
			<SetTitle title="群主设置">
				<Content 
					info={crowdSetting}
					actions={actions}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		crowdSetting: state.crowdSetting
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
