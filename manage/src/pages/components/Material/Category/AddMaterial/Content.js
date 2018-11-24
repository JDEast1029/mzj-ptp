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
			name: '',
			logo: null
		};
	}
	
    handleChange = (e) => {
    	const name = e.target.value;
    	if (name.length > 20) return;
    	this.setState({
    		name,
    	});
    }
	handleSave = (cb) => {
    	this.props.form.validateFields((err, values) => {
    		if (err) return false;
			this.uploadInfo(values);
    	});
	}
	uploadInfo = (values) =>  {
		const url = apiRoot.MATERIAL_CATEGORY_MODEL_ADD_CATEGORY_POST;
		const param = {
			logo: values.logo[0],
			sort: this.state.sort,
			name: values.name
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
		const { logo, name } = this.state;
    	return (
    		<Form>
    			<Item
    				{...formItemLayout}
    				label="群主昵称"
    				required
    			>
    				{
    					getFieldDecorator('name', {
    						initialValue: name,
    						rules: [
    							{
    								required: true,
    								message: '请输入群主昵称',
    							}
    						],
    					})(
    						<div className="g-flex">
    							<Input
    								style={{ width: 170 }}
    								placeholder="请输入社群名称"
    								onChange={this.handleChange}
    								value={this.state.name}
    							/>
								<div className="g-c-gray3 g-m-l-10" style={{ 'lineHeight': '32px' }}>
									{this.state.name.length}/20
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
						getFieldDecorator('logo', {
							initialValue: logo ? [logo] : [],
    						rules: [
    							{
    								required: true,
    								message: '请图片上传!',
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
				<div className="gp-btn-blue" onClick={this.handleSave}>保存</div>
    		</Form>
    	);
	}
}
export default Form.create()(FormContent);