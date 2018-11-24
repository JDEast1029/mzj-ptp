import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as LoginActions from "@actions/login";
// 组件
import FromMain from "@components/Login/FromMain";
import { LOGIN_BG } from "../../../constants/constants";
import SetTitle from "@components/_common/SetTitle/SetTitle";

const loginBG = {
	backgroundImage: `url(${LOGIN_BG})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	backgroundColor: '#f0f2f5',
};

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { login, actions, layoutActions } = this.props;
		return (
			<SetTitle
				title="登录"
				className="g-flex-cc g-fd-c g-reset"
				showTitle={0}
				style={{ height: `100vh`, ...loginBG }}
			>
				<FromMain actions={actions} layoutActions={layoutActions} />
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		login: state.login
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(LoginActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
