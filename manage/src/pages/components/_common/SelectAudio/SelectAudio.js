import React, { Component } from 'react';
import { PPopup } from 'wya-rc';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { ajax } from 'wya-fetch';
import Content from './Content';
import { CreatePortalFunc, CreateLanguage } from 'wya-rc';
import { Modal, message } from 'antd';
import './selectAudio.scss';
@CreatePortalFunc({
	cName: 'root-modal-audio'
})
@CreateLanguage()
export default class SelectAudio extends Component {
	// static popup = Statics.popup;
	constructor(params) {
    	super(...params);
	}
    handleSave = () => {
    	const { onSure } = this.props;
    	const arr = this.tab.getSelectInfo();
    	onSure && onSure(arr);
    }
	handleClose = () => {
		const { onClose } = this.props;
		onClose && onClose();
	}
	render() {
    	return (
    		<Modal 
    			title="音频选择" 
    			visible={true}
    			footer={null}
    			width="1000px"
				onCancel={this.handleClose}
    		>
    			<Content 
    				ref={val => this.tab = val}
    				{...this.props}
    			/>
    			<Footer
    				onSave={this.handleSave}
    				onCloseSoon = {this.props.onCloseSoon}
    			/>
    		</Modal>
    	);
	}
}
