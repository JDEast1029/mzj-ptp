import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Button, Select, Form, Row, Col } from 'antd';
import API_ROOT from '@constants/apiRoot';
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
		this.state = {
			crowdList: []
		};
		this.handleCrowdList();
	}

    // handleClick = () => {
    // 	const { onAdd } = this.props;
    // 	onAdd && onAdd();
    // }
    handleCrowdList = () => {
    	if (this.state.crowdList.length > 0) return;
    	const { request } = this.props;
    	request && request({
    		url: API_ROOT['_COMMON_CROWD_LIST_GET'],
    		type: "get",
    		param: {
    			use_type: 1
    		}
    	}).then((res) => {
    		this.setState({
    			crowdList: res.data.list
    		});
    	});
    }
    render() {
    	const { onInputChange, onSearch, product_name, product_sn, categoryName } = this.props;
    	const { getFieldDecorator } = this.props.form;
    	const { crowdList } = this.state;
    	return (
    		<Fragment>
    			{
    				categoryName && <div className="g-m-b-20"> 社群：{categoryName}</div>
    			}
    			<div className="g-m-b-20 g-c-black-imp g-flex-ac" id="layout-content">
    				<div className="g-flex-ac">
    					<div className="g-flex-ac g-m-r-30">
    						<Input
    							style={{ width: 180 }}
    							maxLength={10}
    							placeholder="请输入会员ID"
    							onChange={e => {
    								onInputChange && onInputChange(e.target.value, 'user_sn');
    							}}
    						/>
    					</div>
    					<div className="g-flex-ac g-m-r-30">
    						<Input
    							style={{ width: 180 }}
    							maxLength={50}
    							placeholder="请输入会员昵称"
    							onChange={e => {
    								onInputChange && onInputChange(e.target.value, 'nick_name');
    							}}
    						/>
    					</div>
    					{
    						!categoryName && <div className="g-flex-ac g-m-r-30">
    							<Select
    								allowClear
    								placeholder="请选择所在群"
    								style={{ width: 180 }}
    								getPopupContainer={() => document.querySelector('#layout-content')}
    								onChange={value => {
    									onInputChange && onInputChange(value, 'community_id');
    								}}
    							>
    								{
    									crowdList.length && crowdList.map((val, index) => {
    										return (
    											<Option key={index} value={val.community_id} >
    												{val.name}</Option>
    										);
    									})
    								}
    							</Select>
    						</div>
    					}
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
