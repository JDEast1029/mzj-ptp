import React, { Component } from 'react';
import { Radio } from 'antd';

export default class Crowd extends Component {
	constructor(params) {
		super(params);
		this.state = {
			value: '1'
		};
	}
    handleChange = (e) => {
    	const value = e.target.value;
    	this.setState({
    		value: value
    	});
    }
    getInfo = () => {
    	return this.state.value;
    }
    render() {
    	const { changeCrowd } = this.props;
    	if (changeCrowd){
    		return (
    			<div className="g-flex g-pd-tb-20">
    				<div>换群方式：</div>
    				<div className="g-col">
    					<Radio.Group defaultValue={"1"} value={this.state.value} onChange={this.handleChange}>
    						<Radio value="1">仅加入</Radio>
    						<span className="g-c-gray2 g-m-b-20">仅将会员加入所选中社群，对会员之前的所在社群无影响</span>
    						<br />
    						<br />
    						<Radio value="2">全部重置</Radio>
    						<span className="g-c-gray2">
                                批量换群确认调整无论之前会员在什么社群，操作后，会员将只存在于此次选中的社群中
    					</span>
    						<br />
    					</Radio.Group>
    				</div>
    			</div>
    		);
    	} else {
    		return null;
    	}
    	
    }
}
