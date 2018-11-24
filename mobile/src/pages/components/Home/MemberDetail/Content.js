/**
 * 个人资料
 */
import React, { Component } from "react";
import { getHashUrl } from "@utils/utils";
import wx from "weixin-js-sdk";
import PropTypes from "prop-types";
import { MToasts } from "wya-rc";
import * as types from "@constants/actions/home";
// 业务组件
import Cell from "@components/_common/Cell/Cell";
import "./Styles.scss";
import { Radio } from "antd-mobile";
class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nick_name: "",
			avatar: "",
			role: "",
			join_day: "",
			allow_no_say: ""
		};
	}

	componentWillMount() {
		const { query } = this.props;
		const { community_id, user_id } = query;
		let url = types.HOME_MEMBER_DETAIL_GET;
		let param = {
			user_id,
			community_id
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					...res.data
				});
			},
			onError: res => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, {});
	}

	handleSend = () => {
		const { query } = this.props;
		const { community_id, user_id } = query;
		this.setState(
			{
				allow_no_say: this.state.allow_no_say == 1 ? 2 : 1
			},
			() => {
				let url = types.HOME_MEMBER_DETAIL_NO_SAY_POST;
				let param = {
					user_id,
					community_id,
					type: this.state.allow_no_say
				};
				let params = {
					param: param,
					ajaxType: "POST",
					onSuccess: res => {
						this.setState({
							...res.data
						});
					},
					onError: res => {
						MToasts.info(res.msg, 1.5);
					}
				};
				this.props.actions.request(url, params, {});
			}
		);
	};

	render() {
		const { nick_name, avatar, role, join_day, allow_no_say } = this.state;
		return (
			<div className="v-mine-detail g-m-t-5">
				<Cell
					title="头像"
					className="g-border-b-line"
					style={{ height: 75 }}
				>
					<img src={avatar} alt="" className="_avatar" />
				</Cell>
				<Cell title="昵称" className="g-border-b-line">
					<div style={{ color: "#666" }}>{nick_name}</div>
				</Cell>
				<Cell title="身份" className="g-border-b-line">
					<div style={{ color: "#666" }}>
						{role == 2 ? "管理员" : role == "9" ? "群主" : "群员"}
					</div>
				</Cell>
				<Cell title="已入群时间" className="g-border-b-line">
					<div style={{ color: "#666" }}>{join_day}天</div>
				</Cell>
				{allow_no_say == 0 ? null : allow_no_say == 2 ? (
					<div
						className="g-big-btn-blue g-flex-cc _btn"
						onClick={this.handleSend}
					>禁言</div>
				) : (
					<div
						className="g-big-btn-blue g-flex-cc  _btn"
						onClick={this.handleSend}
					>取消禁言</div>
				)}
			</div>
		);
	}
}

export default Content;
