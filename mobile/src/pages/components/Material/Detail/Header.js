import React, { Component } from 'react';
import * as types  from '@constants/actions/material';
import { Link } from 'react-router';
import { MToasts } from 'wya-rc';
export default class Header extends Component {
	constructor(params) {
		super(params);
	}
    handleCollect = () => {
    	const { info = {} } = this.props;
    	const {
    		material_id,
    		is_collection
    	} = info;
    	const url = types.MATERIAL_DETAIL_COLLECT_CHANGE_POST;
    	const param = { material_id };
    	const params = {
    		param,
    		ajaxType: 'POST',
    		onSuccess: () => {
    			const msg = is_collection ? '已取消收藏' : '收藏成功';
    			MToasts.info(msg);
    		},
    		onError: () => {
				
    		}
    	};
    	this.props.actions.request(url, params, {});
    }
    render() {
    	const { info = {} } = this.props;
    	const { 
    		material_id, 
    		title, 
    		icon,
    		remark,
    		data,
    		update_time,
    		is_collection,
    		not_allow,
    		is_not_exists
    	} = info;
    	if (!not_allow && !is_not_exists){
    		return (
    			<div className>
    				<p className="g-fs-18 g-m-b-10">{title}</p>
    				<div className="g-flex g-jc-sb g-fs-12">
    					<div className="g-black-light1">编辑于 {update_time}</div>
    					<div className="g-blue-middle">
    						<span onClick={this.handleCollect}>{is_collection ? '取消收藏' : '收藏'}</span>
							&nbsp;&nbsp;&nbsp;
    					<Link to={`/material/share?material_id=${material_id}`}>分享</Link>
    					</div>
    				</div>
    			</div>
    		);
    	} else {
    		return null;
    	}
    }
}
