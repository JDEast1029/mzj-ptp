import React, { Component, Fragment } from 'react';
import { InputNumber, message, Input } from 'antd';
const { TextArea } = Input;
export default class Invite extends Component {
	constructor(params) {
		super(params);
		this.state = {
			content: '',
			hour: ''
		};
	}
	onInputChange = (val, key) => {
		this.setState({
			[key]: val
		});
	}
	getInfo = () => {
		return this.state;
	}
	render() {
		const { content, hour } = this.state;
		const { invite } = this.props;
		if (invite) {
			return (
				<div style={{ marginTop: '40px' }}>
					<div className="g-m-b-20">
						<p>邀请语设置:</p>
						<TextArea
							rows={4}
							maxLength={100}
							value={content}
							onChange={e => {
								this.onInputChange(e.target.value, 'content');
							}}
						/>
						<p className="g-tr">{content.length}/100</p>
					</div>
					<div className="">
						邀请链接有效期：
    				    <InputNumber
							style={{ width: 100 }}
							value={hour}
							maxLength={10}
							placeholder=""
							precision={0}
							onChange={val => {
								this.onInputChange(val, 'hour');
							}}
							min={1}
							max={9999}
						/> 小时
    				    <span className="g-c-dark"> 不填则永久生效</span>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}
