import React, { Component } from 'react';
import { getHashUrl } from '@utils/utils';
import { Button, Input, Form, message, Select, DatePicker } from 'antd';
import { DebounceClick } from 'wya-rc';
import moment from "moment";
import * as _common from '@constants/actions/_common';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class Filter extends Component {
	constructor(props) {
		super(props);
		// 赋值，初始化数据
		_global.form = props.form;
		this.loadCommunityList();
		this.props.actions.listSearchInit();
	}

	/**
	 * 社群列表下拉框
	 */
	loadCommunityList = () => {
		let url = _common.COMMON_INFO_GET;
		let param = { use_type: 1 };
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	}

	handleSearch = (event) => {
		const { actions, query } = this.props;
		event && event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let fieldValues = {
					...query,
					...values,
					start_start_time:
						values["operation_time"] &&
						values["operation_time"][0] &&
						values["operation_time"][0].format(
							"YYYY-MM-DD HH:mm:ss"
						),
					end_start_time:
						values["operation_time"] &&
						values["operation_time"][1] &&
						values["operation_time"][1].format(
							"YYYY-MM-DD HH:mm:ss"
						)
				};
				delete fieldValues.operation_time;
				_global.history.replace(getHashUrl(`/agent/list`, { ...fieldValues }));
				// init
				actions.listSearchInit();
			}
		});
	};

	render() {
		const { query, communityList = {} } = this.props;
		const { list = [] } = communityList;
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="g-flex-ac g-jc-fs g-fw-w g-pd-20 g-m-b-30 g-bg-f3" id="popup-container">
				<FormItem style={{ display: 'inline', margin: '0 20px 15px 0' }}>
					{getFieldDecorator('user_sn', {
						initialValue: query.user_sn || undefined,
					})(
						<Input
							style={{ width: 180 }}
							maxLength={50}
							placeholder="请输入会员ID"
						/>
					)}
				</FormItem>

				<FormItem style={{ display: 'inline', margin: '0 20px 15px 0' }} >
					{getFieldDecorator('nick_name', {
						initialValue: query.nick_name || undefined,
					})(
						<Input
							style={{ width: 180 }}
							maxLength={10}
							placeholder="请输入会员昵称"
						/>
					)}
				</FormItem>

				<FormItem style={{ display: 'inline', margin: '0 20px 15px 0' }} >
					{getFieldDecorator('community_id', {
						initialValue: query.community_id || undefined
					})(
						<Select
							placeholder="请选择所在社群"
							style={{ width: 180 }}
							allowClear
							getPopupContainer={() => document.getElementById('popup-container')}
						>
							{list.length && list.map((item) => {
								return <Select.Option
									key={item.community_id}
									// 后端返回的id类型是number，但是antd这里需要一个字符串
									value={String(item.community_id)}
								>
									{item.name}
								</Select.Option>;
							})}
						</Select>
					)}
				</FormItem>
				<FormItem style={{ display: 'inline', margin: '0 20px 15px 0' }}>
					{getFieldDecorator("operation_time", {
						initialValue: [
							query.start_start_time && moment(query.start_start_time),
							query.end_start_time && moment(query.end_start_time)
						]
					})(
						<RangePicker
							showTime
							placeholder={["注册时间（开始）", "注册时间（结束）"]}
							format="YYYY-MM-DD HH:mm:ss"
							getCalendarContainer={() =>
								document.getElementById("popup-container")
							}
						/>
					)}
				</FormItem>

				<div className="g-width" style={{ display: 'inline' }}>
					<DebounceClick
						onClick={this.handleSearch}
						style={{ display: 'inline' }}
						type="primary"
						tag={Button}
					>搜索</DebounceClick>
				</div>
			</div>
		);
	}
}

export default Form.create()(Filter);
