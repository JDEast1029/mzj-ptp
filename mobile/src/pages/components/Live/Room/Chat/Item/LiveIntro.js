import React, { PureComponent } from 'react';
import './Styles.scss';

class LiveIntro extends PureComponent {
	render() {
		const { roomInfo = {}, show } = this.props;
		const {
			title, broad_intro, start_time, lecturer_name
		} = roomInfo;

		if (!show) return null;

		return (
			<div className="v-live-item-intro g-m-15">
				<div style={{ fontSize: 16 }}>{title}</div>
				<div className="g-black-light1" style={{ fontSize: 12 }}>{start_time}</div>
				<div className="g-fs-14">讲师：{lecturer_name}</div>
				<div className="g-fs-14 g-break-word g-m-t-5">{broad_intro}</div>
			</div>
		);
	}
}

export default LiveIntro;
