import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from '@actions/home';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import HomeMain from '@components/Home/HomeMain';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			homeMain,
			actions,
			layoutActions
		} = this.props;
		return (
			<SetTitle title="系统首页" className="g-bg-white">
				<HomeMain actions={actions} />
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		homeMain: state.homeMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(HomeActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
