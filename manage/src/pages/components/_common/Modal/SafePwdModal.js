/**
 * 安全密码输入弹框
 */
import React, { Component } from 'react';
import { CreatePortalFunc } from 'wya-rc';
import { Modal, message, Button, Input } from 'antd';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';

@CreatePortalFunc({
	cName: 'root-modal-safe-pwd',
	onBefore: (options = {}) => {
		const { url, onSure, onClose } = options;
		return new Promise((resolve, reject) => {
			net.ajax({
				url: API_ROOT['_IS_OPEN_COMFIRM_SAFE_PWD_POST'],
				type: 'POST',
				param: {
					data_safe_option: options.data_safe_option
				},
				noLoading: true,
				async: false,     // 设为同步请求，防止在回调中打开的窗口被浏览器拦截
			}).then((res) => {
				const { is_open, safe_type, data_safe_option } = res.data || {};
				if (is_open == 1) {
					resolve({
						data: {
							url,
							params: {
								safe_type,
								data_safe_option
							}
						}
					});
				} else {
					reject({ is_open: '0' });
				}
			}).catch((errors) => {
				message.error(errors.msg);
			});
		});
	}
})
class SafePwdModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pwd: ''
		};
	}

	handleOk = () => {
		const { params = {}, url } = this.props.data || {};

		net.ajax({
			url: API_ROOT['_COMFIRM_SAFE_PWD_POST'],
			type: 'POST',
			param: {
				...params,
				pwd: this.state.pwd
			},
			noLoading: true,
			async: false,     // 设为同步请求，防止在回调中打开的窗口被浏览器拦截
		}).then((res) => {
			url && window.open(url);
			this.props.onSure && this.props.onSure();
		}).catch((errors) => {
			message.error(errors.msg);
		});
	}

	handleCancel = () => {
		this.props.onClose && this.props.onClose();
	}

	handleChange = (e) => {
		this.setState({
			pwd: e.target.value
		});
	}

	render() {

		return (
			<Modal
				visible={true}
				closable
				title={'安全密码'}
				width={400}
				zIndex={1001}
				destroyOnClose={true}
				footer={null}
				onCancel={this.handleCancel}
			>
				<div className="g-flex-cc">
					<Input
						value={this.state.pwd}
						placeholder="请输入密码"
						style={{ width: 180, flex: 1 }}
						onChange={this.handleChange}
						type="password"
						maxLength={16}
						autocomplete="new-password"
					/>
					<Button
						className="g-m-l-10"
						type="primary"
						onClick={this.handleOk}
					>
						确定
    				</Button>
				</div>
			</Modal>
		);
	}
}

export default SafePwdModal;
