/**
 * 日志Item
 */
import React, { Component } from "react";
import { message, Divider, Modal } from "antd";
import * as types from "@constants/actions/material";
import SelectCategory from "@components/_common/SelectCategory/SelectCategory";
const confirm = Modal.confirm;
class Item extends Component {
	constructor(props) {
		super(props);
	}

	// 点击删除按钮执行的函数
	handleEnd = () => {
		Modal.confirm({
			title: "素材删除后不可恢复，确认删除吗？",
			// content: "",
			okText: "删除",
			cancelText: "取消",
			onOk: () => {
				const { itemData = {}, query } = this.props;
				const { material_id } = itemData;
				let url = types.MATERIAL_LIST_DEL_GET;
				let param = {
					material_id
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

	// 点击获取素材详情
	handleMaterial = () => {
		const { material_id } = this.props.itemData;
		_global.history.push("/material/list/detail?material_id=" + material_id);
	}

	// 点击获取分类调整
	handleCrowd = () => {
		const { material_id, title } = this.props.itemData;
		SelectCategory.popup({
			onlyOne: false,
			paramInfo: {
				material_id,
				type: 1,
			},
			title: '分类调整',
			category_name: `素材标题：${title}`,
			activeText: '取消应用',
			staticText: '应用'
		}).then((category) => {
			const url = types.MATERIAL_LIST_MODEL_MATERIAL_CHANGE_POST;
			const params = {
				param: { category, material_id },
				ajaxType: 'POST',
				onSuccess: (res) => {
				},
				onError: () => { }
			};
			this.props.actions.request(url, params, {});
		});
	}

	render() {
		const { itemData = {} } = this.props;
		const {
			title,
			material_id,
			create_time,
			category_num,
			order,
			material_ids
		} = itemData;
		return (
			<tr className="g-c-dark">
				<td>{order}</td>
				<td className="g-tl">{title}</td>
				<td>{category_num}</td>
				<td>{create_time}</td>
				<td className="g-tl">
					{
						<div>
							<a
								className="g-operation"
								onClick={this.handleMaterial.bind(this)}
							>
								素材详情
							</a>
							<Divider type="vertical" />
							<a
								className="g-operation"
								onClick={this.handleCrowd.bind(this)}
							>
								分类调整
							</a>
							<br />
							<a
								className="g-operation"
								onClick={this.handleEnd.bind(this)}
							>
								删除
							</a>
						</div>
					}
				</td>
			</tr>
		);
	}
}

export default Item;
