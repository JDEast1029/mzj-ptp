import React, { Component, Fragment } from 'react';
import { Modal, Divider, message } from 'antd';
import  net from '@utils/net';
import * as types from '@constants/actions/crowd';
import apiRoot from '@constants/apiRoot';
import * as commonTypes from '@constants/actions/_common';
import SelectAgent from '@common/SelectAgent/SelectAgent';
import InviteLink from '@components/_common/Modal/InviteLink';
import { Link } from 'react-router';

const confirm = Modal.confirm;
class Item extends Component {
    handleClick = (id, index) => {
    	const { user_id } = this.props.itemData;
    	window.open(`/member/team-chain/lower?parent_id=${user_id}`);
    }
	handleDissolve = () => {
		const { community_id } = this.props.itemData;
		confirm({
			title: '确定解散该群吗？',
			okText: "确定",
			cancelText: "取消",
			onOk: () => {
				const param = { community_id };
				const url = types.CROWD_LIST_DISSOLVE_POST;
				const params = {
					param,
					ajaxType: 'POST',
					onSuccess: (res) => {

					},
					onError: () => {

					}
				};
				this.props.actions.request(url, params, {});

			},
			onCancel: () => {

			},
		});
	}
	handleSilent = (status) => {
		const { community_id } = this.props.itemData;
		const title = status ? '确定将此社群设为全员禁言吗？' : '确定取消此社群全员禁言吗？';
		const url = status ? types.CROWD_LIST_SILENT_GET : types.CROWD_LIST_CANCEL_SILENT_GET;
		confirm({
			title,
			okText: "确定",
			cancelText: "取消",
			onOk: () => {
				const param = { community_id };
				const params = {
					param,
					ajaxType: 'get',
					onSuccess: (res) => {

					},
					onError: () => {

					}
				};
				this.props.actions.request(url, params, {});
			},
			onCancel: () => {
				
			},
		});
	}
	handleSetting = () => {
		const { community_id, name } = this.props.itemData;
		SelectAgent.popup({
			onlyOne: false,
			title: '管理员设置',
			paramInfo: {
				user_type: 2,
				community_id,
				min: 0
			},
			categoryName: name,
			min: 0,
			activeText: '取消管理员',
			staticText: '设置管理员'
		}).then((user_ids) => {
			const url = types.CROWD_LIST_SET_MANAGE_POST;
			const params = {
				param: { user_ids, community_id },
				ajaxType: 'POST',
				onSuccess: (res) => {

				},
				onError: () => {

				}
			};
			this.props.actions.request(url, params, {});
		});
	}

	/**
	 * 邀请链接
	 */
	handleInvite = (community_ids) => {
		InviteLink.popup({
			refreshable: true,
			community_ids
		}).then((res) => {

		}).catch((error) => {

		});
	};

	renderBtn = () => {
		const { is_no_say, community_id  } = this.props.itemData;
		return (
			<Fragment >
				<Link to={`/crowd/list/edit-one?id=${community_id}`} className="g-operation">查看详情</Link>
				<span className="g-divider-vertical" />
				<a className="g-operation" onClick={this.handleSetting}>管理员设置</a>
				<br/>
				{
					is_no_say == 1 ?
						<a className="g-operation" onClick={() => this.handleSilent(0)}>取消全员禁言</a>
						:
						<a className="g-operation" onClick={() => this.handleSilent(1)}>全员禁言</a>
				}
				<span className="g-divider-vertical" />
				<a className="g-operation" onClick={this.handleDissolve}>解散</a>
				<span className="g-divider-vertical" />
				<a className="g-operation" onClick={() => this.handleInvite(community_id)}>邀请链接</a>
			</Fragment>
		);
	}
	render() {
    	const { itemData = {}, actions, keyword } = this.props;
    	const {
			number,
			name,
			user_num,
			manager_num,
			material_num,
			room_num,
			create_time
    	} = itemData;
    	return (
    		<tr className="g-c-dark">
    			<td>
    				{number}
    			</td>
    			<td className="g-tl">
					{name}
    			</td>
    			<td>
					{user_num}
    			</td>
    			<td>
					{manager_num}
    			</td>
    			<td>
					{material_num}
    			</td>
    			<td>
					{room_num}
    			</td>
    			<td>
					{create_time}
    			</td>
    			<td>
    				<div 
						style={{
							width: '150px',
							margin: '0 auto',
							textAlign: 'left'
						}}
					>
    					{this.renderBtn()}
    				</div>
    			</td>
    		</tr>

    	);
	}
}

export default Item;
