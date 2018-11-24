import React, { Component, Fragment } from "react";
import {
	Form,
	Input,
	Button,
	Radio,
	DatePicker,
	Select,
	Checkbox,
	Row,
	Col,
	Spin,
	Icon,
	message
} from "antd";
import { ImgsPicker, DebounceClick, PGallery, PSortList } from "wya-rc";
import SelectAgent from "@components/_common/SelectAgent/SelectAgent";
import "./AddLive.scss";
import moment from 'moment';
import classnames from 'classnames';
import * as types from "../../../constants/actions/live";
import Content from '../../Material/Common/Content';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const monthFormat = "YYYY-MM-DD HH:mm:ss";
class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
			value: [],
			radioValue: "",
			lecturerName: [],
			user_sn: "",
			nick_name: "",
			avatar: "",
			start_time: '',
			create_on_shelves: '',
			options: [],
			DateTime: true,
			choosemin: true
		};
	}

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.room_id) {
			this.loadEdite();
		}

		this.fetchLecturerName();
		this.fetchCommunityList();

	}

	loadEdite = e => {
		const { room_id } = this.props.location.state;
		let url = types.LIVE_EDIT_ROOM_GET;
		let param = {
			room_id
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				const { setFieldsValue } = this.props.form;
				setFieldsValue({
					title: res.data.title,
					end_on_shelves: res.data.end_on_shelves,
					limit: res.data.limit,
					lecturer_intro: res.data.lecturer_intro,
					lecturer_id: res.data.lecturer_id,
					broad_intro: res.data.broad_intro,
					icon: [res.data.img],
					avatar: [res.data.avatar],
					user_id: res.data.user_id,
					create_on_shelves: !!res.data.create_on_shelves,
					// limit_community: res.data.limit_community,
				}, this.setState({
					create_on_shelves: !!res.data.create_on_shelves,
					start_time: res.data.start_time,
					avatar: res.data.avatar,
					user_sn: res.data.user_sn,
					nick_name: res.data.nick_name,
					limit: res.data.limit,
					limit_community: res.data.limit_community,
					img: [res.data.img],
				}));
			},
			onError: res => {
				message.error(res.msg);
			}
		};

		this.props.actions.request(url, params);
	};

	// 获取讲师的列表
	fetchLecturerName = () => {
		let url = types.LIVE_LIST_ROOM_LECTURER_LIST_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				this.setState({
					lecturerName: res.data.list
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};

		this.props.actions.request(url, params);
	};

	// 获取社群列表
	fetchCommunityList = () => {
		let url = types.LIVE_LIST_ROOM_COMMUNITY_LIST_GET;
		let param = {};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				// this.state.options.push(...res.data.list);
				this.setState({
					options: res.data.list
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	};

	// 获取社群列表的选择项
	handleChange = checkedValues => {
		this.setState({
			limit_community: checkedValues
		});
	};

	// 点击讲师列表接收讲师简介
	handleLecturerName = value => {
		let url = types.LIVE_LIST_ROOM_LECTURER_INFO_GET;
		let param = {
			lecturer_id: value
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				const { setFieldsValue } = this.props.form;
				setFieldsValue({
					lecturer_intro: res.data.introduce
				});
			},
			onError: res => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	};

	// 点击群限制的函数
	handleLimitRadio = e => {
		this.setState({
			radioValue: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const room_id = this.props.location.state && this.props.location.state.room_id;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let fieldValues = {
					...values,
					start_time: this.state.start_time,
					create_on_shelves: this.state.create_on_shelves ? 1 : 0,
					img: values.icon.toString(),
				};
				room_id: room_id ? fieldValues.room_id = room_id : null;
				fieldValues.limit == 2 ? fieldValues.limit_community = [] : null;
				let url = types.LIVE_ADD_ROOM_POST;
				let param = fieldValues;
				let params = {
					param: param,
					ajaxType: "POST",
					onSuccess: res => {
						_global.history.push(`/live/list?page=1`);
					},
					onError: res => {
						message.error(res.msg);
					}
				};
				this.props.actions.request(url, params);
			}
		});
	};
	// 图片上传库中的事件
	handleClick = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
		});
	};



	// 添加讲师信息弹框
	handleClickUser() {
		SelectAgent.popup({
			getDetail: true,
			onlyOne: true
		}).then(data => {
			const { setFieldsValue } = this.props.form;
			setFieldsValue({
				user_id: data["0"].user_id,
			}),
			this.setState({
				user_id: data["0"].user_id,
				user_sn: data["0"].user_sn,
				nick_name: data["0"].nick_name,
				avatar: data["0"].avatar
			});
		}).catch(data => { });
	}
	// 点击创建自动上下架按钮
	handleCheckbox = (e) => {
		this.setState({
			create_on_shelves: e.target.checked
		});
	}

	renderAvatar = () => {
		const { avatar } = this.state;
		const locationState = !!this.props.location.state ? true : false;
		const room_id = locationState ? locationState.room_id : '';
		const statusEdit = !!this.props.location.state ?
			this.props.location.state.status_name == '直播中'
			|| this.props.location.state.status_name == '已结束'
			: false;
		return avatar ? (
			<img
				src={avatar}
				style={{ width: 100, height: 100 }}
				onClick={statusEdit ? null : this.handleClickUser.bind(this)}
				disabled={this.props.location.state
					&& this.props.location.state.status_name == '直播中'
					? true
					: false}
			/>
		) : (
			<div
				className="iconfont icon-add _bgc"
				style={{ width: 100, height: 100, borderRadius: 0, marginTop: -5 }}
				onClick={this.handleClickUser.bind(this)}
			/>
		);
	};
	renderTime = () => {
		const room_id = this.props.location.state && this.props.location.state.room_id;
		const { start_time } = this.state;
		if (room_id) {
			if (start_time.length == 0) {
				return false;
			} else {
				return moment(start_time, 'YYYY-MM-DD HH:mm');
			}
		} else {
			return null;
		}
	}

	// 选中直播图
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

	// 直播图图片样式
	renderImgItem = ({ itemData }) => {
		const { src } = itemData || {};
		return (
			<div className="g-flex g-ai-c" >
				<div className="_cover g-flex-cc">
					<img img src={src} className="_cover" />
				</div>
			</div>
		);
	};

	// 渲染直播图
	renderMaterialCover = () => {
		const { icon } = this.props.materialInfo || {};
		const { setFieldsValue, getFieldValue, getFieldDecorator } = this.props.form;
		getFieldDecorator('icon', { initialValue: icon, rules: [{ required: true, message: '请添加直播图!' }] });
		let coverImages = getFieldValue('icon') && [getFieldValue('icon')];


		const statusEdit = !!this.props.location.state ?
			this.props.location.state.status_name == '直播中'
			|| this.props.location.state.status_name == '已结束'
			: false;

		if (statusEdit) {
			return (
				<div className="g-flex g-ai-c" >
					<div className="_cover g-flex-cc">
						<img src={this.state.img} className="_cover" />
					</div>
				</div>
			);
		}
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
				<span
					className="g-black-light g-m-l-20 g-as-fe"
					style={{ lineHeight: 1 }}
				>
					建议尺寸240 * 146
				</span>
			</Fragment>
		);
		if (!coverImages || coverImages.length === 0) {
			coverItems.push(
				<div className="g-flex g-ai-c">
					<div
						className="_cover g-flex-cc g-c-black g-bg-cc g-pointer"
						onClick={this.handleChooseCover}
						style={{ marginBottom: 5 }}
					>
						<i className="iconfont icon-add g-fs-32" />
					</div>
					<span
						className="g-black-light g-m-l-20 g-as-fe"
						style={{ lineHeight: 1, whiteSpace: 'nowrap', marginBottom: 5 }}>
						建议尺寸240 * 146
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
	// nw=ew
	handleChangeDatePicker = (value, dateString) => {
		this.setState({
			start_time: dateString
		});
		console.log('value', value );
		const chooseTime = value && value.unix();
		const now = new Date().getTime();
		if (chooseTime > now / 1000) {
			this.setState({
				DateTime: false
			});
			return false;
		}
		const chooseHours =  value && value.add(0, 'hour').format('H');
		this.setState({
			choosemin: false
		});
		
	};
	render() {
		const { getFieldDecorator, getFieldError } = this.props.form;
		const room_id = this.props.location.state && this.props.location.state.room_id;
		const {
			value,
			avatar,
			user_sn,
			nick_name,
			lecturerName,
			start_time,
			limit,
		} = this.state;

		const radioStyle = {
			display: "block",
			height: "30px",
			lineHeight: "30px"
		};
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 3 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 10 }
			}
		};
		// 选择时间
	

		const range = (start, end) => {
			const result = [];
			for (let i = start; i < end; i++) {
				result.push(i);
			}
			return result;
		};

		const handleDisabledDate = (current) => {
			return current && current < moment().subtract(1, 'days').endOf('day');
			// return current && current < moment().endOf(2, 'day');
		};
		const disabledDateTime = () => {
			const today = new Date();
			const h = today.getHours();
			const m = today.getMinutes();
			if (this.state.choosemin) {
				return {
					disabledHours: () => range(0, 24).slice(0, h),
					disabledMinutes: () => range(0, 60).slice(0, m ),
				};
			} else {
				return {
					disabledHours: () => range(0, 24).slice(0, h),
					disabledMinutes: () => range(0, 60).slice(0, 0),
				};
			}
		
		};
	

		if (room_id) {

			if (typeof (this.state.create_on_shelves) == 'string') {
				return false;
			}
		}
		const Avatar = this.renderAvatar();
		const Time = this.renderTime();
		return (
			<Form className="v-live-add"
				onSubmit={this.handleSubmit}
				id="popup-container"
			>
				<FormItem
					{...formItemLayout}
					required
					label="直播图"
					validateStatus={getFieldError('icon') ? 'error' : ''}
					help={getFieldError('icon') ? '请添加直播图' : ''}
				>
					{this.renderMaterialCover()}
				</FormItem>
				<FormItem {...formItemLayout} label="直播标题">
					{getFieldDecorator("title", {
						rules: [
							{
								required: true,
								message: "请输入直播标题"
							}
						]
					})(
						<Input
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							maxLength={20}
							style={{ marginTop: 6 }}
						/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="直播时间">
					{getFieldDecorator("start_time", {
						// Time,
						initialValue: Time,
						rules: [
							{
								required: true,
								message: "请选择直播时间"
							}
						]
					})(
						<DatePicker
							style={{ marginTop: 5 }}
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							showTime
							format="YYYY-MM-DD HH:mm"
							placeholder="请选择时间"
							disabledDate={handleDisabledDate}
							disabledTime={this.state.DateTime ? disabledDateTime : null}
							onChange={this.handleChangeDatePicker}
							getCalendarContainer={() =>
								document.getElementById("popup-container")
							}
						/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
				>
					{getFieldDecorator("create_on_shelves")(
						<Checkbox
							style={{ marginLeft: "30%", marginTop: "-18px" }}
							defaultChecked={this.state.create_on_shelves}
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							onClick={this.handleCheckbox}
						>
							创建完自动下架，(直播开始自动上架)
						</Checkbox>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="主持人"
					style={{ position: "relative" }}
				>
					{getFieldDecorator("user_id", {
						initialValue: [],
						rules: [
							{
								required: true,
								message: "请添加主持人"
							}
						]
					})(Avatar)}
					{!!user_sn ? (
						<div
							style={{
								position: "absolute",
								top: -12,
								left: 116,
								width: 160
							}}
						>
							<div>ID:{user_sn}</div>
							<div>用户名:{nick_name}</div>
						</div>
					) : null}
				</FormItem>

				<FormItem {...formItemLayout} label="讲师">
					{getFieldDecorator("lecturer_id", {
						rules: [
							{
								required: true,
								message: "请选择讲师"
							}
						]
					})(
						<Select
							style={{ width: 120, marginTop: 5 }}
							onChange={this.handleLecturerName.bind(this)}
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							getPopupContainer={() =>
								document.getElementById("popup-container")
							}
						>
							{lecturerName &&
								lecturerName.map((item, index) => {
									return (
										<Option
											value={item.lecturer_id}
											key={index}
										>
											{item.lecturer_name}
										</Option>
									);
								})}
						</Select>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="讲师介绍">
					{getFieldDecorator("lecturer_intro", {
						rules: [
							{
								required: true,
								message: "请填写讲师介绍"
							}
						]
					})(<Input.TextArea rows={4} disabled style={{ marginTop: 10 }} />)}
				</FormItem>
				<FormItem {...formItemLayout} label="直播介绍">
					{getFieldDecorator("broad_intro", {
						rules: [
							{
								required: true,
								message: "请填写直播介绍"
							}
						]
					})(
						<Input.TextArea
							rows={4}
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							maxLength={200}
							style={{ marginTop: 10 }}
						/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="限制">
					{getFieldDecorator("limit", {
						initialValue: this.state.radioValue || "",
						rules: [
							{
								required: true,
								message: "请选择限制类型"
							}
						]
					})(
						<RadioGroup
							onChange={this.handleLimitRadio.bind(this)}
							disabled={this.props.location.state
								&& this.props.location.state.status_name == '直播中'
								? true
								: false}
							style={{ marginTop: 5 }}
						>
							<Radio style={radioStyle} value={1}>
								选择群可见
							</Radio>

							{this.state.limit == 1 || this.state.radioValue == 1
								?
								this.state.radioValue !== 2 ?
									<FormItem style={{ maxWidth: '350px' }}>
										{getFieldDecorator("limit_community", {
											initialValue: this.state.limit_community,
											rules: [
												{
													required: true,
													message: "请选择限制的群"
												}
											]
										})(
											<Checkbox.Group
												className="_community _qun"
												disabled={this.props.location.state
													&& this.props.location.state.status_name == '直播中'
													? true
													: false}
											>
												{this.state.options.map((item, index) => {
													return (
														<Checkbox
															key={index}
															value={item.community_id}
															checked={true}
														>
															{item.name}
														</Checkbox>
													);
												})}
											</Checkbox.Group>
										)}
									</FormItem>
									: null
								: null
							}
							<Radio style={radioStyle} value={2}>
								公开
							</Radio>
						</RadioGroup>
					)}
				</FormItem>

				<FormItem {...formItemLayout} label="直播结束">
					{getFieldDecorator("end_on_shelves", {
						rules: [
							{
								required: true,
								message: "请选择直播结束选项"
							}
						]
					})(
						<RadioGroup
							disabled={this.props.location.state
								&& (this.props.location.state.status_name == '直播中'
									|| this.props.location.state.status_name == '已结束')
								? true
								: false}
							style={{ marginTop: 5 }}
						>
							<Radio style={radioStyle} value={1}>
								保持上架
							</Radio>
							<Radio style={radioStyle} value={0}>
								立即下架
							</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem >
					<DebounceClick
						tag={Button}
						className={`${this.props.location.state
							&& this.props.location.state.status_name == '直播中'
							? ''
							: 'gp-btn-blue'} _save`}
						onClick={this.handleSubmit}
						disabled={this.props.location.state
							&& this.props.location.state.status_name == '直播中'
							? true :
							false}
					>
						保存
					</DebounceClick>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(RegistrationForm);
