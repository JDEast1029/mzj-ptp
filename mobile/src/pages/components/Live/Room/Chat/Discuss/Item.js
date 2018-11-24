import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
class Item extends Component {
	render() {
		const { itemData = {} } = this.props;

		return (
			<div className="g-flex v-discuss-item g-pd-tb-10 g-pd-lr-15 g-bb">
				<div className="_avatar g-m-r-5">
					<img src={itemData.avatar} />
				</div>
				<div className="g-black-middle g-fs-12">
					<div className="g-fs-14 g-black-dark">{itemData.nick_name}</div>
					<div className="g-black-light1">{itemData.create_time}</div>
					<div className="g-break-word">{itemData.msg}</div>
				</div>
			</div>
		);
	}
}

export default Item;
