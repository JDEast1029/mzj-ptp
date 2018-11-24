import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import wx from 'weixin-js-sdk';
import './Styles.scss';

@pureRender
class ImageItem extends Component {

	handleClick = () => {
		const { imgs } = this.props;
		wx.previewImage({
			current: this.props.src, // 当前显示图片的http链接
			urls: imgs,    // 需要预览的图片http链接列表
		});
	}

	render() {
		return (
			<div className="c-chat-item-image">
				<img 
					onClick={this.handleClick} 
					src={this.props.src} 
					alt="" 
				/>
			</div>
		);
	}
}

export default ImageItem;