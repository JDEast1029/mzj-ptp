import React, { Component, Fragment } from 'react';
import { Modal, Divider, message } from 'antd';
import  net from '@utils/net';
import * as types from '@constants/actions/crowd';
import apiRoot from '@constants/apiRoot';
import * as commonTypes from '@constants/actions/_common';
import { Link } from 'react-router';
const confirm = Modal.confirm;
class Item extends Component {
	handleSelect = () => {
		const { selectArr, itemData, actions } = this.props;
		const { material_id } = itemData;
		if (selectArr.length == 5 && selectArr.indexOf(material_id) == -1){
			message.error('一次最多群发5条素材');
			return;
		}
		actions.crowdMessageSelect(material_id);
	}
	render() {
		const { itemData = {}, actions, keyword, selectArr } = this.props;
    	const {
			title,
			order,
			material_id
		} = itemData;
		const is_select = selectArr.indexOf(material_id) > -1;
    	return (
    		<tr className="g-c-dark">
    			<td>
    				{
						order
    				}
    			</td>
    			<td className="g-tl">
					{title}
    			</td>
    			<td>
					<div
						style={{ display: 'inline-block', width: '72px' }}
						onClick={this.handleSelect} 
						className={`${is_select ? 'gp-btn-blue' : 'gp-btn-white'} g-pointer`}
					>{ is_select ? '取消' : '选择' }</div>
    			</td>
    		</tr>
    	);
	}
}

export default Item;
