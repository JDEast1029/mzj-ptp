/**
 * 更改名称页
 */
import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { MToasts } from 'wya-rc';
import * as types from '@constants/actions/mine';
import './Styles.scss';

class Main extends Component {

	constructor(props) {
		super(props);
	}
	handleSave = () => {
		const { actions } = this.props;
		this.props.form.validateFields((err, values) => {
			if (!values.nick_name) {
				return MToasts.info('不能为空~', 1);
			}
			if (!err) {
				let url = types.MINE_NAME_SAVE_POST;
				let param = {
					...values
				};
				let params = {
					param: param,
					ajaxType: 'POST',
					onSuccess: (res) => {
						if (res.status) {
							MToasts.info('保存成功', 1, () => {
								window.history.go(-1);
							});
						}
					},
					onError: (res) => {
						MToasts.info(res.msg);
					}
				};
				actions.request(url, params, {});
			}
		});
	}
	render() {
		const { data: { nick_name } } = this.props;
		const { getFieldProps } = this.props.form;
		return (
			<div className="v-mine-name g-m-t-5">
				<InputItem
					{...getFieldProps('nick_name', {
						rules: [
							{ required: true }
						],
						initialValue: nick_name,
					})}
					placeholder="请输入名称"
					clear
					style={{ fontSize: 15 }}
					maxLength={10}
				/>
				<div
					className="g-big-btn-blue g-flex-cc"
					onClick={this.handleSave}
					style={{
						width: '340px',
						height: '44px',
						fontSize: '16px',
						borderRadius: '22px',
						margin: '40px auto'
					}}
				>保存</div>
			</div>
		);
	}
};
export default createForm()(Main);
