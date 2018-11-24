/**
 * 直播间底部操作栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import wx from 'weixin-js-sdk';
import MModals from "@components/_common/MModals/MModals";
import { MToasts } from 'wya-rc';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
// 组件
import VoiceRecord from '@components/_common/ChatTools/VoiceRecord';
import SendText from './ChatTools/SendText';
import MoreOptions from './ChatTools/MoreOptions';

@pureRender
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showVoice: false,
			showText: false,
			showMore: false
		};
	}

	handleToggleTab = () => {
		const { showVoice, showText, showMore } = this.state;
		if (showVoice) {
			this.handleToggleVoice();
		} else if (showText) {
			this.handleToggleText();
		} else if (showMore) {
			this.handleToggleMoreOpt();
		}
	}

	// 切换显示 语音
	handleToggleVoice = () => {
		let canChange = this.canChangeTab();
		let callback = () => {
			this.setState({
				showVoice: !this.state.showVoice,
				showText: false,
				showMore: false,
			});
		};

		if (canChange) {
			callback();
		} else {
			this.showToggleConfirmModal(callback);
		}
	}

	// 切换显示发送文字
	handleToggleText = () => {
		let canChange = this.canChangeTab();
		let callback = () => {
			this.setState({
				showText: !this.state.showText,
				showVoice: false,
				showMore: false,
			});
		};

		if (canChange) {
			callback();
		} else {
			this.showToggleConfirmModal(callback);
		}
	}

	// 发送图片
	handleSendPic = () => {
		let _this = this;
		let canChange = this.canChangeTab();
		let callback = () => {
			wx.chooseImage({
				count: 9, // 默认9
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					_this.handleUploadImg(localIds);
				},
				fail: function (error) {
					console.error(JSON.stringify(error), 'chooseImage');
				}
			});
		};

		if (canChange) {
			callback();
		} else {
			this.showToggleConfirmModal(callback);
		}

	}

	handleUploadImg = (localIds) => {
		let _this = this;
		let localId = localIds.shift();
		wx.uploadImage({
			localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			// isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
				let serverId = res.serverId; // 返回图片的服务器端ID
				_this.handleGetImageUrl(serverId, () => { _this.handleUploadImg(localIds); });
			},
			fail: function (error) {
				console.error(JSON.stringify(error), 'uploadImage');
			}
		});
	}

	// 获取图片url地址
	handleGetImageUrl = (media_id, callback) => {
		const { socket } = this.context;
		const { room_id, userInfo = {} } = this.props;

		net.ajax({
			url: API_ROOT['_UPLOAD_MEDIA_POST'],
			type: 'POST',
			param: {
				media_id
			},
			noLoading: true,
		}).then((res) => {
			const { url } = res.data || {};
			callback();
			socket.emit('140', {
				...userInfo,
				room_id,
				msg_type: 1,
				msg_url: url,
				type: 1
			});
		}).catch((errors) => {
			MToasts.info(errors.msg, 1);
		});
	}

	/**
	 * 推送语音
	 */
	handleSendVoice = (media_id, duration) => {
		const { socket } = this.context;
		const { room_id, userInfo = {} } = this.props;

		net.ajax({
			url: API_ROOT['_UPLOAD_MEDIA_POST'],
			type: 'POST',
			param: {
				media_id
			},
			noLoading: true,
		}).then((res) => {
			const { url } = res.data || {};
			socket.emit('140', {
				...userInfo,
				room_id,
				msg_type: '2',
				msg_url: url,
				duration,
				type: 1
			});
		}).catch((errors) => {
			MToasts.info(errors.msg, 1);
		});
	}

	// 切换显示 “更多操作”
	handleToggleMoreOpt = () => {
		const { userInfo = {} } = this.props;
		const { user_type } = userInfo;
		if (user_type == 2) {
			let canChange = this.canChangeTab();
			let callback = () => {
				this.setState({
					showMore: !this.state.showMore,
					showVoice: false,
					showText: false,
				});
			};

			if (canChange) {
				callback();
			} else {
				this.showToggleConfirmModal(callback);
			}
		}

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

	renderVoice = () => {
		if (this.state.showVoice) {
			return (
				<VoiceRecord
					ref={(ref) => this.voice = ref}
					repeat={true}
					onSend={this.handleSendVoice}
				/>
			);
		}
	}

	renderText = () => {
		const { userInfo = {}, isForbid, room_id } = this.props;
		const { user_type } = userInfo;
		let isAudience = user_type == 1;

		if (this.state.showText || isAudience) {
			return (
				<SendText
					autoFocus={!isAudience}
					isForbid={isForbid}
					userInfo={userInfo}
					room_id={room_id}
					type={1} // 讨论中的输入框
				/>
			);
		}


	}

	renderMore = () => {
		const { room_id, actions } = this.props;
		if (this.state.showMore) {
			return (
				<MoreOptions
					room_id={room_id}
					actions={actions}
				/>
			);
		}
	}

	render() {
		const { userInfo = {}, show } = this.props;
		const { user_type } = userInfo;
		const { showVoice, showText, showMore } = this.state;
		if (!show) return null;

		if (user_type == 1) {  // 观众显示输入框
			return this.renderText();
		}

		return (
			<div className="v-live-room-footer">
				<div className="g-flex-ac g-bg-white g-b-t" style={{ height: 50, lineHeight: 50, fontSize: 15 }}>
					<div
						className={`g-col g-tc g-pd-tb-5 g-flex g-jc-c g-ai-c ${showVoice ? 'g-blue-middle' : ''}`}
						style={{ lineHeight: 1 }}
						onClick={this.handleToggleVoice}
					>
						<i className="iconfont icon-microphone g-fs-18" />
						语音
					</div>
					<div
						className={`g-col g-tc g-pd-tb-5 g-flex g-jc-c g-ai-c ${showText ? 'g-blue-middle' : ''}`}
						style={{ lineHeight: 1 }}
						onClick={this.handleToggleText}
					>
						<i className="iconfont icon-keyboard2 g-m-r-5 g-fs-22" />
						文字
					</div>
					<div
						className="g-col g-tc g-pd-tb-5 g-flex g-jc-c g-ai-c"
						style={{ lineHeight: 1 }}
						onClick={this.handleSendPic}
					>
						<i className="iconfont icon-upload g-m-r-5 g-fs-20" />
						图片
					</div>
					<div
						className="g-col g-tc g-fs-12 g-pd-tb-5"
						style={{ lineHeight: 1, borderLeft: '1px solid #999' }}
						onClick={this.handleToggleMoreOpt}
					>
						{user_type == 2 &&
							<i className={`iconfont icon-${showMore ? 'down' : 'up'}-triangle g-black-middle`} />
						}
					</div>
				</div>

				{this.renderVoice()}
				{this.renderText()}
				{this.renderMore()}
			</div>
		);
	}
}

Footer.contextTypes = {
	socket: PropTypes.object,
};

export default Footer;
