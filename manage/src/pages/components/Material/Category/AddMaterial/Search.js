import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Button, Select, Form, Row, Col } from 'antd';

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
		this.state = {
			crowdList: []
		};
	}

    // handleClick = () => {
    // 	const { onAdd } = this.props;
    // 	onAdd && onAdd();
    // }
    handleCrowdList = () => {
    	if (this.state.crowdList.length > 0) return;
    	const { request } = this.props;
    	request && request({
    		url: API_ROOT['_PSELECTCOUPON_LIST_GET'],
    		type: "get",
    		param: {
                
    		}
    	}).then((res) => {
    		this.setState({
    			crowdList: res.data
    		});
    	});
    }
    render() {
    	const { onInputChange, onSearch, title } = this.props;
    	const { getFieldDecorator } = this.props.form;
    	const { crowdList } = this.state;
    	return (
    		<Fragment>
    			<div className="g-bg-f3 g-m-b-20 g-c-black-imp g-pd-lr-10 g-pd-tb-20 g-flex-ac ">
    				<div className="g-flex-ac">
    					<div className="g-flex-ac g-m-r-30">
    						<Input
    							style={{ width: 180 }}
    							maxLength={50}
    							placeholder="请输入素材名称"
    							onChange={e => {
    								onInputChange && onInputChange(e.target.value, 'title');
    							}}
    						/>
    					</div>
    				</div>
    				<Button  type="primary" onClick={() => { onSearch(1, true); }}>搜索</Button>
    			</div>
    		</Fragment>
    	);
    }
}

export default Form.create()(Search);
