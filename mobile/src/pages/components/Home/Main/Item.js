import React, { Component } from 'react';

export default class Item extends Component {
	render() {
		return (
			<div className="v-list-item g-flex">
				<img />
				<div className="g-m-l-10 g-flex g-fd-c g-jc-sa g-col">
					<div className="g-flex">
						<div className="g-col">
							<span className="g-fs-16 g-m-r-5">金手指</span>
							<span className="_recommend g-m-r-5">推荐</span>
							<span className="_new">New</span>
						</div>
						<div className="g-flex-ac g-fs-12 g-m-r-10" style={{ color: '#979797' }}>
							点击申请
							<i className="iconfont icon-right g-m-l-5" style={{ color: '#DBDBDB' }} />
						</div>
					</div>
					<p className="g-fs-12 g-oneline" style={{ color: '#979797' }}>
						嘻嘻嘻嘻嘻嘻嘻嘻寻寻嘻嘻嘻嘻嘻嘻嘻嘻寻寻
					</p>
				</div>
				<div className="_divider-line" />
			</div>
		);
	}
}
