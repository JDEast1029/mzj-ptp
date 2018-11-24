/**
 * 日志Item
 */
import React, { Component, Fragment } from "react";
import {
	message,
	Switch,
	Icon,
	Divider,
	Modal,
	Button,
	InputNumber
} from "antd";
import * as types from "@constants/actions/live";
import ShareCodeModal from "@components/_common/Modal/ShareCodeModal";
import { findDOMNode } from "react-dom";

const confirm = Modal.confirm;
class Item extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isEdit: false,
			show: props.itemData && props.itemData.on_shelves == 1 ? true : false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.isEdit && this.state.isEdit) {
			// 将光标移到内容最后面
			if (this.input) {
				let node = findDOMNode(this.input.inputNumberRef.input);
				if (typeof node.selectionStart == "number") {
					node.selectionStart = node.selectionEnd = node.value.length;
					node.focus();
				} else if (typeof node.createTextRange != "undefined") {
					node.focus();
					let range = node.createTextRange();
					range.collapse(false);
					range.select();
				}
			}
		}
	}

	// 点击Switch开关执行的操作
	handleSwitch = (val) => {
		const { itemData = {}, query } = this.props;
		const { room_id } = itemData;
		let url = types.LIVE_LIST_ON_SHELVES_GET;
		let param = {
			room_id
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => { 
				this.setState({
					show: val
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	};

	// 显示权重修改输入框
	handleEditWeight = e => {
		this.setState({
			isEdit: true
		});
	};

	// 渲染权重
	renderWeight = () => {
		const { itemData = {}, status } = this.props;
		const { sort = "0" } = itemData;
		const { isEdit } = this.state;

		if (isEdit) {
			return (
				<td>
					<InputNumber
						ref={ref => (this.input = ref)}
						autofocus="autofocus"
						style={{ width: 80 }}
						precision={0}
						min={0}
						defaultValue={sort}
						onBlur={this.handleSaveWeight}
						onPressEnter={this.handleSaveWeight}
					/>
				</td>
			);
		} else {
			return (
				<td>
					<div
						className="g-pointer g-c-blue-3"
						// style={{ width: 80 }}
						onClick={this.handleEditWeight}
					>
						{sort}
					</div>
				</td>
			);
		}
	};

	// 失去焦点或按回车键时保存权重
	handleSaveWeight = () => {
		this.setState({
			isEdit: false
		});
		const { itemData = {} } = this.props;
		const { room_id } = itemData;
		let node = findDOMNode(this.input.inputNumberRef.input) || {};
		let url = types.LIVE_LIST_UPDATE_SORT_POST;
		let param = {
			room_id,
			sort: node.value || "0"
		};
		let params = {
			param: param,
			ajaxType: "POST",
			onSuccess: res => { },
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	};

	// 点击分享按钮执行的函数
	handleShowLink = event => {
		const { itemData } = this.props;
		ShareCodeModal.popup({
			room_id: `room_id=${itemData.room_id}`,
			status: `${itemData.status}`
		})
			.then(res => { })
			.catch(error => { });
	};

	// 点击删除按钮执行的函数
	handleEnd = () => {
		Modal.confirm({
			title: "确定删除",
			content: "删除后不可恢复，请谨慎操作",
			okText: "删除",
			cancelText: "取消",
			onOk: () => {
				const { itemData = {}, query } = this.props;
				const { room_id } = itemData;
				let url = types.LIVE_LIST_ROOM_DEL_POST;
				let param = {
					...query,
					// page,
					status: query.status,
					room_id
				};
				let params = {
					param: param,
					ajaxType: "GET",
					onSuccess: res => { },
					onError: res => {
						message.error(res.msg);
					}
				};
				this.props.actions.request(url, params);
			}
		});
	};
	// 编辑按钮
	handleEdit = () => {
		const { itemData = {}, query, curPage } = this.props;
		const status_name = itemData.status_name;
		const status = itemData.status;
		const { room_id } = itemData;
		_global.history.push({
			pathname: '/live/list/add',
			state: { room_id, status_name }
		});
	};

	render() {
		const { itemData = {} } = this.props;
		const {
			title,
			sn,
			lecturer_name,
			nick_name,
			limit_community_names,
			status_name,
			start_time,
			on_shelves,
			limit_length_out
		} = itemData;
		return (
			<tr className="g-c-dark">
				<td className="g-tl">{title}</td>
				<td>{sn}</td>
				<td className="g-tl">{nick_name}</td>
				<td className="g-tl">{lecturer_name}</td>
				<td className="g-tl">
					{limit_community_names &&
						limit_community_names.map((item, index) => {
							return <div key={index}>{item}</div>;
						})}
					{/* 判断是不是要加... */}
					{limit_length_out && !!limit_length_out ? (
						<div>...</div>
					) : null}
				</td>
				<td>{status_name}</td>
				<td>{start_time}</td>
				<td>
					{
						<Switch
							onChange={this.handleSwitch.bind(this)}
							checkedChildren="已上架"
							unCheckedChildren="未上架"
							defaultChecked={on_shelves == 1 ? true : false}
							disabled={status_name == "直播中" ? true : false} // 如果直播中就不给点击
							style={{ width: 70, height: 22 }}
						/>
					}
				</td>
				{this.renderWeight()}
				<td className="g-tl">
					{
						<div className="g-operation">
							<a
								onClick={this.handleEdit.bind(
									this,
									status_name
								)}
							>
								编辑
							</a>
							{
								this.state.show 
									? <span>
										<Divider type="vertical" />
										<a onClick={this.handleShowLink.bind(this)}>推广</a>
									</span>
									: null
							}

							{status_name == "直播中" ? null : (
								<span>
									<Divider type="vertical" />
									<a onClick={this.handleEnd.bind(this)}>
										删除
									</a>
								</span>
							)}
						</div>
					}
				</td>
			</tr>
		);
	}
}

export default Item;
