import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MToasts } from 'wya-rc';
import TextInput from '@components/_common/ChatTools/TextInput';
import pureRender from 'pure-render-decorator';

@pureRender
class SendText extends Component {

	handleSend = (param) => {
		const { isForbid, room_id, userInfo, type } = this.props;
		const { socket, baseInfo } = this.context;
		let content = '';

		if (isForbid) { return; }

		if (typeof param === 'string') {
			content = param.trim();
		} else {
			content = this.textInput && this.textInput.state.content.trim() || '';
		}

		if (content.length == 0) {
			MToasts.info('消息不能为空', 1);
			return;
		}

		socket.emit('140', {
			// ...baseInfo,
			...userInfo,
			room_id,
			msg_type: '0',
			// user_type: userInfo.user_type,
			msg: content,
			type
		});

		this.textInput && this.textInput.initState();
	}

	render() {
		const { isForbid, userInfo = {}, autoFocus } = this.props;
		return (
			<div className="g-pd-tb-5 g-pd-lr-10 g-bg-white g-flex-ac v-live-room-text">
				{/* 在禁言状态且是观众时，显示全体禁言 */}
				<TextInput
					ref={ref => this.textInput = ref}
					isForbid={isForbid}
					onSend={this.handleSend}
					autoFocus={autoFocus}
				/>
				<div className="g-small-btn-blue g-flex-cc g-m-l-10" onClick={this.handleSend}>
					发送
				</div>
			</div>
		);
	}
}

SendText.contextTypes = {
	socket: PropTypes.object,
	baseInfo: PropTypes.object
};

export default SendText;