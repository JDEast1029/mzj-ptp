import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import playAudio from './Utils/AudioPlayer';
import './Styles.scss';

@pureRender
class VoiceItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false
		};
	}

	componentDidMount() {
		document.addEventListener('touchstart', this.handleAudioPlay, false); // touchstart会先于click事件被触发
		document.addEventListener('click', this.handleAudioPlay, true); // 用事件捕获，事件触发从父到子
	}

	handleAudioPlay = () => {
		if (!window.XQBAudio.isAudio) {
			window.XQBAudio.isAudio = true;
			window.XQBAudio.audio = new Audio();
			document.removeEventListener('touchstart', this.handleAudioPlay, false);
			document.removeEventListener('click', this.handleAudioPlay, true);
		}
	}

	handleControl = () => {
		const { isPlaying } = this.state;
		// if (isPlaying) {
		// 	this.handleStopPlay();
		// } else {
		// 	this.handleStartPlay();
		// }
		const {
			playedId,  // 正在播放的audio id
			audioChats,
			onCanChangeTab
		} = this.props;

		if (onCanChangeTab && onCanChangeTab()) {
			let index = audioChats.findIndex((item) => item.content_id === playedId);
			playAudio(audioChats, index, playedId);
		}
	}

	/**
	 * 对Audio实例的操作
	 */
	handleStart = () => {
		this.setState({
			isPlaying: true
		});
	}
	handlePause() {
		this.setState({
			isPlaying: false
		});
	}
	handleEnd(ev) {
		const {
			playedId,
			audioChats
		} = this.props;

		let index = audioChats.findIndex((item) => item.chat_id === playedId);
		if (index !== -1 && index < audioChats.length - 1) {
			playAudio(audioChats, index + 1, audioChats[index + 1].chat_id);
		}
	}
	handlePlaying() {
		const {
			audio,
			progress,
			dot
		} = this.refs;
		const {
			duration = 0
		} = this.props;
		let currentTime = Math.min(window.XQBAudio.audio.currentTime, duration);

		const per = parseFloat((currentTime / duration * 100).toFixed(2));

		progress.style.width = per + '%';
		dot.style.left = per + '%';
	}

	render() {
		const { isSelf, isLive, duration = 0 } = this.props;
		const  { isPlaying } = this.state;
		const width = 60 + 90 * duration / 60;

		if (!isSelf) {
			return (
				<div className={`c-chat-item-voice g-flex-ac ${isLive ? 'g-bg-green-middle g-c-white' : 'g-bg-white g-black-333'}`}>
					<i 
						className={`iconfont icon-${!isPlaying ? 'start' : 'pause2'} g-fs-24`} 
						onClick={this.handleControl}
					/>
	
					<div className="_progress g-col" style={{ width: width }}>
						<span ref="progress" className={`__complete ${isLive && '__complete-self'}`} />
						<i ref="dot" className={`__dot ${isLive && '__is-self'}`} />
					</div>
	
					<span>{duration}''</span>
				</div>
			);
		}

		return (
			<div className={`c-chat-item-voice g-flex-ac g-bg-green-middle g-c-white`}>
				<span>{duration}''</span>
				<div className="_progress _progress-self g-col" style={{ width: width }}>
					<span ref="progress" className="__complete __complete-self" />
					<i ref="dot" className="__dot __is-self" />
				</div>
				
				<i 
					className={`iconfont icon-${!isPlaying ? 'start' : 'pause2'} g-fs-24`} 
					onClick={this.handleControl}
				/>
			</div>
		);
	}
}

export default VoiceItem;