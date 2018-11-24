import React, { Component } from 'react';
import './Item.scss';
import { getHashUrl } from '@utils/utils';
class Item extends Component {
	// 
	handleJump = (user_id) => {
		const { query: { community_id }, } = this.props;
		_global.history.push(
			getHashUrl('/home/member/detail', { community_id, user_id })
		);
	}
	render() {
		const { itemData = {} } = this.props;
		const {
			avatar,
			user_id,
			nick_name,
			role
		} = itemData;
		return (
			<div className="v-home-member-item g-flex g-jc-sb g-ai-c">
				<div className="g-flex">
					<img
						src={avatar}
						alt=""
						className="g-avatar g-m-r-15"
						style={{ flexShrink: 0 }}
						onClick={this.handleJump.bind(this, user_id)}
					/>
					<div className="g-width g-fs-14 g-black-333 _title">{nick_name}</div>
				</div>
				{
					role == 9
						? <div className="g-orange-dark">
							<i className="iconfont icon-qunzhuhuangguan g-m-r-5" />
							群主
						</div>
						: ''
				}
				{
					role == 2
						? <div className="g-orange-dark">
							<i className="iconfont icon-guanliyuan" style={{ marginRight: 2 }} />
							管理员
						</div>
						: ''
				}

			</div>
		);
	}
}
export default Item;