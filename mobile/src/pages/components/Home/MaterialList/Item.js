import React, { Component } from 'react';
export default class Item extends Component {
	handleSelect = () => {
		const { material_id } = this.props.itemData;
		this.props.actions.homeMaterialListSelect(material_id);
	}
	render() {
		const { selectArr, itemData, index } = this.props;
		const { title, material_id } = itemData;
		const is_select = selectArr.indexOf(material_id) > -1 ? 1 : 0;
		let selected = 'icon-yuanxingxuanzhong-fill';
		let no_selected = 'icon-yuanxingweixuanzhong';
		return (
			<div className="g-flex g-pd-15 g-ai-c g-bg-white " style={{ borderBottom: '0.5px solid #e5e5e5' }}>
				<i
					onClick={this.handleSelect}
					className={
						`iconfont 
						${!is_select ? no_selected : selected} 
						g-blue-middle 
						g-m-r-10`
					}
					style={{
						fontSize: 18
					}}
				/>
				<div className="g-col"
					style={{
						fontSize: 14
					}}
				>
					{`${index}. ${title}`}
				</div>
			</div>
		);
	}
}
