/**
 * 日志Item
 */
import React, { Component } from "react";
import { message, Divider, Modal, InputNumber, Button } from "antd";
import * as types from "@constants/actions/material";
import { findDOMNode } from "react-dom";
import SelectMaterial from "@components/_common/SelectMaterial/SelectMaterial"; // 所含素材
import SelectCrowd from "@components/_common/SelectCrowd/SelectCrowd";
import Rename from "@components/Material/Category/Rename/Rename";
import { PRIVATE_CATE, PUBLIC_CATE } from "@constants/constants";

const confirm = Modal.confirm;
class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			visible: false
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
	// 显示权重修改输入框
	handleEditWeight = e => {
		this.setState({
			isEdit: true
		});
	};

	// 查看所含素材
	handleMaterial = () => {
		const { category_id, name } = this.props.itemData;
		const { query: { page = 1 } } = this.props;
		SelectMaterial.popup({
			onlyOne: false,
			min: 0,
			paramInfo: {
				category_id,
				type: 2
			},
			activeText: '移除',
			staticText: '添加',
			category_name: name
		}).then(material => {
			const url = types.MATERIAL_CATEGORY_MODEL_MATERIAL_LIST_POST;
			const params = {
				param: { material, category_id, page },
				ajaxType: "POST",
				onSuccess: res => { },
				onError: () => { }
			};
			this.props.actions.request(url, params, {});
		});
	};

	// 查看关联社群
	handleCrowd = () => {
		const { query: { page = 1 } } = this.props;
		const { category_id, name } = this.props.itemData;
		SelectCrowd.popup({
			onlyOne: false,
			paramInfo: {
				category_id,
				use_type: 5
			},
			title: "关联社群",
			extraTitle: `分类名称：${name}`,
			activeText: "取消关联",
			staticText: "关联"
		}).then(all => {
			const url = types.MATERIAL_CATEGORY_MODEL_COMMUNITY_LIST_POST;
			let community = all.selectInfo;
			const params = {
				param: { community, category_id, use_type: 5, page },
				ajaxType: "POST",
				onSuccess: res => {
				},
				onError: () => { }
			};
			this.props.actions.request(url, params, {});
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
						max={999}
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
		const { category_id } = itemData;
		let node = findDOMNode(this.input.inputNumberRef.input) || {};
		let url = types.MATERIAL_LIST_UPDATE_SORT_GET;
		let param = {
			category_id,
			sort: node.value || "0"
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => { },
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	};
	handleModalCanle = () => {
		this.setState({
			visible: false
		});
	}
	// 点击删除按钮执行的函数
	handleEnd = () => {
		this.setState({
			visible: true
		});
	};
	handleModalDel = () => {
		const { itemData = {}, query } = this.props;
		const { category_id } = itemData;
		let url = types.MATERIAL_CATEGORY_LIST_DEL_GET;
		let param = {
			...query,
			status: query.status,
			category_id
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					visible: false
				});
				this.props.actions.listSearchInit();
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	}
	handleCancel = () => {
		this.setState({ visible: false });
	}
	// 编辑按钮
	handleEdit = () => {
		const { itemData = {} } = this.props;
		const { category_id, name, sort, logo } = itemData;
		Rename.popup({
			type: itemData
		})
			.then(value => { })
			.catch(() => {
				this.props.actions.listSearchInit();
			});
	};

	render() {
		const { itemData = {} } = this.props;
		const {
			name,
			category_id,
			logo,
			sort,
			is_common,
			material_num,
			community_num,
			is_used,
			order
		} = itemData;
		const imgStyle = {
			minWidth: "66px",
			width: "66px",
			height: "66px"
		};
		return (
			<tr className="g-c-dark">
				<td>{order}</td>
				<td>{logo
					? <img src={logo} style={imgStyle} />
					: null
				}</td>
				<td>
					{is_common == "1" ? (
						<div>
							<div>{name}</div>
							<p
								style={{
									fontSize: "14PX",
									color: "#999",
									padding: "0 20px",
									textAlign: 'left'
								}}
							>
								处在这个分类下的素材，所有会员均可查阅，
								不论该会员是否在社群中、在哪个群中
							</p>
						</div>
					) : (
						name
					)}
				</td>
				<td>{material_num}</td>
				<td>{community_num}</td>
				{is_common == "1" ? <td>默认置顶</td> : this.renderWeight()}
				<td className="g-tl">
					{
						<div>
							<a
								className="g-operation"
								onClick={this.handleMaterial.bind(this)}
							>
								查看所含素材
							</a>
							{is_common == "1" ? null : (
								<span>
									<Divider type="vertical" />
									<a
										className="g-operation"
										onClick={this.handleCrowd.bind(this)}
									>
										查看关联社群
									</a>
									<br />
									<a
										className="g-operation"
										onClick={this.handleEnd.bind(this)}
									>
										删除分类
									</a>
								</span>
							)}
							<Divider type="vertical" />
							<a
								className="g-operation"
								onClick={this.handleEdit.bind(this)}
							>
								编辑
							</a>
						</div>
					}
				</td>
				<Modal
					footer={false}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					style={{ position: 'relative' }}
				>
					<div style={{ height: '130px', fontSize: '16px', padding: 30 }}>
						<i
							className="iconfont icon-iconfontcolor100-copy"
							style={{ color: '#f2b20b', fontSize: '20px' }}
						/>
						<span>&nbsp;删除后相关素材会与该分类解除关联，确认删除吗？</span>
						<div style={{ position: "absolute", right: 0, top: '100px' }}>
							<Button onClick={this.handleModalCanle}>
								取消
							</Button>
							<Button className="gp-btn-blue" onClick={this.handleModalDel} style={{ margin: 20 }}>
								确认删除
							</Button>
						</div>
					</div>

				</Modal>
			</tr>
		);
	}
}

export default Item;
