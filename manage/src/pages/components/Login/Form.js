import React, { Component } from "react";
import * as types from "@constants/actions/login";
import { createForm } from "rc-form";
import { Link } from "react-router";
import { message } from "antd";
import { createLoginAuth } from "@router/auth";
import {
	dataValidity,
	setItem,
	getItem,
	setCookie,
	getCookie,
	getDepart
} from "@utils/utils";
import net from "@utils/net";
import API_ROOT from "../../constants/apiRoot";
import { DebounceClick } from "wya-rc";
import "./Styles.scss";

function createVCode() {
	let codeString = "0,1,2,3,4,5,6,7,8,9";
	codeString += ",a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,t,z";
	let codeArr = codeString.split(",");
	let codeData = [];
	let codeLength = 9;
	for (let i = 0; i < codeLength; i++) {
		codeData = [...codeData, codeArr[Math.ceil(Math.random() * 36) - 1]];
	}
	let StringCodeData = codeData.join("");
	return StringCodeData;
}
@createForm()
class LoginForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: "",
			password: "",
			verification: "",
			codeContent: "",
			codeActive: false
		};
	}
	componentWillMount() {
		this.handleSendCode();
	}
	componentDidMount() {
		window.addEventListener("keyup", this.handleEnterUp);
	}
	componentWillUnmount() {
		window.removeEventListener("keyup", this.handleEnterUp);
	}

	handleEnterUp = event => {
		if (event.keyCode === 13) {
			this.handleValidity();
			
		}
	};
	handleSendCode = () => {
		net.ajax({
			url: API_ROOT[types._LOGIN_MAIN_VERIFICATION_GET],
			type: "GET",
			param: {
				refresh: 1
			},
			noLoading: true
		})
			.then(response => {
				this.setState({
					codeContent: response.data.url
				});
			})
			.catch(errors => {
				message.error(errors.msg);
			});
	};

	handleNameChange = event => {
		this.setState({
			name: event.target.value
		});
	};
	// handleClearPwd = (event) => {
	// 	this.setState({
	// 		password: ''
	// 	});
	// };
	handleSecurityChange = event => {
		this.setState({
			verification: event.target.value
		});
	};

	handlePwdChange = event => {
		this.setState({
			password: event.target.value
		});
	};
	handleValidity = () => {
		const { name, password, verification } = this.state;
		let msg = "";
		let callback = errors => {
			if (errors) {
				message.warn(errors);
				return;
			}
			if (!password) {
				msg = "密码不能为空!";
			} else if (!verification) {
				msg = "验证码不能为空!";
			}
			if (msg) {
				message.warn(msg);
				return false;
			}
			this.handleLogin();
			// this.code && this.code.click();
		};
		dataValidity(
			{
				required: true,
				type: "validName",
				name: "账号"
			},
			name,
			callback
		);
	};
	handleLogin = () => {
		const { layoutActions } = this.props;
		const { name, password, verification } = this.state;
		let param = {
			name,
			password,
			verification
		};
		net.ajax({
			url: API_ROOT[types.LOGIN_MAIN_POST],
			type: "POST",
			param
		})
			.then(res => {
				if (res.status == 0) {
					message.error(res.msg);
				} else {
					createLoginAuth(res.data);
					// setCookie('expire_msg', res.data.user.expire_msg);
				}
				this.code && this.code.click();
			})
			.catch(errors => {
				message.error(errors.msg);
				this.code && this.code.click();
			});
	};
	render() {
		return (
			<div className="g-flex g-fd-c g-jc-c v-login-form g-lh-44 g-absolute">
				<h3 className="g-tc g-fs-24 g-lh-60 g-c-blue-3">登录</h3>
				<div className="g-flex g-pd-b-20">
					<label className="g-w-2 g-tr">账号</label>
					<input
						type="text"
						maxLength={20}
						onInput={this.handleNameChange}
						onChange={this.handleClearPwd}
					/>
				</div>
				<div className="g-flex">
					<label className="g-w-2 g-tr">密码</label>
					<input
						type="password"
						onInput={this.handlePwdChange}
						autoComplete="new-password"
					/>
				</div>
				<div className="g-flex g-pd-tb-20">
					<label className="g-w-2 g-tr">验证码</label>
					<div
						className={`_input-box g-flex-ac ${this.state
							.codeActive && "_active"}`}
					>
						<input
							className="_code"
							type="text"
							onFocus={() => {
								this.setState({
									codeActive: true
								});
							}}
							onBlur={() => {
								this.setState({
									codeActive: false
								});
							}}
							onInput={this.handleSecurityChange}
						/>
						<span>|</span>
						<div
							ref={code => (this.code = code)}
							className="g-pd-l-10 g-pointer g-inline"
							onClick={this.handleSendCode}
						>
							{this.state.codeContent && (
								<img
									src={`${
										API_ROOT[
											types._LOGIN_MAIN_VERIFICATION_GET
										]
									}?v=${this.state.codeContent}`}
									alt="换一个"
								/>
							)}
						</div>
					</div>
				</div>
				<DebounceClick>
					<div
						className="_login-btn _pd20"
						onClick={this.handleValidity}
					>
						登录
					</div>
				</DebounceClick>
			</div>
		);
	}
}
export default LoginForm;
