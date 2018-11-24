import React, { Component } from 'react';

class Item extends Component {
	render() {
		const { name = '', img = '' } = this.props.itemData;
		return (
			<div className="v-invite-main-item g-flex g-ai-c">
				<img src={img} alt="" className="g-avatar g-m-r-15" style={{ flexShrink: 0 }} />
				<div className="g-width g-fs-14 g-black-333 _title">{name}</div>
			</div>
		);
	}
}
export default Item;