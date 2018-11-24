import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Radio, Spin } from "antd";
import { getCookie } from "@utils/utils";
import Remind from "../Layout/Remind";
import echarts from "echarts";
import { Echarts } from "wya-rc";
import * as types from "../../constants/actions/home";
import * as actions from "../../actions/agent";

import "./Main.scss";
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
let expire_msg = getCookie("expire_msg");
let left_day = getCookie("left_day");

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			type: "",
			y_s_time: "",
			y_e_time: "",
			t_e_time: "",
			yesterday_new_user: "",
			total_community_num: "",
			total_user_num: "",
			today_room_num: "",
			being_room_num: "",
			total_room_num: "",
			room_sn: [],
			room_data: []
		};
	}
	componentDidMount() {
		let url = types.HOME_LOG_INIT_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					...res.data
				});
			}
		};
		this.props.actions.request(url, params, {});
	}

	// echarts开始
	option = () => {
		const option = {
			color: ["#3398DB"],
			tooltip: {
				// 悬浮文字的提示
				trigger: "item",
				textStyle: {
					color: "#fff"
				},
				padding: 10,
				formatter: function(name) {
					return (
						name.data.room_sn +
						" : " +
						name.data.name +
						"<br/>人数 : " +
						name.data.value
					);
				}
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},

			xAxis: [
				{
					type: "category",
					name: "直播号",
					data: this.state.room_sn,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: "value",
					name: "人数",
					min: 0,
					minInterval: 1
				}
			],

			series: [
				{
					name: "访问来源",
					type: "bar",
					barWidth: "60%",
					avoidLabelOverlap: true,
					label: {
						normal: {
							show: false,
							position: "left"
						} // 文字一直出现
					},
					labelLine: {
						normal: {
							show: false // 图形到文字之间的连接线
						}
					},
					minInterval: 1,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{ offset: 0, color: "#0076ff" },
									{ offset: 1, color: "#089ffc" }
								]
							)
						}
					},
					data: this.state.room_data
				}
			]
		};
		return option;
	};
	// echarts结束
	// 点击7天或30天直播统计按钮
	handleChange = e => {
		this.setState({
			type: e.target.value
		});
		let url = types.HOME_LOG_INIT_GET;
		let param = {
			type: e.target.value
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					...res.data
				});
			}
		};
		this.props.actions.request(url, params, {});
	};

	handleClick = e => {
		e.stopPropagation();
		actions.listSearchInit();
	};

	render() {
		const { auth } = this.props;
		const {
			y_s_time,
			y_e_time,
			t_e_time,
			yesterday_new_user,
			total_community_num,
			total_user_num,
			today_room_num,
			being_room_num,
			total_room_num,
			room_sn,
			room_data
		} = this.state;
		let expire_msg = _global.user.expire_msg;
		const option = this.option();
		if (!y_e_time) {
			return <Spin />;
		}
		return (
			<div className="v-home-main">
				<div className="_statistics">
					{/* ↓社群数据统计开始 */}
					<div className="_association">
						<div className="_tittle">
							<div>社群数据统计</div>
						</div>
						<div className="_content">
							<Link
								className="_card"
								to={
									"/agent/list?end_start_time=" +
									y_e_time +
									" 00:00:00&page=1&start_start_time=" +
									y_s_time +
									" 00:00:00"
								}
								onClick={this.handleClick}
							>
								<div className="_txt">昨日新增会员</div>
								<div className="_num">{yesterday_new_user}</div>
							</Link>
							<Link className="_card" to="/crowd/list">
								<div className="_txt">总社群数</div>
								<div className="_num">
									{total_community_num}
								</div>
							</Link>
							<Link
								className="_card"
								to="/agent/list?page=1"
								onClick={this.handleClick}
							>
								<div className="_txt">总会员数</div>
								<div className="_num">{total_user_num}</div>
							</Link>
						</div>
					</div>
					{/* ↑社群数据统计结束 */}

					{/* ↓直播数据统计开始 */}
					<div className="_association">
						<div className="_tittle">
							<div>直播数据统计</div>
						</div>
						<div className="_content">
							<Link
								className="_card"
								to={
									"/live/list?start_time_end=" +
									y_e_time +
									" 23:59:59&page=1&start_time_start=" +
									y_e_time +
									" 00:00:00&status=0"
								}
							>
								<div className="_txt">今日待直播</div>
								<div className="_num">{today_room_num}</div>
							</Link>
							<Link
								className="_card"
								to="/live/list?page=1&status=1"
							>
								<div className="_txt">正在直播</div>
								<div className="_num">{being_room_num}</div>
							</Link>
							<Link className="_card" to="/live/list">
								<div className="_txt">总直播数</div>
								<div className="_num">{total_room_num}</div>
							</Link>
						</div>
					</div>
					{/* ↑直播数据统计结束 */}
				</div>

				{/* ↓直播数据统计开始 */}
				<div className="_association">
					<div className="_tittle">
						<div>
							直播数据统计
							<RadioGroup
								defaultValue="1"
								style={{ marginLeft: 30 }}
								size="small"
								onChange={this.handleChange}
							>
								<RadioButton value="1">近7场</RadioButton>
								<RadioButton
									value="2"
									style={{ marginLeft: 30 }}
								>
									近30场
								</RadioButton>
							</RadioGroup>
						</div>
					</div>
					<div className="_content">
						<Echarts
							option={option}
							style={{
								height: "380px",
								width: "100%",
								padding: "18px"
							}}
							lazyUpdate={true}
						/>
					</div>
				</div>
				{/* ↑直播数据统计结束 */}
				{/* 到期提示弹框 */}
				<Remind expire_msg={expire_msg} />
			</div>
		);
	}
}
export default Main;
