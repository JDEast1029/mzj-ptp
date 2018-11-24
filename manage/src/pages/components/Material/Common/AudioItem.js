import React, { PureComponent } from 'react';
import './Styles.scss';

class AudioItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isPlay: 0
		};
		this.audio = null;
	}

	handleMouseOver = () => {
		this.props.editor && this.props.editor.setEditorProp('readOnly', true);
	};

	handleMouseLeave = () => {
		this.props.editor && this.props.editor.setEditorProp('readOnly', false);
	};

	handleClick = (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (this.audio) {
			if (this.audio.paused || this.audio.ended) {
				window[`audio_${_global.version}`] && window[`audio_${_global.version}`].pause();
				window[`audioItem_${_global.version}`] && window[`audioItem_${_global.version}`].handleChangePlayState(0);
				
				window[`audioItem_${_global.version}`] = this;
				window[`audio_${_global.version}`] = this.audio;

				window[`audio_${_global.version}`].play();
				window[`audioItem_${_global.version}`].handleChangePlayState(1);
			} else {
				this.audio.pause();
				this.handleChangePlayState(0);
			}
		}
	};

	handleError = () => {
		if (this.audio) {
			this.audio.pause();
			this.handleChangePlayState(0);
		}
	};

	handleEnded = () => {
		this.handleChangePlayState(0);
	};

	handleChangePlayState = (playState) => {
		this.setState({ isPlay: playState });
	};

	render() {
		const { url, meta = {} } = this.props.mediaData || {};
		const { name } = meta;
		const { isPlay } = this.state;

		return (
			<div
				className="g-border-gray-dark g-pd-lr-15 g-pd-tb-10 g-flex-ac g-m-b-15 g-fs-14 c-audio-item"
				onMouseOver={this.handleMouseOver}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="g-relative _img-container">
					<img/>
					<audio
						ref={(audio) => this.audio = audio}
						src={url}
						style={{ display: 'none' }}
						onError={this.handleError}
						onEnded={this.handleEnded}
					>
						您的浏览器不支持audio标签，建议用最新版的Chrome
					</audio>
					<div className="g-flex-cc __mask g-pointer">
						<i
							className={`iconfont ${isPlay ? 'icon-trumpet' : 'icon-play'} g-c-white g-fs-26`}
							onClick={this.handleClick}
						/>
					</div>
				</div>
				<div className="g-m-l-10">
					<div className="g-m-b-10">{name}</div>
					<div>{meta.duration}</div>
				</div>
			</div>
		);
	}
}

export default AudioItem;
