/**
 * 搜索栏
 */
import React, { Component } from "react";
import { Button, Form, Select, DatePicker, message } from "antd";
import { DebounceClick } from "wya-rc";
import { getHashUrl } from "@utils/utils";
import moment from "moment";
import * as _common from "@constants/actions/_common";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: false
		};
		this.loadModuleList();
	}

	handleSearch = event => {
		const { actions, query } = this.props;
		event && event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let fieldValues = {
					...query,
					...values,
					start_time:
						values["operation_time"] &&
						values["operation_time"][0] &&
						values["operation_time"][0].format(
							"YYYY-MM-DD HH:mm:ss"
						),
					end_time:
						values["operation_time"] &&
						values["operation_time"][1] &&
						values["operation_time"][1].format(
							"YYYY-MM-DD HH:mm:ss"
						)
				};
				delete fieldValues.operation_time;
				_global.history.replace(
					getHashUrl(`/home/log`, { ...fieldValues })
				);
				// init
				actions.listSearchInit();
			}
		});
	};

	loadModuleList = () => {
		let url = _common.COMMON_OPERATE_MODULE_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => { },
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { query = {}, moduleList = [] } = this.props;
		const style = {
			backgroundColor: "#f3f3f3",
			marginBottom: "20px"
		};
		return (
			<div
				className="g-pd-20 g-antd-select-container"
				id="popup-container"
				style={style}
			>
				<Form layout="inline">
					<FormItem>
						{getFieldDecorator("module", {
							initialValue: query.module
						})(
							<Select
								style={{ width: 220 }}
								placeholder="操作模块"
								size="default"
								allowClear
								getPopupContainer={() =>
									document.getElementById("popup-container")
								}
							>
								{moduleList.length &&
									moduleList.map(item => (
										<Option
											key={item.value}
											value={item.value}
										>
											{item.name}
										</Option>
									))}
							</Select>
						)}
					</FormItem>

					<FormItem>
						{getFieldDecorator("operation_time", {
							initialValue: [
								query.start_time && moment(query.start_time),
								query.end_time && moment(query.end_time)
							]
						})(
							<RangePicker
								showTime
								placeholder={["操作开始时间", "操作结束时间"]}
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
