import React, { Component } from 'react';
import Search from './Material/Search';
import Content from './Material/Content';
import SelectCrowd from '@common/SelectCrowd/SelectCrowd';
import { DebounceClick } from 'wya-rc';
import net from '@utils/net';
import { message } from 'antd';
import apiRoot from '@constants/apiRoot';
export default class MaterialMessage extends Component {
	handleClick = (e) => {
		e.preventDefault();
		const { selectArr } = this.props.listInfo;
		if (!selectArr.length) {
			message.error('请选择素材');
			return;
		}
		SelectCrowd.popup({
			title: '选择发送社群',
			min: 1,
			message: true
		}).then((res) => {
			const data = {
				community_ids: res.selectInfo,
				msg_type: 3,
				msg_ids: selectArr
			};
			this.setMessage(data);
		}).catch((error) => {
		});
	}
	setMessage = (param) => {
		const url = apiRoot._CROWD_MESSAGE_SUBMIT_POST;
		net.ajax({
			url,
			param,
			type: 'POST'
		}).then(() => {
			message.success("发送成功");
			this.props.actions.crowdMessageInit();
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
	render() {
		const { status, page, listInfo, actions, query } = this.props;
		return (
			<div>
				<Search
					actions={actions}
					query={query}
				/>
				<Content
					status={status}
					page={page}
					listInfo={listInfo}
					actions={actions}
					query={query}
					
				/>
				<DebounceClick
					onClick={this.handleClick}
					style={{ display: 'inline-block', marginTop: 40 }}
				>
					<div
						className="gp-btn-blue"
					>
						选择社群并发送
					</div>
				</DebounceClick>
			</div>
		);
	}
}
