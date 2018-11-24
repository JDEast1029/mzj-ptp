import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SettingActions from "@actions/setting";
// 组件
import SetTitle from "@components/_common/SetTitle/SetTitle";
import System from "@components/Setting/System";
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { settingSystem, actions, layoutActions } = this.props;
		return (
			<SetTitle title="系统设置" className="">
				<System actions={actions} />
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		settingSystem: state.settingSystem
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(SettingActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
