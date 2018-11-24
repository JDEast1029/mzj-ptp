import React, { Component, Fragment } from 'react';
import { Checkbox, Divider } from 'antd';
import { Authorized } from 'wya-rc';

class Item extends Component {
	constructor(props) {
		super(props);
	}

	// 社群调整
	handleGetAdjust = (data) => {
		const { onAdjust } = this.props;
		onAdjust && onAdjust(data);
	}

	// 禁言
	handleGetBan = (data) => {
		const { onBan } = this.props;
		onBan && onBan(data);
	}

	render() {
		const { itemData = {}, rowSelection } = this.props;
		const {
			user_id,
			number,
			user_sn,
			nick_name,
			community_num,
			create_time
		} = itemData;
		return (
			<tr key={user_id} className="g-c-dark">
				<td>
					<Checkbox
						disabled={rowSelection.disabled}
						checked={rowSelection.checked}
						onChange={rowSelection.onChange}
					/>
				</td>
				<td>{number}</td>
				<td>{user_sn}</td>
				<td>{nick_name}</td>
				<td>{community_num}</td>
				<td>{create_time}</td>
				<td className="g-tl">
					<span
						className="gp-btn-simple-blue"
						onClick={this.handleGetAdjust.bind(this, { user_id, user_sn, nick_name })}
					>社群调整</span>
					<Authorized
						auth={[Number(community_num)]}
						style={{ display: 'inline-block' }}
					>
						<Divider type="vertical" />
						<span
							className="gp-btn-simple-blue"
							onClick={this.handleGetBan.bind(this, { user_id, user_sn, nick_name })}
						>禁言设置</span>
					</Authorized>
				</td>
			</tr>
		);
	}
}
export default Item;
