/**
 * 操作区
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MToasts } from 'wya-rc';

class Operation extends PureComponent {

	// 切换禁言
	handleToggleForbid = () => {
		const { userInfo = {}, isForbid, room_id } = this.props;
		const { socket = {} } = this.context;

		if (isForbid) {
			// 主持人/讲师 开启聊天
			socket.emit('103', {
				...userInfo,
				room_id,
				msg_type: 5
			});
		} else {
			// 主持人/讲师 禁止所有人发言
			socket.emit('102', {
				...userInfo,
				room_id,
				msg_type: 5
			});
		}
	}

	render() {
		const { userInfo = {}, isForbid, isEnd, onScrollToTop, onScrollToBottom } = this.props;
		const { user_type } = userInfo;

		return (
			<div className="v-live-room-operation">
				<div className="_btn" style={{ marginBottom: 5 }} onClick={onScrollToTop}>
					<i className="iconfont icon-to-top g-fs-18" />
				</div>
				<div className="_btn" style={{ marginBottom: 8 }} onClick={onScrollToBottom}>
					<i className="iconfont icon-to-bottom g-fs-18" />
				</div>
				{(user_type == 2 || user_type == 3) && !isEnd &&
					<div className={`_btn ${isForbid ? '_forbid' : ''}`} onClick={this.handleToggleForbid}>
						禁
					</div>
				}
			</div>
		);
	}
}

Operation.contextTypes = {
	socket: PropTypes.object,
};

export default Operation;
