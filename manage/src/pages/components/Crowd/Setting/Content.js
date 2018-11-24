import React, { Component } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import { ImgsPicker } from 'wya-rc';
import net from '@utils/net';
import apiRoot from '@constants/apiRoot';
const Item = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		md: { span: 3 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		md: { span: 12 },
		sm: { span: 12 },
	},
};
class FormContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leader_name: '',
			leader_avatar: null
		};
	}
	componentWillMount() {
		const url = apiRoot._CROW_SETTING_INFO_GET;
		net.ajax({
			url,
			param: {}
		}).then((res) => {
			this.setState({
				...res.data
			});
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
    handleChange = (e) => {
    	const leader_name = e.target.value;
    	// if (leader_name.length > 10) return;
    	this.setState({
    		leader_name,
    	});
    }
	handleSave = (cb) => {
    	this.props.form.validateFields((err, values) => {
    		if (err) return false;
			this.uploadInfo(values);
    	});
	}
	uploadInfo = (values) =>  {
		const url = apiRoot._CROW_SETTING_INFO_SAVE_POST;
		const param = {
			leader_avatar: values.leader_avatar[0],
			community_set_id: this.state.community_set_id,
			leader_name: values.leader_name
		};
		net.ajax({
			url,
			param,
		}).then((res) => {
			message.success("保存成功");
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
	render() {
    	const { getFieldDecorator } = this.props.form;
		const { leader_avatar, leader_name } = this.state;
    	return (
    		<Form>
    			<Item
    				{...formItemLayout}
    				label="群主昵称"
    				required
    			>
    				{
    					getFieldDecorator('leader_name', {
    						initialValue: leader_name,
    						rules: [
    							{
    								required: true,
    								message: '请输入群主昵称',
    							}
    						],
    					})(
    						<div className="">
    							<Input
    								style={{ width: 170, display: 'inline-block' }}
    								placeholder="请输入社群名称"
    								onChange={this.handleChange}
    								value={this.state.leader_name}
									maxLength={10}
    							/>
								<div 
									className="g-c-gray3 g-m-l-10" 
									style={{ 'lineHeight': '32px', display: 'inline-block' }}
								>
									{this.state.leader_name.length}/10
								</div>
    						</div>

    					)
    				}
    			</Item>
    			<Item
    				{...formItemLayout}
    				label="群主头像"
    			>
    				{
						getFieldDecorator('leader_avatar', {
							initialValue: leader_avatar ? [leader_avatar] : [],
    						rules: [
    							{
    								required: true,
    								message: '请上传图片!',
    							}
    						],
    					})(
    						<ImgsPicker
    							upload={{ accept: "image/*" }}
    							max={1}
    						/>
    					)
    				}
    			</Item>
				<Item
					{...formItemLayout}
					label=" "
					colon={false}
				>
					<div className="gp-btn-blue" onClick={this.handleSave}>保存</div>
				</Item>
    		</Form>
    	);
	}
}
export default Form.create()(FormContent);