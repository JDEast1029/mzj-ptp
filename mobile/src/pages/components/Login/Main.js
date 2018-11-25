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
			mobile: '',
			code: ''
		};
	}

	handleLogin() {
		// TODO
		net.ajax({
			url: API_ROOT[types.USER_LOGIN_POST],
			type: "POST",
			param: {
				mobile: this.state.mobile,
				code: this.state.code
			}
		}).then(res => {
			setItem(`user_${_global.version}`, res.data);
			_global.history.replace('/home');
		}).catch(errors => {
			
		});
	}

	handleChange(value, type) {
		this.setState({
			[type]: value
		});
	}
	
	render() {
		return (
			<div className="v-login g-bg-white" style={{ height: '100%', width: '100%', paddingTop: '200px' }}>
				<div style={{ marginRight: "40px", marginLeft: "40px",  width: '100%' }}>
					<div className="_input g-flex-ac">
						手机号：
						<input 
							value={this.state.mobile}
							onChange={(e) => this.handleChange(e.target.value, "mobile")} 
							className="g-col g-m-l-10" maxLength="11" placeholder="请输入手机号" />
					</div>
					<div className="_input g-flex-ac">
						验证码：
						<input 
							value={this.state.code}
							onChange={(e) => this.handleChange(e.target.value, "code")} 
							className="g-col g-m-l-10" placeholder="请输入验证码" />
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
