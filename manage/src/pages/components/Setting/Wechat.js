import React, { Component, Fragment } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { DebounceClick } from "wya-rc";
import "./Wechat.scss";
import * as types from "@constants/actions/setting";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;


class RegistrationForm extends React.Component {
	componentDidMount() {
		this.fetchSetting();
	}
	// 获取设置信息
	fetchSetting = () => {
		let url = types.SETTING_WECHAT_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				const { setFieldsValue } = this.props.form;
				setFieldsValue({
					app_id: res.data.app_id,
					app_secret: res.data.app_secret,
					auth_url: res.data.auth_url,
					token: res.data.token
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let url = types.SETTING_WECHAT_SAVE_POST;
				let param = values;
				let params = {
					param: param,
					ajaxType: "POST",
					onSuccess: res => {
						message.success(res.msg);
					},
					onError: res => {
						message.error(res.msg);
					}
				};
				this.props.actions.request(url, params, {});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 3 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			}
		};

		return (
			<Form onSubmit={this.handleSubmit} className="v-setting-wechat">
				<FormItem {...formItemLayout} label="App_ID">
					{getFieldDecorator("app_id", {
						rules: [
							,
							{
								required: true,
								message: "请输入app_id信息"
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="App_Secret">
					{getFieldDecorator("app_secret", {
						rules: [
							{
								required: true,
								message: "请输入app_secret信息"
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Token">
					{getFieldDecorator("token", {
						rules: [
							{
								required: true,
								message: "请输入token信息"
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="OAuth2.0页面授权">
					{getFieldDecorator("auth_url", {})(<Input disabled />)}
				</FormItem>
				<FormItem {...formItemLayout} className="_btn">
					<DebounceClick
						tag={Button}
						className="gp-btn-blue _save"
						onClick={this.handleSubmit}
					>
						保存
					</DebounceClick>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(RegistrationForm);
