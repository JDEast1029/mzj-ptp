/**
 * 群聊头部
 */
import React, { PureComponent } from 'react';
import './Styles.scss';

class Header extends PureComponent {

	// 只有一个直播时，跳到直播页面，否则跳到直播列表
	handleClick = () => {
		const { roomNum, room_id, community_id, community_name } = this.props;
		if (roomNum == 1) {
			_global.history.push(`/live/room?room_id=${room_id}`);
		} else {
			_global.history.push(`/live?community_id=${community_id}&community_name=${community_name}`);
		}
	}

	render() {
		const { roomNum } = this.props;
		const classes = "g-bg-white g-pd-10 g-flex-ac g-jc-sb g-fs-14 v-home-room-header";
		if (!roomNum || roomNum == 0) return null;

		return (
			<div className={classes}>
				<span className="">正在直播...</span>
				<span 
					className="g-black-light1" 
					onClick={this.handleClick}>
					点击进入
				</span>
			</div>
		);
	}
}

export default Header;
