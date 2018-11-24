/**
 * 直播间主体
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MToasts } from 'wya-rc';
import * as types from '@constants/actions/live';
import MModals from "@components/_common/MModals/MModals";
// 业务组件
import ScrollList from './Chat/ScrollList';
import DiscussArea from './Chat/DiscussArea';
import Operation from './Chat/Operation';

class ChatMain extends Component {

	componentWillMount() {
		// this.loadRoomInfo();
		this.handleListenWebsocket();
	}

	/**
	 * 直播间聊天室详情
	 */
	loadRoomInfo = () => {
		const { actions, room_id } = this.props;

		let url = types.LIVE_ROOM_INFO_GET;
		let param = {
			room_id
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				
			},
			onError: (res) => {
				MToasts.info(res.msg, 1);
			}
		};
		actions.request(url, params, { noLoading: true });
	}

	/**
	 * 直播间所有websocket监听
	 */
	handleListenWebsocket = () => {
		const { actions } = this.props;
		const { socket = {}, baseInfo } = this.context;

		// 进入直播间 
		socket.on('100', (res) => {
			const { data = {} } = res.data || {};
			// console.log(data, '100');
			actions.enterRoom(data);
		}); 

		// 离开直播间
		socket.on('104', (res) => {
			const { data = {} } = res.data || {};
			// console.log(res, 'leave live');
			actions.leaveRoom(data);
		}); 

		// 直播开始
		socket.on('101', (res) => {
			const { data = {} } = res.data || {};
			// console.log(res, 'start live');
			actions.startLive(data);
		}); 

		// 结束直播
		socket.on('105', (res) => {
			const { data = {} } = res.data || {};
			// console.log(res, 'end live');
			// actions.endLive(data);
			MModals.alert("", 
				<div className="g-flex-ac g-fd-c g-fs-14" style={{ height: 90 }}>
					<div className="g-pd-15">直播结束</div>
					<div className="g-fs-13">请退出直播页面</div>
				</div>, 
				[{ 
					text: "确定", 
					onPress: () => { _global.history.replace('/live'); } 
				}],
				{
					maskClosable: false
				}
			);
		 });

		// 主持人/讲师 开启聊天
		socket.on('103', (res) => {
			const { data = {} } = res.data || {};
			MToasts.info(data.msg, 2);
			actions.openChat(data);
		}); 

		// 主持人/讲师 禁止所有人发言
		socket.on('102', (res) => {
			const { data = {} } = res.data || {};
			MToasts.info(data.msg, 2);
			actions.closeChat(data);
		}); 

		// 直播上下架
		socket.on('106', (res) => {
			const { data = {} } = res.data || {};
			MToasts.info(data.msg, 2);
			actions.changeShelves(data);
		}); 

		// 直播消息 
		socket.on('140', (res) => {
			const { data = {} } = res.data || {};
			// console.log(data, '140');
			actions.addChatItem(data);
		}); 
	}

	// 滚动到顶部
	handleScrollToTop = () => {
		this.chatList && this.chatList.handleScrollToTop();
	}
	
	// 滚动到底部
	handleScrollToBottom = () => {
		this.chatList && this.chatList.handleScrollToBottom();
	}

	render() {
		const { 
			onClick, 
			onCanChangeTab,
			userInfo,
			roomInfo,
			discussInfo,
			liveRoomChat,
			actions,
			room_id,
			show,
			replay
		} = this.props;

		return (
			<div 
				className="v-live-room-fill v-live-room-main"
				onClick={onClick}
			>
				<ScrollList
					ref={ref => this.chatList = ref} 
					replay={replay}
					room_id={room_id}
					actions={actions}
					isBinded={userInfo.isBinded}
					liveRoomChat={liveRoomChat}
					roomInfo={roomInfo}
					onCanChangeTab={onCanChangeTab}
				/>
				<DiscussArea 
					show={show}
					actions={actions}
					room_id={room_id}
					roomInfo={roomInfo}
					discussInfo={discussInfo}
				/>
				<Operation
					isEnd={!show} 
					userInfo={userInfo}
					isForbid={roomInfo.speak_forbid}
					actions={actions}
					room_id={room_id}
					onScrollToTop={this.handleScrollToTop}
					onScrollToBottom={this.handleScrollToBottom}
				/>
			</div>
		);
	}
}

ChatMain.contextTypes = {
	socket: PropTypes.object,
	baseInfo: PropTypes.object,
};

export default ChatMain;
