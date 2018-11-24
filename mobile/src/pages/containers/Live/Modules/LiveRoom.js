import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/live';
import * as types from '@constants/actions/live';
import * as commonTypes from '@constants/actions/_common';
import MModals from "@components/_common/MModals/MModals";
// tools
import { MToasts } from 'wya-rc';
import { URL_WEBSOCKET } from '@utils/url';
import { Socket } from 'wya-socket';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import ChatMain from '@components/Live/Room/ChatMain';
import Footer from '@components/Live/Room/Footer';
import '@components/Live/Room/Styles.scss';

class Container extends Component {
	/**
	 * 该方法在render之后调用, 更新state和props之后会再次调用，
	 * 但由于shouldComponentUpdate的原因，不太安全，
	 * TODO 换新版的Context
	 */
	getChildContext() {
		return {
			socket: this.socket
		};
	}

	componentWillMount = () => {
		this.socket = new Socket();
		this.socket.connect(URL_WEBSOCKET);
		// 链接成功后获取client_id
		this.socket.on('connect', (res) => {
			const { data = {} } = res.data || {};
			this.client_id = data.client_id;
			this.handleBindUser();
		});
		this.socket.on('error', (res) => {
			MToasts.info('服务器连接失败,请刷新页面');
		});
	}

	componentWillUnmount() {
		this.closeWebsocket();
		this.props.actions.navigator();

		// 组件销毁前清除Audio实例
		window.XQBAudio.audio.pause && window.XQBAudio.audio.pause();
		window.XQBAudio = {
			audio: {},
			isAudio: false,
			audioOnce: null,
			chatId: ''
		};
	}

	/**
	 * 绑定user_id, 后台需要
	 */
	handleBindUser = () => {
		const { actions, location } = this.props;
		const { room_id } = location.query;

		let url = commonTypes.BIND_USERID_POST;
		let param = {
			client_id: this.client_id,
			room_id,
			type: 1
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				const { data = {} } = res;
				if (data.error_code) {
					this.closeWebsocket();
					this.showNoLive(res.msg);
					// switch (data.error_code) {
					// 	case 408:
					// 		this.showNoLive('该直播内容不存在');
					// 		break;
					// 	case 409:
					// 		this.showNoLive('您无法观看该直播');
					// 		break;
					// 	default:
					// 		break;
					// }
				} else {
					// 用户进入直播间向后台推送消息
					this.socket && this.socket.emit('100', {
						...data,
						room_id,
						msg_type: 5
					});
					this.chatMain && this.chatMain.loadRoomInfo();
				}
			},
			onError: (res) => {
				MToasts.info(res.msg, 1);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	}

	// 直播不存在Modal
	showNoLive = (msg) => {
		MModals.alert("",
			<div className="g-flex-ac g-fd-c g-fs-14" style={{ height: 90 }}>
				<div className="g-pd-15">抱歉</div>
				<div className="g-fs-13">{msg}</div>
			</div>,
			[{
				text: "确定",
				onPress: () => { _global.history.replace('/home'); }
			}],
			{
				maskClosable: false
			}
		);
	}

	// 关闭websocket
	closeWebsocket = () => {
		this.socket && this.socket.close();
		this.socket = null;
	}

	handleClick = () => {
		this.footer && this.footer.handleToggleTab();
	}

	canChangeTab = () => {
		return this.footer && this.footer.canChangeTab();
	}

	render() {
		const {
			actions,
			location,
			liveRoomChat,
			liveRoomDiscuss,
			liveRoomOther
		} = this.props;
		const { query = {} } = location;
		const { room_id, replay = 0 } = query;
		const { userInfo = {}, roomInfo } = liveRoomOther;
		const { title = "直播室", status, on_shelves, speak_forbid } = roomInfo;
		const { discussInfo } = liveRoomDiscuss;
		const show = status != 2 && on_shelves == 1;

		return (
			<WxSetTitle title={title} back={false} className="g-flex g-fd-c v-live-room v-live-room-fill" >
				<ChatMain
					ref={(ref) => this.chatMain = ref}
					actions={actions}
					show={show}
					replay={replay}
					room_id={room_id}
					roomInfo={roomInfo}
					userInfo={userInfo}
					discussInfo={discussInfo}
					liveRoomChat={liveRoomChat}
					onClick={this.handleClick}
					onCanChangeTab={this.canChangeTab}
				/>
				<Footer
					ref={(ref) => this.footer = ref}
					show={show}
					actions={actions}
					userInfo={userInfo}
					room_id={room_id}
					isForbid={speak_forbid && userInfo.user_type == 1}
				/>
			</WxSetTitle>
		);
	}
}

Container.childContextTypes = {
	socket: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		liveRoomChat: state.liveRoomChat,
		liveRoomDiscuss: state.liveRoomDiscuss,
		liveRoomOther: state.liveRoomOther,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
