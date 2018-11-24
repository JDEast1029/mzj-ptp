import React, { Component } from 'react';
import './Item.scss';
class Item extends Component {
	handleClick = (community_id) => {
		const { onClick } = this.props;
		onClick && onClick(community_id);
	}
	handleMsg = () => {
		const { itemData = {} } = this.props;
		const { msg_type, msg, remind = 0 } = itemData;
		switch (msg_type) { // 0 文字 1图片 2语音 3素材 4直播消息
			case 1:
				return <span className={remind ? "g-red-dark" : ""}>[图片]</span>;
			case 2:
				return <span className={remind ? "g-red-dark" : ""}>[语音]</span>;
			case 3:
				return <span className={remind ? "g-red-dark" : ""}>[素材]</span>;
			default:
				return msg;
		}
	}
	render() {
		const { itemData = {} } = this.props;
		const {
			community_id,
			img,
			name,
			chat_sn,
			msg,
			join_time,
			user_nick,
			is_now_room,
			remind = 0
		} = itemData;
		return (
			<div className="v-home-main-item" onClick={() => this.handleClick(community_id)}>
				<div className="_avatar">
					<img src={img} alt="" className="g-avatar" />
					{remind ? <div className="_red" /> : ''}
				</div>
				<div className="g-flex g-ai-fs g-fw-w g-m-l-10 g-width">
					<div className="g-width g-flex g-jc-sb">
						<span className="g-fs-14 g-black-333 g-oneline">
							{name}
						</span>
						<span className="_time g-black-light1 g-fs-14">
							{join_time}
						</span>
					</div>
					<div className="g-black-light1 g-fs-12 g-oneline">
						{remind && !is_now_room ? '[有新消息] ' : ''}
						{is_now_room ? <span className="g-blue-middle">[直播中]  </span> : ''}
						{user_nick && <span>{user_nick}：{this.handleMsg()}</span>}
					</div>
				</div>

			</div>
		);
	}
}
export default Item;