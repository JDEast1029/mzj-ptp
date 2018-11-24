import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

export default class Search extends Component {
	constructor(params) {
		super(params);
		this.state = {
			value: ""
		};
	}
	handleChange = (value) => {
		this.setState({
			value
		});
	}
	handleSubmit = () => {
		this.setState({
			value: this.state.value.replace(/(^\s*)|(\s*$)/g, "")
		}, () => {
			this.props.getInfo(this.state.value);
		});
	}
	render() {
		return (
			<div>
				<SearchBar
					placeholder="搜索"
					cancelText="搜索"
					value={this.state.value}
					onChange={this.handleChange}
					onCancel={this.handleSubmit}
					onBlur={this.handleSubmit}
				/>
			</div>
		);
	}
}
