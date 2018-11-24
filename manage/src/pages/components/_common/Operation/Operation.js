import React, { Component } from 'react';
import { Radio, Button, message } from 'antd';
import * as types from '@constants/actions/setting';

class Operation extends Component {
	handleShow = () => {
		const { onShow } = this.props;
		onShow && onShow();
	}
	render() {
		const { qr_code } = this.props;
		return (
			<div className="g-m-t-20">
				<div className="g-flex g-fw-w g-ai-c g-jc-c" style={{ width: '100%', boxSizing: 'border-box' }}>
					<div className="g-flex g-fw-w g-ai-c g-jc-c g-m-t-30" onClick={this.handleShow}>
						<img style={{ width: 176, height: 'auto', display: 'block' }} src={qr_code} alt="" />
						<span className="g-width g-m-t-10 g-m-b-30 g-tc">扫一扫进入店铺</span>
					</div>
				</div>
				<div className="g-flex-ac g-jc-c" style={{ width: '100%', boxSizing: 'border-box' }}>
					<Button type="primary">
						<a href={qr_code} download="123.png">下载二维码</a>
					</Button>
				</div>
			</div>
		);
	}
}

export default Operation;

