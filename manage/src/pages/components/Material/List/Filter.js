/**
 * 搜索栏
 */
import React, { Component } from "react";
import { Button, Input, Form, Select, Spin, DatePicker, message } from "antd";
import { DebounceClick } from "wya-rc";
import { getHashUrl, dataValidity } from "@utils/utils";
import moment from "moment";
import * as types from "@constants/actions/material";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: false,
			communitylist: []
		};
		this.loadModuleList();
	}

	// 获取素材分类下拉框
	loadModuleList = () => {
		let url = types.MATERIAL_CATEGORY_SELECT_LIST_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					communitylist: res.data
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	};

	handleSearch = event => {
		const { actions, query } = this.props;
		event && event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let fieldValues = {
					...query,
					...values,
					start_create_time:
						values["operation_time"] &&
						values["operation_time"][0] &&
						values["operation_time"][0].format(
							"YYYY-MM-DD HH:mm:ss"
						),
					end_create_time:
						values["operation_time"] &&
						values["operation_time"][1] &&
						values["operation_time"][1].format(
							"YYYY-MM-DD HH:mm:ss"
						)
				};
				delete fieldValues.operation_time;
				_global.history.replace(
					getHashUrl(`/material/list`, { ...fieldValues })
				);
				// init
				actions.listSearchInit();
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { query = {} } = this.props;
		const { communitylist } = this.state;
		const style = {
			backgroundColor: "#f3f3f3",
			margin: "50px 0px",
			marginBottom: "20px",
		};
		return (
			<div
				className="g-pd-20 g-antd-select-container"
				style={style}
				id="popup-container"
			>
				<Form layout="inline" style={{ marginBottom: 10 }}>
					<FormItem>
						{getFieldDecorator("title", {
							initialValue: query.title
						})(
							<Input
								style={{ width: 180 }}
								placeholder="请输入素材标题"
							/>
						)}
					</FormItem>

					<FormItem>
						{getFieldDecorator("category_id", {
							initialValue: query.category_id
						})(
							<Select
								allowClear
								style={{ width: 180 }}
								placeholder="请选择所属分类"
								getPopupContainer={() =>
									document.getElementById("popup-container")
								}
							>
								{communitylist &&
									communitylist.map((item, index) => {
										return (
											<Option
												key={item.category_id}
												value={String(item.category_id)}
											>
												{item.name}
											</Option>
										);
									})}
							</Select>
						)}
					</FormItem>

					<FormItem>
						{getFieldDecorator("operation_time", {
							initialValue: [
								query.start_create_time &&
								moment(query.start_create_time),
								query.end_create_time &&
								moment(query.end_create_time)
							]
						})(
							<RangePicker
								showTime
								placeholder={["创建时间(开始)", "创建时间(结束)"]}
								format="YYYY-MM-DD HH:mm:ss"
								getCalendarContainer={() =>
									document.getElementById("popup-container")
								}
							/>
						)}
					</FormItem>
				</Form>
				<DebounceClick
					className="gp-btn-blue"
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
