import React, { Component, Fragment } from 'react';
import { Popover, Modal } from 'antd';
import './Card.scss';
import { Authorized } from 'wya-rc';

class Card extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			visiblePop: false
		};
	}

	handleEdit = (lecturer_id) => {
		this.setState({
			visiblePop: false
		}, () => {
			const { onEdit } = this.props;
			onEdit && onEdit({ type: 2, lecturer_id });
		});
	}

	handleDel = (lecturer_id) => {
		this.setState({
			visiblePop: false
		}, () => {
			const that = this;
			Modal.confirm({
				title: '确认删除该讲师?',
				content: '删除后不可恢复，请谨慎操作！',
				okText: '删除',
				cancelText: '取消',
				onOk() {
					const { onDel } = that.props;
					onDel && onDel({ lecturer_id });
				},
				onCancel() {
				},
			});
		});
	}

	handleLeave = (e) => {
		if (this.button) {
			this.button.blur();
		}
	}

	render() {
		const { visiblePop } = this.state;
		const { item = {} } = this.props;
		const {
			lecturer_id,
			user_id,
			shop_id,
			avatar,
			email,
			lecturer_name,
			introduce,
			qr_code,
			phone,
			sex,
			wechat
		} = item;
		const content = (
			<Fragment>
				<div onClick={() => this.handleEdit(lecturer_id)} className="g-pointer">
					<i className="iconfont icon-edit g-m-r-5" />
					编辑
				</div>
				<div onClick={() => this.handleDel(lecturer_id)} className="g-pointer">
					<i className="iconfont icon-delete g-m-r-5" />
					删除
				</div>
			</Fragment>
		);
		return (
			<div className="v-live-lecturer-card g-relative" onMouseLeave={this.handleLeave}>
				<div
					style={{
						background: `url(${avatar}) no-repeat center`,
						backgroundSize: 'cover'
					}}
					className="_avatar"
				/>
				<div className="g-width g-tc g-m-t-5">{lecturer_name}</div>
				<div className="g-width g-tc">{sex}</div>
				<ul className="g-pd-t-20">
					<li className="g-m-b-5">
						<i className="iconfont icon-mobile g-m-r-5 g-black-light" />
						{phone || '电话暂无'}
					</li>
					<li className="g-m-b-5">
						<i className="iconfont icon-email g-m-r-5 g-black-light" />
						{email || '邮箱暂无'}
					</li>
					<li className="g-m-b-5">
						<i className="iconfont icon-wechat g-m-r-5 g-black-light" style={{ marginLeft: '-3px' }} />
						{wechat || '微信暂无'}
					</li>
				</ul>
				<Authorized auth={[qr_code]}>
					<div className="g-width g-flex g-jc-sa g-pd-b-30">
						<button className="_btn" ref={(val) => this.button = val}>
							{/* 便于使用css的focus事件 */}
							<div className="_erweima-bg"> {/* 白边 */}
								<div
									className="_erweima-xs g-pointer"
									style={{
										background: `url(${qr_code}) no-repeat center`,
										backgroundSize: 'cover'
									}}
								/>
							</div>
						</button>
					</div>
				</Authorized>
				<div className="g-tr g-width _operate">
					<Popover
						visible={visiblePop}
						content={content}
						trigger="click"
						placement="topRight"
						onVisibleChange={() => this.setState({ visiblePop: !visiblePop })}
					>
						<i
							className="iconfont icon-more g-pointer g-fs-20"
							onClick={() => this.setState({ visiblePop: true })}
						/>
					</Popover>
				</div>

			</div>
		);
	}
}
export default Card;