import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CreatePortalFunc } from 'wya-rc';
import "./Styles.scss";

@CreatePortalFunc({
	cName: 'root-popup'
})
class MPopup extends Component {
	handleOk = () => {
		this.props.onSure && this.props.onSure();
	}

	handleCancel = (event) => {
		const { orientation } = this.props;
		this.content && this.content.classList.add(`_content-${orientation}-leave`);
		this.props.onClose && this.props.onClose();
	}

	renderContent = () => {
		const { content } = this.props;

		if (typeof content === 'string') {
			return <div className="g-bg-white">{content}</div>;
		} else if (React.isValidElement(content)) {
			return React.cloneElement(content, {
				onClose: this.handleCancel,
				onOk: this.handleOk
			});
		}
	}

	render() {
		const { orientation, content } = this.props;

		return (
			<div className="rcm-popup">
				<div className="_mask" onClick={this.handleCancel} />
				<div 
					ref={(ref) => this.content = ref}
					className={`_content _content-${orientation}`}>
					{this.renderContent()}
				</div>
			</div>
		);
	}
}

MPopup.propTypes = {
	orientation: PropTypes.string
};

MPopup.defaultProps = {
	orientation: 'center'
};

export default MPopup;
