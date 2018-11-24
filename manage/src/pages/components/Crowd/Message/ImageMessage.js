import React, { Component } from 'react';
import { Form, message } from 'antd';
import { ImgsPicker, DebounceClick } from 'wya-rc';
import SelectCrowd from '@common/SelectCrowd/SelectCrowd';
import apiRoot from '@constants/apiRoot';
import net from '@utils/net';
@Form.create()
export default class ImageMessage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: []
		};
	}
    handleClick = (e) => {
    	e.preventDefault();
    	const val = this.props.form.getFieldsValue();
    	if (!val.images.length){
    		message.error('请选择图片');
    		return;
    	}
    	SelectCrowd.popup({
    		title: '选择发送社群',
    		min: 1,
    		message: true
    	}).then((res) => {
    		const data = {
    			community_ids: res.selectInfo,
    			msg_type: 1,
    			msg_urls: val.images
    		};
    		this.setMessage(data);
    	}).catch((error) => {
    	});
    };
	
	handleError = (res) => {
		message.warn(res.msg);
	};

    setMessage = (param) => {
    	const url = apiRoot._CROWD_MESSAGE_SUBMIT_POST;
    	net.ajax({
    		url,
    		param,
    		type: 'POST'
    	}).then(() => {
    		message.success("发送成功");
    		this.props.form.setFieldsValue( { images: [] } );
    	});
    }
    render() {
    	const { getFieldDecorator } = this.props.form;
    	const { value } = this.state;
    	return (
    		<Form onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
    			<Form.Item
    			>
    				{
    					getFieldDecorator('images', {
    						initialValue: [],
    						rules: [
    							{
    								required: true,
    								message: '请选择图片!',
    							}
    						],
    					})(
    						<ImgsPicker 
    							max={10} 
    							upload={{ multiple: true }}
    							onError={this.handleError}
    						/>
    					)
    				}
    			</Form.Item>
    			<DebounceClick
    				onClick={this.handleClick}
    				style={{ display: 'inline-block', marginTop: 40 }}
    			>
    				<div
    					className="gp-btn-blue"
    					
    					style={{ marginTop: 40 }}
    				>
						选择社群并发送
    			</div>
    			</DebounceClick>
    		</Form>
    	);
    }
}
