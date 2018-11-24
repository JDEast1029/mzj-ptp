import React, { Component, Fragment } from "react";
import { Layout, Menu, Icon, message } from "antd";
import Aside from "./Aside";
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as LayoutActions from "@actions/layout";
import * as typesLogin from "@constants/actions/login";
import { delCookie } from "@utils/utils";
import LogOut from "./LogOut";
import LeftNav from "./LeftNav";
function mapStateToProps(state) {
	return {
		layoutMain: state.layoutMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(LayoutActions, dispatch)
	};
}

// decorator
export default (options = {}) =>
	function createDecorator(Left) {
		class LayoutDecorator extends Component {
			constructor() {
				super();
				this.state = {
					// 是否折叠
					collapsed: false
				};
			}
			handleToggle = () => {
				this.setState({
					collapsed: !this.state.collapsed
				});
			};
			handleSignOut = () => {
				message.destroy();
				message.loading("提交中...", 0);

				let url = typesLogin.LOGIN_OUT_POST;
				let param = {};

				let params = {
					param: param,
					ajaxType: "DELETE",
					onSuccess: res => {
						message.destroy();
						delCookie("userManage");
						_global.history.push("/login");
					},
					onError: res => {
						message.destroy();
						message.error(res.msg, 1.5);
					}
				};
				this.props.actions.request(url, params, {});
			};
			render() {
				const {
					location: { pathname },
					actions,
					layoutMain
				} = this.props;
				const { collapsed } = this.state;
				return (
					<div className="g-reset-antd">
						<Layout className="ant-layout-has-sider g-ant-layout">
							<Aside
								path={pathname}
								collapsed={false}
								component={LeftNav}
								actions={actions}
								logo={layoutMain.logo}
							/>
							<Layout
								className="g-ant-layout-content"
								id="contents"
							>
								<Layout.Content
									id="layout-content"
									className="g-container"
									style={{
										overflow: "initial",
										height: _global.innerHeight - 84,
										overflow: "auto",
										position: "relative"
									}}
								>
									{this.props.children}
								</Layout.Content>
							</Layout>
						</Layout>
					</div>
				);
			}
		}
		return connect(
			mapStateToProps,
			mapDispatchToProps
		)(LayoutDecorator);
	};
