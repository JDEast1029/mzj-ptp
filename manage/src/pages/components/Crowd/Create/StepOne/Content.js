import React, { Component } from 'react';
import Form from '../../common/Form';
import apiRoot from '@constants/apiRoot';
import net from '@utils/net';
import { message } from 'antd';
import { setItem, getItem, delItem } from '@utils/utils';
import { CROWD_LOGE } from '@constants/constants';
export default class Content extends Component {
    handleNext = (info) => {
    	if (!info) return;
    	net.ajax({
    		url: apiRoot._CROWD_CREATE_CHECK_NAME_GET,
    		type: 'get',
    		param: { name: info.name }
    	}).then(() => {
    		setItem('createUser', info);
    		_global.history.push({
    			pathname: '/crowd/list/create-two',
    			state: info
    		});
    	}).catch((error) => {
    		message.error(error.msg);
    		return false;
    	});
    }
	getFrom = () => {
		this.form.getInfo(this.handleNext);
	}
	handleBack = () => {
		delItem('createUser');
		delItem('createMember');
		_global.history.goBack();
	}
	getLocalInfo = () => {
		return getItem('createUser');
	}
	render() {
		const hasInfo = this.getLocalInfo() || { img: CROWD_LOGE };
    	return (
    		<div style={{ marginTop: 86 }}>
				<Form 
					wrappedComponentRef={val => this.form = val}
					info={hasInfo}
				/>
    			<div className="g-flex" style={{ 'marginLeft': '12%' }}>
    				<div 
						onClick={this.handleBack} 
						className="gp-btn-blue g-m-r-20" 
						style={{ marginRight: '60px' }}>取消</div>
					<div className="gp-btn-blue" onClick={this.getFrom}>下一步</div>
    			</div>
    		</div>
    	);
	}
}
