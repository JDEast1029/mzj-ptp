import React, { Component } from 'react';
import { MTouch } from 'wya-rc';
import './Item.scss';
import * as types from '@constants/actions/mine';
export default class Item extends Component {
	constructor(params) {
		super(params);
		this.state = {
			is_show: false
		};
	}
	handleSelect = () => {
		const { community_id } = this.props.itemData;
		this.props.actions.materialShareSelect(community_id);
		
	}
	handleSwipeRight = (e) => {
		this.setState({
			is_show: true
		});
	}
	handleSwipeLeft = (e) => {
		this.setState({
			is_show: false
		});
	}
	handleClick=() => {
		const { material_id } = this.props.itemData;
		const url = types.MINE_COLLECT_DEL_POST;
		const param = { material_id };
		const params = {
			param,
			ajaxType: 'POST',
			onSuccess: () => {
				MTouch.info('已取消收藏');
			},
			onError: () => {

			}
		};
		this.props.actions.request(url, params, {});
	}
	handleTo = () => {
		_global.history.push(`/material/detail?material_id=${this.props.itemData.material_id}`);
	}
	render() {
		const { selectArr, itemData, index } = this.props;
		const { order, title, material_num } = itemData;
		const { is_show } = this.state;
		return (
			<MTouch
				onSwipeRight={this.handleSwipeRight}
				onSwipeLeft={this.handleSwipeLeft}
			>
				<div className="g-flex g-ai-c g-bg-white" onClick={this.handleTo}>
					<div className="g-pd-15 g-col">{`${order}. ${title}`}</div>
					<div 
						className={`_btn ${is_show ? '_show' : '_hide'}`} 
						onClick={this.handleClick}
					>删除</div>
				</div>
			</MTouch>
		);
	}
}
