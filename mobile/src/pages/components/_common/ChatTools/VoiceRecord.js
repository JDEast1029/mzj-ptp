import React, { Component } from 'react';
import { MToasts } from 'wya-rc';
import MModals from '@components/_common/MModals/MModals';
import wx from 'weixin-js-sdk';
import './Styles.scss';

class VoiceRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: 0,
			voiceStatus: 'start',    // 录音状态：start - 录音未开始；recording - 录音中；end - 录音已结束；
			isAudting: false,        // 是否正在试听中
		};
		this.localId = ''; // 音频ID
	}

	componentWillMount() {
		const { repeat } = this.props;
		let _this = this;

		wx.stopRecord(); // 解决有假录音造成的录音失败
		wx.ready(() => {
			wx.onVoiceRecordEnd({
				// 录音时间超过一分钟没有停止的时候会执行 complete 回调
				complete: function (res) {
					_this.localId = res.localId;
					if (_this.state.seconds === 60 || _this.state.seconds === 59) {
						_this.clearTimer();
						_this.setState({ voiceStatus: 'start', isAudting: false, seconds: 0 });
						_this.handleUploadRecord(60, repeat);
					} else {
						_this.handleAutoEndRecord();
					}
				}
			});
		});
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	/**
	 * 正在录音时切换tab导致录音停止，共外部调用
	 */
	wxEndRecord = () => {
		let _this = this;
		this.clearTimer();
		wx.stopRecord({
			success: function (res) {
				_this.setState({ voiceStatus: 'start', seconds: 0, isAudting: false });
			}
		});
	}

	/**
	 * 退出App时结束录音
	 */
	handleAutoEndRecord = () => {
		if (this.state.voiceStatus === 'recording') {
			this.clearTimer();
			this.setState({ voiceStatus: 'end', isAudting: false });
			MModals.alert("",
				<div className="g-flex-cc g-fd-c g-fs-14" style={{ height: 90 }}>
					<div className="g-pd-15">提示</div>
					<div className="g-fs-13">微信自动结束录音</div>
				</div>,
				[
					{
						text: "确定",
						onPress: () => { }
					}
				]
			);
		}
	}

	// 录音按钮点击事件集合
	handleClick = () => {
		const { voiceStatus } = this.state;
		if (voiceStatus === 'start') {
			this.handleStartRecord();
		} else if (voiceStatus === 'recording') {
			this.handleEndRecord();
		} else if (voiceStatus === 'end') {
			this.handleSendRecord();
		}
	}

	// 开始录音
	handleStartRecord = () => {
		let _this = this;
		const audioNodes = window.audioNodes;
		let audio = window.XQBAudio.audio;
		let lastChatId = window.XQBAudio.chatId;
		let playItem = audioNodes[lastChatId];
		if (audio.played) {
			audio.pause && audio.pause();
			playItem && playItem.handlePause();
		}

		wx.startRecord({
			success: function () {
				// 录音计时
				_this.setState({
					voiceStatus: 'recording'
				}, () => {
					_this.recordTime();
				});
			},
			fail: function (err) {
				let msg = JSON.stringify(err);
				// wx.stopRecord();//解决有假录音造成的录音失败
				// Toast.info('录音开启失败，请尝试刷新页面')
			},
			cancel: function () {
				MToasts.info('您已拒绝授权录音', 2);
			}
		});
	}

	// 结束录音
	handleEndRecord = () => {
		let _this = this;
		if (this.state.seconds < 1) {
			MToasts.info('录音时间太短', 1);
			return;
		}
		this.clearTimer();
		wx.stopRecord({
			success: function (res) {
				_this.localId = res.localId;
				_this.setState({ voiceStatus: 'end', isAudting: false });
			}
		});
	}

	// 发送录音
	handleSendRecord = () => {
		if (this.state.seconds < 1) {
			MToasts.info('录音时间太短', 1);
			return;
		}
		this.clearTimer();

		// 状态更新暂时在这里，后面放在  sendVoice  成功的回调中
		this.setState({
			voiceStatus: 'start',
			seconds: 0,
		});

		// 上传音频
		this.handleUploadRecord(this.state.seconds, false);
	}

	/**
	 * 重置录音
	 */
	wxResetRecord = () => {
		let _this = this;
		wx.stopRecord({
			success: function (res) {
				_this.localId = res.localId;
				_this.setState({ voiceStatus: 'start', seconds: 0 });
			}
		});
	}

	/**
	 * 重新录制，此时录音已结束
	 */
	handleRerecord = () => {
		MModals.alert("",
			<div className="g-flex-cc g-fd-c g-fs-14" style={{ height: 90 }}>
				<div className="g-pd-15">提示</div>
				<div className="g-fs-13">确定重新录音吗？本次录音将不会保存</div>
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
						this.localId = '';
						this.setState({
							voiceStatus: 'start',
							seconds: 0
						});
					}
				}
			]
		);

	}

	/**
	 * 将获取的音频ID上传至服务器，再将返回的音频的服务器ID传给后台
	 */
	handleUploadRecord = (seconds, repeat) => {
		const _this = this;
		wx.uploadVoice({
			localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
				let serverId = res.serverId; // 返回音频的服务器端ID
				_this.handleSendVoice(serverId, seconds, repeat);
			},
			fail: function (err) {
				MToasts.info('上传失败', 1.5);
				this.setState({ seconds: 0 });
			}
		});
	}

	/**
	 * 发送serverId给后台，成功后重置状态，并推送websocket
	 */
	handleSendVoice = (serverId, seconds, repeat) => {
		const { onSend } = this.props;
		onSend && onSend(serverId, seconds);
		repeat && this.handleStartRecord();
	}

	// 记录已录音的时间
	recordTime = () => {
		let _this = this;
		this.timer = setInterval(() => {
			this.setState({ seconds: this.state.seconds + 1 }, () => {
				// // 60s后自动上传
				// if (this.state.seconds === 60) {
				// 	// alert('到60秒了');
				// 	// wx.stopRecord({
				// 	// 	success: function (res) {
				// 	// 		_this.localId = res.localId;
				// 	// 		_this.handleUploadRecord(60);
				// 	// 	}
				// 	// });
				// 	this.wxResetRecord(() => this.handleUploadRecord(60));
				// 	if (!!this.timer) {
				// 		clearInterval(this.timer);
				// 	}
				// 	this.setState({ voiceStatus: 'start' });
				// }
			});
		}, 1000);
	}

	/**
	 * 试听
	 */
	handleAudition = () => {
		const { isAudting } = this.state;
		let _this = this;

		if (isAudting) {
			wx.stopVoice({
				localId: this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
			});
			this.setState({ isAudting: false });
		} else {
			wx.playVoice({
				localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
			wx.onVoicePlayEnd({
				success: function (res) {
					_this.setState({ isAudting: false });
				}
			});
			this.setState({ isAudting: true });
		}

	}

	clearTimer = () => {
		// 计时清零
		if (!!this.timer) {
			clearInterval(this.timer);
		}
	}

	// 提示信息
	renderTip = () => {
		const { voiceStatus, seconds, isAudting } = this.state;

		switch (voiceStatus) {
			case 'start':
				return <div>点击开始录音</div>;
			case 'recording':
				return <div>{seconds}s/60s</div>;
			case 'end':
				return (
					<div className="g-flex-cc g-relative" style={{ width: '100%' }}>
						<div>本次录音共{seconds}s</div>
						<span
							className="g-fs-12 g-blue-middle g-m-l-5"
							onClick={this.handleAudition}
						>
							{isAudting ? '结束' : '试听'}
						</span>
						<div
							className="_rerecord g-flex-ac"
							onClick={this.handleRerecord}
						>
							重录
						</div>
					</div>
				);
		}
	}

	// 录音按钮
	renderBtnContent = () => {
		const { voiceStatus } = this.state;
		switch (voiceStatus) {
			case 'start':
				return <i className={`iconfont icon-microphone g-fs-30`} />;
			case 'recording':
				return <i className={`iconfont icon-square g-fs-24`} />;
			case 'end':
				return <span style={{ fontSize: 12 }}>发送</span>;
		}
	}

	render() {
		const { voiceStatus } = this.state;

		return (
			<div className="c-chat-voice g-flex-cc g-fd-c">
				{this.renderTip()}
				<div className="_btn-container g-flex-cc">
					<div className={`__wave ${voiceStatus === 'recording' ? '__animate-wave' : ''}`} />
					<div className="__btn g-flex-cc" onClick={this.handleClick}>
						{this.renderBtnContent()}
					</div>
				</div>
			</div>
		);
	}
}

export default VoiceRecord;
