import React, { Component } from 'react';

export default class Audio extends Component {
	constructor(params) {
		super(params);
		// this.state = {
		// 	is_play: false
		// };
	} 
	// handleClick = () => {
	// 	if (this.state.is_play){
	// 		this.audio.pause();
	// 	} else {
	// 		this.audio.play();
	// 	}
	// 	this.setState({
	// 		is_play: !this.state.is_play
	// 	});
	// }

	shouldComponentUpdate(nextProps) {
		if (nextProps.info.is_play == this.props.info.is_play){
			return false;
		}
		return true;
	}
	componentDidUpdate(){
		const { is_play = false } = this.props.info;
		if (is_play){
			this.audio.play();
		} else {
			this.audio.pause();
		}
	}
	handleClick = () => {
		const { material_id, info: { meta }, index } = this.props;
		const { audio_id } = meta;
		this.props.actions.materialDetailAudioChange({ material_id, audio_id, index });
	}
	render() {
		const { meta: { file_url, name }, is_play = false } = this.props.info;
    	// const { is_play } = this.state;
    	return (
    		<div className="_audio">
    			<div className="g-flex _audio-main">
    				<i className={`g-m-r-10 iconfont ${!is_play ? 'icon-start' : 'icon-pause'}`}  onClick={this.handleClick}/>
    				<p className="g-col">{name}</p>
    				<audio src={file_url} ref={val => this.audio = val} style={{ display: 'none' }}/>
    			</div>
    		</div>
    	);
	}
}
