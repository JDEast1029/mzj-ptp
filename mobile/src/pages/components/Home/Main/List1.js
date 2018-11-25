import React, { Component } from 'react';
import Item from './Item';
import Wechat from './Wechat';

export default class List1 extends Component {
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


				<div className="g-m-t-20 g-tc">
					<p style={{ color: '#ADB2BC' }}>以上全部申请均未下款即可领取</p>
					<div className="g-flex-cc g-c-white g-fs-16" style={{ margin: '10px 40px 10px 40px', backgroundColor: '#EF0F00', borderRadius: 20, padding: '10px' }}>
						审批被拒领转运红包
					</div>
					<div className="g-flex-cc g-c-white g-fs-16" style={{ margin: '10px 40px 10px 40px', backgroundColor: '#2296F3', borderRadius: 20, padding: '10px' }}>
						更多新口子
					</div>
				</div>
				<Wechat />
			</div>
		);
	}
}
