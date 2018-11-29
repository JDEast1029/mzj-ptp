import React, { Component } from 'react';
import MPopup from '@components/_common/MPopup/MPopup';
import PopContent from './PopContent';

export default class Wechat extends Component {

	handlePopup = () => {
		MPopup.popup({
			parent: this,
			orientation: 'bottom',
			content: (
				<PopContent />
			)
		}).then((res) => {

		}).catch((error) => {
			
		});
	}

	render() {
		return (
			<div className="g-flex-cc" style={{ height: 60, color: '#62C45A' }} onClick={this.handlePopup}>
				<i className="iconfont icon-weixin g-fs-30"/>
				<span className="g-fs-18 g-m-l-10">答疑客服</span>
			</div>
		);
	}
}
