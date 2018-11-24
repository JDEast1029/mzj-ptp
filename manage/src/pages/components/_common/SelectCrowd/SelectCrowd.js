import React, { Component } from 'react';
import { PPopup } from 'wya-rc';
import ReactDOM from 'react-dom';
import { Modal, message } from 'antd';
import Footer from './Footer';
import Content from './Content';
import { CreatePortalFunc, CreateLanguage } from 'wya-rc';
import './selectCrowd.scss';
// let cName = 'SelectAgent';
@CreatePortalFunc({
	cName: 'root-modal-crowd'
})
@CreateLanguage()
export default class SelectAgent extends Component {
	// static popup = Statics.popup;
	constructor(params) {
    	super(...params);
	}
    handleSave = () => {
    	const { onSure, min = 0 } = this.props;
    	const info = this.tab.getSelectInfo();
    	if (!info) return;
    	if (info.selectInfo.length < this.props.min ){
    		message.error(`最少选择${min}项`);
    		return;
    	}
    	onSure && onSure(info);
    }
    render() {
    	const { title = "社群选择", onCloseSoon } = this.props;
    	return (
    		<div className="wp-agent-container" >
    			<Modal 
    				title={title} 
    				visible={true}
    				footer={null}
    				width="900px"
    				onCancel={onCloseSoon}
    			>
    				<Content 
    					ref={val => this.tab = val}
    					{...this.props}
    				/>
    				<Footer
    					onHandleSave={this.handleSave}
    					onHandleClose = {onCloseSoon}
    					{...this.props}
    				/>
    			</Modal>
    		</div>
    	);
    }
}
