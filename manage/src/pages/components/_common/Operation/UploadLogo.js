/**
 * 颤抖吧，年轻人
 */
import React, { Component } from 'react';
import { Radio, Button, message, Icon, Slider, Modal } from 'antd';
import { Upload, ImgsCrop, CreatePortalFunc } from 'wya-rc';
import * as types from '@constants/actions/setting';
@CreatePortalFunc({
	cName: 'rc-modal-logo'
})
class UploadLogo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			imageUrl: '',
			image: '', // 图片裁剪后的base64
			scale: 1,
			url: '',
			imgOri: '',
			visible: true,
		};
		this.goUpload = null;
		this.file = null;
		this.isNeedWait = false; // 避免用户重复点击确定按钮
	}

	handlePreview = async (e) => {
		try {
			let fileInfo;
			fileInfo = await this.imgCrop.getImage(true, 'image.png', true);
			const { file, base64Image } = fileInfo;
			this.file = file;
			this.setState({
				image: base64Image
			});
		} catch (e) {

		}
	}

	handleBefore = (e, file) => {
		this.reader = new FileReader();
		this.reader.onload = () => {
			this.setState({
				imgOri: this.reader.result // 原图的base64
			});
		};
		this.reader.readAsDataURL(e);
		return new Promise((resolve, reject) => {
			this.goUpload = resolve;
		});
	}
	handleSuccess = (res, file) => {
		// console.log(`Success：${file.current}, 总数：${file.total}`, res);
	}
	handleProgress = (e, file) => {
		// console.log(`Progress: 当前：${file.current}, 总数：${file.total}`, e.percent);
	}
	handleError = (res, file) => {
		// console.log(`Error: 当前：${file.current}, 总数：${file.total}`, res);
		message.warn(res.msg);
	}

	handleComplete = (info = {}) => {
		// console.log(`Complete:`, info);
		message.destroy();
		message.success('上传成功');
		this.setState({
			url: info.imgs[0].data.url
		}, () => {
			this.isNeedWait = false;
			const { onSure } = this.props;
			onSure && onSure(this.state.url);
		});
	}

	handleScale = (scale) => {
		this.setState({
			scale
		});
	}

	handleClose = () => {
		this.setState({
			imgOri: ''
		});
	}

	/**
	 * 点击确定先上传，上传成功之后拿到url，窗口关闭
	 */
	handleOk = () => {
		const { image } = this.state;
		if (image && !this.isNeedWait) {
			this.isNeedWait = true;
			message.destroy();
			message.loading('上传中...', 0);
			this.goUpload && this.goUpload(this.file);
		}
	}

	handleCancle = () => {
		const { onClose } = this.props;
		onClose && onClose();
	}

	render() {
		const uploadButton = (
			<div className="g-border-gray g-flex g-ai-c g-fw-w" style={{ width: 180, height: 180 }}>
				<div className="g-width g-tc">
					<Icon style={{ width: '100%', display: 'block' }} type={this.state.loading ? 'loading' : 'plus'} />
					选择图片
				</div>
			</div>
		);
		const { imageUrl, image, scale, imgOri, url, visible } = this.state;
		return (
			<Modal
				width={680}
				title="上传LOGO"
				wrapClassName="g-modal-container"
				visible={visible}
				maskClosable
				onCancel={this.handleCancle}
				footer={null}
			>
				<div className="v-setting-shop-upload">
					<div className="g-flex g-fs-sb g-ai-c g-pd-b-30">
						<div className="g-1of2 g-relative">
							<div>
								<p className="g-fs-12 g-lh-24 g-m-b-30">图片大小不能超过2M</p>
								<Upload
									tag="span"
									type="images"
									accept="image/gif, image/jpeg, image/png, image/bmp"
									onFileBefore={this.handleBefore}
									onFileSuccess={this.handleSuccess}
									onFileError={this.handleError}
									onBegin={this.handleBegin}
									onComplete={this.handleComplete}
									size={2}
								>
									{uploadButton}
								</Upload>
							</div>
							{
								imgOri && <div style={{ position: 'absolute', top: '36px', width: '100%', background: '#fff' }}>
									<div style={{ width: 250, height: "auto", position: 'relative' }}>
										<i
											style={{ position: 'absolute', top: '-15px', right: '-15px' }}
											className="iconfont icon-shanchu g-fs-20 g-c-blue g-pointer"
											onClick={this.handleClose}
										/>
										<ImgsCrop
											ref={instance => this.imgCrop = instance}
											src={imgOri}
											scale={scale}
											crossOrigin="anonymous" // 支持CORS请求
										/>
										<Slider
											defaultValue={1}
											onChange={this.handleScale}
											min={0.3}
											max={3}
											marks={{ 1: '原始', 3: '放大' }}
											included={false}
											step={0.01}
											style={{ width: 250, marginLeft: 0 }}
										/>
									</div>
								</div>
							}
						</div>
						<div className="g-1of2">
							{imgOri && <Button type="primary" onClick={this.handlePreview} className="g-m-b-20 g-m-l-20">确定裁剪</Button>}
							<br />
							<img hidden={!imgOri} src={image} alt="" className="g-img-100 g-border-gray g-m-lr-20" />
							<img hidden={!imgOri} src={image} alt="" className="g-img-100 g-border-gray g-br-50" />
						</div>
					</div>
					<div className="g-flex-ac g-jc-fe g-m-t-30 g-pd-t-20" style={{ width: '100%', boxSizing: 'border-box' }}>
						<Button className="g-m-r-20" onClick={this.handleCancle}>取消</Button>
						<Button type="primary" onClick={this.handleOk}>确定</Button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default UploadLogo;