/**
 * 直播Item
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './Styles.scss';

class LiveItem extends Component {
	render() {
		const { content, title, room_id, create_time } = this.props;
		
		return (
			<div className="g-bg-white g-m-15 v-chat-live-item">
				<div className="g-fs-14 g-pd-tb-10 g-pd-lr-10 g-bb">
					<div className="g-fs-14 g-twoline g-break-word _title">
						【直播】{title}
					</div>
					<div className="g-fs-12 g-black-light1 g-threeline">
						{content}
					</div>
				</div>
				<div className="g-pd-t-10 g-pd-l-20 g-fs-12 g-pd-r-10 g-pd-b-15 g-flex-ac g-jc-sb">
					<span className="g-black-light1">{create_time}</span>
					<Link 
						to={`/live/room?room_id=${room_id}`}
						style={{ color: '#089ffc' }}>
						点击进入
					</Link>
				</div>
			</div>
		);
	}
}
export default LiveItem;
