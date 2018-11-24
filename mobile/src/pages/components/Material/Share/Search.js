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
    	this.props.getInfo(this.state.value);
    }
    render() {
    	return (
    		<div>
    			<SearchBar
    				placeholder="搜索社群名称"
    				cancelText="搜索"
    				value={this.state.value}
    				onChange={this.handleChange}
    				onCancel={this.handleSubmit}
    			/>
    			<p className="g-pd-10">该素材可分享至以下{this.props.length}个群</p>
    		</div>
    	);
    }
}
