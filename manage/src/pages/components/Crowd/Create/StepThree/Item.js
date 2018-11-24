import React, { Component, Fragment } from 'react';
import { Modal, Divider, message } from 'antd';
import net from '@utils/net';
import * as types from '@constants/actions/crowd';
import apiRoot from '@constants/apiRoot';
import { Link } from 'react-router';
const confirm = Modal.confirm;
class Item extends Component {
	handleDel = () => {
		const { category_id } = this.props.itemData;
		this.props.actions.crowdCreateDelMaterial(category_id);
	}
	render() {
    	const { itemData = {}, actions, keyword } = this.props;
    	const {
			number,
			material_num,
			name
    	} = itemData;
    	return (
    		<tr className="g-c-dark">
    			<td>
    				{number}
    			</td>
    			<td className="g-tl">
					{name}
    			</td>
				<td className="g-tl">
					{material_num}
    			</td>
    			<td>
    				<div className="g-operation" onClick={this.handleDel}>移除</div>
    			</td>
    		</tr>

    	);
	}
}

export default Item;
