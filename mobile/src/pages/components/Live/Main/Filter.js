import React, { Component } from "react";
import { SearchBar } from "antd-mobile";

export default class Search extends Component {
	constructor(params) {
		super(params);
		this.state = {
			value: ""
		};
	}
	handleSubmit = () => {
		this.props.actions.liveRoomSearchInt();
	};
	handleChange = val => {
		this.props.actions.liveRoomSearchChange(val);
	};
	render() {
		const { title } = this.props;
		return (
			<div>
				<SearchBar
					placeholder="搜索"
					cancelText="搜索"
					defaultValue={title}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					// onBlur={this.handleSubmit}
					onCancel={this.handleSubmit}
				/>
			</div>
		);
	}
}
