import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';

class Item extends Component {
	constructor(props, text) {
		super(props, text);

		const { activeText, staticText, selectArr, itemData = {} } = props;
		const {
			category_id
		} = itemData;
		const show = selectArr.includes(category_id);
		this.state = {
			show,
			btnText: show ? activeText : staticText
		};
	}
	componentWillReceiveProps = (nextProps) => {
		const { activeText, staticText } = this.props;
		const { category_id } = this.props.itemData;
		const show = nextProps.selectArr.includes(category_id);
		if (show != this.state.show) {
			this.setState({
				show,
				btnText: show ? activeText : staticText
			});
		}
	}
	handleClick = () => {
		const { itemData = {}, onSelect, selectArr, activeText, staticText, onlyOne = true } = this.props;
		const { category_id } = itemData;
		const show = selectArr.includes(category_id);
		message.destroy();
		if (selectArr.length == 1 && !show && onlyOne) {
			message.error('最多只能选取一个');
			return;
		}
		onSelect && onSelect(!show, category_id, itemData, () => {
			this.setState({
				show: !show,
				btnText: !show ? activeText : staticText
			});
		});
	}

	render() {
		const { 
			itemData = {}, 
			onClick, 
			activeText, 
			staticText, 
			disableText, 
			disableArr, 
			selectArr
		} = this.props;
		const {
			order,
			name,
			category_id
		} = itemData;
		return (
			<tr className="g-c-dark wp-select-agent">
				<td className="g-tl">
					{order}
				</td>
				<td className="g-tl">
					{name}
				</td>
				<td >
					<div className="__item __jc-c">
						{
							disableArr.indexOf(category_id) > -1 ?
								<div 
									style={{ width: '72px', lineHeight: '34px', height: '34px' }}
									className="gp-btn-disable"
								>
									{disableText}
								</div>
								:
								<div
									style={{ width: '72px', padding: 0 }}
									onClick={this.handleClick}
									className={`${this.state.show ? 'gp-btn-blue' : 'gp-btn-white'} g-pointer`}
								>{this.state.btnText}</div>
						}
					</div>
				</td>
			</tr>
		);
	}
}

export default Item;
