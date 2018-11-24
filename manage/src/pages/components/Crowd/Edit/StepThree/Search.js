import React, { Component } from 'react';
import { Form, DatePicker, Modal, Select, Input, Button, Row, Col, Icon, message } from 'antd';
import { toQueryString, initItem, getHashUrl, formatLimitLevel } from '@utils/utils';
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
  	let fieldValues = {
  		...query,
  		...values
	  };
  	_global.history.replace(getHashUrl(`/crowd/list/edit-two`, { ...fieldValues }));
  	// init
  	actions.crowdEditMemberSearch();
  };
  render() {
  	const { query = {}, form, actions } = this.props;
  	const { getFieldDecorator } = form;
  	return (
  		<Form className="g-bg-gray" layout="inline" style={{ marginTop: '40px' }}>
  			<div className="g-bg-f3 g-m-b-20 g-c-black-imp g-pd-lr-10 g-pd-tb-20 ">
  				<div className="g-flex g-fw-w">
  					<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
  						{getFieldDecorator('user_sn', {
  							initialValue: query.user_sn || ''
  						})(
  							<Input
  								style={{ width: 180 }}
  								maxLength={10}
  								placeholder="请输入会员ID"
  							/>
  						)}
  					</FormItem>
  					<FormItem className="g-flex-ac g-m-r-30 g-m-b-20">
  						{getFieldDecorator('nick_name', {
  							initialValue: query.nick_name || ''
  						})(
  							<Input
  								style={{ width: 180 }}
  								maxLength={10}
  								placeholder="请输入会员昵称"
  							/>
  						)}
  					</FormItem>
  					<div className="gp-btn-blue" onClick={(e) => { this.handleSearch(e); }}>搜索</div>
    			</div>
    		</div>
  		</Form>
  	);
  }
}
export default Form.create()(Search);
