import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'wya-fetch';
import { CreatePortalFunc, CreateLanguage, PPopup, Upload } from 'wya-rc';
import { Modal, message, Button, Icon } from 'antd';
import apiRoot from '@constants/apiRoot';
const props = {
	name: 'Filedata',
	multiple: true,
	url: apiRoot._COMMON_IMG_UPLOAD,
	size: 10,
	showTips: true,
	onFileSuccess: (info) => {
		console.log(info);
	},
	accept: 'audio/mp3, audio/wma, audio/wav, audio/arm'
};
@CreatePortalFunc({
	cName: 'root-modal-add-audio'
})
export default class AddAudio extends Component {
	// static popup = Statics.popup;
	constructor(params) {
		super(...params);
		this.info = [];
		this.is_fetch = false;
	}
	handleChange = (info) => {
		if (info.file.status === 'done') {
			this.info = info;
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}
    handleOk = () => {
    	const { onSure } = this.props;
    	if (this.is_fetch){
    		onSure && onSure(this.info);
    	} else {
    		message.info('音频还未上传完成');
    	}
    }
    handleCancel = () => {
    	const { onClose } = this.props;
    	onClose && onClose();
    }
	handleSuccess = (res, file) => {
		this.info.push(res.data);
	}
	handleProgress = (e, file) => {
		console.log(`Progress: 当前：${file.current}, 总数：${file.total}`);
		console.log(e.percent);
	}
	handleError = (res, file) => {
		console.log(`Error: 当前：${file.current}, 总数：${file.total}`);
		console.log(res);
		message.warn(res.msg);
	}
	handleBegin = (files) => {
		console.log(files);
	}
	handleComplete = (info = {}) => {
		this.is_fetch = true;
		// this.info = info.imgs || [];
	}
	render() {
    	return (
    		<Modal
    			title="上传音频"
    			visible={true}
    			onOk={this.handleOk}
    			onCancel={this.handleCancel}
    		>
    			<Upload 
					{...props} 
					onFileProgress={this.handleProgress}
					// onFileBefore
					// onFileStart
					onFileSuccess={this.handleSuccess}
					onFileError={this.handleError}
					onBegin={this.handleBegin}
					onComplete={this.handleComplete}
					showTips={true}
				>
    				<Button>
    					<Icon type="upload" /> 
                        点击上传
    				</Button>
    			</Upload>
    		</Modal>
    	);
	}
}
