
import React, { PureComponent } from 'react';
import { Form, Modal, Row, Col, Input, message } from 'antd';
import { DebounceClick } from 'wya-rc';
import net from '@utils/net';
import API_ROOT from '../../constants/apiRoot';
import * as types from '@constants/actions/login';
import { dataValidity } from '@utils/utils';
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 12 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};
class ChangePwdModal extends PureComponent {
	constructor(props) {
		super(props);
	}

	handleOk = () => {
		const { onHide } = this.props;
		this.props.form.validateFields((err, values) => {
			if (err) {
				for (let a in err) {
					message.warn(err[a].errors[0].message);
					return;
				}

			} else {
				if (values['new_pwd'] != values['confirm_pwd']) {
					message.warn('新密码与确认密码不一致');
					return;
				}
				net.ajax({
					url: API_ROOT[types._LOGIN_CHANGE_PASSWORD_POST],
					type: 'POST',
					param: {
						...values
					}
				}).then((data) => {
					if (data.status == 0) {
						message.error(data.msg);
					} else {


						message.success(data.msg);


						onHide && onHide();

					}
				}).catch((errors) => {
					message.error(errors.msg);
				});
			}
		});
	}

	handleHide = (e) => {
		e.preventDefault();
		const { onHide } = this.props;
		onHide && onHide();
	}

	render() {
		const { show, form: { getFieldDecorator } } = this.props;
		return (
			<Modal
				title={'修改密码'}
				wrapClassName=""
				visible={show}
				maskClosable
				width={600}
				onCancel={this.handleHide}
				footer={null}
				zIndex="99"
			>
				<div className="g-flex-ac g-fd-c" >
					<Form>
						<FormItem
							{...formItemLayout}
							label="原密码："
						>
							{getFieldDecorator('old_pwd', {
								initialValue: '',
								rules: [{ required: true, message: '请输入原密码!' }],
							})(
								<Input
									style={{ width: 220 }}
									placeholder="请输入原密码"
									type="password"
									maxLength={16}
								/>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="新密码："
						>
							{getFieldDecorator('new_pwd', {
								initialValue: '',
								rules: [{
									required: true,
									name: "新密码",
									type: "validPassword",
									validator: dataValidity
								}],
							})(
								<Input
									style={{ width: 220 }}
									placeholder="请输入新密码"
									type="password"
									maxLength={16}
								/>
							)}
							<div className="g-c-gray g-fs-12" style={{ lineHeight: '14px', width: 220 }}>
								请设置6-16位密码，仅支持数字、字母，不支持特殊符号
							</div>
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="确认密码："
						>
							{getFieldDecorator('confirm_pwd', {
								initialValue: '',
								rules: [{ required: true, message: '请确认密码!' }],
							})(
								<Input
									style={{ width: 220 }}
									placeholder="请输入确认密码"
									type="password"
									maxLength={16}
								/>
							)}
						</FormItem>
					</Form>
					<div className="g-flex-ac">
						<div className="gp-btn-line g-m-r-20" onClick={this.handleHide}>取消</div>
						<DebounceClick
							className="gp-btn-lgr-blue g-m-r-20"
							onClick={this.handleOk}
						>
							确认
						</DebounceClick>
					</div>
				</div>
			</Modal>
		);
	}
}

export default Form.create()(ChangePwdModal);
