import React, { Component, Fragment } from 'react';
import { Modal, Icon, message } from 'antd';

class Item extends Component {
	constructor(props, text) {
		super(props, text);

		const { activeText, staticText, selectArr, itemData = {} } = props;
		const {
			coupon_id
		} = itemData;
		const show = selectArr.includes(coupon_id);
		this.state = {
			play: false,
			show,
			btnText: show ? activeText : staticText
		};
	}
	// handleMouseLeave = () => {
	// 	const { itemData = {}, activeText, staticText, selectArr, onlyOne } = this.props;
	// 	const { coupon_id } = itemData;
	// 	const show = selectArr.includes(coupon_id);
	// 	if (selectArr.length == 1 && !show && onlyOne) {
	// 		message.error('最多只能选取一个');
	// 		return;
	// 	}
	// 	this.setState({
	// 		btnText: show ? activeText : staticText
	// 	});
	// }
	autoPlay = () =>  {
		if (!this.info) return;
		if (this.state.play){
			this.info.pause();
		} else {
			this.info.play();
		}
		this.setState({
			play: !this.state.play
		});
	}
    handleClick = () => {
    	const { itemData = {}, onSelect, selectArr, onlyOne, activeText, staticText, max } = this.props;
    	const { audio_id } = itemData;
    	const show = selectArr.includes(audio_id);
    	// if (selectArr.length == 1 && !show && onlyOne) {
    	// 	message.error('最多只能选取一个');
    	// 	return;
    	// }
    	if (max && !show && selectArr.length == max){
    		message.error(`最多只能选取${max}个`);
    		return;
    	}
    	onSelect && onSelect(!show, audio_id, itemData, () => {
    		this.setState({
    			show: !show,
    			btnText: !show ? '取消' : staticText
    		});
    	});
    }
	renderAudio = () => {
		const { play } = this.state;
		const { file_url, name } = this.props.itemData;
		return (<div className="g-flex g-ai-c">
			<div className="g-flex-cc" style={{ width: 66, height: 66, background: 'blue', flexShrink: 0 }}> 				
			    <a onClick={this.autoPlay} className={`iconfont ${play ? 'icon-trumpet' : 'icon-play'} g-c-white g-fs-30`} /> 
			</div>
			<span className="g-m-l-10">{name}</span>
			{
				<audio ref={val => this.info = val} src={file_url || "http://up.mcyt.net/?down/47674.mp3"}   id="myaudio" controls="controls" loop={false}  hidden="true" />
			}
		</div>
		);
		
	}
	handleDel = () => {
		const { onDel, itemData } = this.props;
		Modal.confirm({
			title: "确认删除该商品吗？",
			okText: '确定',
			cancelText: '取消',
			onOk: () => {
				onDel && onDel(itemData.audio_id);
			}
		});
	}
	render() {
    	const { itemData = {}, onClick, activeText, staticText, disableText, disableArr, selectArr } = this.props;

    	const {
			name,
			created_time,
			file_url,
			size,
			format
		} = itemData;
		const Audio = this.renderAudio();
    	return (
    		<tr className="g-c-dark wp-select-agent">
    			<td className="g-tl">
					{Audio}
    			</td>
				<td >
					{format}
    			</td>
				<td>
    				{size}M
    			</td>
				<td>
					{created_time}
				</td>
    			<td >
    				<div className="__item __jc-c">
    					<div
    						style={{ minWidth: '72px', lineHeight: '34px' }}
    						onClick={this.handleClick}
    						className={`${this.state.show ? 'gp-btn-blue' : 'gp-btn-white'} g-pointer`}
    					>{this.state.btnText}</div>
						<div
							style={{ width: '72px', lineHeight: '34px' }}
							onClick={this.handleDel}
							className={'gp-btn-white g-m-l-10'}
						>删除</div>
    				</div>
    			</td>
    		</tr>
    	);
	}
}

export default Item;
