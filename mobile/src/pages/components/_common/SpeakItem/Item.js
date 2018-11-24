import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import pureRender from 'pure-render-decorator';
import ImageItem from './ImageItem';
import VoiceItem from './VoiceItem';
import TextItem from './TextItem';
import MaterialItem from './MaterialItem';
import './Styles.scss';

window.audioNodes = {};

@pureRender
class Item extends Component {

	componentDidMount() {
		const { itemData = {}, canIntoView } = this.props;
		// 如果是音频则将其存入audioNodes中
		if (itemData.msg_type == 2) {
			window.audioNodes = {
				...window.audioNodes,
				[itemData.chat_id]: this.voiceItem
			};
		}
		canIntoView && this.handleScrollIntView();
	}

	componentDidUpdate() {
		const { itemData = {} } = this.props;
		if (itemData.msg_type == 2) {
			// hack
			// 发送消息或者撤回等导致Item重绘的操作，回使refs变为空Object
			// 所以重新给audioNodes赋值
			window.audioNodes = {
				...window.audioNodes,
				[itemData.chat_id]: this.voiceItem
			};
		}
	}

	handleScrollIntView = () => {
		setTimeout(() => {
			this.chatItem.scrollIntoView();
		}, 50);
	}

	// 群聊点击头像跳转到详情
	handleClickAvatar = () => {
		const { itemData = {}, isLive = false } = this.props;
		const { community_id, user_id } = itemData;
		if (!isLive) {
			_global.history.push(`/home/member/detail?community_id=${community_id}&user_id=${user_id}`);
		}
	}

	renderItem = () => {
		const { 
			itemData = {}, audioChats, isLive = false, 
			isSelf = false, imgs, onCanChangeTab 
		} = this.props;
		const { msg_type, msg, msg_url, duration, chat_id, msg_id, role, create_time } = itemData;

		switch (parseInt(msg_type)) {
			case 0:
				return (
					<TextItem 
						content={msg} 
						isSelf={isSelf}
						isLive={isLive}
					/>
				);
			case 1:
				return (
					<ImageItem 
						src={msg_url} 
						isSelf={isSelf}
						imgs={imgs} 
					/>
				);
			case 2:
				return (
					<VoiceItem 
						ref={(ref) => this.voiceItem = ref}
						src={msg_url}
						isLive={isLive}
						duration={duration}
						isSelf={isSelf}
						audioChats={audioChats}
						playedId={chat_id}
						onCanChangeTab={onCanChangeTab}
					/>
				);
			case 3:
				return (
					<MaterialItem 
						content={msg} 
						isSelf={isSelf}
						material_id={msg_id}
						create_time={create_time}
						role={role}
					/>
				);
			default:
				return null;
		}
	}

	render() {
		const { itemData = {}, isSelf, showRole = false, role_name, showTime } = this.props;
		const { 
			avatar,
			nick_name,
			create_time
		} = itemData;

		return (
			<Fragment>
				{showTime && <div className="g-tc g-black-light1">{create_time}</div>}
				<div 
					ref={ref => this.chatItem = ref}
					className={`c-speak-container c-item-${!isSelf ? 'left' : 'right'}`}>
					{!isSelf &&
						<div className="g-tc g-pd-lr-10">
							<div className="_avatar" onClick={this.handleClickAvatar}>
								<img src={avatar} />
							</div>
						</div>
					}

					<div className={`_msg ${isSelf ? 'g-tr' : 'g-tl'}`}>
						<div className={`g-fs-12 g-m-tb-5 ${isSelf ? 'g-tr' : ''}`}>
							{!isSelf ? showRole && role_name && <span className="g-m-r-5 __tip">{role_name}</span> : nick_name}
							{isSelf ? showRole && role_name && <span className="g-m-l-5 __tip">{role_name}</span> : nick_name}
						</div>
						{this.renderItem()}
					</div>

					{isSelf &&
						<div className="g-tc g-pd-lr-10">
							<div className="_avatar" onClick={this.handleClickAvatar}>
								<img src={avatar} />
							</div>
						</div>
					}
				</div>
			</Fragment>
		);
	}
}

export default Item;
