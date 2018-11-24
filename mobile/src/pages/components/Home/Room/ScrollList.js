import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import { MToasts, PullScroll } from 'wya-rc';
import * as types from '@constants/actions/home';
import { getItem, setItem } from '@utils/utils';
// 组件
import List from './List';

@pureRender
class ScrollList extends Component {
	constructor(props) {
		super(props);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	componentWillMount() {
		// this.loadRoomInfo();
		this.handleListenWebsocket();
	}

	componentDidUpdate(prevProps, prevState) {
		const { homeChatRoom } = this.props;
		const { listInfo = {} } = homeChatRoom;
		// 首次进入自动滚动到顶部或底部
		if (listInfo.currentPage == 1
			|| listInfo.itemArr.length > prevProps.homeChatRoom.listInfo.itemArr.length) {
			this.handleScrollToBottom();
		}
	}

	loadDataForScroll = (pullToRefresh = false) => {
		const { homeChatRoom, community_id, actions } = this.props;
		const { listInfo = {} } = homeChatRoom;
		const { currentPage, max_chat_id } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.HOME_CHAT_LIST_GET;
		let param = {
			community_id,
			max_chat_id: max_chat_id,
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
		actions.request(url, params, { pullToRefresh });
	}

	/**
	 * 群聊中所有websocket监听
	 */
	handleListenWebsocket = () => {
		const { actions } = this.props;
		const { socket = {} } = this.context;
		// 群聊消息 
		socket.on('650', (res) => {
			const { data = {} } = res.data || {};
			if (data.msg_type == 6) {
				// 群聊直播有结束后台就会推送
				actions.allLiveEnd(data);
			} else {
				actions.addChatItem(data);
			}
			data.chat_sn && this.setLocalStorage(data.chat_sn);
		});

		// 开启禁言
		socket.on('651', (res) => {
			const { data = {} } = res.data || {};
			actions.openForbid(data);
		});

		// 关闭禁言
		socket.on('652', (res) => {
			const { data = {} } = res.data || {};
			actions.closeForbid(data);
		});
	}

	/**
	 * 将群聊中新消息写入本地，便于社群列表做对比
	 */
	setLocalStorage = (chat_sn) => {
		let homeItem = getItem(`homeItemObj@${_global.version}`, 'localStorage');
		const { homeChatRoom = {} } = this.props;
		const { community = {} } = homeChatRoom;
		const community_id = community.community_id;
		if (homeItem[community_id]) {
			homeItem[community_id] = { ...homeItem[community_id], chat_sn };
			// homeItem = { // 不能用...，会改变排序
			// 	...homeItem, [community_id]: { ...homeItem[community_id], chat_sn }
			// };
			setItem(`homeItemObj@${_global.version}`, homeItem, 'localStorage');
		}
	}

	// 滚动到底部
	handleScrollToBottom = () => {
		let scrollEle = document.querySelector('.scroll-container');
		scrollEle.scrollTop = scrollEle.scrollHeight;
	}

	render() {
		const { onClick, onCanChangeTab, homeChatRoom, baseInfo, isFetching } = this.props;
		const { listInfo = {}, audioChats } = homeChatRoom;
		const { itemArr, itemObj, isEnd, currentPage } = listInfo;
		if (!isFetching) return null;
		return (
			<div
				className="v-home-room-fill v-home-room-main"
				onClick={onClick}
			>
				<PullScroll
					className="pull-view-wrap v-home-room-fill v-home-room-list"
					wrapper=".scroll-container"
					height={0}
					loadDataForPull={this.loadDataForPull}
					loadDataForScroll={this.loadDataForScroll}
					isEnd={isEnd}
					itemArr={itemArr}
					currentPage={currentPage}
					show={true} // 总开关 // 默认true
					pull={false} // 允许下拉刷新 默认true
					scroll={true} // 允许上划加载 默认true
					noLoading={false}
					direction="DOWN"
					// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
					ref="pull"
				>
					<List
						itemArr={itemArr}
						itemObj={itemObj}
						user_id={baseInfo.user_id}
						audioChats={audioChats}
						canIntoView={true}
						onCanChangeTab={onCanChangeTab}
					/>
				</PullScroll>
			</div>
		);
	}
}

ScrollList.contextTypes = {
	socket: PropTypes.object,
};

export default ScrollList;