import React, { Component } from 'react';
import { PPopup } from 'wya-rc';
import ReactDOM from 'react-dom';
import { Modal, message } from 'antd';
import Footer from './Footer';
import Content from './Content';
import { CreatePortalFunc, CreateLanguage } from 'wya-rc';
import './selectMaterial.scss';
// let cName = 'SelectAgent';
@CreatePortalFunc({
	cName: 'root-modal-addmaterial'
})
@CreateLanguage()
export default class AddMaterial extends Component {
	// static popup = Statics.popup;
	constructor(params) {
    	super(...params);
	}
    handleSave = () => {
    	const { onSure } = this.props;
    	onSure && onSure(arr);
    }
    render() {
    	const { handerTitle = "素材列表" } = this.props;
    	return (
    		<div className="wp-agent-container" >
    			<Modal 
    				title={handerTitle} 
    				visible={true}
    				footer={null}
    				width="900px"
    				onCancel={this.props.onCloseSoon}
    			>
    				<Content 
    					ref={val => this.tab = val}
    					{...this.props}
    				/>
    				<Footer
    					onHandleSave={this.handleSave}
    					onHandleClose = {this.props.onCloseSoon}
    				/>
    			</Modal>
    		</div>
    	);
    }
}
