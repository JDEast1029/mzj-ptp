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
			name: props.info.name || '',
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.info.name != this.props.info.name){
			this.setState({
				name: nextProps.info.name
			});
		}
	}
	
	handleChange = (e) => {
		const name = e.target.value;
		this.setState({
			name,
		});
	}
	getInfo = (cb) => {
		this.props.form.validateFields((err, values) => {
			if (err) return false;
			cb(values);
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { info } = this.props;
		const { value, name } = this.state;
		return (
			<Form>
				<Item 
					{...formItemLayout}
					label="社群名称"
					required
				>
					{
						getFieldDecorator('name', {
							initialValue: name,
							rules: [
								{
									required: true,
									message: '请输入社群名称',
								}
							],
						})(
							<div className="g-flex">
								<Input 
									style={{ width: 170 }}
									placeholder="请输入社群名称"
									onChange= {this.handleChange}
									value={this.state.name}
									maxLength={20}
								/>
								<div className="g-c-gray3 g-m-l-10" style={{ 'lineHeight': '32px' }}>
									{this.state.name.length > 20 ? 20 : this.state.name.length}/20
								</div>
							</div>
							
						)
					}
				</Item>
				<Item 
					{...formItemLayout}
					label="社群图标"
				>
					{
						getFieldDecorator('img', {
							initialValue: info.img ? [].concat(info.img) : [],
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
				{
					info.create_time &&
					<Item
						{...formItemLayout}
						label="创建时间"
					>
						<div>{ info.create_time }</div>
					</Item>
				}
				
			</Form>
		);
	}
}
export default Form.create()(FormContent);