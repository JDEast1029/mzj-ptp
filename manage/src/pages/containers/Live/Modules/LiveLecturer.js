import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LiveActions from '@actions/live';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import List from '@components/Live/Lecturer/List';

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
			liveLecturer,
			actions
		} = this.props;
		return (
			<SetTitle title="讲师管理" className="v-live-lecturer">
				<List
					liveLecturer={liveLecturer}
					actions={actions}
					isFetching={liveLecturer.isFetching}
					query={{ page, ...reset }}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		liveLecturer: state.liveLecturer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(LiveActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
