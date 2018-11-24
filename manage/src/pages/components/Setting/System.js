import React, { Component, Fragment } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { DebounceClick } from "wya-rc";
import "./System.scss";
import { createLoginAuth } from "@router/auth";
import * as types from "../../constants/actions/setting";
import UploadLogo from "../_common/Operation/UploadLogo";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cropUrl: "",
			confirmDirty: false,
			autoCompleteResult: [],
			value: []
		};
	}

	componentDidMount() {
		this.fetchSystemContent();
	}
	// 获取设置信息
	fetchSystemContent = () => {
		let url = types.SETTING_SYSTEM_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				const { setFieldsValue } = this.props.form;
				setFieldsValue({
					system_state: res.data.system_state,
					company_name: res.data.company_name
				});
				this.setState({
					cropUrl: res.data.logo,
					company_name: res.data.company_name
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};

		this.props.actions.request(url, params);
	};

	// 点击保存按钮
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			const { cropUrl, status, company_name } = this.state;
			if (cropUrl) {
				this.props.form.setFieldsValue({
					logo: cropUrl
				});
			}
			if (!err) {
				let param = values;
				cropUrl ? (param = { ...param, logo: cropUrl }) : null; // 上传图片之后
				// !status ? (param = { store_state: values.store_state }) : null; // 店铺关闭之后
				this.handleActions(param);
			}
		});
	};

	handleActions = param => {
		let url = types.SETTING_SYSTEM_SAVE_POST;
		let params = {
			param: param,
			ajaxType: "POST",
			onSuccess: res => {
				message.success("保存成功");
				const { cropUrl, company_name } = this.state;
				/**
				 * 更改左上角商家logo，刷新后起作用
				 */
				_global.user.logo = cropUrl || _global.user.logo;
				_global.user.company_name =
					company_name || _global.user.company_name;
				const _data = {
					user: { ..._global.user },
					auth: { ..._global.auth },
					safe: { ..._global.safe },
					msg: "登录成功",
					status: 1
				};
				createLoginAuth(_data, true, {}, false, () => {
					_global.history.replace('/setting/system');
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	};

	/**
	 * 图片裁剪弹出框用portal传送门的方式，具体参考wya-rc的create-portal-func
	 */
	handleUpload = () => {
		UploadLogo.popup({})
			.then(cropUrl => {
				// 点击确定
				this.setState({
					cropUrl // 获取裁剪后的图片url
				});
			})
			.catch(e => {
				// 点击取消
			});
	};

	handleChange = e => {
		this.setState({
			company_name: e.target.value
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		const { cropUrl } = this.state;
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
			<Form className="v-setting-system">
				<FormItem {...formItemLayout} label="系统状态">
					{getFieldDecorator("system_state", {
						rules: [
							{
								required: true,
								message: "请选择系统状态"
							}
						]
					})(
						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={2}>关闭</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="企业名称">
					{getFieldDecorator("company_name", {
						rules: [
							{
								required: true,
								message: "请输入企业名称"
							}
						]
					})(<Input maxLength={15} onChange={this.handleChange} />)}
				</FormItem>
				<FormItem {...formItemLayout} label="企业logo：">
					{getFieldDecorator("logo", {
						initialValue: cropUrl,
						rules: [
							{
								required: true,
								message: "请选择图片"
							}
						]
					})(
						<div className="g-flex g-fw-w g-ai-c">
							<img
								className="g-img-100 g-pd-10 g-border-gray g-pointer g-tc"
								onClick={this.handleUpload}
								src={cropUrl}
								alt=""
							/>
							<span className="g-fs-12 g-m-l-15">
								建议尺寸25*25
							</span>
						</div>
					)}
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
