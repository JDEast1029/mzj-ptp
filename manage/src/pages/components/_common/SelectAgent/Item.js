import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';

class Item extends Component {
	constructor(props, text) {
		super(props, text);

		const { activeText, staticText, selectArr, itemData = {} } = props;
		const {
			user_id
		} = itemData;
		const show = selectArr.includes(user_id);
		this.state = {
			show,
			btnText: show ? activeText : staticText
		};
	}
	componentWillReceiveProps = (nextProps) => {
		const { activeText, staticText } = this.props;
		const { user_id } = this.props.itemData;
		const show = nextProps.selectArr.includes(user_id);
		if (show != this.state.show) {
			this.setState({
				show,
				btnText: show ? activeText : staticText
			});
		}
	}
	handleClick = () => {
		const { itemData = {}, onSelect, selectArr, activeText, staticText, onlyOne = true } = this.props;
		const { user_id } = itemData;
		const show = selectArr.includes(user_id);
		message.destroy();
		if (selectArr.length == 1 && !show && onlyOne) {
			message.error('最多只能选取一个');
			return;
		}
		onSelect && onSelect(!show, user_id, itemData, () => {
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
			number,
			user_id,
			user_sn,
			nick_name
		} = itemData;
		return (
			<tr className="g-c-dark wp-select-agent">
				<td className="g-tl">
					{number}
				</td>
				<td>
					{user_sn}
				</td>
				<td>
					{nick_name}
				</td>
				<td >
					<div className="__item __jc-c">
						{
							disableArr.indexOf(user_id) > -1 ?
								<div 
									style={{ lineHeight: '34px', height: '34px' }}
									className="gp-btn-disable"
								>
									{disableText}
								</div>
								:
								<div
									style={{ lineHeight: '34px', height: '34px' }}
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
