import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Button, Select, Form, Row, Col, DatePicker } from 'antd';
import { DebounceClick } from 'wya-rc';
const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
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

    handleClick = () => {
    	const { onAdd } = this.props;
    	onAdd && onAdd();
    }

    render() {
    	const { onInputChange, onSearch, product_name, product_sn, onAdd } = this.props;
    	const { getFieldDecorator } = this.props.form;

    	return (
    		<Fragment>
    			<div className="g-flex g-fd-rr g-m-b-10">
    				<Button type="primary" onClick={() => { onAdd(); }}>添加</Button>
    			</div>
    			<div 
    				className="g-bg-f3 g-m-b-20 g-c-black-imp  g-pd-tb-20 g-flex-ac" 
    				id="layout-content"
    			>
    				<div className="g-flex g-fw-w">
    					<div className="g-flex-ac g-m-r-30 g-m-b-20">
    						<Input
    							style={{ width: 180 }}
    							maxLength={10}
    							placeholder="请输入名称"
    							onChange={e => {
    								onInputChange && onInputChange(e.target.value, 'name');
    							}}
    						/>
    					</div>
    					<div className="g-flex-ac g-m-r-30 g-m-b-20">
    						<Select
    							allowClear
    							placeholder="请选择格式"
    							style={{ width: 180 }}
    							getPopupContainer={() => document.querySelector('#layout-content')}
    							onChange={value => {
    								onInputChange && onInputChange(value, 'type');
    							}}
    						>
    							<Option  value="1">mp3</Option>
    							<Option  value="2">wma</Option>
    							<Option  value="3">wav</Option>
    							<Option  value="4">arm</Option>
    						</Select>
    					</div>
    					<div className="g-flex-ac g-m-r-30 g-m-b-20">
    						<RangePicker
    							showTime
    							placeholder={[
    								"上传时间（开始）",
    								"上传时间（结束）"
    							]}
    							format="YYYY-MM-DD HH:mm:ss"
    							getCalendarContainer={() =>
    								document.getElementById("layout-content")
    							}
    							onChange={(data, dataString) => {
    								onInputChange && onInputChange(dataString, 'time');
    							}}
    						/>
    					</div>
    					{/* <div className="g-flex-ac g-m-r-30 g-m-b-20">
    						<DatePicker
    							style={{ width: 180 }}
    							showTime
    							placeholder="上传时间（开始）"
    							format="YYYY-MM-DD HH:mm:ss"
    							onChange={(data, dataString) => {
    								onInputChange && onInputChange(dataString, 'upload_time_start');
    							}}
    							disabledDate={this.disabledStartDate}
    						/>
    					</div>
    					<div className="g-flex-ac g-m-b-20">
    						<DatePicker
    							style={{ width: 180 }}
    							showTime
    							placeholder="上传时间（结束）"
    							format="YYYY-MM-DD HH:mm:ss"
    							onChange={(data, dataString) => {
    								onInputChange && onInputChange(dataString, 'upload_time_end');
    							}}
    							disabledDate={this.disabledStartDate}
    						/>
    					</div> */}
    					<DebounceClick onClick={() => { onSearch(1, true); }}>
    						<Button type="primary" className="g-m-l-20" >搜索</Button>
    					</DebounceClick>
    				</div>
    			</div>
    		</Fragment>
    	);
    }
}

export default Form.create()(Search);
