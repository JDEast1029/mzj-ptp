import React, { Component, Fragment } from 'react';
class Footer extends Component {
	handleEnter = () => {
		const { onClick } = this.props;
		onClick && onClick();
	}
	render() {
		const { content = '' } = this.props;
		return (
			<div
				className="v-invite-other g-relative"
				style={{ height: 92 }}
			>
				{content.length
					?
					<div
						className="g-fs-12 g-pd-10 g-black-light1 g-pd-b-20 g-bg-gray-middle"
						style={{ paddingLeft: 12 }}
					>{content}</div>
					: ''
				}
				<div
					className="g-big-btn-blue g-absolute"
					style={{ bottom: 0 }}
					onClick={this.handleEnter}
				>进入群聊</div>
			</div>
		);
	}
}
export default Footer;