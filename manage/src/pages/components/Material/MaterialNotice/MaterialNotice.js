import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { DebounceClick } from "wya-rc";
import * as types from "../../../constants/actions/material";
import "./MaterialNotice.scss";
const { TextArea } = Input;

class Notice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notice_content: "",
			notice_id: ""
		};
	}
	componentDidMount() {
		this.fetchNotice();
	}

	handleChange = e => {
		this.setState({
			notice_content: e.target.value
		});
	};

	fetchNotice = () => {
		let url = types.MATERIAL_NOTICE_INFO_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					...res.data
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	};

	handleSubmit = () => {
		let url = types.MATERIAL_NOTICE_POST;
		let param = {
			notice_content: this.state.notice_content,
			notice_id: this.state.notice_id
		};
		let params = {
			param: param,
			ajaxType: "POST",
			onSuccess: res => {
				message.success(res.msg);
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	};
	render() {
		return (
			<div className="v-material-notice">

				<TextArea
					rows={4}
					value={this.state.notice_content}
					onChange={this.handleChange.bind(this)}
					maxLength={"50"}
				/>
				<div className="_calc">
					{this.state.notice_content.length}/50
				</div>
				<DebounceClick
					tag={Button}
					className="gp-btn-blue _save"
					onClick={this.handleSubmit}
				>
					保存
				</DebounceClick>
			</div>
		);
	}
}

export default Notice;
