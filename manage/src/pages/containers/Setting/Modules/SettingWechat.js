import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SettingActions from "@actions/setting";
// 组件
import SetTitle from "@components/_common/SetTitle/SetTitle";
import Wechat from "@components/Setting/Wechat";
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { settingWechat, actions, layoutActions } = this.props;
		return (
			<SetTitle title="微信设置" className="">
				<Wechat actions={actions} />
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		settingWechat: state.settingWechat
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
