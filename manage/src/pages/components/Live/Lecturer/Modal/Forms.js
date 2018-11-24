import React, { Component } from 'react';
import { Modal, Button, Form, Input, Radio, message } from 'antd';
import { CreatePortalFunc, PGallery } from 'wya-rc';
import SelectAgent from '@components/_common/SelectAgent/SelectAgent';
import * as types from '@constants/actions/live';
import './Forms.scss';
import { ADD_BTN } from '@constants/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 17 },
};
@CreatePortalFunc({
	cName: 'rc-modal-lecturer'
})
@Form.create()
class Forms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			agentDetail: {},
			qr_code: props.detail && props.detail.qr_code
		};
	}

	handleCancle = () => {
		const { onClose } = this.props;
		onClose && onClose();
	}

	handleGetAgent = () => {
		SelectAgent.popup({
			getDetail: true,
			onlyOne: true
		}).then((data) => {
			this.setState({
				agentDetail: data[0]
			});
		}).catch((data) => {
			console.error(data);
		});
	}

	handleImgClick = () => {
		PGallery.popup({
			max: 1,
			title: '我的素材'
		}).then((res) => {
			this.setState({
				qr_code: res[0] && res[0].file_url
			});
		}).catch(() => {
			console.error(data);
		});
	}

	handleOk = () => {
		const { actions, type, detail = {} } = this.props;
		const { agentDetail = {}, qr_code } = this.state;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let url = types.LIVE_LECTURER_EDIT_POST;
				let param;
				if (type == 1) { // 添加
					param = { type: 1, ...values, qr_code, user_id: agentDetail.user_id };
				} else { // 编辑
					param = { type: 2, ...detail, qr_code, ...values };
				}
				let params = {
					param: param,
					ajaxType: 'POST',
					onSuccess: (res) => {
						if (res.status) {
							message.success('保存成功');
							this.props.onSure && this.props.onSure();
						}
					},
					onError: (res) => {
						message.error(res.msg);
					}
				};
				actions.request(url, params, {});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { type = 1, detail = {} } = this.props;
		const { agentDetail = {}, qr_code } = this.state;
		return (
			<Modal
				width={900}
				title="添加讲师"
				wrapClassName="g-modal-container"
				visible={true}
				maskClosable
				onCancel={this.handleCancle}
				footer={null}
				zIndex={998}
			>
				<div className="v-live-lecturer-form g-flex">
					<div className="_left">
						{(agentDetail.avatar || detail.avatar)
							? <div className="g-flex g-fw-w g-ai-c g-c-black">
								<img
									className="_pic"
									src={agentDetail.avatar || detail.avatar}
									onClick={type == 1 && this.handleGetAgent}
								/>
								<p className="g-tc g-width g-m-t-10 g-fs-16 g-lh-28">ID:{agentDetail.user_sn || detail.user_sn}</p>
								<p className="g-tc g-width g-fs-14 ">{agentDetail.nick_name || detail.nick_name}</p>
							</div>
							: <img className="_pic" src={ADD_BTN} onClick={this.handleGetAgent} />
						}
					</div>
					<div className="_right">
						<FormItem {...formItemLayout} label="姓名：">
							{getFieldDecorator('lecturer_name', {
								rules: [
									{ required: true, message: '姓名必填，10个字以内!' },
								],
								initialValue: detail.lecturer_name || ''
							})(
								<Input maxLength={10} placeholder="请输入讲师姓名" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="性别：">
							{getFieldDecorator('sex', {
								rules: [
									{ required: true, message: '性别必选!' },
								],
								initialValue: detail.sex
							})(
								<RadioGroup>
									<Radio value={1}>男</Radio>
									<Radio value={2}>女</Radio>
								</RadioGroup>
							)}
						</FormItem>

						<FormItem {...formItemLayout} label="手机：">
							{getFieldDecorator('phone', {
								rules: [
									{
										message: '请输入正确的手机号!',
										trigger: 'blur',
										pattern: /^(13[0-9]|14[5|7]|15[^4|^\D]|17[0-9]|19[8|9]|166|18[0-9])\d{8}$/
									},
								],
								initialValue: detail.phone || ''
							})(
								<Input maxLength={11} placeholder="请输入手机号" />
							)}
						</FormItem>

						<FormItem {...formItemLayout} label="邮箱：">
							{getFieldDecorator('email', {
								rules: [
									{ message: '请输入正确的邮箱!', type: 'email' },
								],
								initialValue: detail.email
							})(
								<Input maxLength={40} placeholder="请输入邮箱" />
							)}
						</FormItem>

						<FormItem {...formItemLayout} label="微信：" >
							{getFieldDecorator('wechat', {
								rules: [
									{
										message: '请输入正确的微信号!',
										trigger: 'blur',
										pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
									},
								],
								initialValue: detail.wechat
							})(
								<Input maxLength={20} placeholder="请输入微信号" />
							)}
							{
								(qr_code && qr_code.length)
									? <img
										className="gp-btn-upload g-m-t-10"
										onClick={this.handleImgClick}
										src={qr_code}
									/>
									: <div className="gp-btn-upload g-m-t-10" onClick={this.handleImgClick}>
										&#10011;
									</div>
							}
						</FormItem>

						<FormItem {...formItemLayout} label="介绍：">
							{getFieldDecorator('introduce', {
								rules: [
									{ required: true, message: '介绍必填，140字以内!' },
								],
								initialValue: detail.introduce
							})(
								<Input.TextArea rows={4} maxLength={140} placeholder="请输入讲师介绍" />
							)}
						</FormItem>
					</div>
				</div>

				<div className="g-flex-ac g-jc-fe g-m-t-20" style={{ width: '100%', boxSizing: 'border-box' }}>
					<Button className="g-m-r-20" onClick={this.handleCancle}>取消</Button>
					<Button type="primary" onClick={this.handleOk}>确定</Button>
				</div>
			</Modal>
		);
	}
}

export default Forms;