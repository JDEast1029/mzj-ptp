import React, { Component } from 'react';
import { Icon, message } from 'antd';
import { PGallery, Editor } from 'wya-rc';
import SelectAudio from '@components/_common/SelectAudio/SelectAudio';
import AudioItem from './AudioItem';
import ImageItem from './ImageItem';
import { formatRaw } from './utils';
import pureRender from 'pure-render-decorator';

const initRaw = {
	"blocks": [{
		"key": "180fu",
		"text": "helle world",
		"type": "unstyled",
		"depth": 0,
		"inlineStyleRanges": [],
		"entityRanges": [],
		"data": {}
	}],
	"entityMap": {}
};

const initRtf = {
	"html": "<p></p>",
	"raw": {
		"blocks": [{
			"key": "d6gtc",
			"text": "",
			"type": "unstyled",
			"depth": 0,
			"inlineStyleRanges": [],
			"entityRanges": [],
			"data": {}
		}],
		"entityMap": {}
	}
};

const extendAtomics = [
	{
		type: "CUSTOM_AUDIO",
		component: AudioItem
	},
	{
		type: "CUSTOM_IMAGE",
		component: ImageItem
	}
];

const transSeconds = (seconds) => {
	let duration = parseInt(seconds);
	if (duration) {
		if (duration >= 60) {
			let minutes = parseInt(duration / 60);
			let seconds = duration % 60;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			return minutes + '分' + seconds + '秒';
		} else if (duration < 60 && duration >= 10) {
			return duration + '秒';
		} else if (duration < 10 && duration >= 0) {
			return '0' + duration + '秒';
		}
	}
	return '';
};

@pureRender
class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rtf: props.content,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.content && !this.props.content) {
			this.setState({
				rtf: nextProps.content
			});
		}
	}

	getImageCount = () => {
		const { viewData } = this.props;
		let count = 0;
		for (let i = 0; i < viewData.length; i++) {
			if (viewData[i].type === 'CUSTOM_IMAGE') {
				count += 1;
			}
		}

		return count;
	};

	getAudioCount = () => {
		const { viewData } = this.props;
		let count = 0;
		for (let i = 0; i < viewData.length; i++) {
			if (viewData[i].type === 'CUSTOM_AUDIO') {
				count += 1;
			}
		}

		return count;
	};

	getOtherControls = () => {
		let selectedImageCount = this.getImageCount();
		let selectedAudioCount = this.getAudioCount();

		if (selectedImageCount >= 50) {
			message.warn('最多只能上传50张图片素材');
			return;
		}

		if (selectedAudioCount >= 20) {
			message.warn('最多只能上传20条音频素材');
			return;
		}

		return [
			{
				type: 'button',
				text: <Icon type="upload"/>,
				onClick: () => {
					PGallery.popup({
						title: '我的素材',
						max: 50 - selectedImageCount,
					}).then((res) => {
						res.forEach(item => {
							this.editor && this.editor.insertMedias([
								{
									type: 'CUSTOM_IMAGE',
									name: 'ImageItem',
									url: item.file_url.replace(/!4-4/g, '')
								}
							]);
						});
					}).catch((res) => {

					});
				}
			},
			{
				type: 'button',
				text: <i className="iconfont icon-audio"/>,
				onClick: () => {
					SelectAudio.popup({
						max: 20 - selectedAudioCount,
						getDetail: true
					}).then((res) => {
						res.forEach(item => {
							let audio = new Audio();
							audio.src = item.file_url;
							audio.load();
							audio.oncanplay = () => {
								this.editor && this.editor.insertMedias([
									{
										type: 'CUSTOM_AUDIO',
										name: 'AudioItem',
										url: item.file_url,
										meta: { ...item, duration: transSeconds(audio.duration) }
									}
								]);
							};
							audio.onerror = () => {
								message.info('音频加载失败,请重新选择');
							};
						});
					}).catch((res) => {

					});
				}
			}
		];
	};

	handleRawChange = (raw) => {
		const { onChange } = this.props;
    	const { rtf } = this.state;
    	const newRtf = {
    		...rtf,
    		raw,
    	};
    	this.setState({
    		rtf: newRtf,
		});

		let oldRtf = { ...rtf };

		if (JSON.stringify(oldRtf) !== JSON.stringify(newRtf)) {
			onChange && onChange({ content: newRtf, viewData: formatRaw(raw) });
		}
	};

	render() {
		const { showOtherControls = true, disabled } = this.props;
		const { rtf } = this.state;
		const { raw } = typeof rtf === 'string' ? JSON.parse(rtf) : (rtf || {});
		let otherControls = showOtherControls ? this.getOtherControls() : [];

		return (
			<Editor
				ref={(ref) => this.editor = ref}
				style={{ width: 690, minHeight: 500 }}
				className="g-border-gray"
				placeholder="请输入素材内容"
				disabled={disabled}
				controls={[]}
				imageControls={{
					floatLeft: false,
					floatRight: false,
					alignLeft: false,
					alignCenter: false,
					alignRight: false,
					link: false,
					size: false
				}}
				extendAtomics={extendAtomics}
				showGallery={false}
				extendControls={otherControls}
				initialContent={typeof raw === 'string' ? JSON.parse(raw) : raw}
				onRawChange={this.handleRawChange}
			/>
		);
	}
}

export default Content;
