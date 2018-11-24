import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';

class Item extends Component {
	constructor(props, text) {
		super(props, text);

		const { activeText, staticText, selectArr, itemData = {} } = props;
		const {
			material_id
		} = itemData;
		const show = selectArr.includes(material_id);
		this.state = {
			show,
			btnText: show ? activeText : staticText
		};
	}
	componentWillReceiveProps = (nextProps) => {
		const { activeText, staticText } = this.props;
		const { material_id } = this.props.itemData;
		const show = nextProps.selectArr.includes(material_id);
		if (show != this.state.show) {
			this.setState({
				show,
				btnText: show ? activeText : staticText
			});
		}
	}
	handleClick = () => {
		const { itemData = {}, onSelect, selectArr, activeText, staticText, onlyOne = true } = this.props;
		const { material_id } = itemData;
		const show = selectArr.includes(material_id);
		message.destroy();
		if (selectArr.length == 1 && !show && onlyOne) {
			message.error('最多只能选取一个');
			return;
		}
		onSelect && onSelect(!show, material_id, itemData, () => {
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
			title,
			material_id
		} = itemData;
		return (
			<tr className="g-c-dark wp-select-agent">
				<td className="g-tl">
					{order}
				</td>
				<td className="g-tl">
					{title}
				</td>
				<td >
					<div className="__item __jc-c">
						{
							disableArr.indexOf(material_id) > -1 ?
								<div 
									style={{ width: '72px', lineHeight: '34px', height: '34px' }}
									className="gp-btn-disable"
								>
									{disableText}
								</div>
								:
								<div
									style={{ width: '72px', lineHeight: '34px', height: '34px' }}
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
