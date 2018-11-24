import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { PGallery, PSortList, Editor } from 'wya-rc';
import { Form, Input, Button, message, Modal } from 'antd';
import * as types from '@constants/actions/material';
import CategoryModal from './Modal/CategoryModal';
import Content from '../Common/Content';
import './Styles.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayout = {
	labelCol: {
	  xs: { span: 24 },
	  sm: { span: 5 },
	  md: { span: 5 },
	  lg: { span: 4 },
	  xl: { span: 3 },
	  xxl: { span: 2 },
	},
	wrapperCol: {
	  xs: { span: 24 },
	  sm: { span: 17 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
	  xs: { span: 24, offset: 0 },
	  sm: { span: 19, offset: 5 },
	  md: { span: 19, offset: 5 },
	  lg: { span: 20, offset: 4 },
	  xl: { span: 21, offset: 3 },
	  xxl: { span: 22, offset: 2 },
	},
};

class InfoForm extends Component {

	componentDidMount() {
		const { material_id } = this.props;
		material_id ? this.loadData() : null;
	}

	// 编辑页面获取数据
	loadData = () => {
		const { material_id } = this.props;
		let url = types.MATERIAL_DETAIL_GET;
		let param = {
			material_id
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				this.setInitialState(res.data);
				this.forceUpdate();
			},
			onError: (res) => {
				message.error(res.msg);
			}
		};

