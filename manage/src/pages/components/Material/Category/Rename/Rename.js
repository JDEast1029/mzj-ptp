import React, { Component } from "react";
import { Modal, Input, Form, message, InputNumber } from "antd";
import { ImgsPicker } from "wya-rc";
import net from "@utils/net";
import { CreatePortalFunc, CreateLanguage } from "wya-rc";
import apiRoot from "@constants/apiRoot";
const Item = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		md: { span: 3 },
		sm: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 24 },
		md: { span: 12 },
		sm: { span: 12 }
	}
};

@CreatePortalFunc({
	cName: "root-modal-Rename"
})
@CreateLanguage()
@Form.create()
class Rename extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			sort: "",
			name: "",
			logo: null
		};
	}
	componentWillMount() {
		let { category_id, is_common, logo, name, sort } = this.props.type;
		this.setState({
			...this.props.type
		});
	}

	handleChangeName = e => {
		this.setState({
			name: e.target.value
		});
	};

	handleChangeSort = value => {
		this.setState({
			sort: value
		});
	};

	handleOk = () => {
		this.props.onSure && this.props.onSure();
	};

	handleCancel = () => {
		this.props.onClose && this.props.onClose();
	};

	handleSave = cb => {
		this.props.form.validateFields((err, values) => {
			if (err) return false;
			this.uploadInfo(values);
		});
	};
	uploadInfo = values => {
		const url = apiRoot.MATERIAL_CATEGORY_MODEL_ADD_CATEGORY_POST;
		let param = {
			logo: values.logo[0],
			name: values.name,
			sort: this.state.sort
		};
		const { category_id } = this.props.type;
		if (category_id) {
			param.category_id = category_id;
		}
		if (!param.logo) {
			param.logo = "";
		}
		net.ajax({
			url,
			param
		})
			.then(res => {
				message.success("保存成功");
				this.handleCancel();
			})
			.catch(error => {
				error.msg && message.error(error.msg);
				this.handleCancel();
			});
	};
	render() {
		// Modal 默认就是Portal组件
		let { category_id, is_common } = this.props.type;
		const { getFieldDecorator } = this.props.form;
		const { logo, name, sort } = this.state;
		const title = category_id ? "编辑分类" : "新建分类";
		return (
			<Modal
				title={title}
				visible={true}
				footer={null}
				width="900px"
				onCancel={this.props.onCloseSoon}
			>
				<Form>
					<Item {...formItemLayout} label="分类名称" required>
						{getFieldDecorator("name", {
							initialValue: name,
							rules: [
								{
									required: true,
									message: "请输入分类名称"
								}
							]
						})(
							<Input
								style={{ width: 170 }}
								placeholder={"请输入分类名称"}
								onChange={this.handleChangeName.bind(this)}
								value={name}
								maxLength={6}
							/>
						)}
						<span
							className="g-c-gray3 g-m-l-10"
							style={{ lineHeight: "32px" }}
						>
							{name.length}/6
						</span>
					</Item>
					<Item {...formItemLayout} label="分类图标">
						{getFieldDecorator("logo", {
							initialValue: logo ? [logo] : []
						})(
							<ImgsPicker
								upload={{ accept: "image/*" }}
								max={1}
							/>
						)}
					</Item>
					<Item {...formItemLayout} label="权重">
						{getFieldDecorator("sort", {
							initialValue: sort
						})(
							<div className="g-flex">
								{is_common == "1" ? (
									"默认置顶"
								) : (
									<InputNumber
										style={{ width: 170 }}
										placeholder="请输入权重"
										onChange={this.handleChangeSort}
										value={sort}
										min={0}
										max={999}
										precision={0}
									/>
								)}
							</div>
						)}
					</Item>
					<div
						className="gp-btn-blue"
						onClick={this.handleSave}
						style={{ marginLeft: "12.5%" }}
					>
						确定
					</div>
				</Form>
			</Modal>
		);
	}
}

export default Rename;
