import React, { Component, Fragment } from 'react';
import { Form, DatePicker, Modal, Select, Input, Button, Row, Col, Icon, message } from 'antd';
import { toQueryString, initItem, getHashUrl, formatLimitLevel } from '@utils/utils';
import Moment from 'moment';
import { Link } from 'react-router';
import { DebounceClick } from 'wya-rc';
import SelectAgent from '@common/SelectAgent/SelectAgent';
import * as types from '@constants/actions/crowd';
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
	handleAdd = () => {
		const { query: { id } } = this.props;
		const disableArr = Object.keys(this.props.listInfo.itemObj);
		SelectAgent.popup({
			disableArr,
			onlyOne: false,
			min: 0,
			paramInfo: {
				change_community_id: id,
				user_type: 3
			},
		}).then((res) => {
			// this.props.actions.crowdCreateAddMember(res);
			this.addAgent(res);
		}).catch(() => {

		});
	}
	addAgent = (data) => {
		const { query: { id } } = this.props;
		const url = types.CROWD_EDIT_MEMBER_ADD_POST;
		const param = {
			user_ids: data,
			step: 2,
			community_id: id
		};
		const params = {
			param,
			ajaxType: 'POST',
			onSuccess: () => {

			},
			onError: (error) => {
				message.error(error.msg);
			}
		};
		this.props.actions.request(url, params, {});
	}
	render() {
		const { query = {}, form, actions, listInfo } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Fragment>
				<div className="g-flex g-jc-sb g-pd-tb-20 g-ai-c" >
					<div>共计{listInfo.totalCount}名群成员</div>
					<div className="gp-btn-blue" onClick={this.handleAdd}>添加群成员</div>
				</div>
				<Form className="g-bg-gray" layout="inline" >
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
			</Fragment>
		);
	}
}
export default Form.create()(Search);
