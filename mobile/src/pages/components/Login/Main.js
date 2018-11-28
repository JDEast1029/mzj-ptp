import React, { Component } from 'react';
import net from "@utils/net";
import API_ROOT from "../../constants/apiRoot";
import * as types from "@constants/actions/login";
import "./Styles.scss";
import {
	setItem,
} from "@utils/utils";

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
			phone: '',
			code: '',
			codeContent: '获取验证码',
			time: 60,
			code: ''
		};
	}

	componentWillUnmount() {
		this.time && clearInterval(this.time);
		this.time = null;
	}

	handleLogin = () => {
		// TODO
		net.ajax({
			url: API_ROOT[types.USER_LOGIN_POST],
			type: "GET",
			param: {
				phone: this.state.phone,
				code: this.state.code
			}
		}).then(res => {
			setItem(`user_${_global.version}`, res.data);
			_global.history.replace('/home');
		}).catch(errors => {
			
		});
	}

	handleSendCode = () => {
		if (this.time) return;
		if (!this.state.phone) {
			alert('手机号不能为空!');
			return;
		}
		net.ajax({
			url: API_ROOT[types.USER_LOGIN_CODE_GET],
			type: "GET",
			param: {
				phone: this.state.phone,
				code: this.state.code
			}
		}).then(res => {
			this.handleCountDown();
		}).catch(errors => {
			this.handleCountDown();
		});
	}

	handleCountDown = () => {
		this.time = setInterval(() => {
			if (this.state.time > 0) {
				this.setState({
					codeLoading: false,
					time: this.state.time - 1,
					codeContent: `(${this.state.time - 1}s)后重发`
				});
			} else {
				this.setState({
					time: 60,
					codeContent: '获取验证码'
				});
				this.time && clearInterval(this.time);
				this.time = null;
			}

		}, 1000);
	}

	handleChange(value, type) {
		this.setState({
			[type]: value
		});
	}
	
	render() {
		return (
			<div className="v-login g-bg-white" style={{ height: '100%', width: '100%', paddingTop: '200px' }}>
				<div style={{ paddingRight: "40px", paddingLeft: "40px",  width: '100%', boxSizing: 'border-box' }}>
					<div className="_input g-flex-ac">
						手机号：
						<input 
							value={this.state.phone}
							onChange={(e) => this.handleChange(e.target.value, "phone")} 
							className="g-col g-m-l-10" maxLength="11" placeholder="请输入手机号" />
					</div>
					<div className="_input g-flex-ac">
						验证码：
						<input 
							value={this.state.code}
							onChange={(e) => this.handleChange(e.target.value, "code")} 
							className="g-col g-m-l-10" placeholder="请输入验证码" />
						<span onClick={this.handleSendCode}>{this.state.codeContent}</span>
					</div>
				</div>

				<div 
					className="g-flex-cc g-fs-18 g-c-white" 
					style={{ margin: "40px", backgroundColor: '#3EAAF4', padding: '10px', borderRadius: '20px' }}
					onClick={this.handleLogin}
				>
					登录
				</div>
			</div>
		);
	}
}
