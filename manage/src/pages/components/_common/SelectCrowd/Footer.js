import React, { Component, Fragment } from 'react';
export default class Footer extends Component {
	render() {
		const { invite, message } = this.props;
		return (
			<div className="g-flex g-fd-rr g-pd-20">
				{
					invite
						? <button
							onClick={this.props.onHandleSave}
							className="gp-btn-blue"
						>生成邀请链接</button>
						: <Fragment>
							<button
								onClick={this.props.onHandleSave}
								className="gp-btn-blue"
							>确定</button>
							<button
								className="gp-btn-white g-m-r-20"
								onClick={this.props.onHandleClose}
							>取消</button>
							{
								message && <p className="g-c-gray g-m-r-20">将以社群群主身份发送此条信息</p>
							}
						</Fragment>
				}
			</div>
		);
	}
}
