import React, { Component } from 'react';
import { Button } from 'antd';

class Item extends Component {

	handleClick = () => {
    	const { itemData = {}, onSelect, selectArr } = this.props;
    	const { category_id } = itemData;
		const show = selectArr.includes(category_id);
		onSelect && onSelect(!show, category_id, itemData);
	};

	render() {
		const { itemData = {}, selectArr, activeText, staticText } = this.props;
		const { name, category_id, order } = itemData;
		const show = selectArr.includes(category_id);
		const btnText = show ? activeText : staticText;

		return (
			<tr>
				<td style={{ width: 100 }}>
					{order}
				</td>
				<td className="g-tl">
					{name}
				</td>
				<td>
					<Button
						className={`${ show ? 'gp-btn-blue' : ''}`}
						onClick={this.handleClick}
					>
						{btnText}
					</Button>
				</td>
			</tr>
		);
	}
}

export default Item;
