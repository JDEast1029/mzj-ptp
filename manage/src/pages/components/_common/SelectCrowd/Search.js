import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Button, Select, Form, Row, Col } from 'antd';
import { DebounceClick } from 'wya-rc';
const { Option } = Select;
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
	constructor(props, text) {
		super(props, text);
	}
	render() {
    	const { onInputChange, onSearch, product_name, product_sn } = this.props;
    	const { getFieldDecorator } = this.props.form;
    	return (
    		<Fragment>
    			<div className="g-m-b-20 g-c-black-imp g-flex-ac">
    				<div className="g-flex-ac">
    					<div className="g-flex-ac g-m-r-30">
    						<Input
    							style={{ width: 180 }}
    							maxLength={10}
    							placeholder="请输入社群名称"
    							onChange={e => {
    								onInputChange && onInputChange(e.target.value, 'name');
    							}}
    						/>
    					</div>
    				</div>
					<DebounceClick onClick={() => { onSearch(1, true); }}>
						<Button type="primary" >搜索</Button>
					</DebounceClick>
    				
    			</div>
    		</Fragment>
    	);
	}
}

export default Form.create()(Search);