		this.props.actions.request(url, params);
	};

	setInitialState = (initialValue) => {
		const { getFieldDecorator } = this.props.form;
		let {
			title,
			icon,
			remark,
			data
		} = initialValue;

		const values = {
			title,
			icon,
			remark,
			data
		};
		Object.keys(values).map((key) => {
			getFieldDecorator(key, { initialValue: values[key] });
		});
	};

	// 取消按钮
	handleCancel = () => {
		_global.history.goBack();
	};

	// 点击提交
	handleSubmit = () => {
		const { material_id } = this.props;
		const { category } = this.props.materialInfo || {};
		this.props.form.validateFields((errors, values) => {
			if (!errors) {
				if (material_id) {
					this.handleSave({ ...values });
				} else {
					CategoryModal.popup({
						selectArr: category || []
					}).then((res) => {
						this.handleSave({ category: res, ...values });
					}).catch((error) => {

					});
				}
			}
		});
	};

	// 保存编辑
	handleSave = (values) => {
		const { material_id } = this.props;
		let icon = values.icon instanceof Array ? values.icon[0] : values.icon;
		let url = types.MATERIAL_ADD_POST;
		let param = {
			...values,
			material_id,
			icon
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				if (material_id) {
					message.success('保存成功', 1, () => {
						_global.history.goBack();
					});
				} else {
					Modal.success({
						title: '创建素材成功',
						okText: "确定",
						onOk: () => {
							_global.history.goBack();
						}
					});
				}
			},
			onError: (res) => {
				message.error(res.msg);

			}
		};
		this.props.actions.request(url, params, {});
	};

	// 选中素材封面
	handleChooseCover = () => {
		const { setFieldsValue } = this.props.form;
    	PGallery.popup({
			max: 1,
			title: '我的素材'
    	}).then((res) => {
    		const { file_url } = res[0] || {};
    		setFieldsValue({
    			icon: [file_url],
    		});
    	}).catch(() => {

    	});
	};

	// 素材封面图片样式
	renderImgItem = ({ itemData }) => {
		const { src } = itemData || {};

    	return (
    		<div className="g-flex g-ai-c">
				<div className="_cover g-flex-cc">
					<img img src={src} className="_cover" />
				</div>
			</div>
    	);
	};

	// 渲染素材封面
	renderMaterialCover = () => {
		const { icon } = this.props.materialInfo || {};
    	const { setFieldsValue, getFieldValue, getFieldDecorator } = this.props.form;
    	getFieldDecorator('icon', { initialValue: icon, rules: [{ required: true, message: '请添加素材封面!' }] });
    	let coverImages = getFieldValue('icon') && [getFieldValue('icon')];
		let coverItems = [];
    	coverImages && coverItems.push(
    		<Fragment>
				<PSortList
					className={classnames('_cover')}
					dataSource={coverImages.map(src => { return { src }; })}
					onChange={e => {
						setFieldsValue({
							icon: e[0] && e[0].src,
						});
					}}
					renderRow={this.renderImgItem}
				/>
				<span className="g-black-light g-m-l-20 g-as-fe" style={{ lineHeight: 1 }}>建议尺寸710 * 270</span>
			</Fragment>
    	);
    	if (!coverImages || coverImages.length === 0) {
    		coverItems.push(
    			<div className="g-flex g-ai-c">
					<div
						className="_cover g-flex-cc g-c-black g-bg-cc g-pointer"
						onClick={this.handleChooseCover}
					>
						<i className="iconfont icon-add g-fs-32" />
					</div>
					<span
						className="g-black-light g-m-l-20 g-as-fe"
						style={{ lineHeight: 1, whiteSpace: 'nowrap' }}>
						建议尺寸710 * 270
					</span>
				</div>
    		);
    	}
    	return coverItems;
	};

	// 渲染素材内容
	renderMaterialContent = () => {
		const { data } = this.props.materialInfo || {};
		const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
		getFieldDecorator('data', { initialValue: data, rules: [{ required: true, message: '请添加素材内容!' }] });
		const fileValue = getFieldValue('data') || {};
		const materialContent = fileValue.content;
		const materialViewData = fileValue.viewData || [];

		return (
			<Content
				ref={content => this.content = content}
				content={materialContent}
				viewData={materialViewData}
				onChange={(data) => {
					const { viewData } = data || {};
					if (viewData.length === 0 || (
						viewData.length === 1 && viewData[0].type === "TEXT" && 
						viewData[0].data.text.length === 0)) {
						setFieldsValue({ data: undefined });
					} else {
						setFieldsValue({ data });
					}
				}}
			/>
		);
	};

	render() {
		const { material_id } = this.props;
		const { getFieldDecorator, getFieldError, getFieldsValue } = this.props.form;
		const values = getFieldsValue();
		const {
			title,
			remark
		} = values;

		return (
			<Form style={{ marginTop: 40 }} className="v-material-add">
				<FormItem
					{...formItemLayout}
					label="素材标题"
				>
					{getFieldDecorator('title', {
						rules: [
							{ required: true,  message: '请输入素材标题' }
						]
					})(
						<Input
							style={{ width: 330 }}
							placeholder="请输入素材标题"
							maxLength={20}
						/>
					)}
					<span className="g-black-light g-m-l-10">{title ? title.length : 0}/20</span>
				</FormItem>
				<FormItem
					{...formItemLayout}
					required
					label="素材封面"
					validateStatus={getFieldError('icon') ? 'error' : ''}
					help={getFieldError('icon') ? '请添加素材封面' : ''}
				>
					{this.renderMaterialCover()}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="素材摘要"
				>
					{getFieldDecorator('remark', {
						rules: [
							{ required: true,  message: '请输入素材摘要' }
						]
					})(
						<TextArea
							autosize={false}
							style={{ width: 490, height: 145, resize: 'none' }}
							placeholder="请输入素材摘要"
							maxLength={50}
						/>
					)}
					<span className="g-black-light g-m-l-10">{remark ? remark.length : 0}/50</span>
				</FormItem>
				<FormItem
					{...formItemLayout}
					required
					label="素材内容"
					validateStatus={getFieldError('data') ? 'error' : ''}
					help={getFieldError('data') ? '素材内容' : ''}
				>
					{this.renderMaterialContent()}
				</FormItem>

				{!material_id &&
				<FormItem
					{...formItemLayoutWithOutLabel}
				>
					<Button
						type="primary"
						className="gp-btn-blue"
						onClick={this.handleCancel}
					>
						取消
					</Button>
					<Button
						className="g-m-l-20 gp-btn-blue"
						onClick={this.handleSubmit}
					>
						选择分类并创建
					</Button>
				</FormItem>}
				{material_id &&
				<FormItem
					{...formItemLayoutWithOutLabel}
				>
					<Button
						type="primary"
						className="gp-btn-blue"
						onClick={this.handleSubmit}
					>
						保存
					</Button>
				</FormItem>}
			</Form>
		);
	}
}

export default Form.create()(InfoForm);
