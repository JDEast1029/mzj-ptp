import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setItem, getHashUrl } from '@utils/utils';
import { NoticeBar } from 'antd-mobile';
import ScrollList from './ScrollList';
import './Styles.scss';
class Content extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.handleListenWebsocket();
	}

	/**
	 * 社群所有websocket监听
	 */
	handleListenWebsocket = () => {
		const { actions } = this.props;
		const { socket = {}, user_id } = this.context;
		// 监听公告
		socket.on('600', (res) => {
			const { data = {} } = res.data || {};
			actions.updateNotice(data);
		});
		// 监听社群列表的变化
		socket.on('601', (res) => {
			// console.table(res.data.data.list);
			const { data = {} } = res.data || {};
			actions.changeList(data);
		});
	}

	/**
	 * 点击列表进入群聊页面
	 * 新消息已读，存入本地
	 */
	handleJump = (community_id) => {
		const { itemArr = [], itemObj = {} } = this.props.listInfo;
		// 已读
		if (itemObj[community_id] && itemObj[community_id]['remind']) {
			itemObj[community_id]['remind'] = 0;
		}
		// 存本地
		setItem(`homeItemObj@${_global.version}`, itemObj, 'localStorage');
		_global.history.push(getHashUrl('/home/room', { community_id }));
	}

	render() {
		const { listInfo = {}, actions, isFetching } = this.props;
		const { notice = '' } = listInfo;
		return (
			<div
				className="g-flex g-fd-c v-home-main-container"
				style={{ height: _global.innerHeight - 50 }}
			>
				{notice
					? <NoticeBar
						icon={null}
						marqueeProps={{
							loop: true,
							style: { padding: `0px ${_global.innerWidth}px` }
						}}
					>{notice}</NoticeBar>
					: ''
				}
				<ScrollList
					listInfo={listInfo}
					actions={actions}
					onClick={this.handleJump}
					isFetching={isFetching}
				/>
			</div>
		);
	}
}
Content.contextTypes = {
	socket: PropTypes.object,
	user_id: PropTypes.string,
};
export default Content;