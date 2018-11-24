import React, { Component } from 'react';
import { Form, DatePicker, Modal, Select, Input, Button, Row, Col, Icon, message } from 'antd';
import { toQueryString, initItem, getHashUrl, formatLimitLevel } from '@utils/utils';
import Moment from 'moment';
import { Link } from 'react-router';
import { DebounceClick } from 'wya-rc';
import SelectAgent from '@common/SelectAgent/SelectAgent';
import { ajax } from "wya-fetch";
import API_ROOT from '@constants/apiRoot';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 14 },
};

class Search extends Component {
	constructor(params) {
		super(params);
		this.state = {
			expand: false,
			visible: false,
			products: [],
			category: []
		};
		this.handleCategoryList();
	}
	handleSearch = (event) => {
		const { actions, status, pathname, query } = this.props;
		event.preventDefault();
		const values = this.props.form.getFieldsValue();
		const { title, category_id } = values;
		let fieldValues = {
			...query,
			title,
			category_id
		};
		_global.history.replace(getHashUrl(`/crowd/message`, { ...fieldValues }));
		// init
		actions.crowdMessageSearch();
	};
	handleCategoryList = () => {
		if (this.state.category.length > 0) return;
		ajax({
			url: API_ROOT['_COMMON_CATEGORY_SELECT_LIST_GET'],
			type: "get",
			param: {},
			async: false,
		}).then((res) => {
			this.setState({
				category: res.data
			});
		});
	}
	render() {
		const { query = {}, form, actions, userLevel, headLevel, freightInfo } = this.props;
		const { getFieldDecorator } = form;
		const { category } = this.state;
		return (
			<Form className="g-bg-gray" layout="inline">
				<p>选择素材：</p>
				<div className="g-bg-f3 g-m-b-20 g-c-black-imp g-pd-lr-10 g-pd-tb-20" id="layout-content">
					<div className="g-flex g-fw-w">
						<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
							{getFieldDecorator('title', {
								initialValue: query.title || ''
							})(
								<Input
									style={{ width: 180 }}
									maxLength={10}
									placeholder="请输入素材标题"
								/>
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('category_id', {
								initialValue: parseInt(query.category_id) || undefined
							})(
								<Select
									allowClear
									placeholder="请选择所属分类"
									style={{ width: 180 }}
									getPopupContainer={() => document.querySelector('#layout-content')}
									onFocus={this.handleCategoryList}
								>
									{
										category.length && category.map((val, index) => {
											return (
												<Option key={index} value={val.category_id} >
													{val.name}
												</Option>
											);
										})
									}
								</Select>
							)}
						</FormItem>
					</div>
					<br/>
					<DebounceClick onClick={(e) => {
						this.handleSearch(e);
					}}>
						<div className="gp-btn-blue" >搜索</div>
					</DebounceClick>
				</div>
			</Form>
		);
	}
}

export default Form.create()(Search);
