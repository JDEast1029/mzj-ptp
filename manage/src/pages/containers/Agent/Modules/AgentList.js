import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AgentActions from '@actions/agent';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import TabList from '@components/Agent/List/TabList';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { page = 1, ...reset } = query || {};
		const {
			agentList,
			actions,
			layoutActions,
			communityList
		} = this.props;
		return (
			<SetTitle title="会员列表" className="v-agent-list">
				<TabList
					listInfo={agentList}
					actions={actions}
					query={{ page, ...reset }}
					communityList={communityList}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		agentList: state.agentList,
		communityList: state.commonInfo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(AgentActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
