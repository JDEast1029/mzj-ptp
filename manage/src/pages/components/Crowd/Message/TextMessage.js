import React, { Component } from 'react';
import { Input, message } from 'antd';
import SelectCrowd from '@common/SelectCrowd/SelectCrowd';
import net from '@utils/net';
import apiRoot from '@constants/apiRoot';
import { DebounceClick } from 'wya-rc';
const { TextArea } = Input; 
export default class TextMessage extends Component {
	constructor(params) {
		super(params);
		this.state = {
			val: ''
		};
	}
    handleChange = (e) => {
    	const val = e.target.value;
    	this.setState({
    		val: e.target.value
    	});
    }
    handleSelectCrowd = () => {
    	if (!this.state.val.length){
    		message.error('请输入内容');
    		return;
    	}
    	SelectCrowd.popup({
    		title: '选择发送社群',
    		min: 1,
    		message: true
    	}).then((res) => {
    		const data = {
    			community_ids: res.selectInfo,
    			msg_type: 0,
    			msg: this.state.val
    		};
    		this.setMessage(data);
    	}).catch(() => {

    	});
    }
    setMessage = (data) => {
    	const url = apiRoot._CROWD_MESSAGE_SUBMIT_POST;
    	net.ajax({
    		url,
    		param: data,
    		type: 'POST'
    	}).then(() => {
    		this.setState({
    			val: ''
    		}, message.success("发送成功"));
    		
    	});
    }
    render() {
    	const { val } = this.state;
    	return (
    		<div>
    			<TextArea value={val} rows={15} onChange={this.handleChange} maxLength={500}/>
    			<div className="g-flex g-jc-sb g-c-gray2 g-m-tb-20" style={{ marginBottom: 40 }}>
    				<span>请在上面输入框直接输入文字</span>
    				<span>{val.length > 500 ? 500 : val.length}/500</span>
    			</div>
    			<DebounceClick
    				onClick={this.handleSelectCrowd}
    				style={{ display: 'inline-block' }}
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
