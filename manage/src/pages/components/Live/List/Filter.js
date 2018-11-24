/**
 * 搜索栏
 */
import React, { Component } from "react";
import { Button, Input, Form, Select, Spin, DatePicker, message } from "antd";
import { DebounceClick } from "wya-rc";
import { getHashUrl, dataValidity } from "@utils/utils";
import * as types from "@constants/actions/live";
import moment from "moment";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: false,
			communityList: ""
		};
		this.fetchCommunityList();
	}

	handleSearch = event => {
		const { actions, query } = this.props;
		event && event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let fieldValues = {
					...query,
					...values,
					start_time_start:
						values["operation_time"] &&
						values["operation_time"][0] &&
						values["operation_time"][0].format(
							"YYYY-MM-DD HH:mm:ss"
						),
					start_time_end:
						values["operation_time"] &&
						values["operation_time"][1] &&
						values["operation_time"][1].format(
							"YYYY-MM-DD HH:mm:ss"
						)
				};
				delete fieldValues.operation_time;
				_global.history.replace(
					getHashUrl(`/live/list`, { ...fieldValues })
				);
				// init
				actions.listSearchInit();
			}
		});
	};

	// 获取群列表
	fetchCommunityList = () => {
		let url = types.LIVE_LIST_ROOM_COMMUNITY_LIST_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					communityList: res.data.list
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { query = {}, moduleList = [] } = this.props;
		const { communityList } = this.state;
		const style = {
			backgroundColor: "#f3f3f3",
			marginTop: "50px",
			marginBottom: "20px"
		};
		return (
			<div className="g-pd-20 g-antd-select-container" style={style}>
				<Form layout="inline" id="popup-container">
					<FormItem>
						{getFieldDecorator("title", {
							initialValue: query.title
						})(
							<Input
								placeholder="请输入直播名称"
								style={{ width: 180 }}
							/>
						)}
					</FormItem>

					<FormItem>
						{getFieldDecorator("operation_time", {
							initialValue: [
								query.start_time_start && moment(query.start_time_start),
								query.start_time_end && moment(query.start_time_end)
							]
						})(
							<RangePicker
								showTime
								placeholder={[
									"直播时间(开始)",
									"直播时间(结束)"
								]}
								format="YYYY-MM-DD HH:mm:ss"
								getCalendarContainer={() =>
									document.getElementById("popup-container")
								}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("nick_name", {
							initialValue: query.nick_name
						})(
							<Input
								placeholder="请输入主持人名称"
								style={{ width: 180 }}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("lecturer_name", {
							initialValue: query.lecturer_name
						})(
							<Input
								placeholder="请输入讲师名称"
								style={{ width: 180 }}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("sn", {
							initialValue: query.sn
						})(
							<Input
								placeholder="请输入直播号"
								style={{ width: 180 }}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("status", {
							initialValue: query.status
						})(
							<Select
								style={{ width: 180 }}
								placeholder="请选择状态"
								allowClear
								getPopupContainer={() =>
									document.getElementById("popup-container")
								}
							>
								<Option value="0">未开始</Option>
								<Option value="1">直播中</Option>
								<Option value="2">已结束</Option>
							</Select>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("community", {
							initialValue: query.community
						})(
							<Select
								allowClear
								style={{ width: 180 }}
								placeholder="请选择群"
								getPopupContainer={() =>
									document.getElementById("popup-container")
								}
							>
								{communityList &&
									communityList.map((item, index) => {
										return (
											<Option
												key={item.community_id}
												value={String(
													item.community_id
												)}
											>
												{item.name}
											</Option>
										);
									})}
							</Select>
						)}
					</FormItem>
				</Form>
				<DebounceClick
					className="gp-btn-blue"
					style={{ marginTop: 8 }}
					tag={Button}
					onClick={this.handleSearch}
				>
					搜索
				</DebounceClick>
			</div>
		);
	}
}

export default Form.create()(Filter);
