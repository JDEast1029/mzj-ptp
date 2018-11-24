/**
 * 聊天内容区
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PullScroll, MToasts } from 'wya-rc';
import * as types from '@constants/actions/live';
// 组件
import List from './List';
import LiveIntro from './Item/LiveIntro';

class ScrollList extends Component {

	componentDidUpdate(prevProps, prevState) {
		const { liveRoomChat } = this.props;
		const { listInfo = {}, direction } = liveRoomChat;
		// 首次进入自动滚动到顶部或底部
		if (listInfo.currentPage == 1 && direction == 'DOWN') {
			this.handleScrollToBottom();
		} else if (listInfo.currentPage == 1 && direction == 'UP') {
			let scrollEle = document.querySelector('.scroll-container');
			scrollEle.scrollTop = 0;
		}
	}

	loadDataForScroll = (pullToRefresh = false, type = 1, noLoading = true) => {
		const { liveRoomChat, room_id, replay, isBinded } = this.props;
		const { listInfo = {} } = liveRoomChat;
		const { currentPage, max_chat_id } = listInfo;
		if (!isBinded) return null;  // 绑定成功之后再去请求
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.LIVE_ROOM_CHAT_LIST_GET;
		let param = {
			replay,
			room_id,
			type,
			max_chat_id,
			page: pullToRefresh ? 1 : currentPage + 1,
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				pullToRefresh && this.refs.pull && this.refs.pull.setDefault();
			},
			onError: (res) => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, { pullToRefresh, noLoading });
	}

	// 滚动到顶部
	handleScrollToTop = () => {
		const { liveRoomChat = {} } = this.props;
		const { listInfo = {} } = liveRoomChat;
		const { isEnd, currentPage } = listInfo;
		if (isEnd == 2) {
			let scrollEle = document.querySelector('.scroll-container');
			scrollEle.scrollTop = 0;
		} else {
			this.loadDataForScroll(true, 2, false);
		}
	}

	// 滚动到底部
	handleScrollToBottom = () => {
		const { liveRoomChat = {} } = this.props;
		const { listInfo = {}, direction } = liveRoomChat;
		const { isEnd, currentPage } = listInfo;
		if (isEnd == 2 || (currentPage == 1 && direction == 'DOWN')) {
			let scrollEle = document.querySelector('.scroll-container');
			scrollEle.scrollTop = scrollEle.scrollHeight;
		} else {
			this.loadDataForScroll(true, 1, false);
		}
	}

	render() {
		const { liveRoomChat = {}, roomInfo, onCanChangeTab } = this.props;
		const { listInfo = {}, direction, gestureType, audioChats } = liveRoomChat;
		const { itemArr, itemObj, isEnd, currentPage, totalPage } = listInfo;

		return (
			<PullScroll
				className="pull-view-wrap v-live-room-fill v-live-room-list"
				wrapper=".scroll-container"
				height={0}
				loadDataForPull = {() => this.loadDataForScroll(true, gestureType, false)}
				loadDataForScroll = {() => this.loadDataForScroll(false, gestureType, false)}
				isEnd = {isEnd}
				itemArr={itemArr}
				currentPage={currentPage}
				show={true} // 总开关 // 默认true
				pull={false} // 允许下拉刷新 默认true
				scroll={true} // 允许上划加载 默认true
				direction={direction}
				noLoading={false}
				// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
				ref="pull"
			>
				<LiveIntro 
					roomInfo={roomInfo} 
					show={gestureType == 2 || (currentPage == totalPage)}
				/>
				<List 
					itemArr={itemArr}
					itemObj={itemObj}
					audioChats={audioChats}
					canIntoView={direction == 'DOWN' || isEnd == 2}
					onCanChangeTab={onCanChangeTab}
				/>
			</PullScroll>
		);
	}
}

export default ScrollList;
