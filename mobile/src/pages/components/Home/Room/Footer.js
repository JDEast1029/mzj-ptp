/**
 * 直播间底部操作栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import pureRender from 'pure-render-decorator';
import MModals from "@components/_common/MModals/MModals";
import { MToasts } from 'wya-rc';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
// 组件
import VoiceRecord from '@components/_common/ChatTools/VoiceRecord';
import TextInput from '@components/_common/ChatTools/TextInput';
import MoreOptions from './ChatTools/MoreOptions';

@pureRender
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showVoice: false,
			showMore: false,
			showSendBtn: false
		};
	}

	handleToggleTab = () => {
		const { showVoice, showMore } = this.state;

		if (showVoice) {
			this.handleToggleVoice();
		} else if (showMore) {
			this.handleToggleMoreOpt();
		}
	}

	// 切换显示 语音
	handleToggleVoice = () => {
		const { isForbid } = this.props;
		if (isForbid) {
			MToasts.info('您已被禁言', 2);
			return;
		}

		let canChange = this.canChangeTab();
		let callback = () => {
			this.setState({
				showVoice: !this.state.showVoice,
				showMore: false,
			});
		};

		if (canChange) {
			callback();
		} else {
			this.showToggleConfirmModal(callback);
		}
	}

	// 切换显示 “更多操作”
	handleToggleMoreOpt = () => {
		const { isForbid } = this.props;
		if (isForbid) {
			MToasts.info('您已被禁言', 2);
			return;
		}

		let canChange = this.canChangeTab();
		let callback = () => {
			this.setState({
				showMore: !this.state.showMore,
				showVoice: false,
			});
		};

		if (canChange) {
			callback();
		} else {
			this.showToggleConfirmModal(callback);
		}

	}

	// 不可输入状态下 输入框的点击事件
	handleFirbidClick = () => {
		const { isForbid } = this.props;
		if (isForbid) {
			MToasts.info('您已被禁言', 2);
			return;
		}
		this.handleToggleTab();
	}

	// 判断能否切换底部操作界面(用于录音状态)
	canChangeTab = () => {
		return this.voice ? this.voice.state.voiceStatus === 'start' : true;
	}

	// 是否取消录音的弹框
	showToggleConfirmModal = (callback) => {
		MModals.alert("",
			<div className="g-flex-cc g-fs-14" style={{ height: 90 }}>
				<div>确定取消录音吗？</div>
			</div>,
			[
				{
					text: "取消",
					onPress: () => {

					}
				},
				{
					text: "确定",
					onPress: () => {
						// 结束录音，不发送
						// 执行回调切换Tab
						callback && callback();
						this.voice && this.voice.wxEndRecord();
					}
				}
			]
		);
	}

	/**
	 * 推送文字
	 */
	handleSendText = (param) => {
		const { socket } = this.context;
		const { community_id, baseInfo } = this.props;
		let content = '';
		if (typeof param === 'string') {
			content = param.trim();
		} else {
			content = this.textInput && this.textInput.state.content.trim() || '';
		}
		if (content.length == 0) {
			MToasts.info('消息不能为空', 1);
			return;
		}

		socket.emit('650', {
			...baseInfo,
			community_id,
			msg_type: '0',
			msg: content
		});
		this.textInput && this.textInput.initState();
	}

	/**
	 * 推送语音
	 */
	handleSendVoice = (media_id, duration) => {
		const { socket } = this.context;
		const { community_id, baseInfo } = this.props;
		net.ajax({
			url: API_ROOT['_UPLOAD_MEDIA_POST'],
			type: 'POST',
			param: {
				media_id
			},
			noLoading: true,
		}).then((res) => {
			const { url } = res.data || {};
			socket.emit('650', {
				...baseInfo,
				community_id,
				msg_type: '2',
				msg_url: url,
				duration
			});
		}).catch((errors) => {
			MToasts.info(errors.msg, 1);
		});
	}

	// 获取焦点时的回调
	handleFocus = () => {
		this.setState({ showSendBtn: true });
	}

	// 失去焦点时的回调
	handleBlur = () => {
		this.setState({ showSendBtn: false });
	}

	renderVoice = () => {
		if (this.state.showVoice) {
			return (
				<VoiceRecord
					ref={(ref) => this.voice = ref}
					repeat={false}
					onSend={this.handleSendVoice}
				/>
			);
		}
	}

	renderMore = () => {
		const { community_id, baseInfo } = this.props;
		if (this.state.showMore) {
			return (
				<MoreOptions
					community_id={community_id}
					baseInfo={baseInfo}
				/>
			);
		}
	}

	render() {
		const { userInfo = {}, community_id, community_name, isForbid, isFetching } = this.props;
		const { user_type } = userInfo;
		const { showVoice, showMore, showSendBtn } = this.state;
		if (user_type == 1) {  // 观众显示输入框
			return this.renderText();
		} else if (!isFetching) {
			return null;
		}

		return (
			<div className="v-home-room-footer">
				<div className="g-flex-ac g-bg-white g-b-t" style={{ height: 50, lineHeight: 50, fontSize: 15 }}>
					<Link
						className="g-col g-tc g-pd-tb-5 g-black-333 g-flex g-jc-c g-ai-c"
						style={{ lineHeight: 1 }}
						to={`/material?community_id=${community_id}`}
					>
						<i className="iconfont icon-sucai g-m-r-5 g-fs-20" />
						群素材
					</Link>
					<Link
						className="g-col g-tc g-pd-tb-5 g-black-333 g-flex g-jc-c g-ai-c"
						style={{ lineHeight: 1 }}
						to={`/live?community_id=${community_id}&community_name=${community_name}`}
					>
						<i className="iconfont icon-live2 g-m-r-5 g-fs-20" />
						群直播
					</Link>
					<Link
						className="g-col g-tc g-pd-tb-5 g-black-333 g-flex g-jc-c g-ai-c"
						style={{ lineHeight: 1 }}
						to={`/home/member?community_id=${community_id}`}
					>
						<i className="iconfont icon-member g-m-r-5 g-fs-20" />
						群成员
					</Link>
				</div>

				<div
					style={{ borderTop: '1px solid #dcdcdc' }}
					className="g-flex-ac g-pd-10 g-bg-white">
					<i
						className={`iconfont ${(showVoice || showMore) ? 'icon-keyboard' : 'icon-voice2'} g-black-light1 g-fs-26 g-m-r-5`}
						onClick={this.handleToggleVoice}
					/>

					<TextInput
						ref={ref => this.textInput = ref}
						isForbid={showVoice || showMore || isForbid}
						forbidText={isForbid ? '已设置禁言' : '切换为文字输入'}
						forbidStyle={{ background: '#f4f4f4' }}
						onFirbidClick={this.handleFirbidClick}
						onSend={this.handleSendText}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
					/>

					<i
						className="iconfont icon-add g-black-light1 g-fs-28 g-m-l-5"
						onClick={this.handleToggleMoreOpt}
					/>
					{showSendBtn &&
						<div
							className="g-small-btn-blue g-flex-cc g-m-l-5"
							onClick={this.handleSendText}>
							发送
						</div>
					}
				</div>

				{this.renderVoice()}
				{this.renderMore()}
			</div>
		);
	}
}

Footer.contextTypes = {
	socket: PropTypes.object,
};

export default Footer;
