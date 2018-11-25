import React, { Component } from 'react';
import Item from './Item';
import Wechat from './Wechat';
export default class List2 extends Component {
	render() {
		return (
			<div className="g-bg-white">
				<div>
					xxx
				</div>
				<div className="g-flex-ac">
					<div className="g-col" style={{ backgroundColor: '#F4F4F4', height: 1 }} />
					<span className="g-m-lr-10" style={{ fontSize: 13, color: '#E7A683' }}>第1组</span>
					<div className="g-col" style={{ backgroundColor: '#F4F4F4', height: 1 }} />
				</div>
				<Item />
				
				<Item />

				<Wechat />
			</div>
		);
	}
}
