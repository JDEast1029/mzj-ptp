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
			data: false
		};
	}

	handleSearch = event => {
		const { actions, query } = this.props;
		event && event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let fieldValues = {
					...query,
					...values
				};
				delete fieldValues.operation_time;
				_global.history.replace(
					getHashUrl(`/material/category`, { ...fieldValues })
				);
				// init
				actions.listSearchInit();
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { query = {} } = this.props;
		const style = {
			backgroundColor: "#f3f3f3",
			margin: "50px 0px",
			marginBottom: "20px"
		};
		return (
			<div className="g-pd-20 g-antd-select-container" style={style}>
				<Form layout="inline">
					<FormItem>
						{getFieldDecorator("name", {
							initialValue: query.name
						})(
							<Input
								placeholder="请输入分类名称"
								style={{ width: 180 }}
							/>
						)}
					</FormItem>
					<DebounceClick
						style={{ marginTop: "4px" }}
						className="gp-btn-blue"
						tag={Button}
						onClick={this.handleSearch}
					>
						搜索
					</DebounceClick>
				</Form>
			</div>
		);
	}
}

export default Form.create()(Filter);
