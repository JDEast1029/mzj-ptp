import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CrowdActions from '@actions/crowd';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import Tab from '@components/Crowd/Message/Tab';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			locationBeforeTransitions: { query, pathname }
		} = this.props.routing;
		const { crowdMessage, actions } = this.props;
		const {
			status = '1',
			page = 1,
			...reset
		} = query;
		return (
			<SetTitle title="社群信息" className="" style={{ paddingTop: 0 }}>
				<Tab 
					status={status}
					page={page}
					listInfo={crowdMessage}
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
		crowdMessage: state.crowdMessage
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
