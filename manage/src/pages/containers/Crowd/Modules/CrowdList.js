import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectAgent from '@components/_common/SelectAgent/SelectAgent';
import SelectAudio from '@components/_common/SelectAudio/SelectAudio';
import { PGallery } from 'wya-rc';
import * as CrowdActions from '@actions/crowd';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import Content from '@components/Crowd/list/Content';
import Search from '@components/Crowd/list/Search';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillUnmount() {
		this.props.actions.navigator();
	}
	render() {
		const {
			locationBeforeTransitions: { query, pathname }
		} = this.props.routing;
		const { crowdList, actions } = this.props;
		const {
			page_status = '1',
			page = 1,
			...reset
		} = query;
		return (
			<SetTitle title="社群列表">
				<Search
					actions={actions}
					query={{ status, page, ...reset }}
				/>
				<Content
					status={status || '4'}
					page={page}
					listInfo={crowdList}
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
		crowdList: state.crowdList
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CrowdActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
