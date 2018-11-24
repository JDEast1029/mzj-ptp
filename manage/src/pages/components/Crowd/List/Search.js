import React, { Component } from 'react';
import { Form, DatePicker, Modal, Select, Input, Button, Row, Col, Icon, message } from 'antd';
import { toQueryString, initItem, getHashUrls, formatLimitLevel } from '@utils/utils';
import Moment from 'moment';
import { Link } from 'react-router';
import { DebounceClick } from 'wya-rc';
import SelectAgent from '@common/SelectAgent/SelectAgent';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 14 },
};

class Search extends Component {
	state = {
		expand: false,
		visible: false,
		products: []
	}
	handleSearch = (event) => {
		const { actions, status, pathname, query } = this.props;
		event.preventDefault();
		const values = this.props.form.getFieldsValue();
		const { start_start_time, end_start_time, ...restValues } = values;
		let fieldValues = {
			...query,
			...restValues,
			start_start_time: start_start_time ? start_start_time.format('YYYY-MM-DD HH:mm:ss') : '',
			end_start_time: end_start_time ? end_start_time.format('YYYY-MM-DD HH:mm:ss') : null,
		};
		_global.history.replace(getHashUrls(`/crowd/list`, { ...fieldValues }));
		// init
		actions.crowdListSearch();
	};
	disabledStartDate = (start_start_time) => {
		const { end_start_time } = this.props.form.getFieldsValue();
		if (!start_start_time || !end_start_time) {
			return false;
		}
		return start_start_time.valueOf() > end_start_time.valueOf();
	}
	disabledEndDate = (end_start_time) => {
		const { start_start_time } = this.props.form.getFieldsValue();
		if (!start_start_time || !end_start_time) {
			return false;
		}
		return start_start_time.valueOf() >= end_start_time.valueOf();
	}
	render() {
		const { query = {}, form, actions, userLevel, headLevel, freightInfo } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Form className="g-bg-gray" layout="inline">
				<div className="g-flex g-fd-rr g-m-b-20">
					<Link to="/crowd/message" className="gp-btn-blue" type="primary">群发消息</Link>
					<Link to="/crowd/list/create-one" className="g-m-r-20 gp-btn-blue" >创建社群</Link>
				</div>
				<div className="g-bg-f3 g-m-b-20 g-c-black-imp g-pd-lr-20 g-pd-tb-20" id="popup-container">
					<div className="g-flex g-fw-w">
						<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
							{getFieldDecorator('name', {
								initialValue: query.name || ''
							})(
								<Input
									style={{ width: 180 }}
									maxLength={20}
									placeholder="请输入社群名称"
								/>
							)}
						</FormItem>
						<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
							{getFieldDecorator('start_start_time', {
								initialValue: query.start_start_time && Moment(query.start_start_time)
							})(
								<DatePicker
									getCalendarContainer={() =>
										document.getElementById("popup-container")
									}
									style={{ width: 180 }}
									showTime
									placeholder="创建时间（开始）"
									format="YYYY-MM-DD HH:mm:ss"
									disabledDate={this.disabledStartDate}
								/>
							)}
						</FormItem>
						<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
							{getFieldDecorator('end_start_time', {
								initialValue: query.end_start_time && Moment(query.end_start_time)
							})(
								<DatePicker
									getCalendarContainer={() =>
										document.getElementById("popup-container")
									}
									style={{ width: 180 }}
									showTime
									placeholder="创建时间（结束）"
									format="YYYY-MM-DD HH:mm:ss"
									disabledDate={this.disabledEndDate}
								/>
							)}
						</FormItem>
					</div>
					<br />
					<DebounceClick
						onClick={(e) => { this.handleSearch(e); }}
						style={{ display: 'inline-block' }}
					>
						<div className="gp-btn-blue">搜索</div>
					</DebounceClick>
				</div>
			</Form>
		);
	}
}
export default Form.create()(Search);
