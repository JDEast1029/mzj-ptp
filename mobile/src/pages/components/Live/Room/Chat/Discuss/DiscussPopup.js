import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/live';
import * as types from '@constants/actions/live';

import ScrollList from './ScrollList';
import SendText from '../../ChatTools/SendText';

class DisscussPopup extends Component {

	handleClose = () => {
		const { onClose, actions } = this.props;
		actions.clearDiscussList();
		onClose && onClose();
	}

	render() {
		const { actions, liveRoomDiscuss, liveRoomOther, room_id } = this.props;
		const { discussInfo = {} } = liveRoomDiscuss;
		const { userInfo, roomInfo } = liveRoomOther;
		const { totalCount } = discussInfo;
		const { user_type } = userInfo;
		let isAudience = user_type == 1;

		return (
			<div className="g-flex g-fd-c" style={{ height: '85vh' }}>
				<div 
					className="g-flex-cc g-c-white g-fs-16" 
					style={{ marginBottom: 18 }}
					onClick={this.handleClose}
				>
					<i className="iconfont icon-close g-fs-18" />
					收起列表
				</div>
				<div className="g-bg-white g-col g-flex g-fd-c">
					<div className="g-black-light1 g-pd-10 g-flex-ac g-bb">
						<i className="iconfont icon-discuss g-fs-18" /> 
						<span className="g-black-middle g-fs-14 g-m-l-10">
							讨论（{totalCount}）
						</span>        
					</div>
					<ScrollList 
						actions={actions}
						room_id={room_id}
						listInfo={discussInfo}
					/>
					<SendText  
						autoFocus={false}
						isForbid={roomInfo.speak_forbid && user_type == 1}
						userInfo={userInfo}
						room_id={room_id}
						type={2} // 讨论中的输入框
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		liveRoomDiscuss: state.liveRoomDiscuss,
		liveRoomOther: state.liveRoomOther
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DisscussPopup);
