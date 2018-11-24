import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { MToasts } from 'wya-rc';
import './Styles.scss';

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
	}

	componentDidMount() {
		const { autoFocus } = this.props;
		this.text = findDOMNode(this.input);
		this.text && this.text.addEventListener('keydown', this.handleKeyDown);

		autoFocus && this.input.focus();
	}

	componentWillUnmount() {
		this.text && this.text.removeEventListener('keydown', this.handleKeyDown);
		document.activeElement.blur();
	}

	/**
     * 监听回车事件
     * @param event
     */
	handleKeyDown = (event) => {
		const { onSend } = this.props;
		const { content } = this.state;
		let msg = content.trim();
		if (this.text && event.keyCode === 13) {
			if (msg.length == 0) {
				MToasts.info('消息不能为空', 1);
				return;
			}
			onSend && onSend(msg);
		}
	}

	handleChange = (event) => {
		let content = event.target.value;
		content = content.trim();
		if (content.length > 500) {
			MToasts.info('最多输入500个字', 2);
			return;
		}
		this.setState({ content });
	};

	handleFocus = () => {
		const { onFocus } = this.props;
		this.inputting = true;
		// parseInt(_global.device.osVersion) == 11
		this.input && setTimeout(() => {
			this.input.scrollIntoView(!0);
		}, 450);
		if (_global.device.ios && parseInt(_global.device.osVersion) != 11) {
			setTimeout(() => {
				document.body.scrollTop = 9999;
			}, 600);
		}
		onFocus && onFocus();
	}

	handleBlur = () => {
		const { onBlur } = this.props;
		this.inputting = false;
		onBlur && onBlur();
	}

	handleForbidClick = () => {
		const { onFirbidClick } = this.props;

		onFirbidClick && onFirbidClick();
	}

	initState = () => {
		this.setState({ content: '' });
	}

	render() {
		const { isForbid, forbidText, forbidStyle } = this.props;

		if (isForbid) {
			document.activeElement.blur();
			return (
				<div
					className="c-chat-text g-col g-flex-cc g-black-light1"
					style={{ background: '#e1e1e1', ...forbidStyle }}
					onClick={this.handleForbidClick}
				>
					{forbidText || '全体禁言'}
				</div>
			);
		}
		return (
			<input
				ref={ref => this.input = ref}
				className="c-chat-text g-col"
				placeholder="说点什么吧..."
				maxLength={500}
				value={this.state.content}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
			/>
		);
	}
}

export default TextInput;
