import React, { Component, Fragment } from 'react';
import { Input, Button, Form } from 'antd';

const FormItem = Form.Item;
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

class Search extends Component {
	constructor(props, text){
		super(props, text);
	}

	handleSubmit = () => {
		const { onSearch } = this.props;
		onSearch && onSearch(1, true);
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="inline" style={{ marginBottom: 20 }}>
				<FormItem>
					{getFieldDecorator('category_name', {
					})(
						<Input
							style={{ width: 180 }}
							placeholder="请输入分类名称"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						className="gp-btn-blue"
						onClick={this.handleSubmit}
					>
						搜索
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(Search);
