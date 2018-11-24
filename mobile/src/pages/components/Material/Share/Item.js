import React, { Component } from 'react';
export default class Item extends Component {
    handleSelect = () => {
    	const { community_id } = this.props.itemData;
    	this.props.actions.materialShareSelect(community_id);
    }
    render() {
    	const { selectArr, itemData, index } = this.props;
    	const { name, community_id } = itemData;
    	const is_select = selectArr.indexOf(community_id) > -1 ? 1 : 0;
    	return (
    		<div className="g-flex g-pd-15 g-ai-c">
    			<i 
    				onClick={this.handleSelect} 
    				className={`iconfont ${ !is_select ? 'icon-circle' : 'icon-xuanze'} g-blue-middle g-m-r-10`} />
    			<div className="g-col">{`${index}. ${name}`}</div>
    		</div>
    	);
    }
}
