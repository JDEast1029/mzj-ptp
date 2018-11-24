/**
 * 讨论区
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MPopup from '@components/_common/MPopup/MPopup';
import DiscussPopup from './Discuss/DiscussPopup';

class DiscussArea extends Component {

	componentWillMount() {
		
	}

	/**
	 * 呼出讨论列表
	 */
	handlePopDiscuss = () => {
		const { actions, room_id } = this.props;
		
		MPopup.popup({
			parent: this,
			orientation: 'bottom',
			content: (
				<DiscussPopup 
					room_id={room_id}
					actions={actions}
				/>
			)
		}).then((res) => {

		}).catch((error) => {
			
		});
	}

	// 渲染最近的三条
	renderLatest = () => {
		const { roomInfo = {} } = this.props;
		const { latest_discuss = [] } = roomInfo;

		return latest_discuss.map((item) => {
			return (
				<div key={item.discuss_id} className="g-pd-r-5 g-flex g-jc-fe g-m-b-10">
					<div className="g-m-r-5 g-break-word g-fs-12 g-twoline _discuss">
						{item.msg}
					</div>
					<div className="_avatar g-flex-ac">
						<img src={item.avatar} />
					</div>
				</div>
			);
		});
	}

	render() {
		const { roomInfo, show } = this.props;
		const { people_num } = roomInfo;
		if (!show) return null;

		return (
			<div className="v-live-room-discuss">
				{this.renderLatest()}
				<div>
					<div 
						className="_btn g-flex-cc g-pd-lr-5"
						onClick={this.handlePopDiscuss}
					>
						讨论 • {people_num}
					</div>
				</div>
			</div>
		);
	}
}

DiscussArea.contextTypes = {
	socket: PropTypes.object
};

export default DiscussArea;
