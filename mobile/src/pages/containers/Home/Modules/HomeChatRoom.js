import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
import * as types from '@constants/actions/home';
import * as commonTypes from '@constants/actions/_common';
// tools
import { MToasts } from 'wya-rc';
import MModals from "@components/_common/MModals/MModals";
import { Socket } from 'wya-socket';
import { URL_WEBSOCKET } from '@utils/url';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
// 业务组件
import ScrollList from '@components/Home/Room/ScrollList';
import Header from '@components/Home/Room/Header';
import Footer from '@components/Home/Room/Footer';
import '@components/Home/Room/Styles.scss';
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
		this.socket && this.socket.close();
		this.socket = null;
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
		const { query = {} } = location;
		const { community_id } = query;
		let url = commonTypes.BIND_USERID_POST;
		let param = {
			client_id: this.client_id,
			community_id,
			type: 3
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				if (res.data.error_code){
					this.closeWebsocket();
					this.showNoLive(res.msg);
				}
			},
			onError: (res) => {
				MToasts.info(res.msg, 1);
			}
		};
		actions.request(url, params, { noLoading: true });
	}
	// 关闭websocket
	closeWebsocket = () => {
		this.socket && this.socket.close();
		this.socket = null;
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
			homeChatRoom,
		} = this.props;
		const { community = {}, baseInfo, isFetching } = homeChatRoom;
		const { query = {} } = location;
		const { community_id } = query;
		const { name = "群聊", room_num, msg_id, is_no_say } = community;
		return (
			<WxSetTitle title={name} back={false} className="g-flex g-fd-c v-home-room v-home-room-fill">
				<Header
					roomNum={room_num}
					room_id={msg_id}
					community_id={community_id}
					community_name={name}
					isFetching={isFetching}
				/>
				<ScrollList
					actions={actions}
					community_id={community_id}
					homeChatRoom={homeChatRoom}
					baseInfo={baseInfo}
					onClick={this.handleClick}
					onCanChangeTab={this.canChangeTab}
					isFetching={isFetching}
				/>
				<Footer
					ref={(ref) => this.footer = ref}
					community_id={community_id}
					community_name={name}
					isForbid={is_no_say == 1}
					baseInfo={baseInfo}
					isFetching={isFetching}
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
		homeChatRoom: state.homeChatRoom
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
