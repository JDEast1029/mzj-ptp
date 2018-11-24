import React, { Component, Fragment } from 'react';
import { Modal, Divider, message } from 'antd';
import net from '@utils/net';
import * as types from '@constants/actions/crowd';
import apiRoot from '@constants/apiRoot';
import { Link } from 'react-router';
const confirm = Modal.confirm;
class Item extends Component {
	handleSetting = () => {
		const { role = 0, community_user_id } = this.props.itemData;
		const url = types.CROWD_EDIT_MEMBER_SET_POST;
		const param = {
			community_user_id,
			type: role == 2 ? 0 : 2
		};
		const params = {
			param,
			ajaxType: 'POST',
			onSuccess: () => {

			},
			onError: () => {

			}
		};
		this.props.actions.request(url, params, {});
	}
	renderMassage = (val, index) => {
		const { role = 0 } = this.props.itemData;
		switch (role){
			case 0:
				return '群员';
			case 9:
				return '群主';
			case 2:
				return '管理员';
		}
	}
	render() {
    	const { itemData = {}, actions, keyword } = this.props;
    	const {
    		number,
    		nick_name,
    		user_id,
    		user_sn,
    		avatar,
    		join_time,
    		role = 0
    	} = itemData;
    	return (
    		<tr className="g-c-dark">
    			<td>
    				{number}
    			</td>
    			<td className="g-tl">
					{user_sn ? user_sn : '-'}
    			</td>
				<td className="g-tl">
    				{nick_name}
    			</td>
    			<td>
					{join_time ? join_time : '-'}
    			</td>
				<td className="g-tl">
					{this.renderMassage()}
    			</td>
    			<td>
					{
						role != 9 && 
						<div className="g-tl g-flex-cc" style={{ minWidth: '150px' }}>
							<div className="g-operation" onClick={this.handleSetting}>
								{
									role == 2 ? '取消管理员' : '设置管理员'
								}
							</div>
						</div>
					}
    			</td>
    		</tr>

    	);
	}
}

export default Item;
